import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { app } from "../../../firebaseConfig";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); // Додаємо стан для помилок
  const auth = getAuth(app);
  const router = useRouter(); // For navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.replace("/"); // Navigate to the home screen after successful login
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedEmail = await SecureStore.getItemAsync("email");
        const storedPassword = await SecureStore.getItemAsync("password");

        if (storedEmail && storedPassword) {
          await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
          console.log("User logged in automatically!");
        }
      } catch (error) {
        console.error("Error retrieving credentials:", error);
      }
    };

    restoreUser();
  }, [auth]);

  const handleAuthentication = async () => {
    setError(""); // Очистити помилку перед новою спробою
    try {
      if (user) {
        await signOut(auth);
        await SecureStore.deleteItemAsync("email");
        await SecureStore.deleteItemAsync("password");
        console.log("User logged out and credentials cleared successfully!");
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
          await SecureStore.setItemAsync("email", email);
          await SecureStore.setItemAsync("password", password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully!");
          await SecureStore.setItemAsync("email", email);
          await SecureStore.setItemAsync("password", password);
        }
      }
    } catch (error) {
      setError(error.message); // Зберігаємо повідомлення про помилку
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {/* Відображення помилки */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleAuthentication}
        />
      </View>
      <View>
        <Text onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red", // Колір тексту для помилок
    marginBottom: 16,
    textAlign: "center",
  },
});
