export interface IProject {
  title: string;
  category: string;
  description: string;
  tech_stack: string[];
  client_name?: string;
  features: string[];
  image: string;
  url: string;
  year: number;
  status: "In Production" | "Development" | "Archived";
}
