"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Resource } from "@/models/resource";

interface DropdownLinksProps {
  resources: Resource[];
  buttonText?: string;
}

export function DropdownLinks({ resources, buttonText }: DropdownLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {buttonText}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {resources.map((item) => (
          <DropdownMenuItem key={item.slug} asChild>
            <Link
              href={`/resources/demos/${item.slug}`}
              className="w-full cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {item.title.rendered}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
