// src/app/products-and-plans/page.tsx
"use client";

import Products from "@/app/products/page";
import Plans from "@/app/plans/page";

export default function ProductsAndPlans() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Render Products */}
      <Products />
      {/* Divider */}
      <div className="my-16" />
      {/* Render Plans */}
      <Plans />
    </div>
  );
}
