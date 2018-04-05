// @flow

import store from './store';

import AppStateModel from '../appState/appStateModel';
import HeaderModel from '../component/layout/header/headerModel';
import DashboardModel from '../page/dashboard/dashboardModel';
import UploadModel from '../page/upload/uploadModel';

export function getAppStateModel(): AppStateModel {
  return store.getState().appStateReducer.appState;
}

export function getHeaderModel(): HeaderModel {
  return store.getState().headerReducer.header;
}

export function getDashboardModel(): DashboardModel {
  return store.getState().dashboardReducer.dashboard;
}

export function getUploadModel(): UploadModel {
  return store.getState().uploadReducer.upload;
}
