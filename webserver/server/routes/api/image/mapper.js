// @flow

import type { _IMAGE_STATE_CLIENT, _IMAGE_STATE_SERVER } from './dtoTypes';

import config from '../../../configs/config';

export function sortByUploadTimeDesc(array: Array<_IMAGE_STATE_CLIENT>) {
  const compare = (a: _IMAGE_STATE_CLIENT, b: _IMAGE_STATE_CLIENT) => {
    if (a.uploadTime < b.uploadTime) return 1;
    if (a.uploadTime > b.uploadTime) return -1;
    return 0;
  };

  return array.sort(compare);
}

export function mapServerDtoToClient(
  serverDto: _IMAGE_STATE_SERVER
): Array<_IMAGE_STATE_CLIENT> {
  return Object.keys(serverDto).reduce((array, key) => {
    const value = serverDto[key];

    array.push({
      id: key,
      origName: value.origName,
      origImgSrc: config.imgExpose + value.origName,
      resizedImgSrc: value.resizedName && config.imgExpose + value.resizedName,
      status: value.status,
      uploadTime: value.uploadTime,
      lastUpdate: value.lastUpdate
    });
    return array;
  }, []);
}
