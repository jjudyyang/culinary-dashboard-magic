
import { useState } from "react";
import { Search } from "lucide-react";
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
}

const cuisines = [
  "Italian", "Mexican", "Chinese", "Indian", "French", 
  "Japanese", "Thai", "Mediterranean", "American", "Korean"
];

export const FilterBar = ({ onDurationChange, onSearchChange, onCuisineChange, onMyRecipesToggle }: FilterBarProps) => {
  const [durationOperator, setDurationOperator] = useState("gte");
  const [durationValue, setDurationValue] = useState(30);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [myRecipesEnabled, setMyRecipesEnabled] = useState(false);
  const [cuisinePopoverOpen, setCuisinePopoverOpen] = useState(false);

  const handleDurationOperatorChange = (operator: string) => {
    setDurationOperator(operator);
    onDurationChange(operator, durationValue);
  };

  const handleDurationValueChange = (value: string) => {
    const numValue = parseInt(value);
    setDurationValue(numValue);
    onDurationChange(durationOperator, numValue);
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

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Duration Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-blue-700">Duration</Label>
          <Select value={durationOperator} onValueChange={handleDurationOperatorChange}>
            <SelectTrigger className="w-16 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gte">≥</SelectItem>
              <SelectItem value="lte">≤</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={durationValue}
            onChange={(e) => handleDurationValueChange(e.target.value)}
            className="w-20 h-8 text-xs"
            min="1"
            max="300"
          />
          <span className="text-xs text-gray-500">min</span>
        </div>

        {/* Search Field */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-8"
          />
        </div>

        {/* Cuisine Multi-Select */}
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-blue-700">Cuisine</Label>
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

        {/* My Recipes Toggle */}
        <div className="flex items-center gap-2">
          <Label htmlFor="my-recipes" className="text-sm font-medium text-blue-700">
            My Recipes
          </Label>
          <Switch
            id="my-recipes"
            checked={myRecipesEnabled}
            onCheckedChange={handleMyRecipesToggle}
          />
        </div>
      </div>
    </div>
  );
};
