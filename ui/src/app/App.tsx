import { useGetActivityLogs } from "@/api/nutrition/activities/hooks";
import { useGetFoodLogs } from "@/api/nutrition/foods/hooks";
import ActivityTable from "@/app/_components/ActivityTable";
import FoodTable from "@/app/_components/FoodTable";
import NutritionInput from "@/app/_components/NutritionInput";

const App = () => {
  const { data: foodLogs } = useGetFoodLogs();
  const { data: activityLogs } = useGetActivityLogs();

  return (
    <div className="min-h-svh max-w-vw flex flex-col antialiased">
      <header className="container"></header>
      <main className="container flex-1 flex flex-col items-center justify-center gap-8">
        <NutritionInput />
        <FoodTable logs={foodLogs} />
        <ActivityTable logs={activityLogs} />
      </main>
      <footer className="container"></footer>
    </div>
  );
};

export default App;
