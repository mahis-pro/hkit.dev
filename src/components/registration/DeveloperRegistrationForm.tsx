import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Code2, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitDeveloperRegistration, DeveloperRegistrationData } from "@/api/hkit";

const developerSchema = z.object({
  organizationName: z.string().min(3, "Organization name is required"),
  systemName: z.string().min(3, "System name (e.g., EMR, LIS) is required"),
  technicalContactName: z.string().min(3, "Technical contact name is required"),
  technicalContactEmail: z.string().email("Invalid email address"),
  useCase: z.string().min(10, "Please describe your integration use case"),
});

type DeveloperFormValues = z.infer<typeof developerSchema>;

export function DeveloperRegistrationForm() {
  const form = useForm<DeveloperFormValues>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      organizationName: "",
      systemName: "",
      technicalContactName: "",
      technicalContactEmail: "",
      useCase: "",
    },
  });

  const onSubmit = async (data: DeveloperFormValues) => {
    try {
      await submitDeveloperRegistration(data as DeveloperRegistrationData);
      toast.success("Developer request submitted!", {
        description: "Your request is pending HIE approval. You will receive sandbox credentials upon approval.",
      });
      form.reset();
    } catch (error) {
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <CardContent className="p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="EMR Solutions Inc." {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="systemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">System Name</FormLabel>
                  <FormControl>
                    <Input placeholder="MediFlow EMR" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h4 className="text-xs font-bold pt-4 border-t border-zinc-200/40 font-mono text-zinc-500 uppercase tracking-wider">Technical Contact</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="technicalContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Developer" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technicalContactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tech@emrsolutions.com" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="useCase"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Integration Use Case</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe how your system will interact with the HIE (e.g., submitting patient demographics, retrieving lab results)."
                    className="flex min-h-[80px] w-full rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-2 text-xs text-zinc-800 focus-visible:ring-primary/40 focus-visible:border-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-10 bg-primary text-white font-semibold hover:bg-primary/95 rounded-lg text-xs transition-colors shadow-[0_4px_12px_rgba(16,185,129,0.2)]" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Code2 className="w-4 h-4 mr-2" />
            )}
            Request Developer Access
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}