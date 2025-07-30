export interface IProject {
  name: string;
  thumbnail: string;
  category: string;
  sort_description: string;
  client_logo: string;
  link: string;
  status: "In Production" | "Development" | "Archived";
}
