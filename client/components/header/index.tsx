"use client";
import { ThemeDropdownMenu } from "../theme-dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useIdeaModal } from "@/hooks/use-idea-modal";
import Link from "next/link";
import LogoWithText from "../branding/logo-with-text";
import { UserDropdownMenu } from "../user-dropdown-menu";

export function Header() {
  const { user, error, isLoading } = useUser();
  const ideaModal = useIdeaModal();
  return (
    <header className="w-full z-50 flex justify-between items-center h-16 sticky top-0 border-b-2 border-b-border backdrop-blur-md px-6">
      <LogoWithText />

      <div className="w-full justify-end flex items-center gap-6">
        <Button onClick={ideaModal.onOpen}> Post</Button>
        {user ? (
          <Link href={`/my-ideas`}>
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
