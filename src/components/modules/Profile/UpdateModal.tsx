import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IUser, IVehicle } from "@/types";
import { useUpdateUserMutation } from "@/redux/feature/user/user.api";
import { toast } from "sonner";

type Props = {
  user: IUser;
};

const Vehicles: IVehicle[] = ["BIKE", "CAR"];

const updateFormSchema = z.object({
  name: z.string().min(3, { error: "Name too Short!" }),
  phone: z.string().regex(/^(?:\+8801\d{9})|01\d{9}$/, {
    error: "Invalied phone number. Formet: +8801xxxxxxxxx or 01xxxxxxxxx",
  }),
  Vehicle: z.enum(Vehicles),
});

const UpdateModal: React.FC<Props> = ({ user }) => {
  const [updateUserStatus, { isLoading }] = useUpdateUserMutation();
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      Vehicle: user.Vehicle || "BIKE",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateFormSchema>) => {
    const toastId = toast.loading("Online status is chnagning...");
    try {
      const result = await updateUserStatus({
        _id: user._id,
        ...data,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" variant={"secondary"}>
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your name and phone number.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Used for account verification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user.role === "DRIVER" && (
              <FormField
                control={form.control}
                name="Vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Vehicles.map((Vehicle) => (
                          <SelectItem key={Vehicle} value={Vehicle}>
                            {Vehicle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Change Your Vehicle</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
