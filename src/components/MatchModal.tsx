import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MatchCircle from "@/components/MatchCircle";
import { MapPin, GraduationCap } from "lucide-react";

interface MatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match: any;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isLoading: boolean;
}

const MatchModal = ({
  open,
  onOpenChange,
  match,
  onAccept,
  onReject,
  isLoading,
}: MatchModalProps) => {
  if (!match) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl p-8">
        <div className="flex flex-col items-center space-y-2">
          <MatchCircle match={match} onClick={() => {}} />
          <h2 className="text-xl font-bold mt-2">{match.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <span>{match.age} ans</span>
            <GraduationCap className="w-4 h-4" />
            <span>{match.school}</span>
            <MapPin className="w-4 h-4" />
            <span>{match.location}</span>
          </div>
          <p className="text-center text-muted-foreground mb-2">{match.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {match.interests?.map((interest: string) => (
              <Badge key={interest} className="bg-pink-500 text-white px-3 py-1 rounded-full">
                {interest}
              </Badge>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button
              variant="destructive"
              onClick={() => onReject(match.id)}
              disabled={isLoading}
            >
              Rejeter
            </Button>
            <Button
              variant="success"
              onClick={() => onAccept(match.id)}
              disabled={isLoading}
            >
              Accepter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;