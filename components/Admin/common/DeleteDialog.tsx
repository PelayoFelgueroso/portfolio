"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DeleteConfirmationSchema,
  type DeleteConfirmationValues,
} from "@/schemas/delete-confirmation.schema";

interface Props {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  type: string;
  title?: string;
}

export const DeleteDialog = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  type,
  title = "Delete Item",
}: Props) => {
  const form = useForm<DeleteConfirmationValues>({
    resolver: zodResolver(DeleteConfirmationSchema),
    defaultValues: {
      confirmation: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    await onConfirm();
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          form.reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-white border-0">
        <DialogHeader>
          <DialogTitle className="text300">{title}</DialogTitle>
          <DialogDescription className="text100 text-[#949596]">
            Are you sure you want to delete this {type}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="confirmation"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirmation" className="text-sm font-medium">
                    Type <span className="font-bold">Delete</span> to confirm
                  </Label>
                  <FormControl>
                    <Input
                      id="confirmation"
                      placeholder="Delete"
                      {...field}
                      className="mt-1"
                      disabled={isDeleting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[#e1e1e1] text-[#393939]"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeleting || !form.formState.isValid}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
