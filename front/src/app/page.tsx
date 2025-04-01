import React from "react";
import Card from "../components/Card";
import { fakeProducts } from "../data/products";

export default function Home() {
  return (
    <div>
      <h1>Bienvenidos a mi E-commerce</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {fakeProducts.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
