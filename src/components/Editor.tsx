import { useEditor, EditorContent, Editor as TipTapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type EditorProps = {
  onChange: (html: string) => void;
  editorRef: React.RefObject<TipTapEditor | null>;
};

export default function Editor({ onChange, editorRef }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello, world!</p>",
    editorProps: {
      attributes: {
        class: "prose max-w-none outline-none min-h-[300px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
    return () => editor?.destroy();
  }, [editor]);

  return (
    <div className="border rounded shadow bg-white">
      <EditorContent editor={editor} />
    </div>
  );
}
