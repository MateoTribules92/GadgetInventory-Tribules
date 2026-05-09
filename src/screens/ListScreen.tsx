import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { listStyles, COLORS } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { Gadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"List">;

export const ListScreen = ({ navigation }: Props) => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  // Cargar gadgets cuando la pantalla vuelve a estar visible
  useFocusEffect(
    useCallback(() => {
      loadGadgets();
    }, [])
  );

  const loadGadgets = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await gadgetService.getAll();
      setGadgets(data);
    } catch (error) {
      Alert.alert("Error", "No se pueden cargar los gadgets");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para color de badge según categoría
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "laptop":
        return COLORS.laptop;
      case "phone":
        return COLORS.phone;
      case "tablet":
        return COLORS.tablet;
      default:
        return COLORS.gray;
    }
  };

  // Filtrar gadgets por nombre
  const filteredGadgets = gadgets.filter((g) =>
    g.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={listStyles.container}>
      {/* Header con título y badge de cantidad */}
      <View style={listStyles.headerContainer}>
        <Text style={listStyles.headerTitle}>Mis Gadgets</Text>
        <View style={listStyles.headerBadge}>
          <Text style={listStyles.headerBadgeText}>{gadgets.length} ITEMS</Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="🔍 Buscar por nombre..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de gadgets */}
      <FlatList
        data={filteredGadgets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={listStyles.list}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>
            {loading
              ? "Cargando..."
              : searchText
              ? "Gadget no encontrado"
              : "Todavía no hay gadgets. Agrega el primero!"}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            {/* Icono representativo */}
            <View style={listStyles.cardIcon}>
              <Text style={listStyles.cardIconText}>
                {item.category === "Laptop"
                  ? "💻"
                  : item.category === "Phone"
                  ? "📱"
                  : "📱"}
              </Text>
            </View>

            <Text style={listStyles.cardName}>{item.name}</Text>
            <Text style={listStyles.cardDetail}>{item.brand}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={[listStyles.categoryPill, { backgroundColor: getCategoryColor(item.category) }]}>
                <Text style={listStyles.categoryText}>{item.category.toUpperCase()}</Text>
              </View>
              <View>
                <Text style={listStyles.cardPrice}>${item.price}</Text>
                <Text style={listStyles.cardYear}>{item.purchaseYear}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Botón flotante para agregar gadget */}
      <TouchableOpacity
        style={listStyles.fab}
        onPress={() => navigation.navigate("Form", {})}
        disabled={false} // asegura boolean
      >
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};