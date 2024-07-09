"use client";
import { Button } from "@/components/ui/button";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./registrationSchema";
import { z } from "zod";

type FormSchema = z.infer<typeof schema>;

export const RegistrationForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
    }
  });

// onSubmit using JSON object
const onSubmit = async (data: z.infer<typeof schema>) => (
   await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
);

// onSubmit using FormData
const onSubmitFormData = async (data: z.infer<typeof schema>) => {

  const formData = new FormData();
  formData.append("first", data.first);

  await fetch("/api/registerForm", {
   method: "POST",
   body: formData
 })
   .then(response => response.json())
   .then(data => console.log(data))
};


  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          
        <FormField control={form.control} name="first" render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>Your First name.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="last" render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>Your Last Name.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>Your email address.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}