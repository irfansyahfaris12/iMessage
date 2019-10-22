import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import "../welcomeboard/WelcomeBoard.css"

export default class WelcomeBoard extends Component {
    render() {
        return (
            <div className="viewWelcomeBoard">
                <span className="textTitleWelcome">{`welcome, ${this.props.currentUserNickname}`}</span>
                <img className="avatarWelcome" src={this.props.currentUserAvatar} alt="eng"/>
                <span className="textDesciptionWelcome">can we just talk?</span>
            </div>
        )
    }
}
