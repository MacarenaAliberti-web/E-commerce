import React from "react";
import Image from "next/image";
import { CardProps } from "../types/card";

interface CardComponentProps {
  producto: CardProps;
}

export const Card: React.FC<CardComponentProps> = ({ producto }) => {
  return (
    <div className="card">
      <div className="card-content">
        <Image src={producto.image} alt={producto.name} width={200} height={200} className="card-image" />
        <h2 className="card-title">{producto.name}</h2>
        <p className="card-description">{producto.description}</p>
        <p className="card-price">${producto.price}</p>
        <p className="card-stock">Stock: {producto.stock}</p>
      </div>
      <button className="card-button">Agregar al carrito</button>
      <button className="card-button">Ver detalles</button>
    </div>
  );
};

export default Card;