import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
} from "react-native";

import { COLORS, SPACING, TYPOGRAPHY } from "../theme";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";
import CustomButton from "../components/CustomButton";
import {
  DEPOTS,
  SECTIONS,
  TRACKS,
  STATUS,
  TRAINSETS,
} from "../constants/data";

export default function AMSUpdateScreen() {
  const [depot, setDepot] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [section, setSection] = useState("");
  const [track, setTrack] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  // 🔥 Dynamic Status Color
  const getStatusColor = () => {
    switch (status) {
      case "Running":
        return COLORS.success;
      case "Idle":
        return COLORS.warning;
      case "Maintenance":
      case "Failure":
        return COLORS.danger;
      default:
        return COLORS.primary;
    }
  };

  const handleUpdate = () => {
    Alert.alert("AMS Sync", "Update Submitted (Static)");
  };

  const openAMSPortal = () => {
    Linking.openURL("https://your-ams-website.com");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>AMS CONTROL PANEL</Text>

        {/* Depot */}
        <CustomDropdown
          label="Depot"
          selectedValue={depot}
          setSelectedValue={setDepot}
          options={DEPOTS}
        />

        {/* Trainset */}
        <CustomDropdown
          label="Train Set"
          selectedValue={trainNo}
          setSelectedValue={setTrainNo}
          options={TRAINSETS}
          keyboardEnabled={true}
        />

        {/* Section */}
        <CustomDropdown
          label="Section"
          selectedValue={section}
          setSelectedValue={(value) => {
            setSection(value);

            const tracks = TRACKS[value] || [];
            if (tracks.length === 1) {
              setTrack(tracks[0]); // auto-fill
            } else {
              setTrack("");
            }
          }}
          options={SECTIONS}
        />

        {/* Track */}
        {section && TRACKS[section]?.length > 1 && (
          <CustomDropdown
            label="Track"
            selectedValue={track}
            setSelectedValue={setTrack}
            options={TRACKS[section]}
            keyboardEnabled={true}
          />
        )}

        {/* Status */}
        <CustomDropdown
          label="Status"
          selectedValue={status}
          setSelectedValue={setStatus}
          options={STATUS}
        />

        {/* Remarks */}
        <CustomInput
          label="Remarks"
          value={remarks}
          onChangeText={setRemarks}
          placeholder="Optional notes..."
          multiline
        />

        {/* Save Button */}
        <CustomButton
          title="SAVE UPDATE"
          onPress={handleUpdate}
          style={{ backgroundColor: getStatusColor() }}
        />

        {/* Link */}
        <TouchableOpacity onPress={openAMSPortal} style={styles.linkContainer}>
          <Text style={styles.linkText}>Open Full AMS Portal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.large,
  },
  container: {
    padding: SPACING.medium,
    backgroundColor: COLORS.card,
    margin: SPACING.medium,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SPACING.large,
    textAlign: "center",
    letterSpacing: 1,
  },
  linkContainer: {
    marginTop: SPACING.large,
    alignItems: "center",
  },
  linkText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.input,
    textDecorationLine: "underline",
  },
});