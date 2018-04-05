// @flow

import Dashboard from '../page/dashboard/Dashboard';
import Upload from '../page/upload/Upload';

import NotFound from '../page/notFound';

export type _PAGE_ENUM = {
  name: string,
  desc: string,
  path: string,
  comp: {}
};

export const DASHBOARD: _PAGE_ENUM = {
  name: 'Dashboard',
  path: 'dashboard',
  comp: Dashboard,
  desc: 'Dashboard '
};
export const UPLOAD: _PAGE_ENUM = {
  name: 'Upload Image',
  path: 'upload',
  comp: Upload,
  desc: 'Upload image'
};
export const NOT_FOUND: _PAGE_ENUM = {
  name: 'Not Found',
  desc: '',
  path: '*',
  comp: NotFound
};

const PAGE_ENUM = {
  DASHBOARD,
  UPLOAD,
  NOT_FOUND
};

export default PAGE_ENUM;
