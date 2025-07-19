export default function buildJSON(fields) {
  const result = {};
  fields.forEach((item) => {
    if (!item.key) return;
      if (item.type === "string")
      {
          result[item.key] = "string";
      }
      if (item.type === "number") {
          result[item.key] = "number";
      }
  });
  return result;
}