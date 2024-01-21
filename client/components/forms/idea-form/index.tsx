import React from "react";
import { useForm } from "react-hook-form";
import { IdeaFormSchemaType, ideaFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextFormField } from "@/components/form-fields/text-form-field";
import { TextareaFormField } from "@/components/form-fields/textarea-form-field";
import { Button } from "@/components/ui/button";
import { CategoriesFormField } from "./categories-multi-select-form-field";
import { useIdeaMutateQuery } from "@/hooks/use-idea-mutate-query";
import { Loader2 } from "lucide-react";
import { SuggestedForFormField } from "./suggested-for-form-field";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type IdeaFormPropTypes = {
  formMode: "CREATE";
  handleModalClose: () => void;
};

export const IdeaForm = ({ formMode, handleModalClose }: IdeaFormPropTypes) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ideaMutateQuery = useIdeaMutateQuery();
  const form = useForm<IdeaFormSchemaType>({
    resolver: zodResolver(ideaFormSchema),
  });

  const handleOnSubmit = async (data: IdeaFormSchemaType) => {
    ideaMutateQuery.mutate(data);
    handleModalClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-col w-full justify-start items-end gap-10 overflow-y-auto px-2"
      >
        <TextFormField
          form={form}
          name="title"
          placeholder="type title here..."
          label="Title"
        />
        <TextareaFormField
          form={form}
          name="description"
          placeholder="type description here..."
          label="Description"
          isOptional={true}
          className="resize-none"
        />
        <CategoriesFormField form={form} />
        {/* <SuggestedForFormField form={form} /> */}

        {/* ========== Buttons ========== */}
        <div className="w-full flex justify-end items-center gap-10">
          {isDesktop ? (
            <Button
              type="button"
              variant={"outline"}
              onClick={handleModalClose}
            >
              {" "}
              Cancel
            </Button>
          ) : null}
          <Button
            disabled={ideaMutateQuery.isPending}
            className={cn("", {
              "w-full": !isDesktop,
            })}
          >
            {" "}
            {ideaMutateQuery.isPending ? (
              <Loader2 size={15} className="animate-spin text-secondary mr-2" />
            ) : null}{" "}
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
