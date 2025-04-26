"use client";

import type { ComponentProps } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CodeBlock } from "@/components/ResourcesArticlePage/components/ResourceArticle/components/ResourceContent/components/components/CodeBlock/CodeBlock";
import Image from "next/image";
import styles from "../style.module.scss";
import { LanguageJsx } from "./components/LanguageJsx/LanguageJsx";

const components = {
  LanguageJsx,
  CodeBlock: (props: ComponentProps<typeof CodeBlock>) => {
    return <CodeBlock {...props} />;
  },
  Image,
};

interface Props {
  source: MDXRemoteSerializeResult;
}

export function MDXContentRenderer({ source }: Props) {
  return (
    <div className={styles.content}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
