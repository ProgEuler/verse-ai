import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowRight, Calendar, Edit3, Trash2 } from 'lucide-react-native'
import colors from '@/constants/colors'
import { TopicItem } from '@/app/(user_dashboard)/business-topics'
import { timeAgo } from '@/utils/helpers'

export default function TopicCard({ item }: { item: TopicItem }) {
  return (
        <View style={styles.card}>
          <View style={styles.cardIndicator} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit3 size={16} color={colors.dark.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 size={16} color={colors.dark.danger} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dateRow}>
              <Calendar size={14} color={colors.dark.textSecondary} />
              <Text style={styles.dateText}>Added: {timeAgo(item.created_at)}</Text>
            </View>

            <Text style={styles.descriptionText}>{item.details}</Text>

            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>See full details</Text>
              <ArrowRight size={14} color={colors.dark.primary} />
            </TouchableOpacity>
          </View>
        </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.dark.border,
    marginBottom: 12,
  },
  cardIndicator: {
    width: 6,
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
   width: "80%",
    fontSize: 18,
    fontWeight: "700",
    color: colors.dark.text,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    color: colors.dark.textSecondary,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "600",
  },
});
