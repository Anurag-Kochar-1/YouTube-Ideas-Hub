"use client"
import React from "react";
import { useIdeaModal } from "@/hooks/use-idea-modal";
import dynamic from "next/dynamic";
const IdeaDrawerDialog = dynamic(
  () => import("../components/idea-drawer-dialog"),
  { ssr: false }
);

export const ModalProvider = () => {
  const ideaModal = useIdeaModal();
  // return <div>{ideaModal.isOpen ? <IdeaDrawerDialog /> : null}</div>;
  return null
};
