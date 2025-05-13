import { usePostContent } from "@/hooks/use-post-content";
import { Loader2 } from "lucide-react";
import { ContentNav } from "./components/ContentNav";
import { StatusAlert } from "../common/StatusAlert";
import { ContentCard } from "./components/ContentCard/ContentCard";

interface Props {
  slug: string;
  id: string;
}

export const ContentPage = ({ slug, id }: Props) => {
  const {
    postTitle,
    content,
    activeTab,
    isLoading,
    isSaving,
    error,
    successMessage,
    hasChanges,
    setActiveTab,
    handleContentChange,
    handleSave,
    handleBack,
  } = usePostContent(slug, id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
      </div>
    );
  }
  return (
    <div className="pb300">
      <div className="flex flex-col gap-6">
        <ContentNav
          postTitle={postTitle}
          isSaving={isSaving}
          hasChanges={hasChanges}
          onSave={handleSave}
          onBack={handleBack}
        />

        <StatusAlert error={error} successMessage={successMessage} />

        <ContentCard
          content={content}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
};
