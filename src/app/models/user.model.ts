import { OnboardingStatus } from './onboarding.model';

export interface UserLoginResponse {
  jwtToken: string;
  onboarding: OnboardingStatus;
}

export interface UserProfileInformation {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
