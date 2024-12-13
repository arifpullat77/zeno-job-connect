interface JobDescriptionProps {
  description: string;
}

export function JobDescription({ description }: JobDescriptionProps) {
  return (
    <div 
      className="text-sm text-foreground/60 prose prose-sm max-w-none prose-a:text-primary hover:prose-a:text-primary/80"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}