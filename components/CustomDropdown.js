import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

export default function CustomDropdown({
    label,
    selectedValue,
    setSelectedValue,
    options = [],
    keyboardEnabled = false, // 🔥 control keyboard
}) {
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
            {label && <Text style={styles.label}>{label}</Text>}

            {/* 🔥 Input / Selector */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIsOpen(true)}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Select option"
                    placeholderTextColor={COLORS.placeholder}
                    value={search || selectedValue}
                    editable={keyboardEnabled} // ✅ keyboard control
                    showSoftInputOnFocus={keyboardEnabled} // ✅ stop unwanted keyboard
                    onFocus={() => setIsOpen(true)}
                    onChangeText={(text) => {
                        if (!keyboardEnabled) return; // 🚫 block typing

                        setSearch(text);
                        setIsOpen(true);
                    }}
                />
            </TouchableOpacity>

            {/* 🔽 Dropdown */}
            {isOpen && (
                <View style={styles.optionsContainer}>
                    {(keyboardEnabled && search ? filteredOptions : options).map(
                        (item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    )}

                    {/* No Results */}
                    {keyboardEnabled && search !== "" && filteredOptions.length === 0 && (
                        <Text style={styles.noResult}>No match found</Text>
                    )}
                </View>
            )}
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
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
        borderRadius: 6,
        fontSize: TYPOGRAPHY.input,
        color: COLORS.textPrimary,
        backgroundColor: COLORS.inputBg,
    },

    optionsContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 6,
        marginTop: 6,
        backgroundColor: COLORS.card,
        maxHeight: 200,
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