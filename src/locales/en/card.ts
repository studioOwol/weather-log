export default {
  add: {
    title: "Add New Record",
    description: "Create a new weather record for today.",
  },
  edit: {
    title: "Edit Record",
    description: "Update weather record information.",
  },
  delete: {
    title: "Delete Record",
    description: "Are you sure you want to delete this record?",
    confirm: "Delete",
  },
  field: {
    date: "Date",
    location: "Location",
    minTemp: "Min Temp",
    maxTemp: "Max Temp",
    note: "Note",
    notePlaceholder: "Add a note to remember this day...",
  },
  button: {
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
  },
  loading: {
    location: "Getting location...",
    weather: "Getting weather...",
  },
  error: {
    locationNotFound: "Location info not available",
    weatherNotFound: "Weather info not available",
  },
} as const
