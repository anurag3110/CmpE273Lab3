import React, {Component} from 'react';
import {Link,Route,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import LoginPage from './LoginPage';
import fileDialog from 'file-dialog';
import Axios from 'axios';
import Blob from 'blob';
import FormData from 'form-data';
import Files from 'react-files';
import About from "./About";


class MainPage extends Component {


  handleDeleteFc = (item) => {

    Axios.get(`http://localhost:3002/users/deletefolderfc`,{params:{username:this.props.select.username,foldername:item}})
      .then((res) => {
        //this.props.removeFolder(item);
        window.alert('Folder Deleted Successfully..!!');
        this.props.history.push('/files')
        this.props.history.push('/mainpage')
      }).catch((err) => {
        window.alert('Could not delete folder!! Please try after some time..')
      })

    }

  handleShowContentsFc = (item) => {
        this.props.selectedFolderFc(item);
        this.props.history.push('/grouppage');
    }

  handleShowContentsFs = (item) => {
        this.props.selectedFolderFs(item);
        this.props.history.push('/groupsharedpage');
      }

  handleDownload = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:3002/uploads/${this.props.select.username}/Files/${item}`)
         .then((response) => {
              FileDownload(response.data,item);
         }).catch((err) => {
           window.alert("Could not download..!!Please try after some time..")
         })

    }

    handleClose = () => {
        var close = document.getElementById("modalforgroup");

        if(close.style.display == 'none'){
            close.style.display = 'block';
        }else {
            close.style.display = 'none';
        }
      }

    handleGroupClick = () => {
       var groupclick = document.getElementById("modalforgroup");
          //console.log(groupclick);
          //console.log(groupclick.style);
          if(groupclick.style.display == "none"){
            //console.log('itthe');
              groupclick.style.display = 'block';
          }else {
            //console.log('utthe');
              groupclick.style.display = 'none';
          }
    }

    handleCreateGroup = () => {

          //console.log("here6");

          document.getElementById('group').style.display = 'none';
          document.getElementById('messmem1').style.display = 'none';
          document.getElementById('messmem2').style.display = 'none';
          document.getElementById('messmem3').style.display = 'none';

          var groupname = document.getElementById("groupname").value;
          var member1 = document.getElementById("member1").value;
          var member2 = document.getElementById("member2").value;
          var member3 = document.getElementById("member3").value;
          //console.log(groupname);

          if(groupname == '' && member1 == '' && member2 == '' & member3 == ''){
            document.getElementById('group').style.display = 'block';
            document.getElementById('group').innerHTML = "Please enter group name"
          } else if (member1 == '' && member2 == '' & member3 == ''){
            document.getElementById('messmem1').style.display = 'block';
            document.getElementById('messmem1').innerHTML = "Please enter at least one member"
          }else if (member1 == this.props.select.username ) {
            document.getElementById('messmem1').style.display = 'block';
            document.getElementById('messmem1').innerHTML = "Cannot share a file to self"
          }else if (member2 == this.props.select.username ) {
            document.getElementById('messmem2').style.display = 'block';
            document.getElementById('messmem2').innerHTML = "Cannot share a file to self"
          }else if (member3 == this.props.select.username ) {
            document.getElementById('messmem3').style.display = 'block';
            document.getElementById('messmem3').innerHTML = "Cannot share a file to self"
          }
          else{

             API.createGroup({groupname:groupname,member1:member1,member2:member2,member3:member3,username:this.props.select.username})
               .then((res) => {

                 console.log("inside response");
                 if(res.status == 401){
                   console.log('here');
                   document.getElementById('messmem1').style.display = 'block';
                   document.getElementById('messmem1').innerHTML = "Not a member of dropbox";
                 }
                 else if(res.status == 402){
                   document.getElementById('messmem2').style.display = 'block';
                   document.getElementById('messmem2').innerHTML = "Not a member of dropbox";
                 }
                 else if(res.status == 403){
                   document.getElementById('messmem3').style.display = 'block';
                   document.getElementById('messmem3').innerHTML = "Not a member of dropbox";
                 }
                 else if(res.status == 201){
                   console.log('created');
                   window.alert("Group created..!!!")
                   document.getElementById("modalforgroup").style.display = 'none';
                   this.props.history.push('/files')
                   this.props.history.push('/mainpage')
                 }
             }).catch((err) => {
               window.alert("Some error with group creation")
             });

         }
  }

  handleUnstar = (item) => {

    Axios.get(`http://localhost:3002/users/deletestarfile`,{params:{username:this.props.select.username,filename:item}})
      .then((res) => {
        this.props.removestarFile(item);
        window.alert('Unstarred Successfully..!!');
      }).catch((err) => {
        window.alert('Could not Unstar!! Please try after some time..' +err)
      })


  }

  handleFilesChange = (files) => {

        this.props.fileUpload(files)
        this.props.displayfiles(files)
  }

  hanldeFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }


  handleUpload = () => {

    this.props.removedisplayfiles()

    if(this.props.select.files.length > 0){
    var formData = new FormData();

    Object.keys(this.props.select.files).forEach((key) => {
    console.log('where you want')
    const file = this.props.select.files[key]
    formData.append(key, file, file.name || 'file')
    })
       Axios({
         method:'post',
         url:`http://localhost:3002/users/files`,
         data:formData,
         params:{username:this.props.select.username} })
        .then(response => {window.alert(`Files uploaded succesfully!`)})
        .catch(err => {window.alert(`Files could not be uploaded!`)})
        this.props.removeFiles();
        window.location.replace('http://localhost:3000/mainpage');
    }
    else{
        window.alert("Please select a file first!!")
    }
  }


  handleSignOut = (userdata) => {

        API.signout(userdata)
            .then((res) => {
                console.log("Signed out");
            }).catch(error => {
                  console.log("Error" +error);
            });


           localStorage.removeItem('jwtToken');
           this.props.storeRestore();
           window.location.replace('/');
    }

    handleAbout = (userdata) => {

        var status;

        API.fetchAbout(userdata)
            .then((res) => {
              status = res.status;
              return res.json()

            }).then((receiveddata) => {

                  if (status === 201) {
                      this.props.getUserData(receiveddata.results)
                  } else if (status === 404) {
                      //
                  }
            }).catch(error => {
                  this.props.storeRestore();
                  window.location.replace('/')
            });


        this.props.history.push('/about');
    }

    componentWillMount(){

          var status;
          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            else{
              API.fetchstarFiles({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storestarFiles(json.files)
                          console.log("Here");
                          window.location.replace('http://localhost:3000/mainpage');

                      } else if (status === 401) {
                          //
                      }
              });

              API.fetchgroupsCreated({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storecreatedFolders(json.folderscreated)
                          //console.log("Here");
                          window.location.replace('http://localhost:3000/mainpage');

                      } else if (status === 401) {
                          //
                      }
              });

              API.fetchgroupsShared({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storesharedFolders(json.foldersshared)
                          //console.log("Here");
                          window.location.replace('http://localhost:3000/mainpage');

                      } else if (status === 401) {
                          //
                      }
              });

            }

        }

    render(){

        var starredfiles = [];
        var displayfiles = [];
        var createdfolders = [];
        var sharedfolders = [];

        var userdata = {username:this.props.select.username,token:this.props.select.token}
      try{
        starredfiles = this.props.select.starredfiles.map(function(item,index){
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.handleDownload(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleUnstar(item)}>Unstar</button> </pre></td>
            </tr>
          );
        }.bind(this));
      }
      catch(err){console.log(err);}

      try{
          createdfolders = this.props.select.folderscreated.map(function(item,index){
            return(
              <tr>
                <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
                {() => this.handleShowContentsFc(item)}>Show Contents</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
                {() => this.handleDeleteFc(item)}>Delete</button> </pre></td>
              </tr>
            );
          }.bind(this));
      }
      catch(err){console.log(err);}

      try{
            sharedfolders = this.props.select.foldersshared.map(function(item,index){
              return(
                <tr>
                  <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
                  {() => this.handleShowContentsFs(item)}>Show Contents</button>  </pre></td>
                </tr>
              );
            }.bind(this));
      }
      catch(err){console.log(err);}

        console.log(this.props.select.displayfiles);
        displayfiles = this.props.select.displayfiles.map(function(item,index){
          return(
            <tr>
              <td><pre> {item.name} </pre></td>
            </tr>
          );
        }.bind(this));
      //console.log(this.props.select.displayfiles);

      return(

          <div className="container-fluid">

              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                        <h3 id="Home">Home</h3>
                        <h4 id="starredtag">Starred</h4>
                        <hr/>
                            <table id="tablestar" className="table table-bordered">
                                <thead>
                                </thead>
                                <tbody>
                                    {starredfiles}
                                </tbody>
                            </table>
                        <h4 id="grouptag">Groups</h4>
                        <hr/>
                          <table id="tablegroup" className="table table-bordered">
                            <thead>
                            </thead>
                            <tbody>
                                    {createdfolders}
                            </tbody>
                          </table>
                          <table id="tablegroup" className="table table-bordered">
                            <thead>
                            </thead>
                            <tbody>
                                    {sharedfolders}
                            </tbody>
                          </table>
                        <div>

                          <ul id="recentfiles" ></ul>
                        </div>
                        <p id="errormessage"></p>
                  </div>
                  <div id="rightbarmain" className="col-md-3">

                        <div className="btn-group">
                          <button id="maindrop" type="button" className="btn btn-primary">Profile</button>
                          <button id="maindroparr" type="button" className="btn btn-default dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                          </button>
                          <div className="dropdown-menu">
                            <h6> {this.props.select.firstname} {this.props.select.lastname}</h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={() => this.handleAbout(userdata)}>About</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={() => this.handleSignOut(userdata)}>Sign Out</a>
                          </div>
                        </div>

                        <button id="selectfiles"
                                className="btn btn-primary"
                                type="button">
                          <Files id='filesadded'
                                ref='files'
                                className='files-dropzone-list'
                                onChange={this.handleFilesChange}
                                onError={this.handleFilesError}
                                multiple
                                maxFiles={10}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                          > Select Files
                          </Files>
                          </button>

                        <button id="uploadfiles"
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleUpload()}>
                        Upload Files</button>

                        <h6 id="selectedfiles"> Selected Files </h6>
                        <table id="tableMenu" className="table table-bordered">
                            <thead>
                            </thead>
                            <tbody>
                                {displayfiles}
                            </tbody>
                        </table>

                        <button id="sharedfolderlink"
                                className="btn btn-primary"
                                type="button"
                                data-toggle="modal"
                                data-target="#"
                                onClick={() => this.handleGroupClick()}>
                        New Group</button>

                        <div id="modalforgroup" className="modal" style={{display:'none'}}>
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">Create Group</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <input type="text" id="groupname" placeholder="Group Name"></input>
                                    <p id="group"></p><hr></hr>
                                    <input type="text" id="member1" placeholder="Member 1"></input>
                                    <p id="messmem1"></p><hr></hr>
                                    <input type="text" id="member2" placeholder="Member 2"></input>
                                    <p id="messmem2"></p><hr></hr>
                                    <input type="text" id="member3" placeholder="Member 3"></input>
                                    <p id="messmem3"></p>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => this.handleCreateGroup()}>Create Group</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                  </div>
                                </div>
                              </div>
                      </div>
                </div>

              </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },

    fileUpload: (files) => {
          dispatch({
        type: "ADDFILE",
        payload: {files:files}
      })
    },

    displayfiles: (files) => {
          dispatch({
        type: "DISPLAYFILE",
        payload: {files:files}
      })
    },

    removedisplayfiles: (files) => {
          dispatch({
        type: "REMOVEDISPLAYFILE"
      })
    },

    storestarFiles: (files) => {
          dispatch({
        type: "STAR",
        payload: {files:files}
      });
    },


    removeFiles: () => {
        dispatch({
        type: "REMOVEFILE"
      })
    },

    removestarFile: (file) => {
          dispatch({
        type: "REMOVESTAR",
        payload: {file:file}
      })
    },

    getUserData: (data) => {
          dispatch({
        type: "CHANGEDATA",
        payload :{data:data}
      });
    },

    storecreatedFolders: (folders) => {
          dispatch({
        type: "ADDCREATEDFOLDER",
        payload: {folders:folders}
      });
    },

    storesharedFolders: (folders) => {
          dispatch({
        type: "ADDSHAREDFOLDER",
        payload: {folders:folders}
      });
    },

    selectedFolderFc: (selfolderfc) => {
          dispatch({
        type: "SELECTEDFC",
        payload: {selfolderfc:selfolderfc}
      });
    },

    selectedFolderFs: (selfolderfs) => {
          dispatch({
        type: "SELECTEDFS",
        payload: {selfolderfs:selfolderfs}
      });
    },

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));
