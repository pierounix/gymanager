export interface MemberInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  token?: string;
  date_of_birth?: Date;
  expiry_date?: Date;
  address: string;
  telephone?: string;
  status: string;
  sheet: string;
}
