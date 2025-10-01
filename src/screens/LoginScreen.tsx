import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert("Error", error.message);

    await supabase.from("profiles").upsert({ id: data.user.id, plan: "lite" });
    navigation.replace("Match");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Iniciar sesión</Text>
      <TextInput placeholder="Correo" autoCapitalize="none" onChangeText={setEmail} value={email} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} value={password} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Pressable onPress={onLogin} style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Entrar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={{ textAlign: "center", color: "#2563eb" }}>Crear cuenta</Text>
      </Pressable>
    </View>
  );
}
