"use client";
import React, { useState } from "react";
import * as zod from "zod";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

const formSchema = zod.object({ name: zod.string().min(1) });

const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storeModal = useStoreModal();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    // Todo

    try {
      setIsLoading(true);
      const res = await axios.post("/api/stores", values);
      toast.success("Store Created");
      window.location.assign(`/dashboard/${res.data.id}`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-Commerce"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
