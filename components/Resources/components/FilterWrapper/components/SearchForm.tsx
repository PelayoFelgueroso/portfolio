"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  query: z.string(),
});

type SearchSchema = z.infer<typeof searchSchema>;

interface Props {
  onSearchChange: (query: string) => void;
}

export const SearchForm = ({ onSearchChange }: Props) => {
  const { register } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  return (
    <form className="mb-0 flex" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="Search..."
        className="block w-full mb-0 pl-0 pr-3 py-2 h-[90px] text-[3rem] md:text-[4rem] font-medium border-0 outline-0"
        {...register("query", {
          onChange: (e) => {
            const value = e.target.value;
            onSearchChange(value);
          },
        })}
      />
    </form>
  );
};
