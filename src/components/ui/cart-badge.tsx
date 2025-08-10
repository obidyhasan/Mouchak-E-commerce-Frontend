import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Handbag } from "lucide-react";

export default function CartBadge() {
  return (
    <div className="relative">
      <Avatar>
        <AvatarFallback>
          <Handbag size={20} className="opacity-60" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <Badge className="border-background absolute rounded-full -top-1.5 left-full min-w-5 -translate-x-3.5 px-1">
        6
      </Badge>
    </div>
  );
}
