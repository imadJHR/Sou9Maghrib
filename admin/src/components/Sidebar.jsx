import {
  CircleUserRound,
  LayoutGrid,
  ListOrdered,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-10 border w-16 md:w-56 h-screen items-center justify-center">
      <a
        href="/add"
        className="flex ml-2 mt-2 text-gray-700 hover:text-blue-700 transition-colors md:text-xl font-serif"
      >
        <PlusCircle />
        <p className="ml-3 hidden md:flex">Add Food</p>
      </a>

      <a
        href="/List"
        className="flex ml-2 mt-2 text-gray-700 hover:text-blue-700 transition-colors md:text-xl font-serif"
      >
        <ListOrdered />

        <p className="ml-3 hidden md:flex">List Food</p>
      </a>

      <a
        href="/orders"
        className="flex ml-2 mt-2 text-gray-700 hover:text-blue-700 transition-colors md:text-xl font-serif"
      >
        <LayoutGrid />

        <p className="ml-3 hidden md:flex">Orders Food</p>
      </a>
    </div>
  );
}
