import React, { Component, Fragment } from 'react'
import firebase from "firebase";
// import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { myFirebase, myFirestore } from '../../config/myFirebase';
import { AppString } from "../Const";
import "../login/Login.css"
import web from "../../images/web.png"
import android from "../../images/android.png"

class Login extends Component {
    constructor(props) {
        super(props);
        this.provider = new firebase.auth.GoogleAuthProvider()
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin = () => {
        if (localStorage.getItem(AppString.ID)) {
            this.setState({ isLoading: false }, () => {
                this.props.showToast(1, 'login success')
                this.props.history.push('/main')
            })
        } else {
            this.setState({ isLoading: false })
        }
    }

    onLoginPress = () => {
        this.setState({ isLoading: true })
        myFirebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(async result => {
                let user = result.user
                if (user) {
                    const result = await myFirestore
                        .collection(AppString.NODE_USERS)
                        .where(AppString.ID, '==', user.uid)
                        .get()

                    if (result.docs.length === 0) {

                        myFirestore
                            .collection('users')
                            .doc(user.uid)
                            .set({
                                id: user.uid,
                                nickname: user.displayName,
                                aboutMe: '',
                                photoUrl: user.photoURL
                            })
                            .then(data => {
                                localStorage.setItem(AppString.ID, user.uid)
                                localStorage.setItem(AppString.NICKNAME, user.displayName)
                                localStorage.setItem(AppString.PHOTO_URL, user.photoURL)
                                this.setState({ isLoading: false }, () => {
                                    this.props.showToast(1, 'login success')
                                    this.props.history.push('/main')
                                })
                            })
                    } else {
                        localStorage.setItem(AppString.ID, result.docs[0].data().id)
                        localStorage.setItem(
                            AppString.NICKNAME,
                            result.docs[0].data().nickname
                        )
                        localStorage.setItem(
                            AppString.PHOTO_URL,
                            result.docs[0].data().photoUrl
                        )
                        localStorage.setItem(
                            AppString.ABOUT_ME,
                            result.docs[0].data().aboutMe
                        )
                        this.setState({ isLoading: false }, () => {
                            this.props.showToast(1, 'Login success')
                            this.props.history.push('/main')
                        })
                    }
                } else {
                    this.props.showToast(0, 'user info not available')
                }
            })
            .catch(err => {
                this.props.showToast(0, err.massage)
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                            <div className="col-md-6 body-right">
                                <div className="header-body">
                                    <h3>iMessage</h3>
                                </div>
                                <div className="main-body">
                                    With iMessage, you'll get fast, simple, secure messagingfor free*, available on all platform over the world.
                                    </div>
                                <div className="footer-body">
                                    <div className="web">
                                        <button type="button" class="btn btn-outline btn-sm" onClick={this.onLoginPress}>
                                            <i class="fa fa-laptop" aria-hidden="true"> WEB</i>
                                        </button>
                                    </div>
                                    <div className="android">
                                        <button type="button" class="btn btn-outline btn-sm">
                                            <i class="fa fa-android" aria-hidden="true"> ANDROID</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <div className="col-md-6 body-left">
                            {/* <div className="body-left"> */}
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={web} className="d-block img-fluid" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={android} className="d-block img-fluid" alt="..." />
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Login)
