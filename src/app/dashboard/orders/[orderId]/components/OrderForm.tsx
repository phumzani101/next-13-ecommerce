"use client";
import { z } from "zod";
import React, { FC, useState } from "react";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Order } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFormProps {
  order?: Order | null;
}

const formSchema = z.object({
  isPaid: z.boolean().default(false).optional(),
  phone: z.string().min(1),
  address: z.string().min(1),
});

type OrderFormValues = z.infer<typeof formSchema>;

const OrderForm: FC<OrderFormProps> = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = order ? "Edit Order" : "Create Order";
  const description = order ? "Edit A Order" : "Create A New Order";
  const toastMessage = order ? "Order Edited" : "Order Created";
  const actions = order ? "Edit" : "Create";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: order || {
      isPaid: false,
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (formData: OrderFormValues) => {
    console.log(formData);
    try {
      setIsLoading(true);
      if (order) {
        const { data } = await axios.patch(
          `/api/orders/${params.orderId}`,
          formData
        );
      } else {
        const { data } = await axios.post(`/api/orders`, formData);
      }
      router.refresh();
      router.push(`/dashboard/orders`);
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
      await axios.delete(`/api/orders/${params.orderId}`);
      router.push(`/dashboard/orders`);
      toast.success("Order Deleted");
    } catch (error) {
      toast.error("Make sure you removed all products and orders first");
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
        {order && (
          <Button
            variant="destructive"
            size="sm"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Order phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Order address"
                        {...field}
                      />
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
        description={`${origin}/api/orders/${params.orderId}`}
        variant="public"
      />
    </>
  );
};

export default OrderForm;
