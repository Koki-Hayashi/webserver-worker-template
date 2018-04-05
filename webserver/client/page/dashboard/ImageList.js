// @flow

import React from 'react';
import ImportSetupHeader from './ImageListHeader'
import ImportSetupRow from './ImageListRow'

const blockName: string = 'dashboard-setup-list';

import type {_IMAGE_STATE_CLIENT} from '../../../server/routes/api/image/dtoTypes'

type Props = {
    data: Array<_IMAGE_STATE_CLIENT>,
    fetch: Function
}

export default class ImportSetupList extends React.Component<Props> {
    generateRows(data: Array<_IMAGE_STATE_CLIENT>) {
        return data.map((datum, i) => {
            return <ImportSetupRow key={datum.id} index={i} datum={datum}/>
        })
    }

    render() {
        const {data, fetch} = this.props;

        return (
            <div className={blockName}>
                <div className={blockName + "__btn-wrapper"}>
                    <button className={blockName + "__btn"} onClick={fetch}>Refresh</button>
                </div>
                <div className={blockName + "__table"}>
                    <div className={blockName + "__header"}>
                        <ImportSetupHeader/>
                    </div>
                    <div className={blockName + "__body"}>
                        {this.generateRows(data)}
                    </div>
                </div>
            </div>
        );
    }
}


