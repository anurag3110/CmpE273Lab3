import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import validator from 'email-validator';

class UserDataChange extends Component {


    componentWillMount(){

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
        }

    changeUserData = (userdatachange) => {
            var status;

            API.changeUserData(userdatachange)
                .then((res) => {
                  status = res.status;
                  return res.json()

                }).then((changeddata) => {

                      if (status === 201) {
                        document.getElementById("changesuccess").style.display = "block";
                        document.getElementById("changesuccess").innerHTML = changeddata.message;
                        this.props.userDataChange(changeddata.results)
                        //console.log(changeddata.results[0].Work);
                        //this.props.history.push('/about')
                      } else if (status === 401) {
                          document.getElementById("changesuccess").style.display = "block";
                          document.getElementById("changesuccess").innerHTML = changeddata.message;
                      }else if (status === 404) {
                        this.props.storeRestore();
                        window.location.change('/');
                      }
            }).catch(error => {
                document.getElementById("changesuccess").style.display = "block";
                document.getElementById("changesuccess").innerHTML = "Server issue..Please try after some time..";
            });
      };

    render(){

        var firstname,lastname,email,userdetails={username:this.props.select.username,token:this.props.select.token};

        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                      <form id="userdatachangeform">

                          <div>
                              <p id="validatenm"></p>
                          </div>

                          <div className="form-group">
                               <input id="fnudch"
                                  className="form-control"
                                  type="text"
                                  label="Firstname"
                                  placeholder="Firstname"
                                  value={this.props.select.firstname}
                                  onChange={(event) => {
                                      firstname = event.target.value
                                  }}
                              />
                          </div>

                          <div className="form-group">
                              <input id="lnudch"
                                  className="form-control"
                                  type="text"
                                  label="Lastname"
                                  placeholder="Last Name"
                                  value={this.props.select.lastname}
                                  onChange={(event) => {
                                      lastname = event.target.value
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validateemail"></p>
                          </div>

                          <div className="form-group">
                              <input id="emailudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Username"
                                  value={this.props.select.username}
                                  onChange={(event) => {
                                      email = event.target.value
                                  }}
                              />
                          </div>


                          <div>
                              <p id="validatew1"></p>
                          </div>

                          <div className="form-group">
                              <input id="w1udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Work 1"
                                  //value={this.props.select.w1}
                                  onChange={(event) => {
                                      userdetails.w1 = event.target.value;
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatew2"></p>
                          </div>

                          <div className="form-group">
                              <input id="w2udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Work 2"
                                  //value={this.props.select.w2}
                                  onChange={(event) => {
                                    userdetails.w2 = event.target.value;
                                    //this.props.w2Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatee1"></p>
                          </div>

                          <div className="form-group">
                              <input id="e1ludch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Education 1"
                                  //value={this.props.select.e1}
                                  onChange={(event) => {
                                      userdetails.e1 = event.target.value;
                                      //this.props.e1Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatee2"></p>
                          </div>

                          <div className="form-group">
                              <input id="e2udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Education 2"
                                  //value={this.props.select.e2}
                                  onChange={(event) => {
                                      userdetails.e2 = event.target.value;
                                      //this.props.e2Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatem1"></p>
                          </div>

                          <div className="form-group">
                              <input id="m1udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Music Interest 1"
                                  //value={this.props.select.m1}
                                  onChange={(event) => {
                                      userdetails.m1 = event.target.value;
                                      //this.props.m1Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatem2"></p>
                          </div>

                          <div className="form-group">
                              <input id="m2udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Music Interest 2"
                                  //value={this.props.select.m2}
                                  onChange={(event) => {
                                      userdetails.m2 = event.target.value;
                                      //this.props.m2Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatesh1"></p>
                          </div>

                          <div className="form-group">
                              <input id="sh1udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Shows Interest 1"
                                  //value={this.props.select.sh1}
                                  onChange={(event) => {
                                    userdetails.sh1 = event.target.value;
                                    //this.props.sh1Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatesh2"></p>
                          </div>

                          <div className="form-group">
                              <input id="sh2udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Shows Interest 2"
                                  //value={this.props.select.sh2}
                                  onChange={(event) => {
                                    userdetails.sh2 = event.target.value;
                                      //this.props.sh2Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatesp1"></p>
                          </div>

                          <div className="form-group">
                              <input id="sp1udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Sports Interest 1"
                                  //value={this.props.select.sp1}
                                  onChange={(event) => {
                                    userdetails.sp1 = event.target.value;
                                      //this.props.sp1Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="validatesp2"></p>
                          </div>

                          <div className="form-group">
                              <input id="sp2udch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Sports Interest 2"
                                  //value={this.props.select.sp2}
                                  onChange={(event) => {
                                      userdetails.sp2 = event.target.value;
                                      //this.props.sp2Change(event.target.value)
                                  }}
                              />
                          </div>

                          <div>
                              <p id="changesuccess"></p>
                          </div>

                          <div id="change" className="form-group">
                              <button id="change"
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => this.changeUserData(userdetails)}>
                                  Change
                              </button>
                          </div>
                      </form>
                </div>
              </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return{

    userDataChange: (data) => {
          dispatch({
        type: "CHANGEDATA",
        payload :{data:data}
      });
    },

    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserDataChange));
