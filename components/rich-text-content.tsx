import DOMPurify from "isomorphic-dompurify"
import { cn } from "@/lib/utils"

interface RichTextContentProps {
  content: string
  className?: string
  style?: React.CSSProperties
}

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content)
}

export function RichTextContent({ content, className, style }: RichTextContentProps) {
  if (!content) return null

  if (!isHtmlContent(content)) {
    return (
      <p className={cn("rich-text-content", className)} style={style}>
        {content}
      </p>
    )
  }

  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "span"],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  })

  return (
    <div
      className={cn("rich-text-content", className)}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
