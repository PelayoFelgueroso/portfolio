"use client";

import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  postTitle: string;
  isSaving: boolean;
  hasChanges: boolean;
  onSave: () => void;
  onBack: () => void;
}

export function ContentNav({
  postTitle,
  isSaving,
  hasChanges,
  onSave,
  onBack,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text400 text-[#191a1b]">Edit Content</h1>
        <p className="text100 text-[#393939]">
          {postTitle} <span className="text-[#949596]">• MDX Editor</span>
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="border-[#e1e1e1]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Post
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving || !hasChanges}
          className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
