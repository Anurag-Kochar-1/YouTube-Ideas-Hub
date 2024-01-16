import React from "react";
import { useForm } from "react-hook-form";
import { IdeaFormSchemaType, ideaFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextFormField } from "@/components/form-fields/text-form-field";
import { TextareaFormField } from "@/components/form-fields/textarea-form-field";
import { Button } from "@/components/ui/button";
import { CategoriesFormField } from "./categories-multi-select-form-field";
import axios from "axios";

type IdeaFormPropTypes = {
  formMode: "CREATE";
};

export const IdeaForm = ({ formMode }: IdeaFormPropTypes) => {
  const form = useForm<IdeaFormSchemaType>({
    resolver: zodResolver(ideaFormSchema),
  });

  const handleOnSubmit = async (data: IdeaFormSchemaType) => {
    try {
      const response = await axios.post(`/api/idea`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

        {/* ========== Buttons ========== */}
        <div className="w-full flex justify-end items-center gap-10">
          <Button
            type="button"
            onClick={() => {
              console.log(form.getValues());
            }}
          >
            {" "}
            LOG
          </Button>
          <Button> Post</Button>
        </div>
      </form>
    </Form>
  );
};
