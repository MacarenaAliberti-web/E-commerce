"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { getProducts } from "@/services/products";
import { IProduct } from "@/types/product";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((producto) =>
    producto.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      {/* Carrusel */}
      <Carousel />

      <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Bienvenidos a mi Mundo Tecnológico
      </h1>

      {loading ? (
        <p className="text-white text-center">Cargando productos...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProducts.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-4">No se encontraron productos.</p>
      )}
    </div>
  );
}
