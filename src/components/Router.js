import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Landing from './Landing';
import NotFound from './NotFound';

const Router = () => {
    return(
        <BrowserRouter  basename={'/noauthburger'}>
            <Switch>
                <Route exact path={`/`} component={Landing}/>
                <Route exact path={`/restaurant/:restaurantId`} component={App}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;