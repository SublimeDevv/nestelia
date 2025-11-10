export interface WikiEntry {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  image: string;
  createdAt: string;
  isDeleted: boolean;
  category?: {
    name: string;
    displayName: string;
    icon: string;
    description: string;
    id: string;
    isDeleted: boolean;
    createdAt: string;
  };
}
