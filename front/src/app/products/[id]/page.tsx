"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { getProductById } from "@/services/products";
import store from "@/store/index";
import { IProduct } from "@/types/product"; 
import { useRouter } from "next/navigation"; 

export default function DetalleProducto() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null); 
  const [loading, setLoading] = useState(true);

  const { userData, cart, setCart } = store();
  const token = userData?.token; 

  const router = useRouter(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(Number(id));
        setProduct(result);
      } catch (error) {
        toast.error("Error al cargar el producto");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
  store.setState({ redirectAfterLogin: window.location.pathname });
  toast.error("Para agregar productos al carrito, debes iniciar sesión");
  setTimeout(() => {
    router.push("/login");
  }, 1500);
  return;
}


    if (!product) return;

    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast("Este producto ya está en el carrito", { icon: "ℹ️" });
      return;
    }

    setCart([...cart, product]);
    toast.success("Producto agregado al carrito");
  };

  const handleViewAllProducts = () => {
    router.push("/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="p-4 max-w-2xl w-full bg-gray-900 rounded-lg shadow-md text-white">
        
        <div className="flex items-center">
          
          <div className="w-1/3 mr-4">
            <Image
              src={product.image}
              alt={product.name}
              width={200}  
              height={200} 
              className="object-contain rounded"
            />
          </div>

          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="mb-1">{product.description}</p>
            <p className="mb-1">Precio: ${product.price}</p>
            <p className="mb-1">Stock: {product.stock}</p>
            <p className="mb-4">Categoría: {product.categoryId}</p>
          </div>
        </div>

        
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-gray-800 text-white py-1.5 px-4 rounded-md hover:bg-gray-400 text-sm transition duration-300 cursor-pointer w-48 flex items-center justify-center"
          >
            Agregar al carrito 🛒
          </button>

          <button
            onClick={handleViewAllProducts}
            className="bg-blue-600 text-white py-1.5 px-4 rounded-md hover:bg-blue-700 text-sm transition duration-300 cursor-pointer w-48"
          >
            Volver a los productos
          </button>
        </div>
      </div>
    </div>
  );
}

