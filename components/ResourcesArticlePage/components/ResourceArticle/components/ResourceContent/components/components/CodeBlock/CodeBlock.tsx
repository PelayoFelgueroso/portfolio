"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Check, Clipboard } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { EditorView } from "@codemirror/view";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languageMap: Record<string, any> = {
  typescript: javascript({ typescript: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  javascript: javascript(),
  js: javascript(),
  jsx: javascript({ jsx: true }),
  css: css(),
  scss: css(),
  html: html(),
  json: json(),
  markdown: markdown(),
  md: markdown(),

  default: markdown(),
};

interface CodeBlockProps {
  children: React.ReactNode;
  heading?: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  children,
  heading,
  language = "typescript",
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [codeString, setCodeString] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractTextFromReactNode = (node: any): string => {
    if (typeof node === "string") return node;

    if (Array.isArray(node)) {
      return node.map(extractTextFromReactNode).join("");
    }

    if (node && typeof node === "object") {
      if (className && /language-(\w+)/.test(className)) {
        if (typeof node === "string") return node;
      }

      if (node.props && node.props.children) {
        return extractTextFromReactNode(node.props.children);
      }

      if (node.code) return node.code;
      if (node.value) return node.value;
      if (node.content) return node.content;
    }

    if (node !== undefined && node !== null) {
      try {
        const str = node.toString();
        if (str !== "[object Object]") return str;
      } catch (e) {
        console.error("Error converting to string:", e);
      }
    }

    return "";
  };

  useEffect(() => {
    try {
      if (typeof children === "string") {
        setCodeString(children);
        return;
      }

      const extractedCode = extractTextFromReactNode(children);

      setCodeString(extractedCode);
    } catch (error) {
      console.error("Error extracting code:", error);
      setCodeString("");
    }
  }, [children, className]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  };

  const getLanguageExtension = () => {
    if (className) {
      const match = /language-(\w+)/.exec(className);
      if (match && match[1]) {
        return languageMap[match[1].toLowerCase()] || languageMap.default;
      }
    }
    return languageMap[language.toLowerCase()] || languageMap.default;
  };

  if (!codeString.trim()) {
    return (
      <div className="relative rounded-md overflow-hidden border border-[#e1e1e1] bg-[#1e1e1e] text-white p-4">
        <p className="text-gray-400 italic">No code content available</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-md overflow-hidden border border-[#e1e1e1] bg-[#1e1e1e] text-white">
      {heading && (
        <div className="flex justify-between items-center px-4 py-2 bg-[#252525] border-b border-[#333]">
          <h3 className="text-sm font-medium text-[#e1e1e1]">{heading}</h3>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-[#333] transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Clipboard className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      <div className="relative">
        {!heading && (
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded bg-[#252525] hover:bg-[#333] transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Clipboard className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        <CodeMirror
          value={codeString}
          theme={vscodeDark}
          extensions={[
            getLanguageExtension(),
            EditorView.lineWrapping,
            EditorView.editable.of(false),
          ]}
          basicSetup={{
            lineNumbers: showLineNumbers,
            highlightActiveLineGutter: false,
            highlightActiveLine: false,
            foldGutter: false,
          }}
          editable={false}
          className="text-sm"
        />
      </div>
    </div>
  );
}
