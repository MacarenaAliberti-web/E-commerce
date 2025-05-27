"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import store, { useStoreHasHydrated } from "@/store/index";

export default function Cart() {
  const router = useRouter();
  const hasHydrated = useStoreHasHydrated();
  const { userData, cart, setCart } = store();

  const [isHydrated, setIsHydrated] = useState(false);

  
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState<number | null>(null);

  
  useEffect(() => {
    if (hasHydrated) {
      setIsHydrated(true);
    }
  }, [hasHydrated]);

  
  useEffect(() => {
    if (isHydrated && !store.getState().isAuthenticated()) {
      toast.error("Debes iniciar sesión para acceder al carrito");
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">Cargando datos...</p>
      </div>
    );
  }

  if (!store.getState().isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">Redirigiendo al login...</p>
      </div>
    );
  }

  
  const confirmRemove = (id: number) => {
    setProductToRemove(id);
    setShowModal(true);
  };

  
  const handleRemove = () => {
    if (productToRemove !== null) {
      setCart(cart.filter((item) => item.id !== productToRemove));
      toast.success("Producto eliminado del carrito");
    }
    setShowModal(false);
    setProductToRemove(null);
  };

  const handleCheckout = async () => {
    try {
      const products = cart.map((item) => item.id);
      const userId = userData?.user.id;
      const token = userData?.token;

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

  const cartLength = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

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
                       <div className="flex items-center gap-2 mt-2">
      <button
        disabled
        className="px-2 py-1 bg-gray-600 text-white rounded cursor-not-allowed opacity-50"
      >
        +
      </button>
      <span>1</span>
      <button
        disabled
        className="px-2 py-1 bg-gray-600 text-white rounded cursor-not-allowed opacity-50"
      >
        -
      </button>
                   </div>
                    </div>
                  </div>
                  <button
                    onClick={() => item.id !== undefined && confirmRemove(item.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center text-center mt-12">
              <p className="text-lg font-semibold">
                Total de productos: <span className="text-white">{cartLength}</span>
              </p>
              <p className="text-lg font-semibold mt-2">
                Total a pagar: <span className="text-white">${totalPrice}</span>
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

      
      {showModal && (
  <div className="fixed z-50 flex items-center justify-center inset-0">
    <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-xs relative z-10"> {/* Modal centrado */}
      <h2 className="text-lg font-semibold mb-4 text-black">
        ¿Estás seguro que deseas eliminar este producto del carrito?
      </h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-black"
        >
          Cancelar
        </button>
        <button
          onClick={handleRemove}
          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}