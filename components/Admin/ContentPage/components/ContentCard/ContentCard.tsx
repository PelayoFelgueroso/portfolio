"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MDXEditor } from "./components/MDXEditor";
import { EditorTabs } from "./components/EditorTabs";

interface Props {
  content: string;
  activeTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
  onContentChange: (content: string) => void;
}

export function ContentCard({
  content,
  activeTab,
  onTabChange,
  onContentChange,
}: Props) {
  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text300">MDX Content</CardTitle>
            <CardDescription className="text100 text-[#949596]">
              Edit your post content using Markdown with JSX
            </CardDescription>
          </div>
          <EditorTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </CardHeader>
      <CardContent>
        <MDXEditor
          content={content}
          activeTab={activeTab}
          onChange={onContentChange}
        />
      </CardContent>
    </Card>
  );
}
