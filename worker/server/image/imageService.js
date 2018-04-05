// @flow

import type { _STATE } from '../firebase/state';
import Jimp from 'jimp';

export async function resizeImage(
  state: _STATE
): Promise<{ resizedName: string, resizedImgPath: string }> {
  logger.info('processing image...');

  try {
    const { origImgPath, origName } = state;
    const resizedName = '100x100-' + origName;
    const resizedImgPath = origImgPath;

    Jimp.read(origImgPath + origName)
      .then(img => {
        img
          .resize(100, 100) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(resizedImgPath + resizedName); // save
      })
      .catch(e => {
        logger.error(e);
        throw e;
      });

    logger.info('finish. New file stoted. ' + resizedImgPath + resizedName);

    return { resizedName, resizedImgPath };
  } catch (e) {
    logger.error('error occurred while processing image.');
    logger.error(e);

    throw e;
  }
}
