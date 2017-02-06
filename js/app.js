import React, {Component} from 'react';
import {Navigator} from 'react-native';
import {NativeModules} from 'react-native';
import MainPage from './pages/MainPage';
//import SplashScreen from './native_modules/SplashScreen';

export default class Navigation extends Component{
    componentDidMount(){
       // SplashScreen.hide();
    }
    render(){
        return (
            <Navigator
                initialRoute={{component: MainPage}}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.params}/>
                }}
               />
        )
    }
}


