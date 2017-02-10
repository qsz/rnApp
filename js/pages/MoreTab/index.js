import React, { Component, PropTypes} from 'react';
import { Text, View, BackAndroid, StyleSheet, ScrollView , TouchableNativeFeedback, TouchableHighlight, Platform} from 'react-native';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../../utils/px2dp';
import NavigationBar from '../../components/NavigationBar';
import Avatar from '../../components/Avatar';
import RowItem from '../../components/RowItem';
import SwitchElement from '../../components/SwitchElement';
import colors from '../../constants/colors';
import AboutView from './AboutView';

export default class MoreTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenNightMode: false,
            isRefreshAuto: false
        }
    }
    static contextTypes = {
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
    _itemClickCallback(id){
        switch(id){
            case 0:
                this._turnToPage(AboutView);
                break;
            default:
                return;

        }
    }
    _turnToPage(component){
        this.props.navigator.push({
            component: component
        });
    }
    _renderTitleContent(){
        const {mainThemeColor, segmentColor, titleColor, rowItemBackgroundColor, arrowColor} = this.context;
        return(
            <View style={[styles.block, styles.intro, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                <View style={styles.introLeft}>
                    <Avatar text="Gank" width={px2dp(50)} backgroundColor={mainThemeColor}/>
                </View>
                <View style={styles.introRight}>
                    <Text style={[styles.title, {color: titleColor}]}>Gank.io</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(25)}/>
                </View>
            </View>
        );
    }
    _onNightValueChange(value){
        this.context.changeBackgroundMode();
        this.setState({
            isOpenNightMode: value
        })
    }
    _onRefreshValueChange(value){
        this.setState({
            isRefreshAuto: value
        })
    }
    render(){
        const {segmentColor, pageBackgroundColor} = this.context;
        const {isOpenNightMode, isRefreshAuto} = this.state;
        return (
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar title="更多" />
                <ScrollView>
                    {
                        Platform.OS === 'android' ?
                        <TouchableNativeFeedback
                            onPress={this._itemClickCallback.bind(this, 0)}>
                            {this._renderTitleContent()}
                        </TouchableNativeFeedback>
                        :
                        <TouchableHighlight
                            onPress={this._itemClickCallback.bind(this, 0)}
                            underlayColor={theme.touchableHighlightUnderlayColor}>
                            {this._renderTitleContent()}
                        </TouchableHighlight>
                    }
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <SwitchElement title="夜间模式" icon="md-moon" iconColor="#7b68ee" switcherValue={isOpenNightMode} onValueChange={(value) => this._onNightValueChange(value)}/>
                        <SwitchElement title="自动刷新首页数据" icon="md-refresh" iconColor='#ffd700' renderSegment={false} switcherValue={isRefreshAuto} onValueChange={(value) => this._onRefreshValueChange(value)}/>
                    </View>

                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <RowItem title="反馈" icon="md-text" iconColor={colors.lightGreen} onPress={this._itemClickCallback.bind(this, 5)} isShowRightArrow={false}/>
                        <RowItem title="分享" icon="md-share" iconColor={colors.orangeRed} renderSegment={false} onPress={this._itemClickCallback.bind(this, 6)} isShowRightArrow={false}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    intro: {
        width: theme.screenWidth,
        height: px2dp(80),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20)
    },
    introLeft: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    introRight:{
        flex: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: px2dp(10)
    },
    block: {
        marginTop: px2dp(12),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width
    },
    title: {
        fontSize: px2dp(23),
    },
})

