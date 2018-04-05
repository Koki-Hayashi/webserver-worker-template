// @flow

import {UPLOAD} from "../../enum/PAGE_ENUM";
import React from "react";
import {redirectByPageEnum} from "../../service/redirectService";

const blockName = 'dashboard-no-setup';

type Props = {||};

export default class NoSetup extends React.Component<Props> {
  redirectToUpload() {
	redirectByPageEnum(UPLOAD);
  }

  render() {
	return (
			<div className={blockName + '__wrap'}>
			  <div className={blockName + '__msg'}>
				You haven't uploaded any pictures.
			  </div>
			  <div className={blockName + '__setup-btn'} onClick={this.redirectToUpload}>
				GO TO UPLOAD PAGE
			  </div>
			</div>
	);
  }
}





