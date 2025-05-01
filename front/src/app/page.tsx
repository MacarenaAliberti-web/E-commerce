"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { fakeProducts } from "../data/products";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredProducts = fakeProducts.filter((producto) =>
    producto.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <Carousel />

      <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Bienvenidos a mi Mundo Tecnológico
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="text-white text-center mt-4">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}
