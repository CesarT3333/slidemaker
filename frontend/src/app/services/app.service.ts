import { Injectable } from '@angular/core';

import * as packageJson from '../../../package.json';

@Injectable({ providedIn: 'root' })
export class AppService {

  get appVersion(): string {
    return packageJson.version;
  }
}
