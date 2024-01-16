import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface ITextareaFormFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  isOptional?: boolean;
}

export function TextareaFormField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  className,
  isOptional = false,
}: ITextareaFormFieldProps<TFormValues>) {
  const { control } = form;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {label}{" "}
            {!isOptional ? (
              <span className="text-destructive">*</span>
            ) : null}{" "}
          </FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormControl>
            <Textarea
              className={cn("min-h-[10rem]", className)}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
