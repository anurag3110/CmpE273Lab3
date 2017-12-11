import React, {Component} from 'react';
import { Link,Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import validator from 'email-validator'

class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password : ''
    };

    handleSignUp = (newuser) => {

        var enteredemail = document.getElementById("emailsu").value

        var enteredpass = document.getElementById("passsu").value;
        var pattern = new RegExp("[A-Za-z0-9]{6}");
        var result = pattern.test(enteredpass);


        if(document.getElementById("fnsu").value === '' || document.getElementById("lnsu").value === '')
        {
            document.getElementById("validateemail").style.display = "none";
            document.getElementById("validatepass").style.display = "none";
            document.getElementById("validatenm").style.display = "block";
            document.getElementById("validatenm").innerHTML = "Please enter name";
        }
        else if(document.getElementById("emailsu").value === '')
        {
            document.getElementById("validatenm").style.display = "none";
            document.getElementById("validatepass").style.display = "none";
            document.getElementById("validateemail").style.display = "block";
            document.getElementById("validateemail").innerHTML = "Please enter Email";
        }
        else if(!validator.validate(enteredemail))
        {
          document.getElementById("validatenm").style.display = "none";
          document.getElementById("validatepass").style.display = "none";
          document.getElementById("validateemail").style.display = "block";
          document.getElementById("validateemail").innerHTML = "Email should have an @ and at least one .";
        }
        else if(document.getElementById("passsu").value === '')
        {
          document.getElementById("validateemail").style.display = "none";
          document.getElementById("validatenm").style.display = "none";
            document.getElementById("validatepass").style.display = "block";
            document.getElementById("validatepass").innerHTML = "Please enter password";
        }
        else if(!result)
        {
          document.getElementById("validateemail").style.display = "none";
          document.getElementById("validatenm").style.display = "none";
          document.getElementById("validatepass").style.display = "block";
          document.getElementById("validatepass").innerHTML = "Password must be 6 characters or more";
        }

        else{
            document.getElementById("validatenm").style.display = "none";
            document.getElementById("validateemail").style.display = "none";
            document.getElementById("validatepass").style.display = "none";
            API.doSignUp(newuser)
                .then((json) => {
                    if (json.fl === 0) {
                      document.getElementById("validatepass").style.display = "none";
                      document.getElementById("validatenm").style.display = "none";
                      document.getElementById("validateemail").style.display = "block";
                      document.getElementById("validateemail").innerHTML = json.message;
                    }
                    else if(json.fl === 1) {
                      document.getElementById("validatenm").style.display = "none";
                      document.getElementById("validateemail").style.display = "none";
                      document.getElementById("validatepass").style.display = "none";
                      document.getElementById("signupsuccess").style.display = "block";
                      document.getElementById("signupsuccess").innerHTML = json.message;
                    }
                    else if(json.fl === 2) {
                      document.getElementById("validatenm").style.display = "none";
                      document.getElementById("validateemail").style.display = "none";
                      document.getElementById("validatepass").style.display = "none";
                      document.getElementById("signupsuccess").style.display = "block";
                      document.getElementById("signupsuccess").innerHTML = json.message;
                    }
                }).catch(error => {
                    document.getElementById("signupsuccess").style.display = "block";
                    document.getElementById("signupsuccess").innerHTML = "Server issue..Please try after some time..";
                });
        }
    };

    render() {
        return (
            <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-12">
                            <img id= "main" src="/Dropbox_logo.png"  alt="Dropbox logo" ></img>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                            <img id="side" src="/Dropboxside_logo.png"  alt="Dropboxside logo" ></img>
                        </div>
                        <div className="col-md-3">
                            <form id="signupform">
                                <div className="form-group">
                                    <h5>Create an account </h5>
                                    <Link id="loginlink" to="/"> <b>or</b> log in</Link>
                                </div>

                                <div>
                                    <p id="validatenm"></p>
                                </div>

                                <div className="form-group">
                                    <input id="fnsu"
                                        className="form-control"
                                        type="text"
                                        label="Firstname"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        required
                                        onChange={(event) => {
                                            this.setState({
                                                firstName: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input id="lnsu"
                                        className="form-control"
                                        type="text"
                                        label="Lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        required
                                        onChange={(event) => {
                                            this.setState({
                                                lastName: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div>
                                    <p id="validateemail"></p>
                                </div>

                                <div className="form-group">
                                    <input id="emailsu"
                                        className="form-control"
                                        type="email"
                                        label="Username"
                                        placeholder="Email"
                                        value={this.state.email}
                                        required
                                        onChange={(event) => {
                                            this.setState({
                                                email: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div>
                                    <p id="validatepass"></p>
                                </div>

                                <div className="form-group">
                                    <input id="passsu"
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        required
                                        onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            });
                                        }}
                                    />

                                </div>

                                <div>
                                    <p id="signupsuccess"></p>
                                </div>

                                <div id="signup" className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleSignUp(this.state)}>
                                        Create an account
                                    </button>
                                </div>
                            </form>
                      </div>
                </div>
          </div>
        );
    }
}

export default withRouter(Signup);
