import React, { useEffect, useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const defaultField = {
  key: "",
  type: "string",
  children: [],
};

const keyPattern = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;

export default function FieldEditor({ control, name, watch, setValue }) {
  const { fields, append, remove } = useFieldArray({ control, name });
  const fieldValues = watch(name);
  const [error, setError] = useState("");

  useEffect(() => {
    fieldValues?.forEach((field, index) => {
      const fieldPath = `${name}[${index}]`;
      if (
        field?.type === "nested" &&
        (!field.children || field.children.length === 0)
      ) {
        setValue(`${fieldPath}.children`, [defaultField]);
      }
    });
  }, [fieldValues, name, setValue]);

  const isLastFieldInvalid = () => {
    const last = fieldValues?.[fieldValues.length - 1];
    return !last?.key || last.key.trim() === "" || !keyPattern.test(last.key);
  };

  const handleAddField = () => {
    setError("");
    append(defaultField);

    
    setTimeout(() => {
      const keys = fieldValues?.map((f) => f.key.trim()).filter(Boolean);
      const hasDuplicate = new Set(keys).size !== keys.length;
      if (hasDuplicate) {
        remove(fieldValues.length - 1);
        alert("Duplicate keys are not allowed. Please use a unique name.");
      }
    }, 0);
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const fieldPath = `${name}[${index}]`;
        const fieldType = watch(`${fieldPath}.type`);
        const keyValue = watch(`${fieldPath}.key`);
        const keyInvalid = keyValue && !keyPattern.test(keyValue);

        return (
          <div
            key={field.id}
            className="border border-gray-300 p-4 rounded-md bg-gray-50"
          >
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
                    onValueChange={(val) => {
                      selectField.onChange(val);
                      if (val === "nested") {
                        setValue(`${fieldPath}.children`, [defaultField], {
                          shouldDirty: true,
                        });
                      } else {
                        setValue(`${fieldPath}.children`, []);
                      }
                    }}
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
                onClick={() => {
                  remove(index);
                  if (fields.length === 1) {
                    append(defaultField);
                  }
                }}
              >
                Delete
              </Button>
            </div>

            {keyInvalid && (
              <p className="text-sm text-red-500 mt-1">
                Key must start with a letter or underscore and contain only
                letters, numbers, underscores, or hyphens.
              </p>
            )}

          
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

      
      <Button
        type="button"
        onClick={handleAddField}
        disabled={isLastFieldInvalid()}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        + Add Field
      </Button>

     
      {isLastFieldInvalid() && (
        <p className="text-sm text-red-500 mt-2">
          You must enter a valid field name before adding a new field.
        </p>
      )}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
