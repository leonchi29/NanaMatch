import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSignup() {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return Alert.alert("Error", error?.message ?? "No se pudo crear");
    await supabase.from("profiles").insert({ id: data.user.id, name, plan: "lite" }).onConflict("id").ignore();
    navigation.replace("Match");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Crear cuenta</Text>
      <TextInput placeholder="Nombre" onChangeText={setName} value={name} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Correo" autoCapitalize="none" onChangeText={setEmail} value={email} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} value={password} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <Pressable onPress={onSignup} style={{ backgroundColor: "#16a34a", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Registrarse</Text>
      </Pressable>
    </View>
  );
}
