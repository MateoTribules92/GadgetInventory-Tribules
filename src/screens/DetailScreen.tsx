import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import { detailStyles, COLORS } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { Gadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";
import { useFocusEffect } from "@react-navigation/native";

type Props = ScreenProps<"Detail">;

export const DetailScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const [gadget, setGadget] = useState<Gadget | null>(null);

  // Cargar gadget cada vez que la pantalla está visible
  useFocusEffect(
    useCallback(() => {
      loadGadget();
    }, [])
  );

  const loadGadget = async (): Promise<void> => {
    try {
      const data = await gadgetService.getById(id);
      setGadget(data);
      if (data === null) {
        Alert.alert("Error", "Gadget no encontrado");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el gadget");
      console.error(error);
    }
  };

  // Confirmar eliminación
  const confirmDelete = (): void => {
    if (!gadget) return;

    Alert.alert(
      "Eliminar Gadget",
      `¿Estás seguro que quieres eliminar "${gadget.name}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: handleDelete },
      ]
    );
  };

  // Manejar eliminación
  const handleDelete = async (): Promise<void> => {
    if (!gadget) return;

    try {
      await gadgetService.delete(gadget.id);
      Alert.alert("Éxito", "Gadget eliminado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el gadget");
      console.error(error);
    }
  };

  if (!gadget) {
    return (
      <View style={detailStyles.container}>
        <Text style={detailStyles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Determinar color del badge según categoría
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

  return (
    <ScrollView style={detailStyles.container}>
      {/* Hero con icono y badge de categoría */}
      <View style={detailStyles.hero}>
        <View style={detailStyles.iconPlaceholder}>
          {/* Aquí puedes poner un icono o imagen real del gadget */}
          <Text style={detailStyles.iconText}>📱</Text>
        </View>
        <View style={[detailStyles.categoryBadge, { backgroundColor: getCategoryColor(gadget.category) }]}>
          <Text style={detailStyles.categoryText}>{gadget.category.toUpperCase()}</Text>
        </View>
      </View>

      {/* Card de información */}
      <View style={detailStyles.card}>
        <View style={detailStyles.row}>
          <View style={detailStyles.column}>
            <Text style={detailStyles.label}>Nombre</Text>
            <Text style={detailStyles.value}>{gadget.name}</Text>
          </View>
        </View>
        <View style={detailStyles.row}>
          <View style={detailStyles.column}>
            <Text style={detailStyles.label}>Marca</Text>
            <Text style={detailStyles.value}>{gadget.brand}</Text>
          </View>
          <View style={detailStyles.column}>
            <Text style={detailStyles.label}>Año</Text>
            <Text style={detailStyles.value}>{gadget.purchaseYear}</Text>
          </View>
        </View>

        {/* Card de precio */}
        <View style={detailStyles.priceCard}>
          <Text style={detailStyles.priceText}>${gadget.price}</Text>
        </View>

        {/* Botones Edit y Delete */}
        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity
            style={detailStyles.editButton}
            onPress={() => navigation.navigate("Form", { id: gadget.id })}

          >
            <Text style={detailStyles.editButtonText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={detailStyles.deleteButton}
            onPress={confirmDelete}

          >
            <Text style={detailStyles.deleteButtonText}>🗑️ Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};