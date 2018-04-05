// @flow

import * as ReactRouter from 'react-router';
import type { _PAGE_ENUM } from '../enum/PAGE_ENUM';
import { SPA_HOME } from '../../universal/enum/LAYER';

export function redirectByPath(path: string): void {
  ReactRouter.browserHistory.push(SPA_HOME + '/' + path);
}

export function redirectByPageEnum(pageEnum: _PAGE_ENUM): void {
  redirectByPath(pageEnum.path);
}
