// @flow

import React from 'react';

type Props = {||};

export default class Header extends React.Component<Props> {
  render() {
    const blockName = 'header';

    return (
      <div className={blockName}>
        <div className={blockName + '__title'}>Web Server</div>
      </div>
    );
  }
}
