import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme, SPACING, TYPOGRAPHY } from "../theme";
export default function CustomButton({
    title,
    onPress,
    type = "primary",
    style = {},
}) {
    const { COLORS } = useTheme();
    const styles = createStyles(COLORS);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.button,
                type === "secondary" && styles.secondaryButton,
                style, // 🔥 allow override (status color)
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    type === "secondary" && styles.secondaryText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const createStyles = (COLORS) => StyleSheet.create({
    button: {
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: "center",
        marginTop: SPACING.large,
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.white,
        fontSize: TYPOGRAPHY.button,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },

    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    secondaryText: {
        color: COLORS.primary,
    },
});