import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarUserProps {
  me: User;
}

export default function SidebarUser({ me }: SidebarUserProps) {
  const { fullName, email } = me;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8">
        <AvatarImage src={undefined} alt={`${fullName} avatar`} />
        <AvatarFallback className="border bg-gray-100 dark:bg-background">
          {fullName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 text-sm">
        <p className="truncate font-semibold">{fullName}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
