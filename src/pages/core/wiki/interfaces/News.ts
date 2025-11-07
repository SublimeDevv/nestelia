export interface NewsItem {
  id: number;
  title: string;
  date: string;
  type: "update" | "new" | "popular";
}
