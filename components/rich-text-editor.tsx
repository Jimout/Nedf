"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
        "text-gray-600 dark:text-gray-300",
        "hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-white/15 dark:hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001F4B]/40 dark:focus-visible:ring-[#ec1e24]/40",
        "disabled:pointer-events-none disabled:opacity-40",
        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:stroke-current",
        active &&
          "bg-[#001F4B]/10 text-[#001F4B] hover:bg-[#001F4B]/15 hover:text-[#001F4B] dark:bg-[#ec1e24]/20 dark:text-[#ec1e24] dark:hover:bg-[#ec1e24]/30 dark:hover:text-[#ec1e24]",
      )}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
  minHeight = "160px",
}: RichTextEditorProps) {
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const linkSelectionRef = useRef<{ from: number; to: number } | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "rich-text-editor-content focus:outline-none px-3 py-2",
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const normalized = value || "<p></p>"
    if (current !== normalized && value !== current) {
      editor.commands.setContent(normalized, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) return null

  const handleLinkOpenChange = (open: boolean) => {
    if (open) {
      const { from, to } = editor.state.selection
      linkSelectionRef.current = { from, to }
      const previousUrl = editor.getAttributes("link").href as string | undefined
      setLinkUrl(previousUrl ?? "")
    }
    setLinkOpen(open)
  }

  const applyLink = () => {
    const trimmed = linkUrl.trim()
    let chain = editor.chain().focus()

    if (linkSelectionRef.current) {
      chain = chain.setTextSelection(linkSelectionRef.current)
    }

    if (trimmed === "") {
      chain.extendMarkRange("link").unsetLink().run()
    } else {
      const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
      chain.extendMarkRange("link").setLink({ href }).run()
    }

    setLinkOpen(false)
  }

  const removeLink = () => {
    let chain = editor.chain().focus()

    if (linkSelectionRef.current) {
      chain = chain.setTextSelection(linkSelectionRef.current)
    }

    chain.extendMarkRange("link").unsetLink().run()
    setLinkUrl("")
    setLinkOpen(false)
  }

  return (
    <div
      className={cn(
        "rounded-md border border-gray-300 dark:border-white/50 bg-white dark:bg-[#1a1d23] overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-[#15171a] px-2 py-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-white/20" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <Popover open={linkOpen} onOpenChange={handleLinkOpenChange}>
          <PopoverTrigger asChild>
            <button
              type="button"
              title="Link"
              className={cn(
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
                "text-gray-600 dark:text-gray-300",
                "hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-white/15 dark:hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001F4B]/40 dark:focus-visible:ring-[#ec1e24]/40",
                "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:stroke-current",
                editor.isActive("link") &&
                  "bg-[#001F4B]/10 text-[#001F4B] hover:bg-[#001F4B]/15 hover:text-[#001F4B] dark:bg-[#ec1e24]/20 dark:text-[#ec1e24] dark:hover:bg-[#ec1e24]/30 dark:hover:text-[#ec1e24]",
              )}
            >
              <LinkIcon className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            className="w-80 border-gray-200 bg-white p-4 dark:border-white/20 dark:bg-[#1a1d23]"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Insert link</p>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="dark:border-white/30 dark:bg-[#15171a] dark:text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    applyLink()
                  }
                }}
              />
              <div className="flex items-center justify-end gap-2">
                {linkUrl.trim() !== "" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLink}
                    className="border-gray-300 dark:border-white/30 dark:text-white"
                  >
                    Remove
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  onClick={applyLink}
                  className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90 dark:bg-[#ec1e24] dark:hover:bg-[#ec1e24]/90"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-white/20" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-white/20" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="text-sm text-gray-900 dark:text-white" />
    </div>
  )
}
