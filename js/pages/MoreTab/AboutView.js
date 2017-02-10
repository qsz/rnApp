import React, { Component } from 'react';
import { Text, View, BackAndroid } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';

export default class AboutView extends BackPageComponent{
    render(){
        return (
            <View>
                <NavigationBar
                    title={'关于'}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                <Text>This is a AboutView page</Text>
            </View>
        )
    }
}
