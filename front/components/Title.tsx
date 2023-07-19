import { StyleSheet, Text } from "react-native";
import { FC, PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
