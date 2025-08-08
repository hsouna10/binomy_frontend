import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, School, Clock } from "lucide-react";

interface MatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match: {
    id: string;
    name: string;
    compatibility: number;
    avatar?: string;
    age?: number;
    school?: string;
    location?: string;
    interests?: string[];
    description?: string;
  } | null;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isLoading?: boolean;
}

const MatchModal = ({ 
  open, 
  onOpenChange, 
  match, 
  onAccept, 
  onReject, 
  isLoading = false 
}: MatchModalProps) => {
  if (!match) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="p-1 rounded-full border-4 border-primary shadow-match">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={match.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl font-semibold">
                    {match.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Badge 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-success text-white border-0 px-3 py-1"
              >
                {match.compatibility}% Match
              </Badge>
            </div>
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold">
            {match.name}
          </AlertDialogTitle>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            {match.age && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{match.age} ans</span>
              </div>
            )}
            {match.school && (
              <div className="flex items-center space-x-1">
                <School className="w-4 h-4" />
                <span>{match.school}</span>
              </div>
            )}
          </div>
          
          {match.location && (
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{match.location}</span>
            </div>
          )}
        </AlertDialogHeader>

        {match.description && (
          <AlertDialogDescription className="text-center py-4 border-t border-b border-border">
            {match.description}
          </AlertDialogDescription>
        )}

        {match.interests && match.interests.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Centres d'intérêt :</p>
            <div className="flex flex-wrap gap-2">
              {match.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <AlertDialogFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <AlertDialogCancel asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              Fermer
            </Button>
          </AlertDialogCancel>
          
          <Button
            onClick={() => onReject(match.id)}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-danger hover:bg-gradient-danger/90 text-white border-0"
          >
            <X className="w-4 h-4 mr-2" />
            Rejeter
          </Button>
          
          <Button
            onClick={() => onAccept(match.id)}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-success hover:bg-gradient-success/90 text-white border-0"
          >
            <Heart className="w-4 h-4 mr-2" />
            Accepter
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchModal;