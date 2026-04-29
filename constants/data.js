// Depot Names
export const DEPOTS = ["Miyapur", "Uppal"];

// Train Sets (TS001 → TS057)
export const TRAINSETS = Array.from({ length: 57 }, (_, i) =>
    `TS${String(i + 1).padStart(3, "0")}`
);

// Yard Sections
export const SECTIONS = [
    "Test Line",
    "IBL",
    "Maintenance",
    "Wheel Lathe",
    "SBL",
];

// Tracks based on Section (Dynamic Mapping)
export const TRACKS = {
    "Test Line": ["Test Line"],
    "Wheel Lathe": ["Wheel Lathe"],

    "IBL": ["IBL-1", "IBL-2", "IBL-3", "IBL-4"],

    "Maintenance": ["MNT-1", "MNT-2", "MNT-3", "MNT-4"],

    "SBL": Array.from({ length: 16 }, (_, i) => `SBL-${i + 1}`),
};

// Train Status
export const STATUS = [
    "Running",
    "Idle",
    "Maintenance",
    "Failure",
];