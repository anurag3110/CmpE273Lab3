const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
      fetch(`${api}/users/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({username:payload.username,password:payload.password})
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignUp = (payload) =>
    fetch(`${api}/users/doSignUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if(res.status === 201){
            return res.json();
        }
        else if(res.status === 401 || res.status === 404){
            return res.json();
        }
    }).catch(error => {
              console.log("This is error");
              return error;
    });

export const changeUserData = (payload) =>
    fetch(`${api}/users/changeUserData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
          });

export const createGroup = (payload) =>
          fetch(`${api}/users/createGroup`, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }).then(res => {
            return res;
          })
          .catch(error => {
            console.log("This is error");
            return error;
          });


export const fetchAbout  = (payload) =>
      fetch(`${api}/users/getUserData`, {
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      }).then(res => {
          return res;
      })
        .catch(error => {
            console.log("This is error");
            return error;
          });

export const fetchFiles  = (payload) =>
      fetch(`${api}/users/getFiles`, {
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      }).then(res => {
          return res;
      })
        .catch(error => {
            console.log("This is error");
            return error;
          });

export const fetchFilesInFolder  = (payload) =>
      fetch(`${api}/users/getFilesInFolder`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchFilesInFolderFc  = (payload) =>
      fetch(`${api}/users/getFilesInFolderFc`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchFilesInFolderFs  = (payload) =>
      fetch(`${api}/users/getFilesInFolderFs`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchFolders  = (payload) =>
      fetch(`${api}/users/getFolders`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchstarFiles  = (payload) =>
      fetch(`${api}/users/getstarFiles`, {
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      }).then(res => {
          return res;
      })
        .catch(error => {
           console.log("This is error");
           return error;
          });


export const signout  = (payload) =>
      fetch(`${api}/users/signout`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchgroupsCreated  = (payload) =>
      fetch(`${api}/users/getGroupsCreated`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });

export const fetchgroupsShared  = (payload) =>
      fetch(`${api}/users/getGroupsShared`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error");
        return error;
      });
