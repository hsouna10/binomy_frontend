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
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Home,
  Heart,
  Users
} from "lucide-react";

interface Match {
  id: string;
  name: string;
  compatibility: number;
  avatar?: string;
  status: 'pending' | 'accepted' | 'rejected';
  newMatch?: boolean;
  age?: number;
  school?: string;
  location?: string;
  interests?: string[];
  description?: string;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const conversations = [
    {
      id: 1,
      name: "Yassine Hammadi",
      lastMessage: "Super ! On peut se voir demain pour visiter l'appartement ?",
      time: "14:30",
      unread: 2,
      online: true,
      matchType: "roommate",
      compatibility: 92
    },
    {
      id: 2,
      name: "Amine Ben Salah", 
      lastMessage: "J'ai trouvé quelques logements intéressants près de la fac",
      time: "12:15",
      unread: 0,
      online: false,
      matchType: "roommate", 
      compatibility: 87
    },
    {
      id: 3,
      name: "Mme Fatouma (Propriétaire)",
      lastMessage: "L'appartement est disponible à partir du 1er septembre",
      time: "10:30",
      unread: 1,
      online: true,
      matchType: "owner"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Salut Sarah ! J'ai vu qu'on avait beaucoup de points en commun 😊",
      time: "14:25",
      type: "text"
    },
    {
      id: 2,
      sender: "me",
      content: "Salut Yassine ! Effectivement, 92% de compatibilité c'est excellent ! Tu veux qu'on se capte autour d'un café pour parler logement ?",
      time: "14:27",
      type: "text"
    },
    {
      id: 3,
      sender: "other",
      content: "Excellente idée ! J'ai déjà repéré quelques logements sympas près de l'université. On pourrait en discuter demain ?",
      time: "14:28",
      type: "text"
    },
    {
      id: 4,
      sender: "other",
      content: "D'ailleurs, j'ai vu cette annonce qui pourrait nous intéresser :",
      time: "14:29",
      type: "text"
    },
    {
      id: 5,
      sender: "other",
      content: "🏠 Appartement 2 pièces - Ariana - 600 TND/mois",
      time: "14:29",
      type: "housing-link"
    },
    {
      id: 6,
      sender: "me",
      content: "Parfait ! Je vais regarder ça. Pour demain, ça marche ! Vers quelle heure ?",
      time: "14:30",
      type: "text"
    },
    {
      id: 7,
      sender: "other",
      content: "Super ! On peut se voir demain pour visiter l'appartement ?",
      time: "14:30",
      type: "text"
    }
  ];

  // Mock data for matches
  useEffect(() => {
    // Simulating API call
    const mockMatches: Match[] = [
      {
        id: "1",
        name: "Ahmed Cherif",
        compatibility: 89,
        status: 'pending',
        newMatch: true,
        age: 22,
        school: "ESPRIT",
        location: "Tunis",
        interests: ["Gaming", "Cinéma", "Sport"],
        description: "Étudiant en informatique cherchant un colocataire sympa pour partager un appartement près du campus."
      },
      {
        id: "2", 
        name: "Leila Mansouri",
        compatibility: 76,
        status: 'pending',
        newMatch: true,
        age: 20,
        school: "ENIT",
        location: "Tunis",
        interests: ["Lecture", "Voyage", "Cuisine"],
        description: "Passionnée de littérature, je cherche quelqu'un de calme pour partager un logement."
      },
      {
        id: "3",
        name: "Karim Zouari", 
        compatibility: 94,
        status: 'accepted',
        age: 23,
        school: "ISET",
        location: "Ariana",
        interests: ["Musique", "Fitness", "Tech"]
      },
      {
        id: "4",
        name: "Nour Trabelsi",
        compatibility: 68,
        status: 'rejected',
        age: 21,
        school: "FST",
        location: "Tunis",
        interests: ["Art", "Danse", "Mode"]
      }
    ];
    setMatches(mockMatches);
  }, []);

  const fetchMatches = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('http://localhost:5000/api/matches/studentId');
      // const data = await response.json();
      // setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleAcceptMatch = async (matchId: string) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      // await fetch(`http://localhost:5000/api/matches/${matchId}/accept`, { method: 'POST' });
      
      setMatches(prev => prev.map(match => 
        match.id === matchId ? { ...match, status: 'accepted' } : match
      ));
      
      toast({
        title: "Match accepté !",
        description: "Vous pouvez maintenant discuter avec cette personne.",
        variant: "default"
      });
      
      setIsModalOpen(false);
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
      // Replace with actual API call
      // await fetch(`http://localhost:5000/api/matches/${matchId}/reject`, { method: 'POST' });
      
      setMatches(prev => prev.map(match => 
        match.id === matchId ? { ...match, status: 'rejected' } : match
      ));
      
      toast({
        title: "Match rejeté",
        description: "Le match a été rejeté.",
        variant: "default"
      });
      
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Erreur", 
        description: "Impossible de rejeter le match. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const currentConversation = conversations[selectedChat];
  const pendingMatches = matches.filter(m => m.status === 'pending');

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

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
                  {matches.map((match) => (
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
                <CardTitle className="flex items-center justify-between">
                  Messages
                  <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length}</Badge>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation, index) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer transition-all duration-300 hover:bg-muted/50 ${
                        selectedChat === index ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-secondary text-white">
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium truncate">
                              {conversation.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {conversation.time}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge className="text-xs px-1.5 py-0.5 bg-gradient-danger text-white border-0">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.matchType === "roommate" && (
                              <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                  {conversation.compatibility}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="col-span-8 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-secondary text-white">
                        {currentConversation.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{currentConversation.name}</h3>
                      <div className="flex items-center space-x-2">
                        {currentConversation.online && (
                          <div className="w-2 h-2 bg-success rounded-full" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {currentConversation.online ? "En ligne" : "Vu récemment"}
                        </span>
                        {currentConversation.matchType === "roommate" && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            Match {currentConversation.compatibility}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end space-x-2 max-w-xs">
                      {message.sender === "other" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-gradient-secondary text-white">Y</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          message.sender === "me"
                            ? "bg-gradient-primary text-white"
                            : "bg-muted"
                        }`}
                      >
                        {message.type === "housing-link" ? (
                          <div className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-background/80 transition-colors">
                            <Home className="w-4 h-4" />
                            <span>{message.content}</span>
                          </div>
                        ) : (
                          message.content
                        )}
                        <div className="text-xs opacity-70 mt-1">
                          {message.time}
                        </div>
                      </div>
                      {message.sender === "me" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-gradient-primary text-white">S</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} variant="gradient">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
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