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
import { Button } from "./ui/button";
import { IdeaForm } from "./forms/idea-form";
import { useIdeaModal } from "@/hooks/use-idea-modal";
import { useState } from "react";

 const IdeaDrawerDialog = () => {
  const [open, setOpen] = useState<boolean>(false)
  const ideaModal = useIdeaModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const handleModalClose = () => {
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Post</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin">
          <DialogHeader>

            <DialogTitle>Post an idea</DialogTitle>
            <DialogDescription>
            let your intrusive thoughts win 💪
            </DialogDescription>
          </DialogHeader>
          <IdeaForm formMode="CREATE" handleModalClose={handleModalClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Post</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] px-5 py-5">
        <DrawerHeader className="text-left">
          <DrawerTitle>Post an idea</DrawerTitle>
          <DrawerDescription>
          let your intrusive thoughts win 💪
          </DrawerDescription>
        </DrawerHeader>
        <IdeaForm formMode="CREATE" handleModalClose={handleModalClose} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default IdeaDrawerDialog