import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Idea } from "@/types/idea.type";
import { cn } from "@/lib/utils";

type IdeaCardProps = {
  idea: Idea
  className?: string
}

const IdeaCard = ({ idea, className }: IdeaCardProps) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle> {idea.title} </CardTitle>
        <CardDescription> {idea.description} </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default IdeaCard;
