
import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RecipeCard } from "@/components/RecipeCard";

// Mock user data
const mockUser = {
  name: "John Doe",
  cookifyLevel: "Intermediate Chef",
  avatar: "/placeholder.svg",
};

// Mock user's recipes
const mockUserRecipes = [
  {
    id: 1,
    title: "My Homemade Pasta",
    image: "/placeholder.svg",
    duration: 45,
    cuisine: "Italian",
    ingredients: ["Flour", "Eggs", "Salt", "Olive Oil"],
    instructions: ["Mix flour and eggs", "Knead dough", "Roll and cut"],
    isMyRecipe: true,
  },
  {
    id: 2,
    title: "Grandma's Apple Pie",
    image: "/placeholder.svg",
    duration: 90,
    cuisine: "American",
    ingredients: ["Apples", "Flour", "Sugar", "Butter", "Cinnamon"],
    instructions: ["Prepare crust", "Mix filling", "Bake"],
    isMyRecipe: true,
  },
  {
    id: 3,
    title: "Spicy Chicken Curry",
    image: "/placeholder.svg",
    duration: 60,
    cuisine: "Indian",
    ingredients: ["Chicken", "Coconut milk", "Curry powder", "Onions"],
    instructions: ["Sauté onions", "Add chicken", "Simmer with spices"],
    isMyRecipe: true,
  },
];

// Mock user's cook lists
const mockUserCookLists = [
  { id: 1, name: "Weekend Meal Prep", recipeCount: 5 },
  { id: 2, name: "Quick Dinners", recipeCount: 8 },
  { id: 3, name: "Holiday Favorites", recipeCount: 3 },
  { id: 4, name: "Healthy Options", recipeCount: 12 },
];

export default function Profile() {
  const [user] = useState(mockUser);
  const [userRecipes] = useState(mockUserRecipes);
  const [cookLists] = useState(mockUserCookLists);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">Profile</h1>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <Avatar className="w-32 h-32 border-4 border-blue-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold text-blue-600 bg-blue-100">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-blue-600 mb-2">{user.name}</h2>
                <p className="text-lg text-gray-600">{user.cookifyLevel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Recipes Carousel */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">My Recipes (Carousel)</h3>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {userRecipes.map((recipe) => (
                <CarouselItem key={recipe.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <RecipeCard recipe={recipe} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* My Cook Lists */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">My Cooklists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cookLists.map((list) => (
              <Card key={list.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{list.name}</h4>
                      <p className="text-sm text-gray-600">{list.recipeCount} recipes</p>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {list.recipeCount}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add New Cook List Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-blue-300 hover:border-blue-400">
              <CardContent className="p-6 flex items-center justify-center min-h-24">
                <div className="text-center text-blue-600">
                  <Plus className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">Create New Cook List</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
