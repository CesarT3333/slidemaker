export interface GoogleProfile {
  id?: string;
  jwt?: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos: Array<any>;
  name?: {
    familyName: string;
    givenName: string;
  };
}
