// @flow
import APP_STATE from '../../enum/APP_STATE';
import { IMAGE } from '../../../universal/enum/END_POINT';
import { IMG } from '../../../universal/enum/REQ_FIELD_NAME';
import { Record } from 'immutable';
import AjaxService from '../../ajax/AjaxService';

const UploadRecord = Record({
  image: '',
  status: APP_STATE.NEUTRAL
});

export default class UploadModel extends UploadRecord {
  reset(): UploadRecord {
    return new UploadModel();
  }

  setImage(image: File): UploadRecord {
    return this.set('image', image);
  }

  beforeSave(): UploadRecord {
    return this.set('status', APP_STATE.SAVING);
  }

  onSaveSuccess(): UploadRecord {
    return this.set('status', APP_STATE.SAVED);
  }

  onSaveError(error: {}): UploadRecord {
    return this.set('status', APP_STATE.FAILED_TO_SAVE);
  }

  save(): Promise<UploadModel> {
    const image = this.get('image');
    const formData = new FormData();
    formData.append(IMG, image);

    return new AjaxService(IMAGE)
      .post()
      .form()
      .body(formData)
      .call(this.onSaveSuccess.bind(this), this.onSaveError.bind(this));
  }
}
