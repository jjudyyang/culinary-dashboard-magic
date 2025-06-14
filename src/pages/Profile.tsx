import { useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
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

// Mock user's recipes - expanded to 6 recipes
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
  {
    id: 4,
    title: "Mediterranean Salad",
    image: "/placeholder.svg",
    duration: 15,
    cuisine: "Mediterranean",
    ingredients: ["Tomatoes", "Cucumber", "Feta cheese", "Olive oil"],
    instructions: ["Chop vegetables", "Add feta", "Drizzle with oil"],
    isMyRecipe: true,
  },
  {
    id: 5,
    title: "Chocolate Chip Cookies",
    image: "/placeholder.svg",
    duration: 25,
    cuisine: "American",
    ingredients: ["Flour", "Butter", "Sugar", "Chocolate chips"],
    instructions: ["Mix ingredients", "Form cookies", "Bake until golden"],
    isMyRecipe: true,
  },
  {
    id: 6,
    title: "Thai Green Curry",
    image: "/placeholder.svg",
    duration: 40,
    cuisine: "Thai",
    ingredients: ["Green curry paste", "Coconut milk", "Vegetables", "Basil"],
    instructions: ["Heat paste", "Add coconut milk", "Simmer with vegetables"],
    isMyRecipe: true,
  },
];

// Mock user's cook lists with complete recipe data
const mockUserCookLists = [
  { 
    id: 1, 
    name: "Weekend Meal Prep", 
    recipeCount: 2,
    recipes: [
      { 
        id: 1, 
        title: "Chicken Bowl", 
        image: "/placeholder.svg", 
        duration: 30,
        cuisine: "Asian",
        ingredients: ["Chicken breast", "Rice", "Vegetables", "Soy sauce"],
        instructions: ["Cook chicken", "Prepare rice", "Steam vegetables", "Combine with sauce"]
      },
      { 
        id: 2, 
        title: "Quinoa Salad", 
        image: "/placeholder.svg", 
        duration: 20,
        cuisine: "Mediterranean",
        ingredients: ["Quinoa", "Tomatoes", "Cucumber", "Lemon"],
        instructions: ["Cook quinoa", "Chop vegetables", "Mix with lemon dressing"]
      },
    ]
  },
  { 
    id: 2, 
    name: "Quick Dinners", 
    recipeCount: 2,
    recipes: [
      { 
        id: 3, 
        title: "Stir Fry", 
        image: "/placeholder.svg", 
        duration: 15,
        cuisine: "Asian",
        ingredients: ["Mixed vegetables", "Soy sauce", "Garlic", "Ginger"],
        instructions: ["Heat oil", "Add garlic and ginger", "Stir fry vegetables"]
      },
      { 
        id: 4, 
        title: "Pasta Aglio", 
        image: "/placeholder.svg", 
        duration: 12,
        cuisine: "Italian",
        ingredients: ["Pasta", "Garlic", "Olive oil", "Parsley"],
        instructions: ["Cook pasta", "Sauté garlic", "Toss with oil and parsley"]
      },
    ]
  },
  { 
    id: 3, 
    name: "Holiday Favorites", 
    recipeCount: 1,
    recipes: [
      { 
        id: 5, 
        title: "Roast Turkey", 
        image: "/placeholder.svg", 
        duration: 180,
        cuisine: "American",
        ingredients: ["Turkey", "Herbs", "Butter", "Vegetables"],
        instructions: ["Prepare turkey", "Season with herbs", "Roast in oven"]
      },
    ]
  },
  { 
    id: 4, 
    name: "Healthy Options", 
    recipeCount: 2,
    recipes: [
      { 
        id: 6, 
        title: "Green Smoothie", 
        image: "/placeholder.svg", 
        duration: 5,
        cuisine: "Healthy",
        ingredients: ["Spinach", "Banana", "Apple", "Almond milk"],
        instructions: ["Add ingredients to blender", "Blend until smooth"]
      },
      { 
        id: 7, 
        title: "Grilled Salmon", 
        image: "/placeholder.svg", 
        duration: 25,
        cuisine: "Seafood",
        ingredients: ["Salmon fillet", "Lemon", "Herbs", "Olive oil"],
        instructions: ["Season salmon", "Grill for 12-15 minutes", "Serve with lemon"]
      },
    ]
  },
];

export default function Profile() {
  const [user] = useState(mockUser);
  const [userRecipes] = useState(mockUserRecipes);
  const [cookLists] = useState(mockUserCookLists);
  const [selectedCookList, setSelectedCookList] = useState(null);

  const handleCookListClick = (cookList) => {
    setSelectedCookList(cookList);
  };

  const handleBackToProfile = () => {
    setSelectedCookList(null);
  };

  if (selectedCookList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Navigation buttons */}
          <div className="mb-8 flex justify-between items-center">
            <button 
              onClick={handleBackToProfile}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </button>
            <Link 
              to="/"
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          {/* Cook list header with Spotify-like styling */}
          <div className="mb-8 bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-xl shadow-lg">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 bg-orange-400 rounded-lg flex items-center justify-center text-4xl font-bold shadow-lg">
                🍽️
              </div>
              <div>
                <p className="text-red-100 text-sm font-medium uppercase tracking-wide">Cooklist</p>
                <h1 className="text-4xl font-bold mb-2">{selectedCookList.name}</h1>
                <p className="text-red-100">{selectedCookList.recipeCount} recipes • Made with love</p>
              </div>
            </div>
          </div>

          {/* Cook list recipes using consistent RecipeCard */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">Recipes in this cooklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCookList.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Home button */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-red-600">👨‍🍳 Profile</h1>
            <p className="text-orange-600 italic">"Cooking with passion!"</p>
          </div>
          <Link 
            to="/"
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-8 border-2 border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <Avatar className="w-32 h-32 border-4 border-orange-300 shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold text-red-600 bg-orange-100">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-red-600 mb-2">{user.name}</h2>
                <Badge className="text-lg px-4 py-2 bg-orange-100 text-orange-800 border-orange-300">
                  🏅 {user.cookifyLevel}
                </Badge>
                <p className="text-orange-700 mt-4 italic">"Anyone can cook, but only the fearless can be great!"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Recipes Carousel */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
            📚 My Recipes Collection
          </h3>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {userRecipes.map((recipe) => (
                <CarouselItem key={recipe.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <RecipeCard recipe={recipe} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-orange-100 hover:bg-orange-200 text-orange-800" />
            <CarouselNext className="right-4 bg-orange-100 hover:bg-orange-200 text-orange-800" />
          </Carousel>
        </div>

        {/* My Cook Lists */}
        <div>
          <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
            🎵 My Cooklists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cookLists.map((list) => (
              <Card 
                key={list.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-orange-200 hover:border-red-300 bg-gradient-to-br from-orange-50 to-red-50 transform hover:scale-105"
                onClick={() => handleCookListClick(list)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg text-red-700 mb-1">{list.name}</h4>
                      <p className="text-sm text-orange-600">{list.recipeCount} recipes</p>
                      <p className="text-xs text-orange-500 italic mt-1">Click to view playlist</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                        {list.recipeCount}
                      </Badge>
                      <span className="text-2xl mt-2">🍽️</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
