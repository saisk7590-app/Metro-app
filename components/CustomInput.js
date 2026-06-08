import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme, SPACING, TYPOGRAPHY } from "../theme";
export default function CustomInput({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
}) {
    const { COLORS } = useTheme();
    const styles = createStyles(COLORS);

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

const createStyles = (COLORS) => StyleSheet.create({
    container: {
        marginBottom: SPACING.medium,
    },

    label: {
        fontSize: TYPOGRAPHY.label,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        marginLeft: 2,
        fontWeight: "500",
    },

    // 🔥 INPUT LOOK DIFFERENT FROM DROPDOWN
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,

        backgroundColor: COLORS.inputBg,

        paddingVertical: 12,
        paddingHorizontal: 14,

        borderRadius: 10, // more rounded than dropdown

        fontSize: TYPOGRAPHY.input,
        color: COLORS.textPrimary,

        // subtle input feel
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 2,

        elevation: 1,
    },

    multiline: {
        height: 90,
        textAlignVertical: "top",
    },
});