export function getRichTextPlain(value: string): string {
  if (!value) return ""
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim()
}

export function isRichTextEmpty(value: string): boolean {
  return getRichTextPlain(value) === ""
}
