export const mockOutfitHistory = [
  {
    _id: "o1",
    occasion: "College",
    itemIds: ["1", "5", "3"], // references _id values from mockCloset
    weatherAtGeneration: { temp: 30, condition: "Sunny" },
    dateWorn: "2026-07-15T00:00:00.000Z",
    isAutoSuggested: false,
  },
  {
    _id: "o2",
    occasion: "Interview",
    itemIds: ["4", "10", "12"],
    weatherAtGeneration: { temp: 27, condition: "Cloudy" },
    dateWorn: "2026-07-16T00:00:00.000Z",
    isAutoSuggested: false,
  },
  {
    _id: "o3",
    occasion: "Party",
    itemIds: ["6", "3", "8"],
    weatherAtGeneration: { temp: 29, condition: "Clear" },
    dateWorn: "2026-07-17T00:00:00.000Z",
    isAutoSuggested: true,
  },
]