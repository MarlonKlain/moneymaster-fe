import { OnboardingStatus } from './onboarding.model';

export interface UserInformation {
  jwtToken: string;
  onboarding: OnboardingStatus;
}
