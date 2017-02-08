import React, { Component, PropTypes } from 'react';
import { Text, View, BackAndroid , ListView, StyleSheet, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Avatar from './Avatar';
import WebViewPage from '../pages/WebView'

export default class HomeListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string,
        titleColor: PropTypes.string,
        rowItemBackgroundColor: PropTypes.string,
        subTitleColor: PropTypes.string,
        segmentColor: PropTypes.string
    }
    static defaultProps = {
        segmentColor: '#ccc',
        titleColor: '#000',
        subTitleColor: '#aaa',
        rowItemBackgroundColor: '#fff',
    };
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tabIcon = ['logo-android','logo-apple','logo-chrome','ios-film','ios-book','ios-apps','ios-radio'];
        this.tabColor = ['rgb(141,192,89)','#000','rgb(51,154,237)', '#9370db','#00ced1','rgb(249,89,58)','#ffa500'];
    }
    _renderRow(rowData,sectionID,rowID,highlightRow){
        if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            )
        }else if(Platform.OS === 'ios'){
            return (
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>

            )
        }
    }
    _renderHeader(){
        const {headerTitle, rowItemBackgroundColor, segmentColor} = this.props;
        return(
            <View style={[styles.header, {backgroundColor: rowItemBackgroundColor, borderTopColor: segmentColor}]}>
                <Avatar icon={this.tabIcon[this._judgeIconAttribute(headerTitle)]} width={px2dp(20)} backgroundColor={this.tabColor[this._judgeIconAttribute(headerTitle)]}/>
                <Text style={styles.headerLabel}>{this.props.headerTitle}</Text>
            </View>
        );
    }
    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            params: {
                rowData: rowData
            }
        })

    }
    _renderRowContent(rowData){
        const {titleColor, subTitleColor, rowItemBackgroundColor} = this.props;
        return(
            <View style={[styles.rowItem, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="ios-create-outline" color={subTitleColor}/>
                    <Text style={{fontSize: px2dp(10), color: subTitleColor}}> {rowData.who ? rowData.who : 'null'}</Text>
                </View>
                <Text style={[styles.rowContent, {color: titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
            </View>
        );
    }
    render(){
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    //renderSeparator={this._renderSeparator.bind(this)}
                />
            </View>
        )
    }

    _judgeIconAttribute(hearderLabel){
        switch(hearderLabel){
            case 'Android':
                return 0;
            case 'iOS':
                return 1;
            case '前端':
                return 2;
            case '休息视频':
                return 3;
            case '拓展资源':
                return 4;
            case 'App':
                return 5;
            case '瞎推荐':
                return 6;
        }
    }
}


const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        paddingTop: px2dp(12),
        paddingBottom: px2dp(6),
        paddingLeft: px2dp(15),
        alignItems: 'center',
        borderTopWidth: theme.segment.width
    },
    headerLabel: {
        color: 'steelblue',
        fontSize: px2dp(17),
        marginLeft: px2dp(7)
    },
    rowItem: {
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        justifyContent: 'center'
    },
    rowContent: {
        fontSize: px2dp(14)
    }
});
