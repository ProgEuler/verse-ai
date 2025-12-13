import colors from "@/constants/colors";
import { Building2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { InfoRow } from "./ui/info-box";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";

export default function CompanyInfo() {
  const user = useSelector(selectCurrentUser);
  const companyInfo = user?.company;

  return (
    <View style={styles.categoryCardFull}>
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(245, 158, 11, 0.1)" },
            ]}
          >
            <Building2 color={colors.dark.warning} size={20} />
          </View>
          <Text style={styles.categoryTitle}>Company Info</Text>
        </View>
      </View>

      <View style={styles.infoContent}>
        <InfoRow label="Name" value={companyInfo?.name} />
        <InfoRow label="Industry" value={companyInfo?.industry} />
        <InfoRow label="Description" value={companyInfo?.description} />
        <InfoRow label="Website" value={companyInfo?.website} url />
        <InfoRow label="Address" value={companyInfo?.address} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCardFull: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingBottom: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  infoContent: {
    padding: 16,
    gap: 12,
  }
});
