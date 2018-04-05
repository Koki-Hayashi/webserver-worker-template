// @flow
import React from "react";
import {IndexRoute, Route} from "react-router";
import Index from "./index";
import {checkLogin} from "./auth/authService";
import type {_PAGE_ENUM} from "./enum/PAGE_ENUM";
import {
	DASHBOARD,
	UPLOAD,
    NOT_FOUND
} from "./enum/PAGE_ENUM";

import {resetAndSetPage} from "./component/layout/header/HeaderUpdateService";
import {SPA_HOME} from "../universal/enum/LAYER"

function onEnter(page: _PAGE_ENUM) {
  checkLogin();

  resetAndSetPage(page);
}


const routes = (
    <Route path={SPA_HOME} component={Index} onEnter={onEnter}>
        <IndexRoute component={DASHBOARD.comp}/>
        <Route path={DASHBOARD.path} component={DASHBOARD.comp} onEnter={onEnter.bind(this, DASHBOARD)}/>
        <Route path={UPLOAD.path} component={UPLOAD.comp} onEnter={onEnter.bind(this, UPLOAD)}/>
        <Route path="*" component={NOT_FOUND.comp}/>
    </Route>
);

export default routes

