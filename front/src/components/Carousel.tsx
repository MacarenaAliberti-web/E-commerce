"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// Importa los estilos de slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Imágenes del carrusel (deben estar en public/carousel/)
const images = [
  "/carousel/tech1.jpg",
  "/carousel/tech3.jpg",
  "/carousel/tech4.jpg",
  "/carousel/tech2.jpg",
];

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-full mx-auto mb-12">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`slide-${index}`}
              width={1600}  // Aumenté el ancho
              height={500}  // Aumenté la altura
              className="rounded-xl shadow-md object-cover w-full h-full"  // Cambié para cubrir más área
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
