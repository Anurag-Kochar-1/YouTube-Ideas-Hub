import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";
import { Laptop, LogOut, Moon, Sun } from "lucide-react";

export const UserDropdownMenu = () => {
  const { user } = useUser();
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar>
          <AvatarImage src={user?.picture as string} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Laptop className="mr-2 h-4 w-4" /><span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <a href="/api/auth/logout">Logout</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
