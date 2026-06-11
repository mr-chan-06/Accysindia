// src/app/products-and-plans/page.tsx
"use client";

import Products from "@/app/products/page";

export default function ProductsAndPlans() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Render Products */}
      <Products />
    </div>
  );
}
