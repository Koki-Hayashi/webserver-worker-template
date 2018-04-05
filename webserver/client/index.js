// @flow

import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './component/layout/Sidebar';
import Header from './component/layout/header/Header';
import ContentHeader from './component/layout/header/ContentHeader';

type Props = {
  appState: {
    authCheck: Function,
    initLoadFinished: Function,
    pageLoading: Function
  },
  children: any
};

class Index extends React.Component<Props> {
  render() {
    const { appState } = this.props;
    const { authCheck, initLoadFinished, pageLoading } = appState;

    const readyToDrawContent: boolean =
      authCheck && initLoadFinished && !pageLoading;

    return (
      <div>
        <Header />
        <Sidebar />
        <ContentHeader />
        <div className="main-content-wrapper">
          <div
            className={
              'main-content-loader-wrapper ' +
              (readyToDrawContent ? 'hide' : '')
            }
          >
            <div className="main-content-loader" />
          </div>
          <div className={'main-content ' + (readyToDrawContent ? '' : 'hide')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    appState: state.appStateReducer.appState
  }),
  {}
)(Index);
