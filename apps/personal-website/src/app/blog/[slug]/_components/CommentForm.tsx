"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
   Button,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
   Input,
} from "@david/ui";

import { commentSchema } from "~/schema";

const CommentForm = ({ slug }: { slug: string }) => {
   const form = useForm<z.infer<typeof commentSchema>>({
      resolver: zodResolver(commentSchema),
      defaultValues: {
         slug,
         comment: "",
      },
   });

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(async (values) => {
               const r = await fetch("/api/blog/comment", {
                  body: JSON.stringify(values),
                  method: "POST",
                  credentials: "include",
               });
               if (r.status !== 200) {
                  const text = await r.text();
                  return form.setError("comment", {
                     type: "string",
                     message: text,
                  });
               }

               form.reset();
            })}
         >
            <FormField
               control={form.control}
               name="comment"
               render={({ field }) => (
                  <FormItem className="-mx-1">
                     <FormControl>
                        <Input
                           placeholder="Your comment..."
                           {...field}
                           className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-100 py-2 pl-4 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-100 dark:focus:border-blue-900 dark:focus:ring-blue-900"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" variant="secondary" className="-mx-1 mt-2">
               Submit
            </Button>
         </form>
      </Form>
   );
};

export default CommentForm;
