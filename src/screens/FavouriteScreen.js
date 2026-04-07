import React from "react";
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
import { products } from "../data/data";

export default function FavouriteScreen() {
  const favouriteItems = products.filter((item) => item.isFavourite);

  const renderItem = ({ item }) => (
    <View style={styles.itemWrap}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={styles.infoWrap}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.subtitle}</Text>
      </View>

      <View style={styles.rightWrap}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.safe}>
      <Text style={styles.title}>Favourite</Text>

      <FlatList
        data={favouriteItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Button
            title="Add All To Cart"
            onPress={() => {}}
            style={styles.button}
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
    alignItems: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  infoWrap: {
    flex: 1,
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
  rightWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginRight: 12,
  },
  arrow: {
    fontSize: 28,
    color: colors.text,
  },
  button: {
    marginTop: 24,
  },
});