"use client"

import { ArrowLeft, Code, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
  handleBack: () => void
  navigateToContentEditor: () => void
  isSaving: boolean
  isValid: boolean
  onSave: () => void
}

export function ActionButtons({ handleBack, navigateToContentEditor, isSaving, isValid, onSave }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={handleBack} variant="outline" className="border-[#e1e1e1]">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button onClick={navigateToContentEditor} variant="outline" className="border-[#e1e1e1] bg-white">
        <Code className="mr-2 h-4 w-4" />
        Edit Content
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving || !isValid}
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
  )
}
