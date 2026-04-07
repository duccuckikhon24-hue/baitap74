import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import colors from "../styles/colors";
import { products } from "../data/data";

function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.subtitle}</Text>

      <View style={styles.cardBottom}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.plusBtn}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("Egg");

  const filteredProducts = useMemo(() => {
    const text = keyword.trim().toLowerCase();

    if (!text) return products;

    return products.filter((item) => {
      return (
        item.name.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text) ||
        item.brand.toLowerCase().includes(text)
      );
    });
  }, [keyword]);

  return (
    <View style={styles.safe}>
      <View style={styles.searchRow}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            style={styles.searchInput}
          />
          {keyword.length > 0 && (
            <TouchableOpacity onPress={() => setKeyword("")}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 18,
    paddingHorizontal: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 18,
  },
  searchWrap: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F2F3F2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: {
    fontSize: 18,
    color: "#7C7C7C",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  clearText: {
    fontSize: 16,
    color: "#A0A0A0",
    marginLeft: 8,
  },
  filterIcon: {
    fontSize: 22,
    color: colors.text,
    marginLeft: 14,
  },
  list: {
    paddingBottom: 110,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: 90,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    color: colors.subText,
    marginBottom: 18,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  plusBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 30,
  },
});