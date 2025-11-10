import colors from "@/constants/colors";
import {
    Calendar,
    Camera,
    ChevronDown,
    FileText,
    MessageCircle,
    TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

// Simple Pie Chart Component
interface PieChartData {
    label: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieChartData[];
    size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top

    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;

    const createPath = (value: number, startAngle: number) => {
        const percentage = value / total;
        const angle = percentage * 360;
        const endAngle = startAngle + angle;

        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(endAngleRad);
        const y2 = centerY + radius * Math.sin(endAngleRad);

        const largeArcFlag = angle > 180 ? 1 : 0;

        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {data.map((item, index) => {
                const percentage = item.value / total;
                const angle = percentage * 360;
                const path = createPath(item.value, currentAngle);
                const startAngle = currentAngle;
                currentAngle += angle;

                // Calculate label position
                const midAngle = startAngle + angle / 2;
                const midAngleRad = (midAngle * Math.PI) / 180;
                const labelRadius = radius * 0.7;
                const labelX = centerX + labelRadius * Math.cos(midAngleRad);
                const labelY = centerY + labelRadius * Math.sin(midAngleRad);

                return (
                    <G key={index}>
                        <Path d={path} fill={item.color} />
                        {percentage > 0.15 && (
                            <SvgText
                                x={labelX}
                                y={labelY}
                                fontSize="12"
                                fontWeight="600"
                                fill={colors.dark.text}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {item.label} {item.value}
                            </SvgText>
                        )}
                    </G>
                );
            })}
        </Svg>
    );
};

export default function AnalyticsScreen() {
    const insets = useSafeAreaInsets();
    const [timeRange, setTimeRange] = useState("Today");
    const [channel, setChannel] = useState("All Channel");
    const [messageType, setMessageType] = useState("All Message");
    const [showTimeRangePicker, setShowTimeRangePicker] = useState(false);
    const [showChannelPicker, setShowChannelPicker] = useState(false);
    const [showMessageTypePicker, setShowMessageTypePicker] = useState(false);

    // Mock data - values represent percentages
    const channelData: PieChartData[] = [
        { label: "WhatsApp", value: 45, color: "#FBBF24" }, // Yellow
        { label: "Facebook", value: 30, color: "#1877F2" }, // Blue
        { label: "Instagram", value: 15, color: "#10B981" }, // Green
        { label: "Webchat", value: 10, color: "#EC4899" }, // Pink
    ];

    const topQuestions = [
        { question: "What are your business hours?", count: 142 },
        { question: "Do you offer refunds?", count: 98 },
        { question: "How do I schedule an appointment?", count: 190 },
        { question: "What payment methods do you accept?", count: 52 },
        { question: "Where is your location?", count: 12 },
    ];

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* <Text style={styles.pageTitle}>Business Analytics</Text> */}

                {/* Filters Section */}
                <View style={styles.filtersContainer}>
                    <View style={styles.filterRow}>
                        <View style={styles.filterItem}>
                            <Text style={styles.filterLabel}>Time Range</Text>
                            <TouchableOpacity
                                style={styles.filterDropdown}
                                onPress={() =>
                                    setShowTimeRangePicker(!showTimeRangePicker)
                                }
                            >
                                <Text style={styles.filterValue}>
                                    {timeRange}
                                </Text>
                                <ChevronDown
                                    color={colors.dark.textSecondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.filterItem}>
                            <Text style={styles.filterLabel}>Channel</Text>
                            <TouchableOpacity
                                style={styles.filterDropdown}
                                onPress={() =>
                                    setShowChannelPicker(!showChannelPicker)
                                }
                            >
                                <Text style={styles.filterValue}>
                                    {channel}
                                </Text>
                                <ChevronDown
                                    color={colors.dark.textSecondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.filterItem}>
                            <Text style={styles.filterLabel}>Message Type</Text>
                            <TouchableOpacity
                                style={styles.filterDropdown}
                                onPress={() =>
                                    setShowMessageTypePicker(
                                        !showMessageTypePicker
                                    )
                                }
                            >
                                <Text style={styles.filterValue}>
                                    {messageType}
                                </Text>
                                <ChevronDown
                                    color={colors.dark.textSecondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>
                            Apply Filters
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Key Metrics */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, { flex: 1 }]}>
                        <View style={styles.metricIconContainer}>
                            <MessageCircle
                                color={colors.dark.primary}
                                size={24}
                            />
                        </View>
                        <Text style={styles.metricValue}>24</Text>
                        <Text style={styles.metricLabel}>
                            Messages Received
                        </Text>
                    </View>

                    <View style={[styles.metricCard, { flex: 1 }]}>
                        <View
                            style={[
                                styles.metricIconContainer,
                                { backgroundColor: colors.dark.success + "20" },
                            ]}
                        >
                            <Calendar color={colors.dark.success} size={24} />
                        </View>
                        <Text style={styles.metricValue}>10</Text>
                        <Text style={styles.metricLabel}>
                            Appointments Booked
                        </Text>
                    </View>
                </View>

                {/* Channel Distribution */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Channel Distribution
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Message sources
                            </Text>
                        </View>
                    </View>

                    <View style={styles.chartContainer}>
                        <View style={styles.chartWrapper}>
                            <PieChart data={channelData} size={200} />
                        </View>

                        <View style={styles.legendContainer}>
                            {channelData.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View
                                        style={[
                                            styles.legendColor,
                                            { backgroundColor: item.color },
                                        ]}
                                    />
                                    <Text style={styles.legendLabel}>
                                        {item.label}
                                    </Text>
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
                                        backgroundColor:
                                            colors.dark.primary + "20",
                                    },
                                ]}
                            >
                                <Camera color={colors.dark.primary} size={20} />
                            </View>
                            <Text style={styles.financialLabel}>
                                Total Payments
                            </Text>
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
                                        backgroundColor:
                                            colors.dark.warning + "20",
                                    },
                                ]}
                            >
                                <FileText
                                    color={colors.dark.warning}
                                    size={20}
                                />
                            </View>
                            <Text style={styles.financialLabel}>
                                Average Order Value
                            </Text>
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
                            <Text style={styles.sectionTitle}>
                                Top AI Questions
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Most common queries
                            </Text>
                        </View>
                    </View>

                    <View style={styles.questionsList}>
                        {topQuestions.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.questionItem,
                                    index === topQuestions.length - 1 &&
                                        styles.questionItemLast,
                                ]}
                            >
                                <View style={styles.questionContent}>
                                    <Text style={styles.questionText}>
                                        {item.question}
                                    </Text>
                                    <Text style={styles.questionCount}>
                                        Asked {item.count} times
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.dark.text,
        marginBottom: 24,
    },
    filtersContainer: {
        marginBottom: 24,
    },
    filterRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    filterItem: {
        flex: 1,
    },
    filterLabel: {
        fontSize: 12,
        color: colors.dark.textSecondary,
        marginBottom: 8,
        fontWeight: "500",
    },
    filterDropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    filterValue: {
        fontSize: 14,
        color: colors.dark.text,
        fontWeight: "500",
    },
    applyButton: {
        backgroundColor: colors.dark.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    applyButtonText: {
        fontSize: 14,
        color: colors.dark.text,
        fontWeight: "600",
    },
    metricsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    metricCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.dark.border,
        alignItems: "center",
    },
    metricIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.dark.primary + "20",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        position: "relative",
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
        fontSize: 32,
        fontWeight: "700",
        color: colors.dark.text,
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 14,
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
        width: 16,
        height: 16,
        borderRadius: 4,
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
