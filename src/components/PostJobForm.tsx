import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  salary: z.string().min(2).max(100),
  referral_bonus: z.coerce.number().min(100),
});

export function PostJobForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      salary: "",
      referral_bonus: 100,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please login to post a job.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("jobs").insert({
        ...values,
        recruiter_id: session.user.id,
      });

      if (error) throw error;

      toast({
        title: "Job Posted!",
        description: "Your job listing has been created successfully.",
      });
      
      form.reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting job:", error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. TechCorp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter job description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Range</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $100,000 - $150,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referral_bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referral Bonus ($)</FormLabel>
              <FormControl>
                <Input type="number" min="100" placeholder="e.g. 5000" {...field} />
              </FormControl>
              <FormDescription>
                Minimum referral bonus is $100
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Post Job</Button>
      </form>
    </Form>
  );
}