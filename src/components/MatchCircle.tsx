import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MatchCircleProps {
  match: {
    id: string;
    name: string;
    compatibility: number;
    avatar?: string;
    status: "pending" | "accepted" | "rejected";
    newMatch?: boolean;
  };
  onClick: () => void;
}

const getCircleColor = (compatibility: number) => {
  if (compatibility >= 80) return "border-[#7D3CFF] shadow-[0_0_0_4px_#e9e1fa]";
  if (compatibility >= 60) return "border-[#00D97E] shadow-[0_0_0_4px_#e1faed]";
  return "border-[#FF5C8E] shadow-[0_0_0_4px_#fae1ed]";
};

const getBadgeColor = (compatibility: number) => {
  if (compatibility >= 80) return "bg-[#7D3CFF]";
  if (compatibility >= 60) return "bg-[#00D97E]";
  return "bg-[#FF5C8E]";
};

const getStatusText = (status: string) => {
  if (status === "pending") return "En Attente";
  if (status === "accepted") return "Accepté";
  return "Rejeté";
};

const MatchCircle = ({ match, onClick }: MatchCircleProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105`}
        onClick={onClick}
      >
        <div
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center bg-white overflow-hidden ${getCircleColor(
            match.compatibility
          )}`}
        >
          <Avatar className="w-full h-full">
            {match.avatar ? (
              <AvatarImage src={match.avatar} className="object-cover" />
            ) : (
              <AvatarFallback className="text-lg">
                {match.name?.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Badge du pourcentage */}
        <Badge
          className={`absolute left-1/2 -bottom-3 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white border-0 ${getBadgeColor(
            match.compatibility
          )} shadow`}
        >
          {match.compatibility}% Match
        </Badge>
      </div>

      {/* Nom + statut sous le cercle */}
      <div className="text-center mt-4">
        <p className="text-sm font-bold text-[#7D3CFF] truncate max-w-[80px]">
          {match.name}
        </p>
        <p
          className={`text-xs font-medium ${
            match.status === "pending"
              ? "text-[#7D3CFF]"
              : match.status === "accepted"
              ? "text-[#00D97E]"
              : "text-[#FF5C8E]"
          }`}
        >
          {getStatusText(match.status)}
        </p>
      </div>
    </div>
  );
};

export default MatchCircle;
