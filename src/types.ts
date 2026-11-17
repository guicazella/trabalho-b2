// Types used across the app

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export type CartItem = {
  product: Product;
  quantity: number;
};

// The three screens of the app (switched by state in App.tsx)
export type Screen = 'store' | 'details' | 'cart';
