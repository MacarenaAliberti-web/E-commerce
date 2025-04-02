"use client";

import { useParams } from "next/navigation";

export default function DetalleProducto() {
  const params = useParams();
  const productId = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold">Detalle del Producto: {productId}</h1>
    </div>
  );
}