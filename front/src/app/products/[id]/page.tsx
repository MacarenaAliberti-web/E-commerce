import { Button } from "@/components/ui/button";
import { getProductById } from "@/services/products";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

async function DetalleProducto({ params }: PageProps) {
  const product = await getProductById(Number(params.id));
  console.log(" ~ DetalleProducto ~ product:", product);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-1">{product.description}</p>
      <p className="mb-1">Precio: ${product.price}</p>
      <p className="mb-1">Stock: {product.stock}</p>
      <p className="mb-4">Categoría: {product.categoryId}</p>

      <div className="mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={256}
          height={256}
          className="object-contain rounded"
        />
      </div>

      <Button variant="outline">Agregar al carrito</Button>
    </div>
  );
}

export default DetalleProducto;