import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Building, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitStateRegistration, StateRegistrationData } from "@/api/hkit";

const stateSchema = z.object({
  stateName: z.string().min(3, "State name is required (e.g. Lagos State)"),
  ministryDepartment: z.string().min(3, "Ministry department is required"),
  contactName: z.string().min(3, "Primary contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number is required"),
  estimatedFacilities: z.string().min(1, "Estimated facilities is required"),
});

type StateFormValues = z.infer<typeof stateSchema>;

export function StateRegistrationForm() {
  const form = useForm<StateFormValues>({
    resolver: zodResolver(stateSchema),
    defaultValues: {
      stateName: "",
      ministryDepartment: "Ministry of Health, Department of ICT",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      estimatedFacilities: "10-50",
    },
  });

  const onSubmit = async (data: StateFormValues) => {
    try {
      await submitStateRegistration(data as StateRegistrationData);
      toast.success("State Registry Node request submitted!", {
        description: "Your State HIE registry request has been received. Our infrastructure team will contact you for deployment validation.",
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
              name="stateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">State Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Lagos State" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ministryDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Ministry Unit / Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Department of ICT" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="estimatedFacilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Estimated Facilities Node Count</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isSubmitting}
                      className="flex h-10 w-full rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-2 text-xs text-zinc-800 focus-visible:ring-primary/40 focus-visible:border-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="1-10">1 - 10 clinical nodes</option>
                      <option value="10-50">10 - 50 clinical nodes</option>
                      <option value="50-200">50 - 200 clinical nodes</option>
                      <option value="200+">200+ clinical nodes</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h4 className="text-xs font-bold pt-4 border-t border-zinc-200/40 font-mono text-zinc-500 uppercase tracking-wider">Administrative Contact</h4>

          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Admin Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dr. Kola Adebayo" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@moh.gov.ng" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+234 80..." {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full h-10 bg-primary text-white font-semibold hover:bg-primary/95 rounded-lg text-xs transition-colors shadow-[0_4px_12px_rgba(16,185,129,0.2)]" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Building className="w-4 h-4 mr-2" />
            )}
            Initialize Sovereign State HIE Node
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
