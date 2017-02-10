import React, { Component , PropTypes} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/px2dp';
import TestPage from '../pages/TestPage';
import HomeTab from '../pages/HomeTab';
import DiscoveryPage from '../pages/DiscoveryTab';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import MoreTab from '../pages/MoreTab';
import theme from '../constants/theme';

export default class TabBar extends Component{
    static defaultProps = {
        selectedColor: '#38b48b',
        normalColor: '#a9a9a9'
    };
    static childContextTypes = {
        mainThemeColor: PropTypes.string,
        arrowColor: PropTypes.string,
        pageBackgroundColor: PropTypes.string,
        segmentColor: PropTypes.string,
        titleColor: PropTypes.string,
        subTitleColor: PropTypes.string,
        rowItemBackgroundColor: PropTypes.string,
        tabIconColor: PropTypes.string,
        thumbnailColor: PropTypes.string,
        webViewToolbarColor: PropTypes.string,
        changeBackgroundMode: PropTypes.func
    }
    getChildContext(){
        return {
            mainThemeColor: '#38b48b',
            arrowColor: '#ccc',
            pageBackgroundColor: '#f4f4f4',
            segmentColor: '#ccc',
            titleColor: '#000',
            subTitleColor: '#aaa',
            rowItemBackgroundColor: '#fff',
            tabIconColor: '#38b48b',
            thumbnailColor: '#f1f1f1',
            webViewToolbarColor: 'rgba(255,255,255,.9)',
            _changeBackgroundMode: this._changeBackgroundMode,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页','发现','发布','更多'],
            //日间模式
            isNightMode: false,
            mainThemeColor: '#38b48b',
            arrowColor: '#ccc',
            pageBackgroundColor: '#f4f4f4',
            segmentColor: '#ccc',
            titleColor: '#000',
            subTitleColor: '#aaa',
            rowItemBackgroundColor: '#fff',
            tabIconColor: '#38b48b',
            thumbnailColor: '#f1f1f1',
            webViewToolbarColor: 'rgba(255,255,255,.9)'
        }
    }
    componentWillMount() {
    }
    _changeBackgroundMode(){
        let isNightMode = this.state.isNightMode;
        if( isNightMode ){
            this.setState(theme.lightMode)
        }else {
            this.setState(theme.nightMode)
        }
    }
    render(){
        let {selectedColor, normalColor, navigator} = this.props;

        const {tabName, rowItemBackgroundColor, tabIconColor} = this.state;
        return (
                <TabNavigator
                    hidesTabTouch={true}
                    tabBarStyle={[styles.tabbar,{backgroundColor: rowItemBackgroundColor}]}
                    sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[0]}
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-home" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-home" size={20} color={tabIconColor}/> }
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        {<HomeTab navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[1]}
                        selected={this.state.selectedTab === 'compass'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-compass" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-compass" size={20} color={tabIconColor}/> }
                        onPress={() => this.setState({ selectedTab: 'compass' })}>
                        {<DiscoveryPage navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[2]}
                        selected={this.state.selectedTab === 'add'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-add" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-add" size={20} color={tabIconColor}/> }
                        onPress={() => this.setState({ selectedTab: 'add' })}>
                        {<TestPage navigator={navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        title={tabName[3]}
                        selected={this.state.selectedTab === 'more'}
                        selectedTitleStyle={{color: selectedColor}}
                        renderIcon={() => <Icon name="md-apps" size={20} color={normalColor}/> }
                        renderSelectedIcon={() => <Icon name="md-apps" size={20} color={tabIconColor}/> }
                        onPress={() => this.setState({ selectedTab: 'more' })}>
                        {<MoreTab navigator={navigator}/>}
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