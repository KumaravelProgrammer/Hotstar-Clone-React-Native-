import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MaterialTab from './Nav';

const reducer = (state = { menu: "closeMenu", log: "" }, action) => {
    // if (action.type == "OPENMENU") {
    //     return { menu: "openMenu" };
    // } else if (action.type == "CLOSEMENU") {
    //     return { menu: "closeMenu" };  //return state;
    // } 
    switch (action.type) { 
        case "OPENMENU":
            return { ...state, menu: "openMenu" };
        case "CLOSEMENU":
            return { ...state, menu: "closeMenu" };

        case "LOG":
            return { ...state, log: action.email }

        case "OPENLOGIN":
            return { ...state, menu: "openLogin" };

        case "CLOSELOGIN":
            return { ...state, menu: "closeLogin" };

        default:
            return state;

    }

};

const database = configureStore(reducer);

const App = () => (

    <Provider store={database}>

        <MaterialTab />

    </Provider>
);

export default App;
