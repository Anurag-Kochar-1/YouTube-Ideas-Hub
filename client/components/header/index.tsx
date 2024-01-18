"use client";

import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Skeleton } from "../ui/skeleton";

export function Header() {
  const { user, error, isLoading } = useUser();
  // if (isLoading) return <Skeleton className="w-full h-16" />
  // if (error) return <div>{error.message}</div>;
  return (
    <header className="w-full flex justify-between items-center h-16 sticky top-0 border-b-2 border-b-border backdrop-blur-md px-6">
      <div className="text-2xl"> 💡 </div>
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}

      {/* <Button> Post</Button> */}
      <DrawerDialogDemo />
      <span>{user?.email}</span>
      <ThemeDropdownMenu />
    </header>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
import { IdeaForm } from "../forms/idea-form";
import { ThemeDropdownMenu } from "../theme-dropdown-menu";

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Post</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto  scrollbar-thin">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <IdeaForm formMode="CREATE" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Post</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you are done.
          </DrawerDescription>
        </DrawerHeader>
        <IdeaForm formMode="CREATE" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
