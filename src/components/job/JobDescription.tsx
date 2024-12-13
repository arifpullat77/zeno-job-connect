interface JobDescriptionProps {
  description: string;
}

export function JobDescription({ description }: JobDescriptionProps) {
  return (
    <p className="text-sm text-foreground/60">
      {description}
    </p>
  );
}