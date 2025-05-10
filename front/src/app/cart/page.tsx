"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import store from "@/store/index";


export default function Cart() {
  const router = useRouter();
  const { userData, cart, setCart } = store(); // ✅ usamos cart desde Zustand
  const token = userData?.token;

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

  const handleRemove = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  const handleCheckout = async () => {
    try {
      const products = cart.map((item) => item.id ?? 0);
      const userId = userData?.user.id;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ userId, products }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al procesar la compra:", errorData);
        throw new Error("Error al procesar la compra");
      }

      toast.success("Compra realizada con éxito");
      setCart([]);
    } catch (error) {
      toast.error("Hubo un problema al finalizar la compra");
      console.error(error);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">Verificando sesión...</p>
      </div>
    );
  }

  const cartLength = cart.length;

  return (
    <div className="min-h-screen bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Carrito de Compras</h1>

        {cartLength === 0 ? (
          <div className="text-center">
            <FaShoppingCart className="text-6xl text-gray-500 mb-4" />
            <p className="text-lg text-gray-400">Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
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
                      <p className="text-sm text-gray-400">Precio: ${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id ?? 0)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center text-center mt-12">
              <p className="text-lg font-semibold">
                Total de productos:{" "}
                <span className="text-white">{cartLength}</span>
              </p>
              <p className="text-lg font-semibold mt-2">
                Total a pagar:{" "}
                <span className="text-white">
                  ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </span>
              </p>

              <button
                onClick={handleCheckout}
                className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
