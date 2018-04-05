// @flow

import AjaxService from '../ajax/AjaxService';
import { VERIFY_TOKEN } from '../../universal/enum/END_POINT';

export function checkLogin(): Promise<any> {
  return new AjaxService(VERIFY_TOKEN).call(() => {}, () => {});
}
