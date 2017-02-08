import React, { Component , PropTypes} from 'react';
import { Text, View, BackAndroid , WebView, StyleSheet, ActivityIndicator, Animated, Modal, Linking, TouchableOpacity, Alert, Clipboard, ToastAndroid} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import ShareUtil from '../../utils/ShareUtil';

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
    moreContentContainerBackground: {
        position: 'absolute',
        top: 0,
        width: theme.screenWidth,
        height: theme.screenHeight
    },
    moreContentContainer: {
        position: 'absolute',
        right: px2dp(5),
        top: theme.toolbar.height,
        width: px2dp(160),
        height: px2dp(160),
        borderRadius: 5,
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        paddingTop: px2dp(5),
        paddingBottom: px2dp(5)
    },
    modalItem: {
        width: px2dp(150),
        height: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default class WebViewPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.state={
            showMoreContent: false,
        }
    }
    static propTypes = {
        tabIconColor: PropTypes.string,
        rowItemBackgroundColor: PropTypes.string,
        titleColor: PropTypes.string
    }
    static defaultProps = {
        tabIconColor: '#38b48b',
        rowItemBackgroundColor: '#fff',
        titleColor: '#000'
    }
    _renderLoading(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={this.props.tabIconColor} size="large"/>
                <Text style={{marginTop: px2dp(10), color: this.props.tabIconColor}}>加载中...</Text>
            </View>
        );
    }
    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>加载失败啦～</Text>
            </View>
        );
    }
    _btnOnPressCallback(id){
        switch (id){
            case 1:
                Alert.alert('', this.props.rowData.desc, [{text: 'OK', onPress: ()=>{}}]);
                break;
            case 2:
                Clipboard.setString(this.props.rowData.url);
                ToastAndroid.show('已复制到剪贴板',ToastAndroid.SHORT);
                break;
            case 3:
                Linking.canOpenURL(this.props.rowData.url).then(supported => {
                    if (supported) {
                        Linking.openURL(this.props.rowData.url);
                    } else {
                        ToastAndroid.show('Cannot open it', ToastAndroid.SHORT);
                    }
                });
                break;
            case 4:
               let share = new ShareUtil();
                share.share(this.props.rowData.desc, this.props.rowData.url);
               break;
            default:
                this.setState({showMoreContent: !this.state.showMoreContent});
        }
    }
    _renderModalItem(btnId, icon, title){
        return(
            <TouchableOpacity
                onPress={this._btnOnPressCallback.bind(this, btnId)}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <ModalItem icon={icon} title={title} titleColor={this.props.titleColor}/>
            </TouchableOpacity>
        );
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

                <Modal
                    transparent={true}
                    visible={this.state.showMoreContent}
                    onRequestClose={this._btnOnPressCallback.bind(this, 9)}>
                    <View style={[styles.moreContentContainerBackground, {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                        <View style={[styles.moreContentContainer, {backgroundColor: this.props.rowItemBackgroundColor}]}>
                            {this._renderModalItem(1, 'ios-paper-outline', '查看完整标题')}
                            {this._renderModalItem(2, 'ios-clipboard-outline', '复制链接')}
                            {this._renderModalItem(3, 'ios-open-outline', '在浏览器中打开')}
                            {this._renderModalItem(4, 'ios-share-outline', '分享此内容')}
                            {this._renderModalItem(9, 'ios-close-circle-outline', '关闭')}
                        </View>
                    </View>
                </Modal>

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


class ModalItem extends Component{
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string
    };

    static defaultProps = {
        titleColor: '#000'
    }

    render(){
        return(
            <View style={styles.modalItem}>
                <View style={{flex: 20}}>
                    <Icon name={this.props.icon} size={px2dp(20)} color={this.props.titleColor}/>
                </View>
                <View style={{flex: 80}}>
                    <Text style={{color: this.props.titleColor}}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

