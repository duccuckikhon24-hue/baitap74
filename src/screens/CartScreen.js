import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "../components/Button";
import colors from "../styles/colors";
import { cartItems as initialCart } from "../data/data";

export default function CartScreen() {
  const [items, setItems] = useState(initialCart);

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  const renderItem = ({ item }) => (
    <View style={styles.itemWrap}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={styles.infoWrap}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.remove}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => decreaseQty(item.id)}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.qty}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => increaseQty(item.id)}
            >
              <Text style={[styles.qtyBtnText, { color: colors.primary }]}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.safe}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Button
            title={`Go to Checkout        $${total.toFixed(2)}`}
            onPress={() => {}}
            style={styles.checkoutButton}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 28,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 18,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  itemWrap: {
    flexDirection: "row",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  infoWrap: {
    flex: 1,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: colors.subText,
  },
  remove: {
    fontSize: 24,
    color: "#B3B3B3",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 24,
    color: "#B3B3B3",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginHorizontal: 18,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  checkoutButton: {
    marginTop: 24,
  },
});