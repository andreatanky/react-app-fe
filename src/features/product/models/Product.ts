export interface Product {
	systemDocId: string;
	title: string;
	publishedDate: string;
	expiryDate: string;
	readProgress: number;
	readingDuration: number;
	isRead: boolean;
	classification: number;
	isUrgent: boolean;
}
