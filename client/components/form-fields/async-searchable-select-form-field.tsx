import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";

interface IAynscSearchableSelectFormFieldProps<
  TFormValues extends FieldValues,
> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  description?: string;
  placeholder?: string;
  options?: any[];
  itemLabelKey: string;
  valueKey: string;
  itemIdKey: string | number;
  handleOnSelect: (id: string) => void;
  popoverModal?: boolean;
}

export function AynscSearchableSelectFormField<
  TFormValues extends FieldValues,
>({
  form,
  name,
  label,
  description,
  placeholder,
  options,
  itemLabelKey,
  valueKey,
  itemIdKey,
  handleOnSelect,
  popoverModal = true,
}: IAynscSearchableSelectFormFieldProps<TFormValues>) {
  const { control } = form;
  const getButtonText = (field: any) => {
    const selectedItem = options?.find(
      (item: any) => item[itemIdKey] === field.value,
    );
    return selectedItem ? selectedItem[itemLabelKey] : null;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>{label}</FormLabel>
          {description ? (
            <FormDescription> {description}</FormDescription>
          ) : null}
          <Popover modal={popoverModal}>
            <PopoverTrigger asChild className="w-full">
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "line-clamp-1 flex w-full justify-between truncate font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? getButtonText(field) : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="popover-content-width-same-as-its-trigger p-0"
              sideOffset={5}
            >
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60 w-full">
                    {options?.map((item: any) => (
                      <CommandItem
                        key={item[itemIdKey]}
                        value={item[itemLabelKey]}
                        onSelect={() => handleOnSelect(item[valueKey])}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item._id === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {item[itemLabelKey]}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
