"use client";
import { ThemeDropdownMenu } from "../theme-dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useIdeaModal } from "@/hooks/use-idea-modal";
import Link from "next/link";
import LogoWithText from "../branding/logo-with-text";
import { UserDropdownMenu } from "../user-dropdown-menu";
import IdeaDrawerDialog from "../idea-drawer-dialog";
import { Logo } from "../branding/logo";

export function Header() {
  const { user, error, isLoading } = useUser();
  const ideaModal = useIdeaModal();
  return (
    <header className="w-full z-50 flex justify-between items-center h-16 sticky top-0 border-b-2 border-b-border backdrop-blur-md px-6">
      <LogoWithText className="hidden md:flex" />
      <Logo className="md:hidden" />

      <div className="text-white ">
      {process.env.NEXT_PUBLIC_NODE_ENV === "dev" && "dev"}
        {process.env.NEXT_PUBLIC_NODE_ENV === "prod" && "prod"}
        {process.env.NEXT_PUBLIC_NODE_ENV === "test" && "test"}
      </div>

      <div className="justify-end flex items-center gap-6">
        {/* <Button onClick={ideaModal.onOpen}> Post</Button> */}
        <IdeaDrawerDialog />
        {user ? (
          <Link href={`/my-ideas`} className="hidden md:flex">
            <Button variant={"ghost"}> My Ideas </Button>
          </Link>
        ) : null}
        {user ? (
          <UserDropdownMenu />
        ) : (
          <a href="/api/auth/login">
            <Button variant={"secondary"}> Login</Button>
          </a>
        )}
      </div>
    </header>
  );
}
