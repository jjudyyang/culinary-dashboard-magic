
import { useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FilterBar } from "@/components/FilterBar";
import { RecipeCard } from "@/components/RecipeCard";
import { sampleRecipes } from "@/data/sampleRecipes";
import { additionalRecipes } from "@/data/additionalRecipes";

const Index = () => {
  const [durationFilter, setDurationFilter] = useState<{ operator: string; value: number }>({
    operator: "none",
    value: 0
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
  const [myRecipesOnly, setMyRecipesOnly] = useState(false);

  // Combine all recipes
  const allRecipes = [...sampleRecipes, ...additionalRecipes];

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 relative">
        {/* Grainy texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        
        <div className="flex-1 flex flex-col relative z-10">
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-b-2 border-blue-700 p-4 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">🍳 Cookify</h1>
              <p className="text-blue-100 text-sm italic">"Yes Chef!" meets "Anyone can cook"</p>
            </div>
            <SidebarTrigger className="hover:bg-blue-500 hover:text-white text-blue-100" />
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
              <p className="text-blue-800 font-medium">
                Showing {filteredRecipes.length} of {allRecipes.length} recipes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-blue-700 text-lg font-medium">No recipes match your current filters.</p>
                <p className="text-blue-600 mt-2">Even Gordon would be stumped! Try adjusting your search criteria.</p>
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
