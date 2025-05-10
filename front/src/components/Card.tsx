"use client";
import React from "react";
import Image from "next/image";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import store from "@/store/index";

interface CardProps {
  producto: IProduct;
}

export const Card: React.FC<CardProps> = ({ producto }) => {
  const { userData, cart, setCart } = store(); // ✅ usamos setCart del store
  const token = userData?.token;
  const router = useRouter();

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Para sumar productos al carrito tienes que iniciar sesión");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    const exists = cart.find((p) => p.id === producto.id);
    if (exists) {
      toast.error("Este producto ya está en el carrito");
      return;
    }

    setCart([...cart, producto]); // ✅ actualizamos el carrito global Zustand
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-72 h-[460px] flex flex-col justify-between items-center text-center transition transform hover:scale-105 duration-300">
      <Image
        src={producto.image}
        alt={producto.name}
        width={160}
        height={160}
        className="rounded-md mb-3 object-cover"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{producto.name}</h2>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.description}</p>
      <p className="text-base font-bold text-gray-800 mb-1">${producto.price}</p>
      <p className="text-sm text-gray-500 mb-3">Stock: {producto.stock}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 text-sm transition duration-300"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default Card;

