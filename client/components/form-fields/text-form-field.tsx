import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface ITextFormFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  description?: string;
  placeholder?: string;
  isOptional?: boolean;
}

export function TextFormField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  isOptional = false,
}: ITextFormFieldProps<TFormValues>) {
  const { control } = form;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label} {!isOptional ? <span className="text-destructive ">*</span> : null} </FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
