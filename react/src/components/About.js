import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";

class About extends Component {


    handleUserDataChange = () => {
             this.props.history.push('/userdatachange')
    }

    componentWillMount(){

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
        }

    render(){
        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                        <pre><h3 id="overview">User Overview</h3>
                            <h5 id="nameab"> Name    : {this.props.select.firstname} {this.props.select.lastname} </h5>
                            <h5 id="emailab"> Email   : {this.props.select.username}</h5>
                            <h5 id="contactab"> Contact : </h5></pre>
                            <hr/>
                        <pre><h4 id="wande">Work and education</h4>
                            <h5 id="workab"> Work        : {this.props.select.w1} {this.props.select.w2}</h5>
                            <h5 id="educationab"> Education   : {this.props.select.e1} {this.props.select.e2}</h5></pre>
                            <hr/>
                        <pre><h4 id="interests">Interests</h4>
                            <h5 id="musicab"> Music   : {this.props.select.m1} {this.props.select.m2}</h5>
                            <h5 id="showsab"> Shows   : {this.props.select.sh1} {this.props.select.sh2}</h5>
                            <h5 id="sportsab"> Sports  : {this.props.select.sp1} {this.props.select.sp2}</h5></pre>
                            <button id="changeuserinfo"
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleUserDataChange()}> Change
                            </button>
                            <hr/>
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

export default withRouter(connect(mapStateToProps)(About));
