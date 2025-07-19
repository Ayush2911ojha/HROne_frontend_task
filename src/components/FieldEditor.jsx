import React, { useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const defaultField = {
  key: "",
  type: "string",
  children: [],
};

export default function FieldEditor({ control, name, watch, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const fieldValues = watch(name); 


  useEffect(() => {
    fieldValues?.forEach((field, index) => {
      const fieldPath = `${name}[${index}]`;

      if (field?.type === "nested" && (!field.children || field.children.length === 0)) {
        setValue(`${fieldPath}.children`, [defaultField]);
      }
    });
  }, [fieldValues, name, setValue]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const fieldPath = `${name}[${index}]`;
        const fieldType = watch(`${fieldPath}.type`);

        return (
          <div key={field.id} className="border border-gray-300 p-4 rounded-md bg-gray-50">
            <div className="flex items-center gap-4">
              <Controller
                control={control}
                name={`${fieldPath}.key`}
                render={({ field }) => (
                  <Input {...field} placeholder="Field Name" className="w-40" />
                )}
              />

              <Controller
                control={control}
                name={`${fieldPath}.type`}
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
                      <SelectItem value="nested">Nested</SelectItem>
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

            {fieldType === "nested" && (
              <div className="ml-6 border-l-2 pl-4 mt-4">
                <FieldEditor
                  control={control}
                  name={`${fieldPath}.children`}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            )}
          </div>
        );
      })}

      <Button type="button" onClick={() => append(defaultField)}>
        + Add Field
      </Button>
    </div>
  );
}
