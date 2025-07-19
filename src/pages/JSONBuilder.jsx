import React from "react";
import FieldForm from "../components/FieldForm";

export default function JSONBuilder() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>
      <FieldForm />
    </div>
  );
}
