import { convertHtmlToMarkdown } from "../utils/markdownUtils";

type MarkdownPanelProps = {
  html: string;
};

export default function MarkdownPanel({ html }: MarkdownPanelProps) {
  const markdown = convertHtmlToMarkdown(html);

  return (
    <pre className="whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded h-full overflow-auto">
      {markdown}
    </pre>
  );
}
