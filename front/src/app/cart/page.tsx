"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { token } = useAuthStore();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/"); // Redirige al home si no hay sesión
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
        <div className="text-center">
          <FaShoppingCart className="text-6xl text-gray-500 mb-4" />
          <p className="text-lg text-gray-400">Tu carrito está vacío.</p>
          <p className="text-sm text-gray-400 mt-2">Agrega productos para continuar comprando.</p>
        </div>
      </div>
    </div>
  );
}
