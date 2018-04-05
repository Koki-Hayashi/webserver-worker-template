// @flow

import React from 'react';
import type  {_IMAGE_STATE_CLIENT} from '../../../server/routes/api/image/dtoTypes'
import {utcToDate} from '../../service/dateService'

type Props = {
    index: number,
    datum: _IMAGE_STATE_CLIENT
};

const blockName: string = 'dashboard-setup-row';

export default class ImageListRow extends React.Component<Props> {

    render() {
        const {datum} = this.props;
        const {id, origName, origImgSrc, status, resizedImgSrc, uploadTime, lastUpdate} = datum;

        return <div className={blockName}>
            <div className={blockName + "__cell"}>{origName}</div>
            <div className={blockName + "__cell"}><img className={blockName + "__img"} src={origImgSrc}/></div>
            <div className={blockName + "__cell"}>{status}</div>
            <div className={blockName + "__cell"}>{utcToDate(uploadTime)}</div>
            <div className={blockName + "__cell"}>{!!resizedImgSrc ? <a href={resizedImgSrc} download>download</a> : '-'} </div>
            <div className={blockName + "__cell"}>{utcToDate(lastUpdate)}</div>
        </div>
    }
}



