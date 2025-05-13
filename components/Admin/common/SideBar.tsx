"use client";

import type React from "react";

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  LayoutDashboard,
  Loader2,
  Menu,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";

// Interfaces para los tipos de datos
interface Post {
  id: string;
  title: string;
  slug: string;
}

interface PostTypeWithPosts {
  id: string;
  slug: string;
  name: string;
  isExpanded?: boolean;
  isLoading?: boolean;
  posts?: Post[];
}

export function DashBoardSidebar({ children }: { children: React.ReactNode }) {
  const [postTypes, setPostTypes] = useState<PostTypeWithPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostTypes = async () => {
      try {
        const res = await fetch("/api/admin/post-types");
        if (res.ok) {
          const data = await res.json();
          // Inicializar con estados adicionales
          const typesWithState = data.map((type: PostTypeWithPosts) => ({
            ...type,
            isExpanded: false,
            isLoading: false,
            posts: [],
          }));
          setPostTypes(typesWithState);
        }
      } catch (error) {
        console.error("Failed to fetch post types for navigation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostTypes();
  }, []);

  // Función para alternar la expansión de un post type y cargar sus posts
  const togglePostType = async (postTypeId: string) => {
    // Actualizar el estado de expansión
    setPostTypes((currentPostTypes) =>
      currentPostTypes.map((pt) => {
        if (pt.id === postTypeId) {
          // Si se está expandiendo y no hay posts cargados, establecer estado de carga
          const newExpandedState = !pt.isExpanded;
          if (newExpandedState && (!pt.posts || pt.posts.length === 0)) {
            return { ...pt, isExpanded: newExpandedState, isLoading: true };
          }
          return { ...pt, isExpanded: newExpandedState };
        }
        return pt;
      })
    );

    // Encontrar el post type
    const postType = postTypes.find((pt) => pt.id === postTypeId);

    // Si se está expandiendo y no hay posts cargados, cargar los posts
    if (
      postType &&
      !postType.isExpanded &&
      (!postType.posts || postType.posts.length === 0)
    ) {
      try {
        const res = await fetch(`/api/admin/${postType.slug}/posts`);
        if (res.ok) {
          const posts = await res.json();

          // Actualizar el post type con los posts cargados
          setPostTypes((currentPostTypes) =>
            currentPostTypes.map((pt) => {
              if (pt.id === postTypeId) {
                return { ...pt, posts, isLoading: false };
              }
              return pt;
            })
          );
        } else {
          // Manejar error, establecer carga a falso
          setPostTypes((currentPostTypes) =>
            currentPostTypes.map((pt) => {
              if (pt.id === postTypeId) {
                return { ...pt, isLoading: false };
              }
              return pt;
            })
          );
        }
      } catch (error) {
        console.error(`Failed to fetch posts for ${postType.name}:`, error);
        // Manejar error, establecer carga a falso
        setPostTypes((currentPostTypes) =>
          currentPostTypes.map((pt) => {
            if (pt.id === postTypeId) {
              return { ...pt, isLoading: false };
            }
            return pt;
          })
        );
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#f4f4f4]">
        <Sidebar className="border-r border-[#e1e1e1]">
          <SidebarHeader className="border-b border-[#e1e1e1] py-4">
            <div className="flex items-center px-4">
              <LayoutDashboard className="mr-2 h-6 w-6 text-[#1f77ff]" />
              <h1 className="text300 text-[#1c1d21]">Dashboard</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[#393939]">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin" className="flex items-center">
                        <Home className="mr-2 h-5 w-5" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {!isLoading && postTypes.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-[#393939]">
                  Content Types
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {postTypes.map((postType) => (
                      <SidebarMenuItem key={postType.id}>
                        <div className="w-full">
                          {/* Main container with flex layout - hover effect applied here */}
                          <div className="flex items-center w-full rounded-md hover:bg-sidebar-accent group">
                            {/* Link part (takes most of the space) - removed individual hover effect */}
                            <Link
                              href={`/admin/${postType.slug}`}
                              className="flex-1 py-2 px-2 flex items-center rounded-l-md"
                            >
                              <FileText className="mr-2 h-5 w-5" />
                              <span>{postType.name}</span>
                            </Link>

                            {/* Toggle button (only for expanding/collapsing) - removed individual hover effect */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                togglePostType(postType.id);
                              }}
                            >
                              {postType.isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : postType.isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          {/* List of posts (visible only when expanded) */}
                          {postType.isExpanded && (
                            <div className="pl-7 mt-1 space-y-1">
                              {postType.isLoading ? (
                                <div className="flex items-center py-1 text-sm text-[#949596]">
                                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                                  Cargando posts...
                                </div>
                              ) : postType.posts &&
                                postType.posts.length > 0 ? (
                                <>
                                  {postType.posts.map((post) => (
                                    <a
                                      key={post.id}
                                      href={`/admin/${postType.slug}/${post.id}`}
                                      className="block py-1 px-2 text-sm hover:bg-[#f0f0f0] rounded truncate"
                                    >
                                      {post.title}
                                    </a>
                                  ))}
                                </>
                              ) : (
                                <div className="py-1 px-2 text-sm text-[#949596]">
                                  There are no posts
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter className="border-t border-[#e1e1e1] p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => signOut({ callbackUrl: "/log-in-admin" })}
                    className="flex items-center"
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="flex h-16 items-center border-b border-[#e1e1e1] bg-white px-4">
            <SidebarTrigger className="mr-4 md:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <div className="text200">Content Management System</div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
