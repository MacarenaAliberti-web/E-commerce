"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-7xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl font-semibold mt-2">¡Página no encontrada!</p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

