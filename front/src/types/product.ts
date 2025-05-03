export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface CardComponentProps {
  producto: IProduct;
}

