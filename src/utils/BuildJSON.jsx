export default function buildJSON(fields = []) {
  const result = {};

  fields.forEach((item) => {
    const key = item.key || "unnamed_item";

    if (item.type === "string") {
      result[key] = "string";
    }
    else if (item.type === "number") {
      result[key] = "number";
    }
    else if (item.type === "nested") {
      result[key] = buildJSON(item.children || []);
    }
  });

  return result;
}
