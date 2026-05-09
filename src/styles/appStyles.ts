// src/styles/appStyles.ts
import { StyleSheet } from "react-native";

// Colores principales
export const COLORS = {
  primary: "#1B1F2A", // fondo general / header
  white: "#FFFFFF",
  gray: "#5A5F7D",
  darkCard: "#1E2233",
  green: "#00FF7F",
  laptop: "#4D9DE0",
  phone: "#9B59B6",
  tablet: "#F1C40F",
};

// ========================
// ListScreen Styles
// ========================
export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  // ===== Header con badge =====
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  headerBadge: {
    backgroundColor: "#3498db",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },

  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: COLORS.darkCard,
    color: COLORS.white,
    padding: 10,
    borderRadius: 8,
  },
  list: {
    paddingBottom: 80, // espacio para FAB
  },

  // ===== Card de gadget =====
  card: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.darkCard,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardIconText: {
    fontSize: 20,
  },
  cardName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDetail: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
  cardPrice: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  cardYear: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },

  // ===== Badge de categoría dentro del card =====
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.white,
  },
  categoryText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },

  // ===== FAB =====
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "bold",
  },

  emptyText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});

// ========================
// DetailScreen Styles
// ========================
export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 16,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
  },
  value: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: COLORS.laptop,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: COLORS.phone,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  // ===== NUEVOS ESTILOS PARA HERO Y BADGE =====
  hero: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.darkCard,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconText: {
    fontSize: 40,
    color: COLORS.gray,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  // ===== ESTILOS PARA ROW Y COLUMN =====
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    flex: 1,
  },

  // ===== ESTILOS PARA PRICE CARD =====
  priceCard: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    alignItems: "center",
  },
  priceText: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Badge CREATE / EDIT
  headerBadge: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.laptop,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  headerBadgeText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  // Hero: título y subtítulo
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
  },
  // Campos del formulario
  label: {
    color: COLORS.white,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.darkCard,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  // Help text debajo de Year
  helpText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  // Layout de dos columnas
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  // Botones
  saveButton: {
    backgroundColor: COLORS.laptop,
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: COLORS.darkCard,
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});