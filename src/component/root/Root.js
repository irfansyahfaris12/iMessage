import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"
import Login from "../login/Login";
import Main from "../main/Main";
import Profile from "../profile/Profile";
import { toast, ToastContainer } from "react-toastify";

export default class Root extends Component {
    showToast = (type, message) => {
        switch (type) {
            case 0:
                toast.warning(message)
                break
            case 1:
                toast.success(message)
                break
            default:
                break
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ToastContainer
                    autoClose={200}
                    hideProgressBar={true}
                    position={toast.POSITION.BOTTOM_RIGHT}
                     />
                     <Switch>
                         <Route 
                            exact
                            path="/"
                            render={props => <Login showToast={this.showToast} {...props} />}
                         />
                         <Route 
                            exact
                            path="/main"
                            render={props => <Main showToast={this.showToast} {...props} />}
                         />
                         <Route 
                            exact
                            path="/profile"
                            render={props => <Profile showToast={this.showToast} {...props} />}
                         />
                     </Switch>
                </div>
            </BrowserRouter>
                
            
        )
    }
}
