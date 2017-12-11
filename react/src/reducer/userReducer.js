

const userReducer = (state = {
  isLoggedIn: false,
  firstname: '',
  lastname: '',
  username: '',
  password:'',
  token:'',
  contact:'',
  w1:'',
  w2:'',
  e1:'',
  e2:'',
  m1:'',
  m2:'',
  sh1:'',
  sh2:'',
  sp1:'',
  sp2:'',
  files:[],
  filesinfolder:[],
  filesinfolderfc:[],
  filesinfolderfs:[],
  starredfiles:[],
  displayfiles:[],
  displayfolderfiles:[],
  displayfolderfilesfc:[],
  displayfolderfilesfs:[],
  folders:[],
  folderscreated:[],
  foldersshared:[],
  selfolder:'',
  selfolderfc:'',
  selfolderfs:'',
  filetoshare:'',
  APIcall:0

}, action) => {
  switch(action.type){

    case "CHANGELOG":
        state={
          ...state,
          isLoggedIn : true,
          firstname : action.payload.firstname,
          lastname : action.payload.lastname
        };
        break;
    case "CHANGEUSER":
        state={
          ...state,
          username: action.payload.username
        };
        break;
    case "CHANGEPASS":
        state={
          ...state,
          password: action.payload.pass
        };
        break;
    case "SETTOKEN":
        state={
          ...state,
          token: action.payload.token
        };
        break;


    case 'CHANGEDATA':
       state={
         ...state,
         w1 : action.payload.data[0].Work,
         w2 : action.payload.data[1].Work,
         e1 : action.payload.data[0].Education,
         e2 : action.payload.data[1].Education,
         m1 : action.payload.data[0].Music,
         m2 : action.payload.data[1].Music,
         sh1: action.payload.data[0].Shows,
         sh2: action.payload.data[1].Shows,
         sp1: action.payload.data[0].Sports,
         sp2: action.payload.data[1].Sports
       };
       break;

    case "RESTORE":
        state={
          ...state,
          isLoggedIn: false,
          firstname: '',
          lastname: '',
          username: '',
          password:'',
          token:'',
          contact:'',
          w1:'',
          w2:'',
          e1:'',
          e2:'',
          m1:'',
          m2:'',
          sh1:'',
          sh2:'',
          sp1:'',
          sp2:'',
          files:[],
          filesinfolder:[],
          filesinfolderfc:[],
          filesinfolderfs:[],
          starredfiles:[],
          displayfiles:[],
          displayfolderfiles:[],
          displayfolderfilesfc:[],
          displayfolderfilesfs:[],
          folders:[],
          folderscreated:[],
          foldersshared:[],
          selfolder:'',
          selfolderfc:'',
          selfolderfs:'',
          filetoshare:'',
          APIcall:0
        };
        break;

    case "ADDFILE":

        state={
          ...state,
          files: action.payload.files
        };

        break;

    case "ADDFILESTOFOLDER":

        state={
          ...state,
          filesinfolder: action.payload.filesinfolder
        };

        break;

    case "ADDFILESTOFOLDERFC":

            state={
              ...state,
              filesinfolderfc: action.payload.filesinfolderfc
            };

            break;

    case "ADDFILESTOFOLDERFS":

            state={
              ...state,
              filesinfolderfs: action.payload.filesinfolderfs
            };

            break;

    case "ADDFOLDER":

        state={
          ...state,
          folders: action.payload.folders
        };

        break;

    case "ADDCREATEDFOLDER":

        state={
          ...state,
          folderscreated: action.payload.folders
        };

        break;

    case "ADDSHAREDFOLDER":

        state={
          ...state,
          foldersshared: action.payload.folders
        };

        break;

    case "DISPLAYFILE":

        state={
          ...state,
          displayfiles: action.payload.files
        };

        break;

    case "DISPLAYFOLDERFILE":

        state={
          ...state,
          displayfolderfiles: action.payload.files
        };

        break;

    case "DISPLAYFOLDERFILEFC":

        state={
          ...state,
          displayfolderfilesfc: action.payload.files
        };

        break;

    case "DISPLAYFOLDERFILEFS":

        state={
          ...state,
          displayfolderfilesfs: action.payload.files
        };

        break;

    case "REMOVEDISPLAYFILE":

        state={
          ...state,
          displayfiles: []
        };

        break;

    case "REMOVEFILE":

        state={
          ...state,
          files: []
        };

        break;

    break;

    case "REMOVE":

        state={
          ...state,
          files: state.files.filter((item) => { return action.payload.file !== item })
        };

        break;

    case "REMOVEFOLDER":

        state={
          ...state,
          folders: state.folders.filter((item) => { return action.payload.folder !== item })
        };

        break;

    case "SELECTED":

        state={
          ...state,
          selfolder: action.payload.selfolder
        };

        break;

    case "SELECTEDFC":

      state={
        ...state,
        selfolderfc: action.payload.selfolderfc
      };

      break;

    case "SELECTEDFS":

            state={
              ...state,
              selfolderfs: action.payload.selfolderfs
            };

            break;

    case "APICOUNT":

        state={
          ...state,
          APIcall: 1
        };

        break;

    case "STAR":

        state={
          ...state,
          starredfiles: action.payload.files
        };

        break;

    case "SHARE":

        state={
          ...state,
          filetoshare: action.payload.file
        };

        break;

    case "REMOVESTAR":

        state={
          ...state,
          starredfiles: state.starredfiles.filter((item) => { return action.payload.file !== item })
        };

        break;


  }
  return state;
};

export default userReducer;
