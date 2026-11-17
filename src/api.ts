import { Product } from './types';

const BASE_URL = 'https://fakestoreapi.com';

// Fetch the list of all products
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Could not load products.');
  }
  return response.json();
}

// Fetch a single product by id
export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Could not load the product.');
  }
  return response.json();
}
