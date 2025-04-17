export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface MLPredictionResult {
  predictedValue: number;
  confidence: number;
  timestamp: string;
}

export interface PowerBIConfig {
  embedUrl: string;
  reportId: string;
}