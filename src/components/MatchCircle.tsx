import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MatchCircleProps {
  match: {
    id: string;
    name: string;
    compatibility: number;
    avatar?: string;
    status: 'pending' | 'accepted' | 'rejected';
    newMatch?: boolean;
  };
  onClick: () => void;
}

const MatchCircle = ({ match, onClick }: MatchCircleProps) => {
  const getStatusColor = () => {
    switch (match.status) {
      case 'pending':
        return 'border-match-pending shadow-match';
      case 'accepted':
        return 'border-match-accepted shadow-success';
      case 'rejected':
        return 'border-match-rejected shadow-danger';
      default:
        return 'border-primary shadow-match';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
          match.newMatch ? 'animate-pulse-match' : ''
        }`}
        onClick={onClick}
      >
        <div className={`p-1 rounded-full border-4 ${getStatusColor()}`}>
          <Avatar className="w-16 h-16">
            <AvatarImage src={match.avatar} />
            <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
              {match.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {match.newMatch && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-danger rounded-full flex items-center justify-center animate-bounce-soft">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
        
        <Badge 
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 ${
            match.compatibility >= 80 
              ? 'bg-gradient-success' 
              : match.compatibility >= 60 
              ? 'bg-gradient-primary' 
              : 'bg-gradient-secondary'
          } text-white border-0`}
        >
          {match.compatibility}%
        </Badge>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-medium text-foreground truncate max-w-[80px]">
          {match.name.split(' ')[0]}
        </p>
        <p className="text-xs text-muted-foreground capitalize">
          {match.status === 'pending' ? 'En attente' : 
           match.status === 'accepted' ? 'Accepté' : 'Rejeté'}
        </p>
      </div>
    </div>
  );
};

export default MatchCircle;