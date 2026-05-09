import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { formStyles, COLORS } from "../styles/appStyles";
import { ScreenProps } from "../navigation/typesNavigation";
import { NewGadget, Gadget } from "../types/gadget";
import { gadgetService } from "../services/gadgetService";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.id;
  const isEditMode = id !== undefined;

  const [form, setForm] = useState<NewGadget>({
    name: "",
    brand: "",
    category: "",
    price: 0,
    purchaseYear: new Date().getFullYear(),
  });

  const [saving, setSaving] = useState<boolean>(false);

  // Cargar gadget si estamos en modo Edit
  useEffect(() => {
    if (isEditMode && id !== undefined) {
      loadGadget(id);
    }
  }, [id]);

  const loadGadget = (gadgetId: number) => {
    gadgetService.getById(gadgetId)
      .then((gadget: Gadget | null) => {
        if (!gadget) {
          Alert.alert("Error", "Gadget no encontrado");
          navigation.goBack();
          return;
        }
        setForm({
          name: gadget.name,
          brand: gadget.brand,
          category: gadget.category,
          price: gadget.price,
          purchaseYear: gadget.purchaseYear,
        });
      })
      .catch((error) => {
        Alert.alert("Error", "No se pudo cargar el gadget");
        console.error(error);
      });
  };

  const handleInputChange = (key: keyof NewGadget, value: string) => {
    if (key === "price" || key === "purchaseYear") {
      setForm({ ...form, [key]: Number(value) });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  const handleSave = () => {
    // Validaciones
    if (
      form.name.trim() === "" ||
      form.brand.trim() === "" ||
      form.category.trim() === ""
    ) {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos");
      return;
    }

    if (form.price <= 0 || isNaN(form.price)) {
      Alert.alert("Precio inválido", "El precio debe ser mayor que 0");
      return;
    }

    if (form.purchaseYear < 2000 || form.purchaseYear > 2026) {
      Alert.alert("Año inválido", "El año de compra debe estar entre 2000 y 2026");
      return;
    }

    setSaving(true);

    const savePromise = isEditMode && id !== undefined
      ? gadgetService.update(id, form)
      : gadgetService.create(form);

    savePromise
      .then(() => {
        Alert.alert("Éxito", isEditMode ? "Gadget actualizado" : "Gadget creado");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", "No se pudo guardar el gadget");
        console.error(error);
      })
      .finally(() => setSaving(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={formStyles.container}
        contentContainerStyle={formStyles.scrollContent}
      >
        <Text style={formStyles.title}>
          {isEditMode ? "Editar Gadget" : "Nuevo Gadget"}
        </Text>

        <Text style={formStyles.label}>Nombre *</Text>
        <TextInput
          style={formStyles.input}
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="MacBook Pro"
          placeholderTextColor={formStyles.inputPlaceholder.color}
          editable={true}
        />

        <Text style={formStyles.label}>Marca *</Text>
        <TextInput
          style={formStyles.input}
          value={form.brand}
          onChangeText={(value) => handleInputChange("brand", value)}
          placeholder="Apple"
          placeholderTextColor={formStyles.inputPlaceholder.color}
          editable={true}
        />

        <Text style={formStyles.label}>Categoría *</Text>
        <TextInput
          style={formStyles.input}
          value={form.category}
          onChangeText={(value) => handleInputChange("category", value)}
          placeholder="Laptop / Phone / Tablet"
          placeholderTextColor={formStyles.inputPlaceholder.color}
          editable={true}
        />

        <Text style={formStyles.label}>Precio *</Text>
        <TextInput
          style={formStyles.input}
          value={form.price.toString()}
          onChangeText={(value) => handleInputChange("price", value)}
          keyboardType="numeric"
          placeholder="1200"
          editable={true}
        />

        <Text style={formStyles.label}>Año de compra *</Text>
        <TextInput
          style={formStyles.input}
          value={form.purchaseYear.toString()}
          onChangeText={(value) => handleInputChange("purchaseYear", value)}
          keyboardType="numeric"
          placeholder="2023"
          editable={true}
        />

        <TouchableOpacity
          style={[formStyles.saveButton, saving && formStyles.saveButtonDisabled]}
          onPress={handleSave}

        >
          <Text style={formStyles.saveButtonText}>
            {saving ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={formStyles.cancelButton}
          onPress={() => navigation.goBack()}

        >
          <Text style={formStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
};