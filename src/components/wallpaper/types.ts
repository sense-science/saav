export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  image: string;
  downloads: number;
  likes: number;
  gradient: string;
}

export type Category = "All" | "Abstract" | "Nature" | "Minimal" | "Gradient" | "Dark";