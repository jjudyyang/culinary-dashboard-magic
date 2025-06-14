
import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onDurationChange: (operator: string, value: number) => void;
  onSearchChange: (search: string) => void;
  onCuisineChange: (cuisines: string[]) => void;
  onMyRecipesToggle: (enabled: boolean) => void;
  onReset: () => void;
}

const cuisines = [
  "Italian", "Mexican", "Chinese", "Indian", "French", 
  "Japanese", "Thai", "Mediterranean", "American", "Korean"
];

const durationRanges = [
  { label: "Quick (< 30 min)", operator: "lte", value: 30 },
  { label: "Medium (30-60 min)", operator: "range", value: 45 },
  { label: "Long (> 60 min)", operator: "gte", value: 60 },
];

export const FilterBar = ({ onDurationChange, onSearchChange, onCuisineChange, onMyRecipesToggle, onReset }: FilterBarProps) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("Medium (30-60 min)");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [myRecipesEnabled, setMyRecipesEnabled] = useState(false);
  const [cuisinePopoverOpen, setCuisinePopoverOpen] = useState(false);

  const handleDurationChange = (durationLabel: string) => {
    setSelectedDuration(durationLabel);
    const range = durationRanges.find(r => r.label === durationLabel);
    if (range) {
      onDurationChange(range.operator, range.value);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleCuisineSelect = (cuisine: string) => {
    const updatedCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine];
    
    setSelectedCuisines(updatedCuisines);
    onCuisineChange(updatedCuisines);
  };

  const handleMyRecipesToggle = (enabled: boolean) => {
    setMyRecipesEnabled(enabled);
    onMyRecipesToggle(enabled);
  };

  const handleReset = () => {
    setSelectedDuration("Medium (30-60 min)");
    setSearchValue("");
    setSelectedCuisines([]);
    setMyRecipesEnabled(false);
    setCuisinePopoverOpen(false);
    onReset();
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-6 items-start">
        {/* Duration Filter - Vertical Layout */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-blue-700">Duration</Label>
          <Select value={selectedDuration} onValueChange={handleDurationChange}>
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {durationRanges.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Field - Vertical Layout */}
        <div className="flex flex-col gap-2 flex-1 min-w-48">
          <Label className="text-sm font-medium text-blue-700">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-8"
            />
          </div>
        </div>

        {/* Cuisine Multi-Select - Vertical Layout */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-blue-700">Cuisine</Label>
          <div className="flex flex-col gap-2">
            <Popover open={cuisinePopoverOpen} onOpenChange={setCuisinePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cuisinePopoverOpen}
                  className="w-48 h-8 justify-between text-xs"
                >
                  {selectedCuisines.length === 0 
                    ? "Select cuisines..." 
                    : `${selectedCuisines.length} selected`
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search cuisines..." />
                  <CommandList>
                    <CommandEmpty>No cuisine found.</CommandEmpty>
                    <CommandGroup>
                      {cuisines.map((cuisine) => (
                        <CommandItem
                          key={cuisine}
                          value={cuisine}
                          onSelect={() => handleCuisineSelect(cuisine)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCuisines.includes(cuisine) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {cuisine}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedCuisines.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedCuisines.slice(0, 2).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
                {selectedCuisines.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{selectedCuisines.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* My Recipes Toggle - Vertical Layout */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="my-recipes" className="text-sm font-medium text-blue-700">
            My Recipes
          </Label>
          <Switch
            id="my-recipes"
            checked={myRecipesEnabled}
            onCheckedChange={handleMyRecipesToggle}
          />
        </div>

        {/* Reset Button */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-transparent">Reset</Label>
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-8 px-3 text-xs flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
