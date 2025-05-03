import { getProducts } from "@/services/products";
import Card from "@/components/Card";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {products.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
