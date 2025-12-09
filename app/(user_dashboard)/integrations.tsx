import {
  useGetFbUrlQuery,
  useGetIgUrlQuery,
} from "@/api/user-api/integrations.api";
import Fb from "@/assets/svgs/facebook.svg";
import Ig from "@/assets/svgs/instagram.svg";
import Wp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Toast } from "toastify-react-native";
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  url: string;
}

export default function IntegrationsScreen() {
  const {
    data: fbUrl,
    isLoading: fbUrlLoading,
    error,
  } = useGetFbUrlQuery(undefined);
  const { data: igUrl, isLoading: igUrlLoading } = useGetIgUrlQuery(undefined);

  if (fbUrlLoading || igUrlLoading) return <LoadingSpinner />;
  console.log(error);

  const integrations: Integration[] = [
    {
      id: "facebook",
      name: "Facebook Messenger",
      description: "Connect to collaborate easily",
      icon: <Fb color={colors.dark.primary} />,
      connected: false,
      url: fbUrl.redirect_url,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect for ultimate reach",
      icon: <Wp color={colors.dark.primary} />,
      connected: false,
      url: fbUrl.redirect_url,
    },
    {
      id: "instagram",
      name: "Instagram DM",
      description: "Connect to transform replies",
      icon: <Ig color={colors.dark.primary} />,
      connected: false,
      url: igUrl.redirect_url,
    },
    //  {
    //    id: "calendar",
    //    name: "Calendar",
    //    description: "Connect to automate Booking",
    //    icon: <Calendar color={colors.dark.primary} size={28} />,
    //    connected: false,
    //    url: fbUrl.redirect_url,
    //  },
    //  {
    //    id: "crm",
    //    name: "CRM (Zapier)",
    //    description: "Connect to automate clerics",
    //    icon: <Zap color={colors.dark.primary} size={28} />,
    //    connected: false,
    //    url: fbUrl
    //  },
  ];

  const handleConnect = async (
    integrationId: string,
    integrationUrl: string
  ) => {
    console.log("Connecting to:", integrationId);

    try {
      await Linking.openURL(integrationUrl);
      Toast.success(`${integrationId} connected successfully!`);
    } catch (error) {
      Toast.error(`Failed to connect ${integrationId}.`);
      console.log("Error connecting to Google Calendar:", error);
      return;
    }
  };

  return (
    <Layout edges={["bottom"]}>
      <Text style={{ color: colors.dark.textSecondary, padding: 8 }}>
         Link your business accounts to manage messages and posts from on ecentralized hub.
      </Text>
      <View style={styles.grid}>
        {integrations.map((integration) => (
          <View key={integration.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>{integration.icon}</View>
            </View>
            <View>
              <Text style={styles.cardTitle}>{integration.name}</Text>
              <Text style={styles.cardDescription}>
                {integration.description}
              </Text>
            </View>
            <Button
              size="sm"
              style={{ height: 36 }}
              onPress={() => handleConnect(integration.id, integration.url)}
              testID={`connect-${integration.id}`}
            >
              Connect
            </Button>
          </View>
        ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  grid: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 14,
    justifyContent: "space-between" as const,
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.dark.text,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  connectButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  connectButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
});
