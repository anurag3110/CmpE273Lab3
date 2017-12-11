import React, {Component} from 'react';
//import './App.css';

// import HomePage from "./components/HomePage";
// import NewHomePage from "./components/NewHomePage";

import {BrowserRouter} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
//import Welcome from "./components/Welcome";

// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
                <div>
                    {/*<HomePage/>*/}
                    {/*<NewHomePage/>*/}
                    <BrowserRouter>
                      <LoginPage />
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
