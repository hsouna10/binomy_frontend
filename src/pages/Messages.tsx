import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import MatchCircle from "@/components/MatchCircle";
import { Send, Users } from "lucide-react";

interface Match {
  id: string;
  student1_id: string;
  student2_id: string;
  match_score: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "accepted" | "rejected";
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const Messages = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Récupérer tous les matchs de l'étudiant connecté
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) return;

    fetch(`http://localhost:5000/matches/matches/${studentId}`)
      .then((res) => res.json())
      .then((data) => setMatches(data.matches))
      .catch((err) =>
        console.error("Erreur récupération des matchs :", err)
      );
  }, []);

  // Récupérer les messages d’un match sélectionné
  useEffect(() => {
    if (!selectedMatch) return;

    fetch(`http://localhost:5000/messages/${selectedMatch.id}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.messages.map((m: any) => ({
          id: m.id,
          sender: m.sender,
          content: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formatted);
      })
      .catch((err) =>
        console.error("Erreur récupération des messages :", err)
      );
  }, [selectedMatch]);

  // Envoyer un message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMatch) return;

    const messageToSend = {
      matchId: selectedMatch.id,
      sender: "me",
      content: newMessage.trim(),
    };

    fetch(`http://localhost:5000/messages/${selectedMatch.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageToSend),
    })
      .then((res) => res.json())
      .then((savedMessage) => {
        setMessages((prev) => [
          ...prev,
          {
            id: savedMessage.id,
            sender: savedMessage.sender,
            content: savedMessage.content,
            timestamp: new Date(savedMessage.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setNewMessage("");
      })
      .catch((err) => console.error("Erreur envoi message :", err));
  };

  const pendingMatches = matches.filter((m) => m.status === "pending");

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
                      match={{
                        id: match.id,
                        name: `Match ${match.id.slice(0, 4)}`,
                        compatibility: Number(match.match_score),
                        status: match.status,
                        newMatch: match.status === "pending",
                      }}
                      onClick={() => setSelectedMatch(match)}
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
                          <div className="font-medium text-sm truncate">
                            {`Match ${match.id.slice(0, 4)}`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {match.status === "pending"
                              ? "Nouveau match !"
                              : "Conversation"}
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
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-secondary text-white">
                      {selectedMatch
                        ? `M${selectedMatch.id.slice(0, 2)}`
                        : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedMatch
                        ? `Match ${selectedMatch.id.slice(0, 4)}`
                        : "Sélectionnez un match"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {selectedMatch
                          ? selectedMatch.status === "pending"
                            ? "Nouveau match"
                            : "En conversation"
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMatch ? (
                  messages.length === 0 ? (
                    <div className="text-muted-foreground text-center py-8">
                      Aucun message. Commencez la conversation !
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === "me"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`rounded-xl px-4 py-2 max-w-xs ${
                            msg.sender === "me"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "bg-slate-100 text-slate-800 border"
                          }`}
                        >
                          <div>{msg.content}</div>
                          <div className="text-xs mt-1 text-right opacity-60">
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Sélectionnez un match pour voir la conversation.
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              {selectedMatch && (
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
    </div>
  );
};

export default Messages;
