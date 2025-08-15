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

interface Match {
  id: string;
  student1_id: string;
  student2_id: string;
  match_score: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'accepted' | 'rejected';
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
  const { toast } = useToast();
  const currentStudentId = localStorage.getItem("studentId");

  // Récupérer tous les matchs de l'étudiant connecté
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) return;
    fetch(`http://localhost:5000/matches/matches/${studentId}`)
      .then(res => res.json())
      .then(data => setMatches(data.matches))
      .catch(err => console.error("Erreur récupération nouveaux matchs:", err));
  }, []);

  // Récupérer les messages d’un match sélectionné
  useEffect(() => {
    if (selectedMatch) {
      setMessages(mockMessages); // Remplace par un appel API pour les vrais messages si besoin
    }
  }, [selectedMatch]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: "me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  const pendingMatches = matches.filter(m => m.status === "pending");

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
                  <Badge
                    variant="outline"
                    className="bg-gradient-primary text-white border-0"
                  >
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
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      className={`p-4 cursor-pointer transition-all duration-300 hover:bg-muted/50 ${
                        selectedMatch?.id === match.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedMatch(match)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-secondary text-white">
                            {`M${match.id.slice(0, 2)}`}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm truncate">{`Match ${match.id.slice(0, 4)}`}</div>
                          <div className="text-xs text-muted-foreground">
                            {match.status === "pending"
                              ? "Nouveau match !"
                              : "Conversation"}
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
                      {selectedMatch ? `M${selectedMatch.id.slice(0, 2)}` : ""}
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
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-xl px-4 py-2 max-w-xs ${
                            msg.sender_id === currentStudentId
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "bg-slate-100 text-slate-800 border"
                          }`}
                        >
                          <div>{msg.content}</div>
                          <div className="text-xs mt-1 text-right opacity-60">{msg.timestamp}</div>
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
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
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
