import { useState, useRef } from "react";
import Editor from "./components/Editor";
import { convertHtmlToMarkdown } from "./utils/markdownUtils";
import { marked } from "marked";
import { Editor as TipTapEditor } from "@tiptap/react";

export default function App() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const editorRef = useRef<TipTapEditor | null>(null);
  const isSyncingRef = useRef(false);

  const handleEditorChange = (newHtml: string) => {
    if (isSyncingRef.current) return;

    const md = convertHtmlToMarkdown(newHtml);
    setHtml(newHtml);
    setMarkdown(md);
  };

  const handleMarkdownChange = (md: string) => {
    setMarkdown(md);
    const newHtml = marked(md);

    isSyncingRef.current = true;
    setHtml(newHtml);
    editorRef.current?.commands.setContent(newHtml);
    setTimeout(() => (isSyncingRef.current = false), 50);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 text-gray-800 p-4 box-border">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
  {/* Rich Text Editor */}
  <div className="border rounded-lg bg-white shadow flex flex-col h-full">
    <h2 className="text-xl font-bold p-4 border-b">Rich Text</h2>
    <div className="flex-1 overflow-auto p-4">
      <Editor onChange={handleEditorChange} editorRef={editorRef} />
    </div>
  </div>

  {/* Markdown Editor */}
  <div className="border rounded-lg bg-white shadow flex flex-col h-full">
    <h2 className="text-xl font-bold p-4 border-b">Markdown</h2>
    <div className="flex-1 overflow-auto p-4">
      <textarea
        className="w-full h-full border rounded font-mono text-sm resize-none text-gray-800 bg-white"
        value={markdown}
        onChange={(e) => handleMarkdownChange(e.target.value)}
      />
    </div>
  </div>
</div>

    </div>
  );
}
