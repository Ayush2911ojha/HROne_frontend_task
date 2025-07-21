import React from "react";
import { useForm } from "react-hook-form";
import FieldEditor, { defaultField } from "../components/FieldEditor";
import JSONPreview from "../components/JSONPreview";
import buildJSON from "../utils/BuildJSON";

export default function JSONBuilder() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      fields: [defaultField],
    },
  });

  const fieldValues = watch();
  const previewJSON = buildJSON(fieldValues.fields || []);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center md:text-left">
        JSON Schema Builder
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <FieldEditor
              control={control}
              watch={watch}
              name="fields"
              setValue={setValue}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <JSONPreview json={previewJSON} />
        </div>
      </div>
    </div>
  );
}
