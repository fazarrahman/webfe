import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import SignUp from './components/SignUp';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import {getToken, removeUserSession, setUserSession, getUser} from './utils/Common';

function App() {
    const [authLoading, setAuthLoading] = useState(true);

    const getUserData = (accessToken) => {
        axios
            .get(`http://localhost:4000/api/profile`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(response => {
                setUserSession(accessToken, response.data);
                setAuthLoading(false);
            })
            .catch(error => {
              removeUserSession();
              setAuthLoading(false);
            });
    }

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }

        getUserData(token);
    }, []);

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <div className="header">
                        <NavLink exact="exact" activeClassName="active" to="/">Home</NavLink>
                        <NavLink activeClassName="active" to="/login">Login</NavLink>
                        <small>(Access without token only)</small>
                        <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
                        <small>(Access with token only)</small>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact="exact" path="/" component={Home}/>
                            <PublicRoute path="/login" component={Login}/>
                            <PublicRoute path="/signup" component={SignUp}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;