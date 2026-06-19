export interface Child {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'M' | 'F';
  weight?: number; // kg
  height?: number; // cm
  photo?: string; // base64 or URL
  createdAt: Date;
  updatedAt: Date;
}
