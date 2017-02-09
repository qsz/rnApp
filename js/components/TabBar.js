import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/px2dp';
import TestPage from '../pages/TestPage';
import HomeTab from '../pages/HomeTab';
import DiscoveryPage from '../pages/DiscoveryTab';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

export default class TabBar extends Component{
    static defaultProps = {
        selectedColor: '#38b48b',
        normalColor: '#a9a9a9'
    };
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页','发现','发布','更多'],
        }
    }
    componentWillMount() {

    }
    render(){
        const {selectedColor, normalColor, navigator} = this.props;
        const {tabName} = this.state;
        return (
                <TabNavigator
                    hidesTabTouch={true}
                    tabBarStyle={styles.tabbar}
                    sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[0]}
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-home" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-home" size={20} color={selectedColor}/> }
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        {<HomeTab navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[1]}
                        selected={this.state.selectedTab === 'compass'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-compass" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-compass" size={20} color={selectedColor}/> }
                        onPress={() => this.setState({ selectedTab: 'compass' })}>
                        {<DiscoveryPage navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[2]}
                        selected={this.state.selectedTab === 'add'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-add" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-add" size={20} color={selectedColor}/> }
                        onPress={() => this.setState({ selectedTab: 'add' })}>
                        {<TestPage navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[3]}
                        selected={this.state.selectedTab === 'more'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-apps" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-apps" size={20} color={selectedColor}/> }
                        onPress={() => this.setState({ selectedTab: 'more' })}>
                        {<TestPage navigator={navigator}/>}
                    </TabNavigator.Item>
                </TabNavigator>
        )
    }
}


const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(49),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle:{
        padding: px2dp(5)
    },
    tab: {
        width: px2dp(22),
        height: px2dp(22)
    }
});