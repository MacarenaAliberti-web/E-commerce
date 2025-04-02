import { CardProps } from "../types/card";

export const fakeProducts: CardProps[] = [
  {
    id: 1,
    name: "Auriculares",
    description: "Auriculares Gamer Gadnic A2000 LED Compatible Pc Play Consolas",
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
    name: "Auriculares",
    description: "Auriculares Gamer Gadnic A2000 LED Compatible Pc Play Consolas",
    price: 200,
    stock: 5,
    image: "/img2.jpg",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Auriculares",
    description: "Auriculares Inalámbricos Shokz OpenFit - Negro - Garmin ",
    price: 100,
    stock: 2,
    image: "/img3.jpg",
    categoryId: 3,
  },
];
