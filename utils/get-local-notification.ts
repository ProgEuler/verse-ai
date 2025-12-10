import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    //  sound: true,
  });
}

export async function scheduleNotificationHandler() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission to send notifications was denied!");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail!",
      body: "Hello from your dashboard!",
      sound: true, // enables default sound
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });

  //  alert("Notification scheduled in 2 seconds!");
}
