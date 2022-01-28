import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '../../containers/Auth/Auth';
import Logout from '../../containers/Auth/Logout/Logout';
import Orders from '../../containers/Orders/Orders';

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/logout" component={Logout} />
                <Route path="/orders" component={Orders} />

                <Route exact path="/" component={Auth} />
            </BrowserRouter>
        </div>
    );
}

export default Layout;