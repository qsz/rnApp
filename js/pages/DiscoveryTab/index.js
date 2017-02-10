import React, { Component , PropTypes} from 'react';
import {Text, StyleSheet, Image, View, Platform, ListView, RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';
import theme from '../../constants/theme';
import DiscoveryListView from './DiscoveryListView';
import DiscoveryTypePage from './DiscoveryTypePage';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        paddingBottom: px2dp(90),
    },
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        height: px2dp(45),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    },
    btnPanel: {
        height: px2dp(215),
        width: theme.screenWidth,
        marginTop: px2dp(12),
        marginBottom: px2dp(15),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width,
        padding: px2dp(17),
    },
    btnRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCellLabel: {
        marginTop: px2dp(4),
    },
    fakeListViewHeader: {
        flexDirection: 'row',
        padding: px2dp(8),
        borderBottomWidth:theme.segment.width,
        borderTopWidth: theme.segment.width,
        alignItems: 'center'
    }
})

export default class DiscoveryTab extends Component{
    constructor(props){
        super(props);
        this.tabNames = [['Android','iOS','前端','App'],['休息视频','拓展资源','瞎推荐','福利']];
        this.tabIcon = [['logo-android','logo-apple','logo-chrome','ios-apps'],['ios-film','ios-book','ios-radio','ios-images']];
        this.tabColor = [['rgb(141,192,89)','#000','rgb(51,154,237)','rgb(249,89,58)'],['#9370db','#00ced1','#ffa500','lightpink']];
        this.state = {
            loading: false,
            discoveryList: [],
            refreshing: false,
            err: false
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
    }
    componentDidMount(){
        this._fetchRandomData()
    }
    _onScroll(event){
        let _ev = event.nativeEvent
        if( (_ev['contentOffset']['y'] + _ev['layoutMeasurement']['height'] - _ev['contentSize']['height']) >= -5){
            this._fetchRandomData()
        }
    }
    _onRefresh(){
        this.setState({
            refreshing: true,
            err: false
        }, () => {
            const randomUrl = 'http://gank.io/api/random/data/all/10';
            fetch(randomUrl)
                .then(res => res.json())
                .then( (data) => {
                    let results = data.results;
                    // let newList = this.state.discoveryList.concat(results);
                    this.setState({
                        refreshing: false,
                        discoveryList: results
                    })
                })
                .catch(err => console.log(err))
        })
    }
    _renderTypeContent(i, index){
        return(
            <View style={{width:px2dp(50), height:px2dp(50), alignItems:'center', justifyContent:'center'}}>
                <Avatar icon={this.tabIcon[i][index]} width={px2dp(50)} backgroundColor={this.tabColor[i][index]}/>
            </View>
        );

    }
    _itemPressCallback(subItem){
        if(subItem === '福利'){

        }else{
            this.props.navigator.push({
                component: DiscoveryTypePage,
                params: {
                    title: subItem,
                    navigator: this.props.navigator,
                    mainThemeColor: this.context.mainThemeColor,
                    titleColor: this.context.titleColor,
                    subTitleColor: this.context.subTitleColor,
                    rowItemBackgroundColor: this.context.rowItemBackgroundColor,
                    thumbnailColor: this.context.thumbnailColor,
                    segmentColor: this.context.segmentColor,
                    tabIconColor: this.context.tabIconColor,
                    pageBackgroundColor: this.context.pageBackgroundColor
                }
            });
        }

    }
    _fetchRandomData(){
        //const randomCategory = ['Android/2','iOS/2','前端/2','休息视频/2','拓展资源/2','App/2','瞎推荐/2'];
        if(!this.state.refreshing){
            this.setState({
                refreshing: true,
                err: false
            }, () => {
                const randomUrl = 'http://gank.io/api/random/data/all/10';
                fetch(randomUrl)
                    .then(res => res.json())
                    .then( (data) => {
                        let results = data.results;
                        let newList = this.state.discoveryList.concat(results);
                        this.setState({
                            refreshing: false,
                            discoveryList: newList
                        }, () => {
                           // console.log(results)
                        })
                    })
                    .catch(err => {
                        this.setState({
                            err: true,
                            refreshing: false
                        })
                        console.log(err)})
            })
        }
    }
    render(){
        const { rowItemBackgroundColor, segmentColor, subTitleColor, pageBackgroundColor, titleColor , mainThemeColor} = this.context;
        const { discoveryList } = this.state;
        return (
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar title='发现'
                               mainThemeColor={mainThemeColor}
                />
                <ScrollView
                    scrollEnabled={true}
                    onScroll={this._onScroll.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh.bind(this, 0)}
                            tintColor={mainThemeColor}
                            colors={[mainThemeColor]}
                            title="拼命加载中..."
                        />}
                >
                    <View>
                        <View style={[styles.btnPanel, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                            {this.tabNames.map((item,i) => {
                                return (
                                    <View style={styles.btnRow} key={i}>
                                        {
                                            item.map((subItem, index) => {
                                                return (
                                                    <View  style={styles.btnCell} key={index}>
                                                        <TouchableOpacity
                                                            onPress={this._itemPressCallback.bind(this, subItem)}
                                                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                                                            {this._renderTypeContent(i,index)}
                                                        </TouchableOpacity>
                                                        <Text style={[styles.btnCellLabel, {color: titleColor}]}>{subItem}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })}
                        </View>
                        <View>
                            {
                                this.state.err ?
                                    <View style={[styles.fakeListViewHeader, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                                        <Icon name="md-aperture" color={subTitleColor} size={px2dp(16)}/>
                                        <Text style={{color: subTitleColor, marginLeft: px2dp(5)}}>获取数据失败..</Text>
                                    </View>
                                    :
                                this.state.refreshing && !discoveryList.length?
                                    <View style={[styles.fakeListViewHeader, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                                        <Icon name="md-aperture" color={subTitleColor} size={px2dp(16)}/>
                                        <Text style={{color: subTitleColor, marginLeft: px2dp(5)}}>刷新中...</Text>
                                    </View>
                                    :
                                    <View>
                                        <View style={[styles.fakeListViewHeader, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                                            <Icon name="md-aperture" color={subTitleColor} size={px2dp(16)}/>
                                            <Text style={{color: subTitleColor, marginLeft: px2dp(5)}}>随便看看</Text>
                                        </View>
                                        <View>
                                            <DiscoveryListView dataSource={discoveryList}
                                                               navigator={this.props.navigator}
                                            />
                                        </View>
                                    </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
