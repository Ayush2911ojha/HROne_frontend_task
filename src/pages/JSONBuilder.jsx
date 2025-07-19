import React from "react";
import { useForm } from "react-hook-form";
import FieldEditor from "../components/FieldEditor";
import JSONPreview from "../components/JSONPreview";
import buildJSON from "../utils/BuildJSON";


export default function JSONBuilder() {
  const { control, watch } = useForm({
    defaultValues: {
      fields: [{ key: "", type: "string" }],
    },
  });

  const fieldValues = watch("fields");
  const previewJSON = buildJSON(fieldValues || []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">JSON Schema Builder</h1>
      <FieldEditor control={control} watch={watch} />
      <JSONPreview json={previewJSON} />
    </div>
  );
}
