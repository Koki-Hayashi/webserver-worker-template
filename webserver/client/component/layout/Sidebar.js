// @flow

import React from "react";
import {redirectByPageEnum} from "../../service/redirectService";
import {logout} from "../../service/logoutService";
import {DASHBOARD, UPLOAD} from "../../enum/PAGE_ENUM";

import type {_PAGE_ENUM} from '../../enum/PAGE_ENUM'

type Props = {||}

export default class Sidebar extends React.Component<Props> {
  redirect(pageEnum: _PAGE_ENUM, event: SyntheticEvent<HTMLButtonElement>) {
    redirectByPageEnum(pageEnum);
  }

  render() {
      return (
        <div className="sidebar">
          <div className="navigation">
			<div className="navigation__menu" onClick={this.redirect.bind(this, DASHBOARD)}>{DASHBOARD.name}</div>
			<div className="navigation__menu" onClick={this.redirect.bind(this, UPLOAD)}>{UPLOAD.name}</div>
			<div className="navigation__menu " onClick={logout}>Logout</div>
          </div>
        </div>
    )
  }
}
