export interface user {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;
  hasCompletedOnboarding: boolean;
  token: string;
}
