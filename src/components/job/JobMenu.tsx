import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface JobMenuProps {
  jobId: string;
  status: string;
}

export function JobMenu({ jobId, status }: JobMenuProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleJobAction = async (action: 'close' | 'delete') => {
    try {
      if (action === 'delete') {
        const { error } = await supabase
          .from('jobs')
          .delete()
          .eq('id', jobId);

        if (error) throw error;

        toast({
          title: "Job deleted",
          description: "The job has been successfully deleted",
        });
      } else {
        const { error } = await supabase
          .from('jobs')
          .update({ status: 'closed' })
          .eq('id', jobId);

        if (error) throw error;

        toast({
          title: "Job closed",
          description: "The job has been closed and is no longer accepting applications",
        });
      }

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['available-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['shared-jobs'] });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to perform action. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === 'open' && (
          <DropdownMenuItem 
            onClick={() => handleJobAction('close')}
            className="text-yellow-600"
          >
            Close Job
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => handleJobAction('delete')}
          className="text-red-600"
        >
          Delete Job
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}