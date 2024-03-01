import React from 'react';
import {Redirect} from 'react-router-dom'
function ProtectedPath({children}) {
    let token=localStorage.getItem('token');


    if (!token){
        return <Redirect to="/login"/>
    }


    return children;
}

export default ProtectedPath;