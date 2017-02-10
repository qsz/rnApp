import React, { Component } from 'react';
import { Text, View, BackAndroid, StyleSheet} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';

export default class AboutView extends BackPageComponent{
    render(){
        const { mainThemeColor, pageBackgroundColor } = this.props;
        return (
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title={'关于'}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                    mainThemeColor={mainThemeColor}
                />
                <Text>This is a AboutView page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});