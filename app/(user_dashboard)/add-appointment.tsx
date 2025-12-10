import { useAddBookingMutation } from "@/api/user-api/calendar.api";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { RNDatePicker } from "@/components/ui/date-picker";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Toast } from "toastify-react-native";

type FormData = {
  title: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  client_email: string;
  client_number: string;
  location: string;
  description: string;
};

export default function AddAppointmentScreen() {
  const router = useRouter();
  const [addBooking, { isLoading }] = useAddBookingMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSendWhatsApp = async (data: FormData) => {
    try {
        // Construct payload - combining date and time might be needed depending on backend,
        // but sending as is for now based on form structure.
        // Assuming backend expects "date" and "time" fields or ISO strings.
        // For now, mapping form names to probable backend names.

        const payload = {
            title: data.title,
            start_time: `${data.start_date}T${data.start_time}`, // Naive combination, adjust as needed
            end_time: `${data.end_date}T${data.end_time}`,
            client_email: data.client_email,
            client_phone: data.client_number,
            location: data.location,
            description: data.description,
        };

        console.log("Submitting payload:", payload);
        await addBooking(payload).unwrap();

        Toast.success("Appointment added successfully");
        router.replace("/(user_dashboard)/appointments");
    } catch (error: any) {
        console.error("Failed to add appointment:", error);
        Toast.error(error?.data?.message || "Failed to add appointment");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout>
      {/* back */}
      <TouchableOpacity
        onPress={() => router.replace("/(user_dashboard)/appointments")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 6,
            position: "fixed",
            marginRight: 16,
          }}
        >
          <ChevronLeft color={colors.dark.textSecondary} size={20} />
          <Text style={styles.colorText}>
            {"Back"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Title</Text>
        <View style={styles.inputWithIcon}>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Appointments title here"
                placeholderTextColor={colors.dark.textSecondary}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
      </View>

      {/* Start Date & Time */}
      <Text style={styles.label}>Starting Date & Time</Text>
      <View style={styles.row}>
        <View
          style={[
            styles.fieldContainer,
            { flex: 1, marginRight: 8, flexDirection: "row", gap: 6 },
          ]}
        >
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              name="start_date"
              rules={{ required: "Date is required" }}
              render={({ field: { onChange, value } }) => (
                <RNDatePicker
                  onChangeDate={onChange}
                  label="Date"
                  value={value}
                  mode="date"
                />
              )}
            />
             {errors.start_date && <Text style={styles.errorText}>{errors.start_date.message}</Text>}
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              name="start_time"
              rules={{ required: "Time is required" }}
              render={({ field: { onChange, value } }) => (
                <RNDatePicker
                  onChangeDate={onChange}
                  label="Time"
                  value={value}
                  mode="time"
                />
              )}
            />
             {errors.start_time && <Text style={styles.errorText}>{errors.start_time.message}</Text>}
          </View>
        </View>
      </View>

      {/* End Date & Time */}
      <Text style={styles.label}>Ending Date & Time</Text>
      <View style={styles.row}>
        <View
          style={[
            styles.fieldContainer,
            { flex: 1, marginRight: 8, flexDirection: "row", gap: 6 },
          ]}
        >
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              name="end_date"
              rules={{ required: "Date is required" }}
              render={({ field: { onChange, value } }) => (
                <RNDatePicker
                  onChangeDate={onChange}
                  label="Date"
                  value={value}
                  mode="date"
                />
              )}
            />
             {errors.end_date && <Text style={styles.errorText}>{errors.end_date.message}</Text>}
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              name="end_time"
              rules={{ required: "Time is required" }}
              render={({ field: { onChange, value } }) => (
                <RNDatePicker
                  onChangeDate={onChange}
                  label="Time"
                  value={value}
                  mode="time"
                />
              )}
            />
             {errors.end_time && <Text style={styles.errorText}>{errors.end_time.message}</Text>}
          </View>
        </View>
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Client Email</Text>
        <View style={styles.inputWithIcon}>
          <Controller
            control={control}
            name="client_email"
            rules={{
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Client's email here"
                placeholderTextColor={colors.dark.textSecondary}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
        </View>
        {errors.client_email && <Text style={styles.errorText}>{errors.client_email.message}</Text>}
      </View>

      {/* Number */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Whatsapp Number</Text>
        <View style={styles.inputWithIcon}>
          <Controller
            control={control}
            name="client_number"
            rules={{ required: "Number is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Client's number here"
                placeholderTextColor={colors.dark.textSecondary}
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
              />
            )}
          />
        </View>
        {errors.client_number && <Text style={styles.errorText}>{errors.client_number.message}</Text>}
      </View>

      {/* Location */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.inputWithIcon}>
          <Controller
            control={control}
            name="location"
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Location here"
                placeholderTextColor={colors.dark.textSecondary}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <View style={styles.inputWithIcon}>
          <Controller
            control={control}
            name="description"
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textArea}
                placeholder="Free text for internal information."
                placeholderTextColor={colors.dark.textSecondary}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
        </View>
      </View>

      <View></View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Button style={{ width: "100%" }} onPress={handleSubmit(handleSendWhatsApp)} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save & Send Whatsapp"}
          </Button>
        </View>
        <Button variant="outline" onPress={handleCancel}>
          Cancel
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 100,
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  footer: {
    borderTopColor: colors.dark.border,
    backgroundColor: colors.dark.background,
    gap: 12,
  },
  colorText: {
    color: colors.dark.text,
    fontSize: 16
  },
  errorText: {
    color: colors.dark.danger, // Assuming 'danger' or similar red color exists, otherwise use '#ff4444'
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
