"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Loader2 } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import { CodeBlock } from "./components/CodeBlock/CodeBlock";
import { LanguageJsx } from "./components/LanguageJsx/LanguageJsx";
import styles from "../style.module.scss";

interface MDXEditorPreviewProps {
  content: string;
}

const components = {
  CodeBlock,
  Image,
  LanguageJsx,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props: any) => <div {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => {
    const { className, children, ...rest } = props;

    return (
      <CodeBlock language="typescript" className={className} {...rest}>
        {children}
      </CodeBlock>
    );
  },
};

export function MDXContentRenderer({ content }: MDXEditorPreviewProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [serializedContent, setSerializedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const compileMdx = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypePrism, { showLineNumbers: true }],
            ],
          },
        });

        setSerializedContent(mdxSource);
      } catch (err) {
        console.error("Error compiling MDX:", err);
        setError("Failed to compile MDX content. Check for syntax errors.");
      } finally {
        setIsLoading(false);
      }
    };

    compileMdx();
  }, [content]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <p className="font-medium">Error previewing content:</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!serializedContent) {
    return <div className="p-4 text-[#949596]">No content to preview</div>;
  }

  return (
    <div className={styles.content}>
      <MDXRemote {...serializedContent} components={components} />
    </div>
  );
}
