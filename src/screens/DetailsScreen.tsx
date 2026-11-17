import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Product } from '../types';
import { fetchProduct } from '../api';

type Props = {
  productId: number;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
};

export default function DetailsScreen({ productId, onBack, onAddToCart, onOpenCart }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  // Fetch the product from the API by id
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProduct(productId);
        setProduct(data);
      } catch (e) {
        setError('Error loading the product.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  function handleAdd() {
    if (product) {
      onAddToCart(product);
      setAdded(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <View style={{ width: 60 }} />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {product && (
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </Text>
          <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add to cart</Text>
          </TouchableOpacity>

          {added && (
            <TouchableOpacity onPress={onOpenCart}>
              <Text style={styles.cartLink}>Product added! Tap here to see your cart</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  back: { fontSize: 16, color: '#2563eb', width: 60 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  image: { width: '100%', height: 250, marginBottom: 16 },
  category: { color: '#6b7280', textTransform: 'capitalize', marginBottom: 4 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  rating: { marginBottom: 8, color: '#374151' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#16a34a', marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 22, color: '#374151', marginBottom: 20 },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cartLink: {
    textAlign: 'center',
    color: '#2563eb',
    marginTop: 14,
    textDecorationLine: 'underline',
  },
  error: { textAlign: 'center', color: 'red', marginTop: 40 },
});
