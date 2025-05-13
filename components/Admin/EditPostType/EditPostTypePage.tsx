import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, Tag } from "lucide-react";
import { useState } from "react";
import { CategoriesTab } from "./components/CategoriesTab/CategoriesTab";
import { MetaFieldsTab } from "./components/MetaFieldsTab/MetaFieldsTab";
import { PostsTab } from "./components/PostTab/PostTab";

interface Props {
  slug: string;
  postTypeTitle: string;
}

export const EditPostTypePage = ({ slug, postTypeTitle }: Props) => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="pb300">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text400 text-[#191a1b] capitalize">{postTypeTitle}</h1>
          <p className="text100 text-[#393939]">
            Manage content, categories, and fields for this post type
          </p>
        </div>

        <Tabs
          defaultValue="posts"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="meta" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Meta Fields</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PostsTab postTypeSlug={slug} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab postTypeSlug={slug} />
          </TabsContent>

          <TabsContent value="meta">
            <MetaFieldsTab postTypeSlug={slug} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
