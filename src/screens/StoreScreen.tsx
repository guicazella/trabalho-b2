import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Product } from '../types';
import { fetchProducts } from '../api';

type Props = {
  cartCount: number;
  onOpenDetails: (id: number) => void;
  onOpenCart: () => void;
};

export default function StoreScreen({ cartCount, onOpenDetails, onOpenCart }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load products from the API when the screen opens
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        setError('Error loading products. Check your internet connection.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Store</Text>
        <TouchableOpacity style={styles.cartButton} onPress={onOpenCart}>
          <Text style={styles.cartButtonText}>Cart ({cartCount})</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => onOpenDetails(item.id)}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              <Text style={styles.productName} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  cartButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cartButtonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    maxWidth: '47%',
  },
  image: { width: '100%', height: 130, marginBottom: 8 },
  productName: { fontSize: 13, marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#16a34a' },
  error: { textAlign: 'center', color: 'red', marginTop: 40, paddingHorizontal: 20 },
});
