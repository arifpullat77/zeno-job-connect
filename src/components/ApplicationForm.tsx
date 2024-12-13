import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/integrations/supabase/client";

interface ApplicationFormProps {
  jobId: string;
  referralId?: string;
  onSuccess?: () => void;
}

export function ApplicationForm({ jobId, referralId, onSuccess }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    resume: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resumeUrl = "";
      
      if (formData.resume) {
        const fileName = `${crypto.randomUUID()}-${formData.resume.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from("resumes")
          .upload(fileName, formData.resume);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from("resumes")
          .getPublicUrl(fileName);
          
        resumeUrl = publicUrl;
      }

      const { error: applicationError } = await supabase
        .from("applications")
        .insert({
          job_id: jobId,
          referral_id: referralId,
          applicant_name: formData.name,
          applicant_email: formData.email,
          phone_number: formData.phoneNumber,
          resume_url: resumeUrl,
        });

      if (applicationError) throw applicationError;

      toast({
        title: "Application submitted successfully!",
        description: "We'll be in touch soon.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <Input
          id="phoneNumber"
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume (PDF) *</Label>
        <Input
          id="resume"
          type="file"
          required
          accept="application/pdf"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        />
      </div>

      {referralId && (
        <div className="space-y-2">
          <Label>Referred By</Label>
          <Input value={referralId} disabled />
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}