"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Loader2, ShoppingBag } from "lucide-react";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (!data.error && Array.isArray(data)) {
          setProducts(data);
          const uniqueCats = Array.from(new Set(data.map((p: any) => p.category)));
          setCategories(["All", ...uniqueCats]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen border-t dark:border-gray-800">
      <div className="bg-gradient-to-r from-primary to-accent-foreground pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 shadow-sm tracking-tight drop-shadow-lg">Premium Products</h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">Discover our wide range of high-quality products across multiple categories. Shop and earn PV on every purchase.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[500px]">
        {loading ? (
           <div className="flex items-center justify-center p-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
        ) : (
          <>
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      activeCategory === cat 
                        ? "bg-secondary text-white shadow-xl shadow-secondary/40 -translate-y-1" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-0.5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
               <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg max-w-3xl mx-auto flex flex-col items-center">
                 <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
                   <ShoppingBag className="w-12 h-12" />
                 </div>
                 <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">No Products Yet</h3>
                 <p className="text-gray-500 font-medium text-lg max-w-sm">Products uploaded by the Administrator from the CMS panel will appear right here.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index % 10 * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 group hover:border-primary/30 transition-all flex flex-col"
                  >
                    <div className="relative h-72 overflow-hidden bg-gray-200">
                      <img 
                        src={product.image?.startsWith('/') || product.image?.startsWith('data:') || product.image?.startsWith('http') ? product.image : `https://images.unsplash.com/photo-${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1586201375761-83865001e31c" }}
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 text-secondary fill-secondary" /> {4.8}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">{product.category}</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm flex-grow line-clamp-2 mb-6 font-medium leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between pt-6 border-t dark:border-gray-800 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-sm text-emerald-500 font-bold mb-1">+{product.pv} PV</span>
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹{product.price}</span>
                        </div>
                        <button className="flex items-center justify-center w-12 h-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-md group-hover:scale-110">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
