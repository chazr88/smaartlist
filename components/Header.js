import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smaart List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8dc6ff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    color: "#212121",
    alignSelf: "center",
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10
  },
});

export default Header;
