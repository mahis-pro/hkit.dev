import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitFacilityRegistration, FacilityRegistrationData } from "@/api/hkit";

const facilitySchema = z.object({
  facilityName: z.string().min(3, "Facility name is required"),
  facilityType: z.string().min(3, "Facility type is required (e.g., General Hospital)"),
  stateHieNode: z.string().min(1, "Please select parent State HIE Node"),
  lga: z.string().min(2, "LGA is required"),
  contactName: z.string().min(3, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number is required"),
});

type FacilityFormValues = z.infer<typeof facilitySchema>;

export function FacilityRegistrationForm() {
  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facilityName: "",
      facilityType: "",
      stateHieNode: "Kwara State HIE",
      lga: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (data: FacilityFormValues) => {
    try {
      await submitFacilityRegistration(data as FacilityRegistrationData);
      toast.success("Facility Node registration submitted!", {
        description: `Your facility is now pending approval from the ${data.stateHieNode} administration team.`,
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
              name="facilityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Facility Name</FormLabel>
                  <FormControl>
                    <Input placeholder="General Hospital Ilorin" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facilityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Facility Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Public / Private Clinic" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="stateHieNode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Parent State HIE Node</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isSubmitting}
                      className="flex h-10 w-full rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-2 text-xs text-zinc-800 focus-visible:ring-primary/40 focus-visible:border-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Kwara State HIE" className="bg-white text-zinc-800">Kwara State HIE</option>
                      <option value="Lagos State HIE" className="bg-white text-zinc-800">Lagos State HIE</option>
                      <option value="Kano State HIE" className="bg-white text-zinc-800">Kano State HIE</option>
                      <option value="Rivers State HIE" className="bg-white text-zinc-800">Rivers State HIE</option>
                      <option value="FCT Abuja HIE" className="bg-white text-zinc-800">FCT Abuja HIE</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Local Government Area (LGA)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ilorin West" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h4 className="text-sm font-bold pt-4 border-t border-zinc-200/40 font-mono text-zinc-500 uppercase tracking-wider">Primary Contact Details</h4>

          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Contact Person Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
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
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@hospital.com" {...field} className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs" disabled={isSubmitting} />
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
              <Building2 className="w-4 h-4 mr-2" />
            )}
            Onboard Clinical Node to HIE
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}