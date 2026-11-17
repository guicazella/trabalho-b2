import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { CartItem } from '../types';

type Props = {
  items: CartItem[];
  onBack: () => void;
  onChangeQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
};

export default function CartScreen({
  items,
  onBack,
  onChangeQuantity,
  onRemove,
  onClear,
}: Props) {
  // Sum the price of all items
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Store</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <View style={{ width: 60 }} />
      </View>

      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => String(item.product.id)}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={2} style={styles.name}>
                    {item.product.title}
                  </Text>
                  <Text style={styles.price}>
                    $ {(item.product.price * item.quantity).toFixed(2)}
                  </Text>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => onChangeQuantity(item.product.id, -1)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => onChangeQuantity(item.product.id, 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onRemove(item.product.id)}>
                      <Text style={styles.remove}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: $ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.clearButton} onPress={onClear}>
              <Text style={styles.clearButtonText}>Clear cart</Text>
            </TouchableOpacity>
          </View>
        </>
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
  back: { fontSize: 16, color: '#2563eb', width: 60 },
  title: { fontSize: 20, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16, color: '#6b7280' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, marginRight: 12 },
  name: { fontSize: 14, marginBottom: 4 },
  price: { fontWeight: 'bold', color: '#16a34a', marginBottom: 6 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    backgroundColor: '#e5e7eb',
    width: 30,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
  quantity: { marginHorizontal: 12, fontSize: 16 },
  remove: { color: 'red', marginLeft: 16 },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  clearButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: { color: 'red', fontWeight: 'bold' },
});
