import { IconInterface } from './IconInterface';
import { SafeUrl } from '@angular/platform-browser';

export class Icon implements IconInterface {
  id: number;
  title: string;
  path: string;
  safeUrl: SafeUrl;

  constructor() {}

}

