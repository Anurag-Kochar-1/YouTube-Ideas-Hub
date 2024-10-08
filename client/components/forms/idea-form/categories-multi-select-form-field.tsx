"use client";

import { FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import React, { useState } from "react";

interface CustomReactSelectStyles {
  controlStyles: {
    base: string;
    focus: string;
    nonFocus: string;
  };
  placeholderStyles: string;
  selectInputStyles: string;
  valueContainerStyles: string;
  singleValueStyles: string;
  multiValueStyles: string;
  multiValueLabelStyles: string;
  multiValueRemoveStyles: string;
  indicatorsContainerStyles: string;
  clearIndicatorStyles: string;
  indicatorSeparatorStyles: string;
  dropdownIndicatorStyles: string;
  menuStyles: string;
  optionsStyle: string;
  groupHeadingStyles: string;
  noOptionsMessageStyles: string;
}

export const customReactSelectStyles: CustomReactSelectStyles = {
  controlStyles: {
    base: "border rounded-lg bg-background hover:cursor-pointer hover:bg-secondary py-4 px-2 h-auto ",
    focus: " ring-ring ring-primary-500",
    nonFocus: "",
  },
  placeholderStyles: "text-muted-foreground text-sm ml-1",
  selectInputStyles: "text-foreground text-sm ml-1 ",
  valueContainerStyles: "text-foreground text-sm w-full",
  singleValueStyles: "ml-1",
  multiValueStyles:
    "m-1 bg-background border  rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
  multiValueLabelStyles: "leading-6 py-0.5",
  multiValueRemoveStyles:
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background",
  indicatorsContainerStyles: "p-1 gap-1 bg-background rounded-lg",
  clearIndicatorStyles: "text-gray-500 p-1 rounded-md hover:text-red-800",
  indicatorSeparatorStyles: "bg-mutated",
  dropdownIndicatorStyles: "p-1 hover:text-foreground text-gray-500",
  menuStyles: "mt-2 p-2 border bg-background text-sm rounded-lg",
  optionsStyle:
    "bg-background p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer",
  groupHeadingStyles: "ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background",
  noOptionsMessageStyles: "text-muted-foreground bg-background",
};

import clsx from "clsx";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { UseFormReturn } from "react-hook-form";
import { IdeaFormSchemaType } from "./schema";
import { ourAxios } from "@/lib/axios";
import { useIdeaCategoriesQuery } from "@/hooks/use-idea-categories-query";
import { Skeleton } from "@/components/ui/skeleton";

interface IKeySkillsFormFieldProps {
  form: UseFormReturn<IdeaFormSchemaType>;
}

export function CategoriesFormField({ form }: IKeySkillsFormFieldProps) {
  const animatedComponents = makeAnimated();
  const { data, isLoading } = useIdeaCategoriesQuery();


  async function loadOptions(searchValue: string, callback: any) {
    const uniqueData = data?.filter(
      (option: any) =>
        !selectedOptions.some(
          (selectedOption: any) => selectedOption.id === option.id
        )
    );
    if (uniqueData) {
      const filtedResults = uniqueData?.filter((option: any) =>
        option?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      callback(filtedResults);
    }
  }
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  if(isLoading) return <Skeleton className="h-20" />

  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Categories</FormLabel>
          <AsyncSelect
            unstyled
            getOptionLabel={(e: any) => e?.name}
            getOptionValue={(e: any) => e?.id}
            isClearable
            isSearchable
            isMulti={true}
            value={selectedOptions}
            placeholder={"Seach categories..."}
            components={animatedComponents}
            loadOptions={loadOptions as any}
            onChange={(options) => {
              const validOptions = options.filter(
                (option: any) => option.id && option.name
              );
              setSelectedOptions(validOptions);
              const ids = validOptions.map((option: any) => option.id);
              if (ids.length > 0) {
                field.onChange(ids);
              }
            }}
            classNames={{
              control: ({ isFocused }) =>
                clsx(
                  isFocused
                    ? customReactSelectStyles.controlStyles.focus
                    : customReactSelectStyles.controlStyles.nonFocus,
                  customReactSelectStyles.controlStyles.base
                ),
              placeholder: () => customReactSelectStyles.placeholderStyles,
              input: () => customReactSelectStyles.selectInputStyles,
              option: () => customReactSelectStyles.optionsStyle,
              menu: () => customReactSelectStyles.menuStyles,
              valueContainer: () =>
                customReactSelectStyles.valueContainerStyles,
              singleValue: () => customReactSelectStyles.singleValueStyles,
              multiValue: () => customReactSelectStyles.multiValueStyles,
              multiValueLabel: () =>
                customReactSelectStyles.multiValueLabelStyles,
              multiValueRemove: () =>
                customReactSelectStyles.multiValueRemoveStyles,
              indicatorsContainer: () =>
                customReactSelectStyles.indicatorsContainerStyles,
              clearIndicator: () =>
                customReactSelectStyles.clearIndicatorStyles,
              indicatorSeparator: () =>
                customReactSelectStyles.indicatorSeparatorStyles,
              dropdownIndicator: () =>
                customReactSelectStyles.dropdownIndicatorStyles,
              groupHeading: () => customReactSelectStyles.groupHeadingStyles,
              noOptionsMessage: () =>
                customReactSelectStyles.noOptionsMessageStyles,
            }}
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            closeMenuOnSelect={true}
            cacheOptions={true}
            loadingMessage={() => "🔎 Searching"}
            noOptionsMessage={() => "😐 Not found"}
            maxMenuHeight={300}
            defaultOptions
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
