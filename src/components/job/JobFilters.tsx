import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface JobFiltersProps {
  filters: {
    search: string;
    location: string;
    minSalary: string;
  };
  setFilters: (filters: {
    search: string;
    location: string;
    minSalary: string;
  }) => void;
  onReset: () => void;
}

export function JobFilters({ filters, setFilters, onReset }: JobFiltersProps) {
  return (
    <div className="space-y-4 bg-secondary/50 p-4 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="search">search jobs</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by title or company..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">location</Label>
        <Input
          id="location"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minSalary">minimum salary</Label>
        <Input
          id="minSalary"
          type="number"
          placeholder="Minimum salary..."
          value={filters.minSalary}
          onChange={(e) =>
            setFilters({ ...filters, minSalary: e.target.value })
          }
        />
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={onReset}
      >
        <X className="mr-2 h-4 w-4" />
        reset filters
      </Button>
    </div>
  );
}