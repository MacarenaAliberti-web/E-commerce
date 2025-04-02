import React from "react";
import Card from "../components/Card";
import { fakeProducts } from "../data/products";

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Bienvenidos a mi Mundo Tecnológico
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {fakeProducts.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
