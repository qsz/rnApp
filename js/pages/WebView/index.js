import React, { Component , PropTypes} from 'react';
import { Text, View, BackAndroid , WebView, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';


let styles = StyleSheet.create({
    webview_style:{
        backgroundColor:'#f4f4f4',
        flex: 1
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        marginTop: theme.toolbar.paddingTop,
        zIndex: 1
    },
});


export default class WebViewPage extends BackPageComponent{
    static propTypes = {
        tabIconColor: PropTypes.string
    }
    static defaultProps = {
        tabIconColor: '#38b48b'
    }
    _renderLoading(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={this.props.tabIconColor} size="large"/>
                <Text style={{marginTop: px2dp(10), color: this.props.tabIconColor}}>玩命加载中...</Text>
            </View>
        );
    }
    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>出错了, 重新刷新下吧～</Text>
            </View>
        );
    }
    _btnOnPressCallback(){

    }
    render(){
        const rowData = this.props.rowData;
        return (
            <View style={{flex:1}}>
                <View style={styles.contentContainer}>
                    <WebView style={styles.webview_style}
                             source={{uri: rowData.url}}
                             startInLoadingState={true}
                             domStorageEnabled={true}
                             javaScriptEnabled={true}
                             renderError={this._renderError.bind(this)}
                             renderLoading={this._renderLoading.bind(this)}
                             ref={(ref) => {this.webView = ref}}>
                    </WebView>
                </View>
                <Animated.View style={[styles.toolbar, {top: 0}]}>
                    <NavigationBar
                        title="详细内容"
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}
                        rightBtnIcon="more"
                        rightBtnPress={this._btnOnPressCallback.bind(this, 9)}
                    />
                </Animated.View>
            </View>
        )
    }
}

