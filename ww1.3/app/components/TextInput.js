import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function TextInput({
  errorText,
  description,
  secureTextEntry,
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: theme.colors.surface,
    minHeight: 50
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8
  }
});
