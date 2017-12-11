import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import Axios from 'axios';
import {connect} from "react-redux";
import Download from 'download-file';

class Files extends Component {

  handleClose = () => {
      var close = document.getElementById("modalforshare");

      if(close.style.display == 'none'){
          close.style.display = 'block';
      }else {
          close.style.display = 'none';
      }
    }

  handleShareClick = (item) => {

       this.props.shareFile(item);
       var groupclick = document.getElementById("modalforshare");
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

  handleFileShare = () => {

      //const FileDownload = require('react-file-download');
      //console.log('react side');
      var email = document.getElementById('sharename').value;
      //console.log(email);
      Axios.post(`http://localhost:3002/users/share`,{params:{username:this.props.select.username,filetoshare:this.props.select.filetoshare,email:email}})
         .then((response) => {
            document.getElementById("modalforshare").style.display = 'none';
            window.alert("File shared successfully")
         }).catch((err) => {
            window.alert("Could not share..!!Please try after some time..")
         })
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

  handleShowContents = (item) => {

      this.props.selectedFolder(item);
      this.props.history.push('/folderspage');

  }

    handleDelete = (item) => {
       Axios.get(`http://localhost:3002/users/deletefile`,{params:{username:this.props.select.username,filename:item}})
         .then((res) => {
           window.alert('Deleted Successfully..!!');
           this.props.removeFile(item);
         }).catch((err) => {
           window.alert('Could not delete!! Please try after some time..')
         })

      }

    handleFolderDelete = (item) => {
       Axios.get(`http://localhost:3002/users/deletefolder`,{params:{username:this.props.select.username,foldername:item}})
         .then((res) => {
           this.props.removeFolder(item);
           window.alert('Folder Deleted Successfully..!!');
         }).catch((err) => {
           window.alert('Could not delete folder!! Please try after some time..')
         })

      }


    handleStar = (item) => {

      Axios.get(`http://localhost:3002/users/starfile`,{params:{username:this.props.select.username,filename:item}})
        .then((res) => {
          //this.props.starFile(item);
          window.alert('Starred Successfully..!!')

        }).catch((err) => {
          window.alert(`Could not be starred!! Please try after some time..` +err)
        })
    }

    handleFolderClick = () => {

            var foldercr = document.getElementById("createfolder")
            var fname = document.getElementById("foldername")

            if(foldercr.style.display === 'none'){
                foldercr.style.display = 'block';
            }
            else{
                foldercr.style.display = 'none';
            }

            if(fname.style.display === 'none'){
                fname.style.display = 'block';
            }
            else{
                fname.style.display = 'none';
            }

      }

    handleFolderCreation = () => {

        console.log("Here react side");
        console.log(document.getElementById('foldername').value);
        if(document.getElementById('foldername').value !==''){
          console.log("Inside if");
        Axios.post(`http://localhost:3002/users/createFolder`,{params:{username:this.props.select.username,foldername:document.getElementById('foldername').value}})
          .then((res) => {
            window.alert('Folder created!!');
            this.props.history.push('/mainpage');
            this.props.history.push('/files');
          }).catch((err) => {
            window.alert('Some error in folder creation..!!');
            //document.getElementById('foldername1').value="";
        })
        }

    }


    componentWillMount(){

          var files1,status;

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            else{

              API.fetchFiles({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storeFiles(json.files)
                          window.location.replace('http://localhost:3000/files');
                      } else if (status === 401) {
                          console.log("Rohan")
                      }
              });

              API.fetchFolders({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storeFolders(json.folders)
                          window.location.replace('http://localhost:3000/files');
                      } else if (status === 401) {
                          console.log("Rohan")
                      }
              });

            }

        }

    render(){
        var files,folders = [];
        console.log('files render');
        var status,url;


        files = this.props.select.files.map(function(item,index){
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.handleDownload(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleDelete(item)}>Delete</button>  <button className="btn btn-primary"  id="star" type="button" onClick =
              {() => this.handleStar(item)}>Star</button> <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleShareClick(item)}>Share</button> </pre></td>
            </tr>
          );
        }.bind(this));


        folders = this.props.select.folders.map(function(item,index){
          return(
            <tr>
            <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
            {() => this.handleShowContents(item)}>Show Contents</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
            {() => this.handleFolderDelete(item)}>Delete</button> </pre></td>
            </tr>
          );
        }.bind(this));


        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/mainpage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-7">
                  <h3 className="text-center"> Files </h3>
                  <table id="tableMenu" className="table table-bordered">
                      <thead>
                      </thead>
                      <tbody>
                          {files}
                      </tbody>
                  </table>
                  <h3 id="foldertag" className="text-center"> Folders </h3>
                  <table id="tableMenu" className="table table-bordered">
                      <thead>
                      </thead>
                      <tbody>
                          {folders}
                      </tbody>
                  </table>
                  </div>
                  <div id="rightbarmain" className="col-md-2">

                      <button id="clickfolder"
                              className="btn btn-primary"
                              type="button"
                              onClick={() => this.handleFolderClick()}>
                      Add Folder</button>

                      <div className="form-group">
                          <input id="foldername"
                              className="form-control"
                              type="text"
                              label="New Folder"
                              placeholder="Folder Name"
                          />
                      </div>

                      <button id="createfolder"
                              className="btn btn-primary"
                              type="button"
                              onClick={() => this.handleFolderCreation()}>
                      Create Folder</button>

                      <div id="modalforshare" className="modal" style={{display:'none'}}>
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Share File</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <input type="text" id="sharename" placeholder="Email"></input>
                                  <p id="group"></p>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-primary" onClick={() => this.handleFileShare()}>Share</button>
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                </div>
                              </div>
                            </div>
                    </div>

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
    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },

    countAPI: () => {
          dispatch({
        type: "APICOUNT"
      });
    },

    storeFiles: (files) => {
          dispatch({
        type: "ADDFILE",
        payload: {files:files}
      });
    },

    storeFolders: (folders) => {
          dispatch({
        type: "ADDFOLDER",
        payload: {folders:folders}
      });
    },

    removeFile: (file) => {
          dispatch({
        type: "REMOVE",
        payload: {file:file}
      });
    },

    removeFolder: (folder) => {
          dispatch({
        type: "REMOVEFOLDER",
        payload: {folder:folder}
      });
    },

    selectedFolder: (selfolder) => {
          dispatch({
        type: "SELECTED",
        payload: {selfolder:selfolder}
      });
    },

    starFile: (files) => {
          dispatch({
        type: "STAR",
        payload: {files:files}
      });
    },

    shareFile: (file) => {
          dispatch({
        type: "SHARE",
        payload: {file:file}
      });
    },

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Files));
