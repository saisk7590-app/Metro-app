import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme, SPACING, TYPOGRAPHY } from "../theme";
export default function CustomDropdown({
    label,
    selectedValue,
    setSelectedValue,
    options = [],
    keyboardEnabled = false,
}) {
    const { COLORS } = useTheme();
    const styles = createStyles(COLORS);

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (item) => {
        setSelectedValue(item);
        setSearch(item);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            {/* Label */}
            {label && <Text style={styles.label}>{label}</Text>}

            {/* Dropdown Input */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIsOpen(!isOpen)}
            >
                <View style={styles.dropdownContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Select option"
                        placeholderTextColor={COLORS.placeholder}
                        value={search || selectedValue}
                        editable={keyboardEnabled}
                        showSoftInputOnFocus={keyboardEnabled}
                        onFocus={() => setIsOpen(true)}
                        onChangeText={(text) => {
                            if (!keyboardEnabled) return;

                            setSearch(text);
                            setIsOpen(true);
                        }}
                    />

                    {/* Production Icon */}
                    <Ionicons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={18}
                        color={COLORS.textSecondary}
                    />
                </View>
            </TouchableOpacity>

            {/* Dropdown Options */}
            {isOpen && (
                <View style={styles.optionsContainer}>
                    {(keyboardEnabled && search
                        ? filteredOptions
                        : options
                    ).map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* No Result */}
                    {keyboardEnabled &&
                        search !== "" &&
                        filteredOptions.length === 0 && (
                            <Text style={styles.noResult}>
                                No match found
                            </Text>
                        )}
                </View>
            )}
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

    // Dropdown Box
    dropdownContainer: {
        flexDirection: "row",
        alignItems: "center",

        borderWidth: 1,
        borderColor: COLORS.border,

        backgroundColor: COLORS.dropdownBg,
        borderRadius: 6,

        paddingHorizontal: 12,
    },

    // Input Area
    input: {
        flex: 1,

        paddingVertical: 12,

        fontSize: TYPOGRAPHY.input,
        color: COLORS.textPrimary,
    },

    // Options List
    optionsContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 6,

        marginTop: 6,

        backgroundColor: COLORS.card,

        maxHeight: 200,

        overflow: "hidden",
    },

    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    optionText: {
        fontSize: TYPOGRAPHY.input,
        color: COLORS.textPrimary,
    },

    noResult: {
        padding: 12,
        textAlign: "center",
        color: COLORS.placeholder,
    },
});