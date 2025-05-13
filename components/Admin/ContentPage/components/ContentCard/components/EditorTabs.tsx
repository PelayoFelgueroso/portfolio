"use client";

import { Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorTabsProps {
  activeTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
}

export function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as "edit" | "preview")}
    >
      <TabsList>
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span>Edit</span>
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>Preview</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
