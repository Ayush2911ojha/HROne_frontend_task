import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const defaultField = {
  key: "",
  type: "string",
};

export default function FieldEditor({ control}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4">
          {/* Key input */}
          <Controller
            control={control}
            name={`fields.${index}.key`}
            render={({ field }) => (
              <Input {...field} placeholder="Field name" className="w-40" />
            )}
          />

          {/* Type Dropdown with shadcn UI Select */}
          <Controller
            control={control}
            name={`fields.${index}.type`}
            render={({ field: selectField }) => (
              <Select
                value={selectField.value}
                onValueChange={selectField.onChange}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            Delete
          </Button>
        </div>
      ))}

      {/* Add Field Button */}
      <Button
        type="button"
        onClick={() => append(defaultField)}
        className="bg-blue-600 text-white"
      >
        + Add Field
      </Button>
    </div>
  );
}
