import { CardProps } from "../types/card";

export const fakeProducts: CardProps[] = [
  {
    id: 1,
    name: "Tablet",
    description: "Pantalla HD, 64GB de almacenamiento y batería de larga duración.",
    price: 100,
    stock: 10,
    image: "/fakeProducts/fake1.jpg",
    categoryId: 1,
    category: {
      id: 1,
      name: "Tablet",
    },
  },
  {
    id: 2,
    name: "Notebook",
    description: "Notebook ultradelgada con procesador Intel i5 y 8GB de RAM.",
    price: 200,
    stock: 5,
    image: "/fakeProducts/fake2.jpg",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Auriculares",
    description: "Auriculares inalámbricos con cancelación de ruido y micrófono integrado.",
    price: 100,
    stock: 2,
    image: "/fakeProducts/fake3.jpg",
    categoryId: 3,
  },
];
