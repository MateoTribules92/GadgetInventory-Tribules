import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../styles/appStyles";
import { ListScreen } from "../screens/ListScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { FormScreen } from "../screens/FormScreen";
import { RootStackParamList, ScreenProps } from "./typesNavigation";

// Crear el stack tipado
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * StackNavigator conteniendo todas las pantallas de la app
 * Flujo de navegación: List -> Detail -> Form
 */
export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Pantalla principal: Lista de gadgets */}
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: 'Inventario' }}
      />

      {/* Pantalla de detalle de gadget */}
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del Gadget' }}
      />

      {/* Pantalla de formulario para crear/editar gadget */}
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={({ route }: ScreenProps<'Form'>) => ({
          title: route.params?.id ? 'Editar Gadget' : 'Nuevo Gadget',
        })}
      />
    </Stack.Navigator>
  );
};