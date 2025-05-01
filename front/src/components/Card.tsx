import React from "react";
import Image from "next/image";
import { CardComponentProps } from "../types/card";

export const Card: React.FC<CardComponentProps> = ({ producto }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-64 flex flex-col items-center text-center transition transform hover:scale-105 duration-300">
      <Image
        src={producto.image}
        alt={producto.name}
        width={160}
        height={160}
        className="rounded-md mb-3 object-cover"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{producto.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{producto.description}</p>
      <p className="text-base font-bold text-green-600 mb-1">${producto.price}</p>
      <p className="text-sm text-gray-500 mb-3">Stock: {producto.stock}</p>
      <button className="mt-auto bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 text-sm transition duration-300">
        Ver detalles
      </button>
    </div>
  );
};

export default Card;
