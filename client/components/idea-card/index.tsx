import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Idea } from "@/types/idea.type";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDeleteIdeaMutateQuery } from "@/hooks/use-delete-idea-mutate-query";

type IdeaCardProps = {
  idea: Idea;
  className?: string;
};

const IdeaCard = ({ idea, className }: IdeaCardProps) => {
  const { user } = useUser();
  const deleteIdeaMutateQuery = useDeleteIdeaMutateQuery()
  
  const handleDeleteIdea = () => {
    deleteIdeaMutateQuery.mutate(idea.id);
  }
  
  
  return (
    <Card className={cn("w-full mx-auto", className)}>
      <CardHeader>
        <CardTitle className="w-full flex flex-row justify-between items-center gap-4">
          <h5 className="line-clamp-2 truncate"> {idea.title} </h5>
          {idea?.createdBy?.email === user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"} size={"icon"}>
                  <MoreVertical size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-destructive" onClick={handleDeleteIdea}>
                  <Trash2 size={15} className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </CardTitle>
        <CardDescription> {idea.description} </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {idea?.suggestedFor?.length > 0 &&
          idea?.suggestedFor[0]?.channelLogo ? (
            <Image
              src={idea?.suggestedFor[0]?.channelLogo}
              alt="l"
              width={250}
              height={250}
              draggable
              className="w-20 h-20 rounded-full"
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
