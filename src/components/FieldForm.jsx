import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import JSONPreview from "./JSONPreview";
import buildJSON from "../utils/BuildJSON"


export const defaultField = {
  key: "",
  type: "string",
};

export default function FieldForm() {
  const { control, register, watch } = useForm({
    defaultValues: {
      fields: [defaultField],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const fieldValues = watch("fields");

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-3">
          <input
            {...register(`fields.${index}.key`)}
            placeholder="Field name"
            className="border p-2 rounded"
          />

          <select
            {...register(`fields.${index}.type`)}
            className="border p-2 rounded"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
          </select>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append(defaultField)}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        + Add Field
      </button>

      <JSONPreview json={buildJSON(fieldValues || [])} />
    </div>
  );
}
