"use client";

import { useState } from "react";
import styles from "../../../style.module.scss";
import { Check, Clipboard } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { default as prismStyle } from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

const cleanStyle = Object.entries(prismStyle).reduce((acc, [key, value]) => {
  acc[key] = {
    ...value,
    background: "transparent",
    backgroundColor: "transparent",
  };
  return acc;
}, {} as typeof prismStyle);

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

interface PreCodeElement {
  type: "pre";
  props: {
    children: {
      props: {
        children: string;
      };
    };
  };
}

interface Props {
  children: React.ReactNode;
  heading?: string;
  language?: string;
}

export const CodeBlock = ({
  children,
  heading,
  language = "typescript",
}: Props) => {
  const [copied, setCopied] = useState(false);

  const getCodeString = (): string => {
    if (typeof children === "string") return children;

    if (
      Array.isArray(children) &&
      children[0]?.type === "pre" &&
      children[0]?.props?.children?.props?.children
    ) {
      return children[0].props.children.props.children;
    }

    if (
      typeof children === "object" &&
      (children as PreCodeElement).type === "pre" &&
      (children as PreCodeElement).props?.children?.props?.children
    ) {
      return (children as PreCodeElement).props.children.props.children;
    }

    return String(children);
  };

  const handleCopy = () => {
    const codeString = getCodeString();
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

  return (
    <>
      {heading ? (
        <div className={styles.code_container}>
          <div className={styles.code_container_header}>
            <div>
              <h3>{heading}</h3>
            </div>
            <div>
              <button
                onClick={handleCopy}
                className="transition-shadow duration-300 rounded-[10px] p-2 border-[1px] border-transparent hover:shadow-[0_0_21px_0] shadow-blueCustom hover:border hover:border-blueCustom"
                aria-label="Copy to clipboard"
              >
                {copied ? <Check /> : <Clipboard />}
              </button>
            </div>
          </div>

          <div className={styles.code_children}>
            <SyntaxHighlighter
              language={language}
              style={cleanStyle}
              showLineNumbers={true}
              lineNumberStyle={{
                minWidth: "2em",
                paddingRight: "1em",
                color: "rgb(107, 114, 128)",
                marginRight: "16px",
                textAlign: "right",
              }}
              customStyle={{
                margin: 0,
                padding: "1rem",
                borderRadius: 0,
                background: "transparent",
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <div className={styles.code_no_heading}>
          <div className="absolute top-1 right-1">
            <button
              onClick={handleCopy}
              className="bg-whiteCustom transition-shadow duration-300 rounded-[10px] p-2 border-[1px] border-transparent hover:shadow-[0_0_21px_0] shadow-blueCustom hover:border hover:border-blueCustom"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Clipboard className="w-4 h-4" />
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={cleanStyle}
            customStyle={{
              margin: 0,
              padding: "2rem",
              borderRadius: 0,
              background: "transparent",
            }}
          >
            {getCodeString()}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
};
