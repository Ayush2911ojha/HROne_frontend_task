import React from "react";

export default function JSONPreview({ json }) {
  return (
    <div className="bg-gray-900 text-green-300 p-4 rounded mt-6">
      <h3 className="font-semibold mb-2">Live JSON Preview</h3>
      <pre className="whitespace-pre-wrap">{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}
