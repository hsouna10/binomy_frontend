import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import MatchCircle from "@/components/MatchCircle";
import MatchModal from "@/components/MatchModal";
import { useToast } from "@/components/ui/use-toast";
import { Send, Users } from "lucide-react";
import { io } from "socket.io-client";

interface Match {
  id: string;
  student1_id: string;
  student2_id: string;
  match_score: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'accepted' | 'rejected';
  name?: string;
  compatibility?: number;
  avatar?: string;
  newMatch?: boolean;
  age?: number;
  school?: string;
  location?: string;
  interests?: string[];
  description?: string;
}

interface FormattedMatch {
  id: string;
  name: string;
  compatibility: number;
  avatar?: string;
  status: 'pending' | 'accepted' | 'rejected';
  newMatch?: boolean;
  student1_id: string;
  student2_id: string;
  match_score: string;
  created_at: string;
  updated_at: string;
}

interface Conversation {
  id: string;
  student1_id: string;
  student2_id: string;
  match_id: string;
  created_at: string;
  updated_at: string;
  student1_name?: string;
  student1_avatar?: string;
  student2_name?: string;
  student2_avatar?: string;
  unread_count?: number;
  last_message_time?: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  content: string;
  read: boolean;
  created_at: string;
}

const Messages = () => {
  const [matches, setMatches] = useState<FormattedMatch[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<FormattedMatch | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();
  const currentStudentId = sessionStorage.getItem("studentId");
  useEffect(() => {
  if (!currentStudentId) return;

  const s = io("http://localhost:5000");
  setSocket(s);

  s.emit("register", currentStudentId);

  return () => {
    s.disconnect();
  };
}, [currentStudentId]);
  useEffect(() => {
  if (!currentStudentId) return;

  // Charger les matches
  fetchMatches();
  // Charger les conversations
  fetchConversations();
}, [currentStudentId]);
useEffect(() => {
  if (!socket || !selectedConversation) return;

  socket.on("receive_message", (msg: Message) => {
    if (msg.conversation_id === selectedConversation.id) {
      setMessages(prev => [...prev, msg]);
    }
  });

  socket.on("new_conversation", (conv: Conversation) => {
    setConversations(prev => [conv, ...prev]);
  });

  return () => {
    socket.off("receive_message");
    socket.off("new_conversation");
  };
}, [socket, selectedConversation]);


const fetchMatches = async () => {
  try {
    const response = await fetch(`http://localhost:5000/matches/matches/${currentStudentId}`);
    const data = await response.json();

    if (data.matches) {
      const formatted: FormattedMatch[] = data.matches.map((m: any) => {
        // Déterminer l'autre utilisateur
        const otherUser = m.user1.id === currentStudentId ? m.user2 : m.user1;

        return {
          ...m,
          name: `${otherUser.first_name} ${otherUser.last_name}`, // vrai nom
          avatar: otherUser.profile_picture_url, // vraie photo
          compatibility: Number(m.score) || 0,   // ⚡ correction ici
          newMatch: m.status === "pending",
        };
      });

      setMatches(formatted);
    }
  } catch (error) {
    console.error("Erreur récupération matches:", error);
  }
};


  const fetchConversations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/conversations/student/${currentStudentId}`);
      const data = await response.json();
      
      console.log('🔍 Conversations récupérées:', data);
      
      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error("Erreur récupération conversations:", error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/messages/${conversationId}`);
    const data = await response.json();

    console.log("🔍 Messages récupérés:", data);

    // Si ton backend renvoie { rows: [...] } ou un array directement
    const messagesArray = Array.isArray(data) ? data : data.rows;

    if (messagesArray) {
      setMessages(messagesArray);
    }
  } catch (error) {
    console.error("Erreur récupération messages:", error);
  }
};

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  // Fetch messages in a conversation



// Send a message
const handleSendMessage = () => {
  if (!newMessage.trim() || !selectedConversation || !currentStudentId || !socket) return;

  socket.emit("send_message", {
    conversationId: selectedConversation.id,
    senderId: currentStudentId,
    text: newMessage,
  });

  setNewMessage("");
};


  

  const handleMatchClick = async (match: FormattedMatch) => {
    setIsLoading(true);
    try {
      setSelectedMatch(match);
      setIsModalOpen(true);
    } catch (error) {
      setSelectedMatch(match);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptMatch = async (matchId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/matches/matches/${matchId}/accept`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setMatches(prev => prev.map(match =>
          match.id === matchId ? { ...match, status: 'accepted', newMatch: false } : match
        ));
        
        // Recharger les conversations car une nouvelle conversation a été créée
        fetchConversations();
        
        toast({
          title: "Match accepté !",
          description: "Vous pouvez maintenant discuter avec cette personne.",
          variant: "default"
        });
        setIsModalOpen(false);
      } else {
        throw new Error('Erreur lors de l\'acceptation du match');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accepter le match. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectMatch = async (matchId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/matches/matches/${matchId}/reject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setMatches(prev =>
          prev.map(match =>
            match.id === matchId ? { ...match, status: "rejected", newMatch: false } : match
          )
        );
        toast({
          title: "Match rejeté",
          description: "Le match a été rejeté.",
          variant: "default",
        });
        setIsModalOpen(false);
      } else {
        throw new Error('Erreur lors du rejet du match');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter le match. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConversationDisplayName = (conversation: Conversation) => {
    if (conversation.student1_id === currentStudentId) {
      return conversation.student2_name || `Étudiant ${conversation.student2_id}`;
    } else {
      return conversation.student1_name || `Étudiant ${conversation.student1_id}`;
    }
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.student1_id === currentStudentId) {
      return conversation.student2_avatar;
    } else {
      return conversation.student1_avatar;
    }
  };

  const pendingMatches = matches.filter(m => m.status === "pending");
  // Afficher toutes les conversations qui ont un match_id (donc des conversations valides)
  const acceptedConversations = conversations;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Matches Section */}
          {pendingMatches.length > 0 && (
            <Card className="shadow-match">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Nouveaux Matches</span>
                  </div>
                  <Badge variant="outline" className="bg-gradient-primary text-white border-0">
                    {pendingMatches.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-6 overflow-x-auto pb-4">
                  {pendingMatches.map((match) => (
                    <MatchCircle
                      key={match.id}
                      match={match}
                      onClick={() => handleMatchClick(match)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messages Section */}
          <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {acceptedConversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      Aucune conversation pour le moment. Acceptez des matches pour commencer !
                    </div>
                  ) : (
                    acceptedConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer transition-all duration-300 hover:bg-muted/50 ${
                          selectedConversation?.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={getConversationAvatar(conversation)} />
                              <AvatarFallback className="bg-gradient-secondary text-white">
                                {getConversationDisplayName(conversation)?.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.unread_count && conversation.unread_count > 0 && (
                              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {getConversationDisplayName(conversation)}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {conversation.last_message_time 
                                ? new Date(conversation.last_message_time).toLocaleDateString()
                                : "Nouvelle conversation"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="col-span-8 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation ? getConversationAvatar(selectedConversation) : ""} />
                    <AvatarFallback className="bg-gradient-secondary text-white">
                      {selectedConversation ? getConversationDisplayName(selectedConversation)?.split(' ').map(n => n[0]).join('') : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedConversation
                        ? getConversationDisplayName(selectedConversation)
                        : "Sélectionnez une conversation"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {selectedConversation ? "En conversation" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation ? (
                  messages.length === 0 ? (
                    <div className="text-muted-foreground text-center py-8">
                      Aucun message. Commencez la conversation !
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_id === currentStudentId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-xl px-4 py-2 max-w-xs ${
                            msg.sender_id === currentStudentId
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "bg-slate-100 text-slate-800 border"
                          }`}
                        >
                          <div>{msg.content}</div>
                          <div className="text-xs mt-1 text-right opacity-60">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Sélectionnez une conversation pour voir les messages.
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              {selectedConversation && (
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} variant="gradient">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        match={selectedMatch}
        onAccept={handleAcceptMatch}
        onReject={handleRejectMatch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Messages;