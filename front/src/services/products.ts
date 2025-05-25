import { apiUrl } from "@/config/apiURL";
import { IProduct } from "@/types/product";

export async function getProducts() {
  try {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products: IProduct[] = await response.json();
    return products;

  } catch (error) {

    throw new Error(`Error fetching products: ${error}`);
  }
}

export async function getProductById(id: number) {
  try {
    const response = await getProducts();
    const product = response.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  } catch (error) {
    throw new Error(`Error fetching product by id: ${error}`);
  }
}
