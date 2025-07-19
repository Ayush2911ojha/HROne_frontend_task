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
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">JSON Schema Builder</h1>
    <div className="grid grid-cols-2 gap-6">     
      <div>
        <FieldEditor
          control={control}
          watch={watch}
          name="fields"
          setValue={setValue}
        />
      </div>

      <JSONPreview json={previewJSON} />
    </div>
  </div>
);

}
