import { useGetAnalyticsDataQuery } from "@/api/user-api/analytics.api";
import Facebook from "@/assets/svgs/facebook.svg";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { RNPicker } from "@/components/ui/picker";
import colors from "@/constants/colors";
import {
  Calendar,
  Camera,
  DollarSign,
  FileText,
  Instagram,
  MessageCircle,
  TrendingUp,
  User2,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
interface PieChartData {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}
interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

const widthAndHeight = 200;

const series = [
  { value: 10, color: colors.socials.facebook },
  { value: 0, color: "#ffb300" },
  { value: 5, color: colors.socials.instagram },
  { value: 10, color: colors.socials.whatsapp },
];

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState("today");
  const [channel, setChannel] = useState("all_channel");
  const [messageType, setMessageType] = useState("all_message");
  const [filters, setFilters] = useState({
    time: "",
    channel: "",
    type: "",
  });
  const { data, isLoading } = useGetAnalyticsDataQuery({
    time: timeRange,
    channel: channel,
    type: messageType,
  });

  if (isLoading) return <LoadingSpinner />;
  console.log("analytics data: ", data);
  const timeRangeLabelMap: Record<string, string> = {
    today: "Today",
    this_week: "This Week",
    this_month: "This Month",
    this_year: "This Year",
  };
  const channelLabelMap = {
    all_channel: "All Channel",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
  };

  const messageTypeLabelMap = {
    all_message: "All Message",
    incoming: "Incoming",
    outgoing: "Outgoing",
  };

  const channelData: PieChartData[] = [
    {
      label: "WhatsApp",
      value: data?.channel_messages?.whatsapp ?? 0,
      // value: 20,
      color: colors.socials.whatsapp,
      icon: <WhatsApp color={"#fff"} width={16} />,
    },
    {
      label: "Facebook",
      value: data?.channel_messages?.facebook ?? 0,
      // value: 30,
      color: colors.socials.facebook,
      icon: <Facebook color={"#fff"} width={16} />,
    },
    {
      label: "Instagram",
      value: data?.channel_messages?.instagram ?? 0,
      // value: 50,
      color: colors.socials.instagram,
      icon: <Instagram color={"#fff"} width={16} />,
    },
  ].filter((item) => item.value > 0);

  const topQuestions = [
    { question: "What are your business hours?", count: 142 },
    { question: "Do you offer refunds?", count: 98 },
    { question: "How do I schedule an appointment?", count: 190 },
    { question: "What payment methods do you accept?", count: 52 },
    { question: "Where is your location?", count: 12 },
  ];

  return (
    <Layout>
      {/* Filters Section */}
      <View>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            {/* <Text style={styles.filterLabel}>Time Range</Text> */}
            <RNPicker
              items={[
                { value: "today", label: "Today" },
                { value: "this_week", label: "This Week" },
                { value: "this_month", label: "This Month" },
                { value: "this_year", label: "This Year" },
              ]}
              label={"Time Range"}
              value={timeRangeLabelMap[timeRange] || ""}
              onSelectItem={(item) => {
                console.log("selected range: ", item);
                setTimeRange(item);
              }}
              key={timeRange}
            />
          </View>

          <View style={styles.filterItem}>
            <RNPicker
              items={[
                { value: "all_channel", label: "All Channel" },
                { value: "facebook", label: "Facebook" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "instagram", label: "Instagram" },
              ]}
              label="Channel"
              value={channelLabelMap[channel] || ""}
              onSelectItem={(item) => {
                console.log("selected channel: ", item);
                setChannel(item);
              }}
              key={channel}
            />
          </View>

          <View style={styles.filterItem}>
            <RNPicker
              items={[
                { value: "all_message", label: "All Message" },
                { value: "incoming", label: "Incoming" },
                { value: "outgoing", label: "Outgoing" },
              ]}
              label="All Message"
              value={messageTypeLabelMap[messageType] || ""}
              onSelectItem={(item) => {
                console.log("selected messageType: ", item);
                setMessageType(item);
              }}
              key={messageType}
            />
          </View>
        </View>

        {/* <Button onPress={handleFilter}>Aplly Filters</Button> */}
      </View>

      {/* stat */}
      <View style={{ marginBottom: 6 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <View style={styles.metricCard}>
            <View>
              <MessageCircle color={colors.dark.primary} size={24} />
            </View>
            <Text style={styles.metricValue}>{data?.message_count}</Text>
            <Text style={styles.metricLabel}>Messages Received</Text>
          </View>

          <View style={styles.metricCard}>
            <View>
              <Calendar color={colors.dark.success} size={24} />
            </View>
            <Text style={styles.metricValue}>{data?.booking_count}</Text>
            <Text style={styles.metricLabel}>Appointments Booked</Text>
          </View>

          <View style={styles.metricCard}>
            <View>
              <DollarSign color={colors.dark.primaryLight} size={24} />
            </View>
            <Text style={styles.metricValue}>{data?.total_revenue}</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </View>

          <View style={styles.metricCard}>
            <View>
              <User2 color={colors.dark.warning} size={24} />
            </View>
            <Text style={styles.metricValue}>{data?.new_customers}</Text>
            <Text style={styles.metricLabel}>New Customers</Text>
          </View>
          <View style={styles.metricCard}>
            <View>
              <MessageCircle color={colors.dark.danger} size={24} />
            </View>
            <Text style={styles.metricValue}>{data?.unanswered_messages}</Text>
            <Text style={styles.metricLabel}>Unanswered Message</Text>
          </View>
        </View>
      </View>

      {/* Channel Distribution */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Channel Distribution</Text>
            <Text style={styles.sectionSubtitle}>Message sources</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            {/* <PieCharts data={pieData} size={200} /> */}
            <PieChart widthAndHeight={widthAndHeight} series={series} />
          </View>

          <View style={styles.legendContainer}>
            {channelData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                >
                  {item.icon}
                </View>
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Financial Insights */}
      <View style={styles.financialRow}>
        <View style={[styles.financialCard, { flex: 1 }]}>
          <View style={styles.financialHeader}>
            <View
              style={[
                styles.financialIconContainer,
                {
                  backgroundColor: colors.dark.primary + "20",
                },
              ]}
            >
              <Camera color={colors.dark.primary} size={20} />
            </View>
            <Text style={styles.financialLabel}>Total Payments</Text>
          </View>
          <Text style={styles.financialValue}>$24,580</Text>
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +15% from last month
            </Text>
          </View>
        </View>

        <View style={[styles.financialCard, { flex: 1 }]}>
          <View style={styles.financialHeader}>
            <View
              style={[
                styles.financialIconContainer,
                {
                  backgroundColor: colors.dark.warning + "20",
                },
              ]}
            >
              <FileText color={colors.dark.warning} size={20} />
            </View>
            <Text style={styles.financialLabel}>Average Order Value</Text>
          </View>
          <Text style={styles.financialValue}>$142</Text>
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +8.2% from last month
            </Text>
          </View>
        </View>
      </View>

      {/* Top AI Questions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top AI Questions</Text>
            <Text style={styles.sectionSubtitle}>Most common queries</Text>
          </View>
        </View>

        <View style={styles.questionsList}>
          {topQuestions.map((item, index) => (
            <View
              key={index}
              style={[
                styles.questionItem,
                index === topQuestions.length - 1 && styles.questionItemLast,
              ]}
            >
              <View style={styles.questionContent}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.questionCount}>
                  Asked {item.count} times
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
  },
  metricCard: {
    width: "48%",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: "center",
    flex: 1,
  },
  profileAvatarSmall: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.dark.primary,
    borderWidth: 2,
    borderColor: colors.dark.cardBackground,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  chartContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    padding: 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  legendLabel: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
  },
  financialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  financialCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  financialHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  financialIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  financialLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  financialValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 8,
  },
  financialChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  financialChangeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  questionsList: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    overflow: "hidden",
  },
  questionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  questionItemLast: {
    borderBottomWidth: 0,
  },
  questionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  questionCount: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
});
