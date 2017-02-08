import React, { Component,PropTypes } from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl, Animated, Image} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import HomeListView from '../../components/HomeListView'

export default class HomeTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            loading: false,
            err: false,
            refreshing: true,
            imageHeight: px2dp(400),
            dataTime: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
            categoryList: {},
            typeList:[]
        }
    }
    componentDidMount(){
        this._fetchData();

    }
    _getCurrentTime(){
        let date = new Date();
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`

    }
    _fetchData(){
        let currentTime = this._getCurrentTime();
        let url = `http://gank.io/api/day/${currentTime}`;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                let results = data.results;
                let typeList = [];
                for (var category in results) {
                    typeList.push(category)
                }
                this.setState({
                    refreshing: false,
                    categoryList: results,
                    typeList: typeList
                })
            })
    }
    _getOnePic(){
        //获取一张图片
    }
    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= this.state.imageHeight - theme.toolbar.height){
            var opacity = offsetY / (this.state.imageHeight - theme.toolbar.height);
            this.setState({opacity: opacity});
        }else{
            this.setState({opacity: 1});
        }
    }
    render(){
        let categoryList = this.state.categoryList, typeList = this.state.typeList;
        return (
            <View style={[styles.container]}>
                <Animated.View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <NavigationBar title="最新干货"/>
                </Animated.View>
                <ScrollView
                    scrollEnabled={true}
                    onScroll={this._onScroll.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onScroll.bind(this, 0)}
                            tintColor={'yellow'}
                            colors={['red']}
                            title="拼命加载中..."
                        />}
                >
                    {
                        this.state.err ?
                            <View style={styles.indicator}>
                                <Text style={{color: '#38b48b'}}>Ooops, 获取数据失败</Text>
                            </View>
                            :
                            (
                                !this.state.refreshing && categoryList?
                                    <View>
                                        <View style={{height: this.state.imageHeight, width: theme.screenWidth}}>
                                            <ImageView
                                                imgUrl={'http://ww1.sinaimg.cn/large/7a8aed7bgw1evdga4dimoj20qo0hsmzf.jpg'}
                                                labelTime={this.state.dataTime}/>
                                        </View>
                                        <View style={styles.scrollContents}>
                                            {
                                                typeList.map((type, i) => {
                                                    if(type !== '福利'){
                                                        return (
                                                            <HomeListView key={i}
                                                                          dataSource={categoryList[type]}
                                                                          headerTitle={type}/>
                                                        )
                                                    }
                                                })
                                            }
                                        </View>
                                    </View>
                                    :
                                    null
                            )

                    }
                </ScrollView>
            </View>

        )
    }
}

class ImageView extends Component{
    static propTypes = {
        imgUrl: PropTypes.string,
        labelTime: PropTypes.string
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}} style={styles.img}/>
                <View style={styles.dateLabel}>
                    <Text style={styles.label}>{this.props.labelTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    },
    img: {
        width: theme.screenWidth,
        height: px2dp(400),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: px2dp(50),
        bottom: px2dp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: px2dp(20),
        marginRight: px2dp(20),
        fontWeight: 'bold'
    },
    scrollContents: {
        paddingBottom: px2dp(50),
    },
});