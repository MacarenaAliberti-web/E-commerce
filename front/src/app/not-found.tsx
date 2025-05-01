"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-[#0a192f] text-white px-4"
      style={{
        backgroundImage: "url('/backgrounds/bg404.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-6xl font-extrabold text-blue-400 drop-shadow-lg">404</h1>
      <p className="text-2xl font-bold mt-4 text-blue-100">¡Página no encontrada!</p>
      <p className="text-md text-blue-200 mt-2 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Volver al inicio
      </Link>
    </div>
  );
}


