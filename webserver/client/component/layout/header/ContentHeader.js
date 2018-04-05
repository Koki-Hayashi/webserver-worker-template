// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  header: {
    page: {
      name: 'string',
      desc: 'string'
    }
  }
};

const blockName = 'content-header';

class Header extends React.Component<Props> {
  render() {
    const { name, desc } = this.props.header.page;

    return (
      <div key={name} className={blockName}>
        <div className={blockName + '__title'}>{name}</div>
        <div className={blockName + '__desc'}>{desc}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.headerReducer.header
  }),
  {}
)(Header);
