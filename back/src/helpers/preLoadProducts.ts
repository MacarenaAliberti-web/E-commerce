import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    price: 699,
    description:
      "Experimenta el poder y la elegancia con el iPhone 11: captura momentos impresionantes con su sistema de cámara dual, disfruta de un rendimiento excepcional y sumérgete en una brillante pantalla Liquid Retina. ¡Descubre un mundo de posibilidades en la palma de tu mano!",
    image:
      "https://www.apple.com/newsroom/images/tile-images/Apple_iphone_11-rosette-family-lineup-091019.jpg.news_app_ed.jpg",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Abraza la eficiencia y la sofisticación con el MacBook Air: su diseño liviano se combina con un rendimiento potente, la impresionante pantalla Retina da vida a tu trabajo, y la batería de larga duración te mantiene productivo dondequiera que vayas. Eleva tu experiencia informática con el MacBook Air.",
    image:
      "https://m.media-amazon.com/images/I/51FJlZmqO8L.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
     "Desata tu creatividad y productividad con el iPad Pro: su potente rendimiento, impresionante pantalla Liquid Retina y batería de larga duración hacen del iPad Pro la herramienta perfecta para trabajar y disfrutar. Transforma tus ideas en realidad con el iPad Pro.",
    image:
      "https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-pro-spring21_hero_04202021_big.jpg.large.jpg",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch Series 6",
    price: 399,
    description:
     "Mantente conectado y saludable con el Apple Watch Series 6: registra tus entrenamientos, monitorea tu salud y mantente en contacto con las personas y la información que más te importan. Experimenta el futuro de la salud y el bienestar con el Apple Watch Series 6.",
    image:
      "https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020.jpg.news_app_ed.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods Pro",
    price: 249,
    description:
     "Sumérgete en el sonido con los AirPods Pro: la cancelación activa de ruido, el modo de transparencia y el ajuste personalizable hacen de los AirPods Pro el compañero perfecto para la música, las llamadas y todo lo demás. Eleva tu experiencia de audio con los AirPods Pro.",
    image:
      "https://www.apple.com/v/airpods-pro/m/images/meta/og__eui2mpgzwyaa_overview.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
     "Eleva tu experiencia de audio en casa con el HomePod mini: sonido envolvente, asistente inteligente y centro de control para el hogar hacen del HomePod mini la adición perfecta para tu hogar. Disfruta de un mundo de música, noticias y mucho más con el HomePod mini.",
    image:
      "https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png",
    categoryId: 6,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
