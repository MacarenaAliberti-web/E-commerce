import React from "react";
import Image from "next/image";
import { CardComponentProps } from "../types/card";

export const Card: React.FC<CardComponentProps> = ({ producto }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs mx-auto flex flex-col items-center text-center">
      <div className="w-full flex flex-col items-center">
        <Image
          src={producto.image}
          alt={producto.name}
          width={200}
          height={200}
          className="w-full h-auto rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{producto.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{producto.description}</p>
        <p className="text-lg font-bold text-green-500 mb-2">${producto.price}</p>
        <p className="text-sm text-gray-500 mb-4">Stock: {producto.stock}</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full transition duration-300">
        Ver detalles
      </button>
    </div>
  );
};

export default Card;
