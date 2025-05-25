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
  const { userData, cart, setCart, setRedirectAfterLogin } = store();
  const token = userData?.token;
  const router = useRouter();

  const handleAddToCart = () => {
    if (!token) {
    setRedirectAfterLogin(window.location.pathname);
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

    setCart([...cart, producto]);
    toast.success("Producto agregado al carrito");
  };

  const handleViewDetails = () => {
    router.push(`/products/${producto.id}`);
  };

 return (
  <div className="bg-white rounded-xl shadow-lg p-6 w-80 h-[350px] flex flex-col items-center justify-between text-center transition transform hover:scale-105 hover:shadow-xl duration-300">
    <div className="flex flex-col items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">{producto.name}</h2>
      <Image
        src={producto.image}
        alt={producto.name}
        width={160}
        height={160}
        className="rounded-md object-cover shadow-md transition duration-300 hover:scale-105"
      />
    </div>

   <div className="flex justify-center items-center w-full mt-4 gap-2">
  <div className="relative group">
    <button
      onClick={handleAddToCart}
      aria-label="Agregar al carrito"
      className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 text-xl w-12 h-12 flex items-center justify-center transition duration-300"
    >
      🛒
    </button>
    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
      Agregar al carrito
    </span>
  </div>

  <button
    onClick={handleViewDetails}
    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 text-sm transition duration-300"
  >
    Ver detalles
  </button>
</div>

  </div>
);

}
export default Card;


