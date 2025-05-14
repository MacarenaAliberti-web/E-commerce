"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { CustomArrowProps } from "react-slick";


const images = [
  "/carousel/tech1.jpg",
  "/carousel/tech3.jpg",
  "/carousel/tech4.jpg",
  "/carousel/tech2.jpg",
];

const NextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-3xl cursor-pointer"
      onClick={onClick}
    >
      ❯
    </div>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-3xl cursor-pointer"
      onClick={onClick}
    >
      ❮
    </div>
  );
};

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full max-w-full mx-auto mb-12 relative">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`slide-${index}`}
              width={1600}
              height={500}
              className="rounded-xl shadow-md object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
