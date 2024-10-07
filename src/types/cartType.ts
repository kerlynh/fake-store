export type Cart = {
  id: string;
  userId: string;
  date: Date;
  products: ProductsFromCart[];
};

export type ProductsFromCart = {
  productId: string;
  quantity: number;
};

export type ProductCart = {
  userId: string;
  date: string;
  products: ProductsFromCart[];
};
