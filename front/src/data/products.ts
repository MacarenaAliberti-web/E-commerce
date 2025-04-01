import { CardProps } from "../types/card";

export const fakeProducts: CardProps[] = [
  {
    id: 1,
    name: "Auriculares",
    description: "Descripción del producto 1",
    price: 100,
    stock: 10,
    image: "/img1.jpg",
    categoryId: 1,
    category: {
      id: 1,
      name: "Auriculares",
    },
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2",
    price: 200,
    stock: 5,
    image: "/img2.jpg",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción del producto 3",
    price: 300,
    stock: 2,
    image: "/img3.jpg",
    categoryId: 3,
  },
];
