// @flow

import React from 'react';

import { connect } from 'react-redux';
import { reset, save, setImage } from './uploadActionCreator';

import type { _ACTION_CREATORS } from './uploadActionCreator';
import type { _APP_STATE } from '../../enum/APP_STATE';
import { SAVING, SAVED } from '../../enum/APP_STATE';
import { redirectByPageEnum } from '../../service/redirectService';
import { DASHBOARD } from '../../enum/PAGE_ENUM';

type Props = {
  upload: {
    image: File,
    status: _APP_STATE
  },
  params: { id: string }
} & _ACTION_CREATORS;

const blockName: string = 'upload';

class Upload extends React.Component<Props> {
  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.upload.status === SAVED) {
      redirectByPageEnum(DASHBOARD);
    }
  }

  setImage(e: SyntheticEvent<HTMLInputElement>) {
    const file: File = e.currentTarget.files[0];
    this.props.setImage(file);
  }

  render() {
    const { upload, save } = this.props;
    const { image, status } = upload;

    const isSaving = status === SAVING;

    return (
      <div className={blockName}>
        {image && (
          <div className={blockName + '__img-wrapper'}>
            <img
              key="img"
              className={blockName + '__img' + (isSaving ? '-loading' : '')}
              src={URL.createObjectURL(image)}
            />,
            <div
              key="loader"
              className={
                blockName + '__loader-wrapper' + (isSaving ? '' : ' hidden')
              }
            >
              <div className={blockName + '__loader'} />
            </div>
          </div>
        )}

        <div className={blockName + '__btn-wrapper'}>
          <input type="file" onChange={this.setImage.bind(this)} />
          <button onClick={save}>upload</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    upload: state.uploadReducer.upload
  }),
  { reset, save, setImage }
)(Upload);
