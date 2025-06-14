
import { useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FilterBar } from "@/components/FilterBar";
import { RecipeCard } from "@/components/RecipeCard";
import { sampleRecipes } from "@/data/sampleRecipes";

const Index = () => {
  const [durationFilter, setDurationFilter] = useState<{ operator: string; value: number }>({
    operator: "none",
    value: 0
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
  const [myRecipesOnly, setMyRecipesOnly] = useState(false);

  const filteredRecipes = useMemo(() => {
    return sampleRecipes.filter(recipe => {
      // Duration filter
      let matchesDuration = true;
      if (durationFilter.operator === "gte") {
        matchesDuration = recipe.duration >= durationFilter.value;
      } else if (durationFilter.operator === "lte") {
        matchesDuration = recipe.duration <= durationFilter.value;
      } else if (durationFilter.operator === "range") {
        matchesDuration = recipe.duration >= 30 && recipe.duration <= 60;
      }
      // If operator is "none", don't filter by duration

      // Search filter
      const matchesSearch = searchFilter === "" || 
        recipe.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchFilter.toLowerCase()));

      // Cuisine filter
      const matchesCuisine = cuisineFilter.length === 0 || cuisineFilter.includes(recipe.cuisine);

      // My recipes filter
      const matchesMyRecipes = !myRecipesOnly || recipe.isMyRecipe;

      return matchesDuration && matchesSearch && matchesCuisine && matchesMyRecipes;
    });
  }, [durationFilter, searchFilter, cuisineFilter, myRecipesOnly]);

  const handleDurationChange = (operator: string, value: number) => {
    setDurationFilter({ operator, value });
  };

  const handleSearchChange = (search: string) => {
    setSearchFilter(search);
  };

  const handleCuisineChange = (cuisines: string[]) => {
    setCuisineFilter(cuisines);
  };

  const handleMyRecipesToggle = (enabled: boolean) => {
    setMyRecipesOnly(enabled);
  };

  const handleReset = () => {
    setDurationFilter({ operator: "none", value: 0 });
    setSearchFilter("");
    setCuisineFilter([]);
    setMyRecipesOnly(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-b-2 border-red-700 p-4 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">🍳 Cookify</h1>
              <p className="text-red-100 text-sm italic">"Yes Chef!" meets "Anyone can cook"</p>
            </div>
            <SidebarTrigger className="hover:bg-red-500 hover:text-white text-red-100" />
          </header>
          
          <FilterBar
            onDurationChange={handleDurationChange}
            onSearchChange={handleSearchChange}
            onCuisineChange={handleCuisineChange}
            onMyRecipesToggle={handleMyRecipesToggle}
            onReset={handleReset}
          />
          
          <main className="flex-1 p-6">
            <div className="mb-4">
              <p className="text-orange-700 font-medium">
                Showing {filteredRecipes.length} of {sampleRecipes.length} recipes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-orange-600 text-lg font-medium">No recipes match your current filters.</p>
                <p className="text-orange-500 mt-2">Even Gordon would be stumped! Try adjusting your search criteria.</p>
              </div>
            )}
          </main>
        </div>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Index;
