import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Home,
  Heart
} from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState("");

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

  const currentConversation = conversations[selectedChat];

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
        <div className="max-w-6xl mx-auto">
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
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedChat === index ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
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
                                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
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
                                <Heart className="w-3 h-3 text-red-500" />
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
                      <AvatarFallback>
                        {currentConversation.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{currentConversation.name}</h3>
                      <div className="flex items-center space-x-2">
                        {currentConversation.online && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {currentConversation.online ? "En ligne" : "Vu récemment"}
                        </span>
                        {currentConversation.matchType === "roommate" && (
                          <Badge variant="outline" className="text-xs">
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
                          <AvatarFallback className="text-xs">Y</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.sender === "me"
                            ? "bg-gradient-primary text-white"
                            : "bg-muted"
                        }`}
                      >
                        {message.type === "housing-link" ? (
                          <div className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-background/80">
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
                          <AvatarFallback className="text-xs">S</AvatarFallback>
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
    </div>
  );
};

export default Messages;