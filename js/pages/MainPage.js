import React, { Component } from 'react';
import { Text, View, BackAndroid } from 'react-native';
import TabBar from '../components/TabBar';
import theme from '../constants/theme'


export default class MainPage extends Component{
    render(){
        return (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabBar navigator={this.props.navigator}/>
            </View>
        )
    }
}