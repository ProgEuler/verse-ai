import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Check, X } from 'lucide-react-native';

  const permissions = [
    {
      name: "View Dashboard",
      owner: true,
      finance: true,
      support: true,
      analyst: true,
      readonly: true,
    },
    {
      name: "Manage Users",
      owner: true,
      finance: false,
      support: false,
      analyst: true,
      readonly: false,
    },
    {
      name: "Financial Data",
      owner: true,
      finance: true,
      support: false,
      analyst: true,
      readonly: true,
    },
    {
      name: "Customer Support",
      owner: false,
      finance: false,
      support: true,
      analyst: false,
      readonly: true,
    },
    {
      name: "Billing & Invoices",
      owner: true,
      finance: true,
      support: true,
      analyst: false,
      readonly: true,
    },
    {
      name: "Analytics & Reports",
      owner: false,
      finance: false,
      support: false,
      analyst: true,
      readonly: false,
    },
    {
      name: "System Settings",
      owner: true,
      finance: true,
      support: false,
      analyst: true,
      readonly: true,
    },
    {
      name: "API Management",
      owner: true,
      finance: false,
      support: true,
      analyst: false,
      readonly: false,
    },
  ];

export default function RBACTable() {
  return (
          <View style={styles.rbacContainer}>
            <Text style={styles.rbacTitle}>
              Role-Based Access Control (RBAC)
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* Header Row */}
                <View style={styles.tableHeaderRow}>
                  <View style={styles.colPermissionHeader}>
                    <Text style={styles.tableHeaderText}>Permission</Text>
                  </View>
                  {["Owner", "Finance", "Support", "Analyst", "Read-only"].map(
                    (role) => (
                      <View key={role} style={styles.colHeader}>
                        <Text style={styles.tableHeaderText}>{role}</Text>
                      </View>
                    )
                  )}
                </View>

                {/* Permission Rows */}
                {permissions.map((perm, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={styles.colPermission}>
                      <Text style={styles.permissionName}>{perm.name}</Text>
                    </View>
                    {["owner", "finance", "support", "analyst", "readonly"].map(
                      (key) => (
                        <View key={key} style={styles.colCheck}>
                          {(perm as any)[key] ? (
                            <Check color="#10B981" size={18} />
                          ) : (
                            <X color="#EF4444" size={18} />
                          )}
                        </View>
                      )
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
  )
}

const styles = StyleSheet.create({
    rbacContainer: { marginVertical: 24 },
  rbacTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  tableHeaderRow: { flexDirection: "row", marginBottom: 8 },
  colPermissionHeader: { width: 160, paddingRight: 8 },
  colHeader: { width: 64, alignItems: "center" },
  tableHeaderText: { color: "#9CA3AF", fontSize: 12, fontWeight: "600" },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  colPermission: { width: 160, paddingRight: 8, justifyContent: "center" },
  permissionName: { color: "#FFFFFF", fontSize: 14 },
  colCheck: { width: 64, alignItems: "center", justifyContent: "center" },
})
