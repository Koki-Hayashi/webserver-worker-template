// @flow

import React from 'react';
import { connect } from 'react-redux';
import { fetch, reset } from './dashboardActionCreator';

import { setPageLoading } from '../../appState/appStateService';

import NoSetup from './NoSetup';
import ImageList from './ImageList';

import { FETCHED } from '../../enum/APP_STATE';
import type { _APP_STATE } from '../../enum/APP_STATE';
import type { _IMAGE_STATE_CLIENT } from '../../../server/routes/api/image/dtoTypes';
import type { _ACTION_CREATORS } from './dashboardActionCreator';

/* It seems this is not working at all... somebody knows a good way?
import DashboardModel from "./dashboardModel"
type Props = {
    dashboard: DashboardModel,
} & _ACTION_CREATORS;*/

type Props = {
  dashboard: {
    data: Array<_IMAGE_STATE_CLIENT>,
    status: _APP_STATE
  }
} & _ACTION_CREATORS;

const blockName: string = 'dashboard';

class Dashboard extends React.Component<Props> {
  componentWillUnmount() {
    this.props.reset();
  }

  componentWillMount() {
    setPageLoading(true);
  }

  componentDidMount() {
    this.props.fetch();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.dashboard.status === FETCHED) {
      setPageLoading(false, 300);
    }
  }

  render() {
    const { dashboard, fetch } = this.props;
    const { data } = dashboard;

    const hasImage = data && data.length > 0;
    const content = hasImage ? (
      <ImageList data={data} fetch={fetch} />
    ) : (
      <NoSetup />
    );

    return (
      <div className={blockName + (hasImage ? '' : '--no-feed')}>{content}</div>
    );
  }
}

export default connect(
  state => ({
    dashboard: state.dashboardReducer.dashboard
  }),
  { reset, fetch }
)(Dashboard);
