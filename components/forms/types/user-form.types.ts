export interface UserFormValues {
  fullName: string;
  email: string;
  gender: string;
  country?: string;
  countryName?: string;
  age: undefined | number;
  category: string;
  interests: string[];
}
