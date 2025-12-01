import colors from "@/constants/colors";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";

export function ModalView({
  visible,
  onClose,
  title,
  children,
  buttonLabel = "Close",
  animationType = "slide",
  buttonVariant
}) {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="bg-white">
          {title && <Text style={styles.modalText}>{title}</Text>}

          {children}

          <Button variant={buttonVariant} size="sm" onPress={onClose}>
            {buttonLabel}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  modalText: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
