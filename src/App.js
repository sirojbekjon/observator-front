import React from 'react';
import {Switch, Route} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import Login from "./component/Login";
import Main from "./component/Main";
import {ToastContainer} from 'react-toastify'
import ProtectedPath from "./component/ProtectedPath";
function App(props) {
    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <ProtectedPath>
                    <Route path="/adminPanel" component={Main}/>
                </ProtectedPath>
            </Switch>
            <ToastContainer/>
        </div>
    );
}

export default App;