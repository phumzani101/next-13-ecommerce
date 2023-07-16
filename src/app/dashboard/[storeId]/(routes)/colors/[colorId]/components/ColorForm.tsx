"use client";
import { z } from "zod";
import React, { FC, useState } from "react";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/models/AlertModal";
import useOrigin from "@/hooks/useOrigin";
import ApiAlert from "@/components/myui/ApiAlert";

interface ColorFormProps {
  color?: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "String must be a valid hex code" }),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm: FC<ColorFormProps> = ({ color }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = color ? "Edit Color" : "Create Color";
  const description = color ? "Edit A Color" : "Create A New Color";
  const toastMessage = color ? "Color Edited" : "Color Created";
  const actions = color ? "Edit" : "Create";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: color || { name: "", value: "" },
  });

  const onSubmit = async (formData: ColorFormValues) => {
    console.log(formData);
    try {
      setIsLoading(true);
      if (color) {
        const { data } = await axios.patch(
          `/api/stores/${params.storeId}/colors/${params.colorId}`,
          formData
        );
      } else {
        const { data } = await axios.post(
          `/api/stores/${params.storeId}/colors`,
          formData
        );
      }
      router.refresh();
      router.push(`/dashboard/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/colors/${params.colorId}`
      );
      router.push(`/dashboard/${params.storeId}/colors`);
      toast.success("Color Deleted");
    } catch (error) {
      toast.error("Make sure you removed all products and colors first");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {color && (
          <Button
            variant="destructive"
            color="sm"
            onClick={() => setOpen(true)}
            disabled={isLoading}
          >
            <Trash className="h-4 w-4"></Trash>
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Color name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-4">
                        <Input
                          disabled={isLoading}
                          placeholder="Color value"
                          {...field}
                        />
                        <div
                          className="border p-4 rounded-full"
                          style={{ backgroundColor: field.value }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {actions}
            </Button>
          </form>
        </Form>
      </div>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/colors/${params.colorId}`}
        variant="public"
      />
    </>
  );
};

export default ColorForm;
