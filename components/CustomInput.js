import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

export default function CustomInput({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
}) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={[styles.input, multiline && styles.multiline]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.placeholder}
                multiline={multiline}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.medium,
    },
    label: {
        fontSize: TYPOGRAPHY.label,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        marginLeft: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
        borderRadius: 6, // sharper control UI
        fontSize: TYPOGRAPHY.input,
        color: COLORS.textPrimary,
        backgroundColor: COLORS.inputBg,
    },
    multiline: {
        height: 90,
        textAlignVertical: "top",
    },
});