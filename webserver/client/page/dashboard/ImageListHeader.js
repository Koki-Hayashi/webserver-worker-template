// @flow

import React from "react";

type Props = {||}

const blockName: string = 'dashboard-setup-header';

export default class ImportSetupHeader extends React.Component<Props> {

    render() {
        return <div className={blockName}>
            <div className={blockName + "__cell"}>Name</div>
            <div className={blockName + "__cell"}>Original Image</div>
            <div className={blockName + "__cell"}>Image Status</div>
            <div className={blockName + "__cell"}>Upload Time</div>
            <div className={blockName + "__cell"}>Processed Image</div>
            <div className={blockName + "__cell"}>Last update</div>
        </div>
    }
}



