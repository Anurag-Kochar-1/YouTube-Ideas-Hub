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

 const IdeaDrawerDialog = () => {
  const ideaModal = useIdeaModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={ideaModal.isOpen} onOpenChange={ideaModal.onClose}>
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
    <Drawer open={ideaModal.isOpen} onOpenChange={ideaModal.onClose}>
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
};

export default IdeaDrawerDialog