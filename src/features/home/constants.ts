import { type FilterItem } from "./components/FilterBar/FilterBar";

export const HOME_FILTERS: FilterItem[] = [
	{ key: "urgent", label: "Urgent" },
	{ key: "unread", label: "Unread", segment: "readStatus" },
	{ key: "inProgress", label: "In Progress", segment: "readStatus" },
	{ key: "expired", label: "Expired" },
	{ key: "desktopOnly", label: "Desktop Only", segment: "platform" },
];
