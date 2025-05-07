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
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCartStore();

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

  const handleCheckout = async () => {
    try {
      const productIds = cart.map((item) => item.id);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: productIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al procesar la compra:", errorData);
        throw new Error("Error al procesar la compra");
      }

      toast.success("Compra realizada con éxito");
      clearCart();
      router.push("/misCompras");
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
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => item.id !== undefined && decrementQuantity(item.id)}
                          className="bg-gray-600 px-2 py-1 rounded text-white hover:bg-gray-500"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => item.id !== undefined && incrementQuantity(item.id)}
                          className="bg-gray-600 px-2 py-1 rounded text-white hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {item.id !== undefined && (
                    <button
                      onClick={() => removeFromCart(item.id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 bg-gray-700 p-4 rounded-md text-right">
                <p className="text-lg font-semibold">
                  Total de productos:{" "}
                  <span className="text-green-400">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </p>
                <p className="text-lg font-semibold">
                  Total a pagar:{" "}
                  <span className="text-green-400">
                    $
                    {cart
                      .reduce((acc, item) => acc + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md"
            >
              Finalizar compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}
