/* tslint:disable */
/* eslint-disable */
import { UserProfileDto } from '../models/user-profile-dto';
export interface AuthenticationResponse {
  token?: string;
  user?: UserProfileDto;
}
