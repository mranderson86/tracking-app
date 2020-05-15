import * as Yup from 'yup';

export class ProfileData {
  constructor(readonly username: string) {}

  static empty(): ProfileData {
    return new ProfileData('');
  }
}

export const ProfileDataSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required(),
});
