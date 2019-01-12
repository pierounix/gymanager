import { SheetInterface } from './SheetInterface';

export class Sheet implements SheetInterface {
  id: number;
  id_member: number;
  start_date: Date;
  end_date: Date;
  sheet_name: string;

  constructor() {}

}
