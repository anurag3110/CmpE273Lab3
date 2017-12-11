import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import Axios from 'axios';
import Files from 'react-files';
import {connect} from "react-redux";
import Download from 'download-file';
import rimraf from 'rimraf';

class FoldersPage extends Component {

  handleDownload = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:3002/uploads/${this.props.select.username}/Folders/${this.props.select.selfolder}/${item}`)
         .then((response) => {
              FileDownload(response.data,item);
         }).catch((err) => {
           window.alert("Could not download..!!Please try after some time..")
         })

    }

  handleDelete = (item) => {
     Axios.get(`http://localhost:3002/users/deletefileinfolder`,{params:{username:this.props.select.username,filename:item,foldername:this.props.select.selfolder}})
       .then((res) => {
         window.alert('Deleted Successfully..!!');
         //this.props.removeFile(item);
         this.props.history.push('/mainpage')
         this.props.history.push('/folderspage')
       }).catch((err) => {
         window.alert('Could not delete!! Please try after some time..')
       })

    }

  handleStar = (item) => {

    Axios.get(`http://localhost:3002/users/starfileinfolder`,{params:{username:this.props.select.username,filename:item,foldername:this.props.select.selfolder}})
      .then((res) => {
        //this.props.starFile(item);
        window.alert('Starred Successfully..!!')

      }).catch((err) => {
        window.alert(`Could not be starred!! Please try after some time..` +err)
      })
  }

  handleFilesChange = (files) => {
        //this.props.fileUpload(files)
        this.props.displayfolderfiles(files)
  }

  hanldeFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  handleFilesInFolderUpload = () => {

    //this.props.removedisplayfiles()

    if(this.props.select.displayfolderfiles.length > 0){
    var formData = new FormData();

    Object.keys(this.props.select.displayfolderfiles).forEach((key) => {
    console.log('where you want')
    const file = this.props.select.displayfolderfiles[key]
    formData.append(key, file, file.name || 'file')
    })
       Axios({
         method:'post',
         url:`http://localhost:3002/users/filesinfolder`,
         data:formData,
         params:{username:this.props.select.username,folder:this.props.select.selfolder} })
        .then(response => {window.alert(`Files uploaded succesfully!`);
        this.props.history.push('/mainpage');
        this.props.history.push('/folderspage');})
        .catch(err => {window.alert(`Files could not be uploaded!`)})
        //this.props.removeFiles();
    }
    else{
        window.alert("Please select a file first!!")
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
              console.log(this.props.select.selfolder);
              API.fetchFilesInFolder({token:this.props.select.token,username:this.props.select.username,selfolder:this.props.select.selfolder})
                .then((res) => {
                  status = res.status;
                  try{return res.json()}
                  catch(err){console.log(err);}
                }).then((json) => {

                      if (status === 201) {
                          this.props.storeFilesOfFolder(json.filesinfolder)
                          window.location.replace('http://localhost:3000/folderspage');
                      } else if (status === 401) {
                          console.log("Rohan")
                      }
              });

            }
        }

    render(){
        var filesinfolder,displayfolderfiles= [];

        filesinfolder = this.props.select.filesinfolder.map(function(item,index){
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.handleDownload(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.handleDelete(item)}>Delete</button>  <button className="btn btn-primary"  id="star" type="button" onClick =
              {() => this.handleStar(item)}>Star</button></pre></td>
            </tr>
          );
        }.bind(this));

        displayfolderfiles = this.props.select.displayfolderfiles.map(function(item,index){
          return(
            <tr>
              <td><pre> {item.name} </pre></td>
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
                  <div id="centerbarmain" className="col-md-6">
                  <h3 className="text-center"> Files in {this.props.select.selfolder} folder </h3>
                  <table id="tableMenu" className="table table-bordered">
                      <thead>
                      </thead>
                      <tbody>
                          {filesinfolder}
                      </tbody>
                  </table>
                  </div>
                  <div id="rightbarmain" className="col-md-3">
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
                              onClick={() => this.handleFilesInFolderUpload()}>
                      Upload Files</button>

                      <h6 id="selectedfiles"> Selected Files </h6>
                      <table id="tableMenu" className="table table-bordered">
                          <thead>
                          </thead>
                          <tbody>
                              {displayfolderfiles}
                          </tbody>
                      </table>

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

    displayfolderfiles: (files) => {
          dispatch({
        type: "DISPLAYFOLDERFILE",
        payload: {files:files}
      })
    },

    storeFilesOfFolder: (filesinfolder) => {
          dispatch({
        type: "ADDFILESTOFOLDER",
        payload: {filesinfolder:filesinfolder}
      });
    },



  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FoldersPage));
