"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/index";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Cart() {
  const { token } = useAuthStore();
  const router = useRouter();
  const { cart } = useCartStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error("Debes iniciar sesión para acceder al carrito");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setCheckingAuth(false);
    }
  }, [token, router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <FaShoppingCart className="text-6xl text-gray-500 mb-4" />
            <p className="text-lg text-gray-400">Tu carrito está vacío.</p>
            <p className="text-sm text-gray-400 mt-2">Agrega productos para continuar comprando.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md">
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                    <p className="text-sm text-gray-400">Precio: ${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Agregá aquí lógica para eliminar producto si querés
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
