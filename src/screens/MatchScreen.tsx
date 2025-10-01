import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";

type Nana = {
  id: string;
  name: string;
  age: number;
  comuna: string;
  rating: number;
};

export default function MatchScreen() {
  const [nanas, setNanas] = useState<Nana[]>([]);

  async function fetchNanas() {
    const { data, error } = await supabase.from("nanas").select("*").limit(5);
    if (error) return Alert.alert("Error", error.message);
    setNanas(data ?? []);
  }

  useEffect(() => { fetchNanas(); }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Tus nanas recomendadas</Text>
      <FlatList
        data={nanas}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <Text style={{ fontWeight: "600" }}>{item.name} · {item.age} años</Text>
            <Text>{item.comuna} · ⭐{item.rating}</Text>
            <Pressable style={{ backgroundColor: "#e5e7eb", marginTop: 8, padding: 8, borderRadius: 8 }}>
              <Text>💬 Chatear</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
