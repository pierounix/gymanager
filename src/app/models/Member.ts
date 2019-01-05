import { MemberInterface } from './MemberInterface';

export class Member implements MemberInterface {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: Date;
  expiry_date?: Date;
  address: string;
  telephone?: string;
  status: string;
  sheet: string;

  constructor() {}
}
