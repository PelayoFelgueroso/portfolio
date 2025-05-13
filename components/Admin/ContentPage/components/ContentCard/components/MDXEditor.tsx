"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { MDXContentRenderer } from "@/components/ResourcesArticlePage/components/ResourceArticle/components/ResourceContent/components/ContentRenderer";

interface Props {
  content: string;
  activeTab: "edit" | "preview";
  onChange: (value: string) => void;
}

export function MDXEditor({ content, activeTab, onChange }: Props) {
  return (
    <div className="border border-[#e1e1e1] rounded-md overflow-hidden">
      {activeTab === "edit" ? (
        <div className="min-h-[500px]">
          <CodeMirror
            value={content}
            height="500px"
            extensions={[markdown(), EditorView.lineWrapping]}
            onChange={onChange}
            theme={vscodeDark}
            className="text-sm"
          />
        </div>
      ) : (
        <div className="min-h-[500px] p-6 bg-white overflow-auto">
          <MDXContentRenderer content={content} />
        </div>
      )}
    </div>
  );
}
