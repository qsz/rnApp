import React, { Component, PropTypes } from 'react';
import { Text, View, BackAndroid,ListView, StyleSheet, TouchableHighlight ,TouchableNativeFeedback, Platform, Image} from 'react-native';
import theme from '../../constants/theme';
import px2dp from '../../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import getImageSizeUrl from '../../utils/getImgSize';
import WebViewPage from '../WebView';
import Footer from '../../components/FooterList'

export default class DiscoveryListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        rowItemBackgroundColor: PropTypes.string,
        thumbnailColor: PropTypes.string,
        subTitleColor: PropTypes.string,
        titleColor: PropTypes.string,
        segmentColor: PropTypes.string,
        tabIconColor: PropTypes.string,
        isRenderFooter: PropTypes.bool,
        isFullData: PropTypes.bool,
        onEndReached: PropTypes.func
    }
    static defaultProps = {
        rowItemBackgroundColor: '#fff',
        thumbnailColor: '#f1f1f1',
        subTitleColor: '#aaa',
        titleColor: '#000',
        segmentColor: '#ccc',
        tabIconColor: '#38b48b',
        isRenderFooter: true,
        isFullData: false
    }
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    _renderRow(rowData, sectionID, rowID, highlightRow){
        if( Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            );
        }else if( Platform.OS === 'ios' ){
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
    }
    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            params: {rowData: rowData}
        })
    }
    _renderRowContent(rowData){
        const {titleColor, subTitleColor, rowItemBackgroundColor, thumbnailColor, segmentColor} = this.props;
        return (
            <View style={[styles.itemContainer, {backgroundColor: rowItemBackgroundColor, borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                <View style={styles.imgPart}>
                    {
                        rowData.images ?
                            <Image style={styles.image} source={{uri: getImageSizeUrl(rowData.images[0])}} />
                            :
                            <Image style={[styles.image, {backgroundColor: thumbnailColor}]} source={require('../../img/user_article_no_data.png')}/>
                    }
                </View>
                <View style={[styles.txtPart]}>
                    <View style={styles.titlePart}>
                        <Text style={[styles.title, {color: titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        <Icon name="ios-pricetag-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.type}</Text>
                        <Icon name="ios-create-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.who ? rowData.who : 'null'}</Text>
                        <Icon name="ios-time-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                    </View>
                </View>
            </View>
        )
    }
    _handleCreateTime(time){
        return time.substring(0, 10);
    }
    _renderFooter(){
        const {isRenderFooter, tabIconColor, isFullData} = this.props;
        return(
            <Footer indicatorColor={tabIconColor} isFullData={isFullData} isRenderFooter={isRenderFooter}/>
        );
    }
    render(){
        return (
            <View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this.props.onEndReached.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(73),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingLeft: px2dp(12),
        paddingRight: px2dp(5),
        paddingBottom: px2dp(10),
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: px2dp(5)
    },
    image: {
        width: px2dp(60),
        height: px2dp(60),
        resizeMode: 'cover'
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10)
    },
})
