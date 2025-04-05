interface EnvConfig {
  ApiUrl: string;
  AppName: string;
  Username: string;
  UserEmail: string;
  UserRole: string;
}

const envConfig: EnvConfig = {
  ApiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  AppName: import.meta.env.VITE_APP_NAME || "Auth Center",
  Username: import.meta.env.VITE_USER_NAME || "Loki",
  UserEmail: import.meta.env.VITE_USER_EMAIL || "Dativerse@gmail.com",
  UserRole: import.meta.env.VITE_USER_ROLE || "Administrator",
};

export default envConfig;
