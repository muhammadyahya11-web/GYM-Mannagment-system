import { Apple, Flame, CheckCircle } from "lucide-react";

export default function DietPlan() {
  const plan = {
    goal: "Fat Loss",
    calories: 2200,
    protein: "160g",
    carbs: "200g",
    fats: "60g",
  };

  const meals = [
    {
      title: "Breakfast",
      items: ["Oats with eggs", "Green tea"],
    },
    {
      title: "Lunch",
      items: ["Grilled chicken", "Brown rice", "Salad"],
    },
    {
      title: "Snack",
      items: ["Protein shake", "Almonds"],
    },
    {
      title: "Dinner",
      items: ["Fish / Chicken", "Vegetables"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-[#11162a] rounded-2xl p-6">
          <h1 className="text-2xl font-bold">Diet Plan</h1>
          <p className="text-sm text-gray-400 mt-1">
            Personalized nutrition plan to achieve your fitness goals
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Goal" value={plan.goal} icon={<Flame />} />
          <StatCard title="Calories" value={`${plan.calories} kcal`} icon={<Apple />} />
          <StatCard title="Protein" value={plan.protein} icon={<CheckCircle />} />
          <StatCard title="Carbs / Fats" value={`${plan.carbs} / ${plan.fats}`} icon={<CheckCircle />} />
        </div>

        {/* Meals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map(meal => (
            <div key={meal.title} className="bg-[#11162a] rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">{meal.title}</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                {meal.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-[#11162a] rounded-xl p-6 text-sm text-gray-400">
          <p>
            ⚠️ This diet plan is a general guideline. For medical conditions or allergies,
            consult a certified nutritionist.
          </p>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
      <div className="text-indigo-400">{icon}</div>
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
