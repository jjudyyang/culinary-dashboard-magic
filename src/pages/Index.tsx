
import { useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FilterBar } from "@/components/FilterBar";
import { RecipeCard } from "@/components/RecipeCard";
import { sampleRecipes } from "@/data/sampleRecipes";

const Index = () => {
  const [durationFilter, setDurationFilter] = useState<{ operator: string; value: number }>({
    operator: "gte",
    value: 30
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
  const [myRecipesOnly, setMyRecipesOnly] = useState(false);

  const filteredRecipes = useMemo(() => {
    return sampleRecipes.filter(recipe => {
      // Duration filter
      const matchesDuration = durationFilter.operator === "gte" 
        ? recipe.duration >= durationFilter.value
        : recipe.duration <= durationFilter.value;

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
            <SidebarTrigger className="hover:bg-blue-50 hover:text-blue-700" />
            <h1 className="text-2xl font-bold text-blue-700">Recipe Manager</h1>
          </header>
          
          <FilterBar
            onDurationChange={handleDurationChange}
            onSearchChange={handleSearchChange}
            onCuisineChange={handleCuisineChange}
            onMyRecipesToggle={handleMyRecipesToggle}
          />
          
          <main className="flex-1 p-6">
            <div className="mb-4">
              <p className="text-gray-600">
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
                <p className="text-gray-500 text-lg">No recipes match your current filters.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
