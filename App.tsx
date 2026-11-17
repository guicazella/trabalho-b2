import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CartItem, Product, Screen } from './src/types';
import StoreScreen from './src/screens/StoreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';

export default function App() {
  // State that controls which screen is shown (no navigation library)
  const [screen, setScreen] = useState<Screen>('store');
  const [productId, setProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  function openDetails(id: number) {
    setProductId(id);
    setScreen('details');
  }

  // If the product is already in the cart, add 1. Otherwise, add it as new.
  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((i) => i.product.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  // change = +1 or -1. If the quantity reaches 0, the item is removed.
  function changeQuantity(id: number, change: number) {
    setCart((current) =>
      current
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + change } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function removeFromCart(id: number) {
    setCart((current) => current.filter((i) => i.product.id !== id));
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <StatusBar style="dark" />

      {screen === 'store' && (
        <StoreScreen
          cartCount={cartCount}
          onOpenDetails={openDetails}
          onOpenCart={() => setScreen('cart')}
        />
      )}

      {screen === 'details' && productId !== null && (
        <DetailsScreen
          productId={productId}
          onBack={() => setScreen('store')}
          onAddToCart={addToCart}
          onOpenCart={() => setScreen('cart')}
        />
      )}

      {screen === 'cart' && (
        <CartScreen
          items={cart}
          onBack={() => setScreen('store')}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
          onClear={() => setCart([])}
        />
      )}
    </>
  );
}
