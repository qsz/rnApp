import React, { Component } from 'react';
import { Text, View, BackAndroid, StyleSheet } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import DiscoveryListView from './DiscoveryListView';
import TypeListView from './TypeListView';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';

export default class DiscoveryTypePage extends BackPageComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataList:[],
            page: 1,
            num: 10,
            refreshing: false,
            err: false
        }
    }
    componentDidMount(){
        this._fetchTypeList()
    }
    _getCurrentTime(){
        let date = new Date();
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    }
    _fetchTypeList(){
        if(!this.state.refreshing){
            this.setState({
                refreshing: true,
                err: false
            }, () => {
                let currentTime = this._getCurrentTime();
                let num = this.state.num;
                let page = this.state.page;
                let url = `http://gank.io/api/data/${this.props.title}/${num}/${page}`;
                fetch(url)
                    .then(res => res.json())
                    .then((data) => {
                        let results = data.results;
                        let nextPage = this.state.page + 1;
                        let newList = this.state.dataList.concat(results);
                        this.setState({
                            dataList: newList,
                            page: nextPage,
                            refreshing: false
                        })
                    })
                    .catch( err => {
                        this.setState({
                            err: true,
                            refreshing: false
                        })
                    })
            })
        }
    }
    _onEndReached(){
        this._fetchTypeList();
    }
    render(){
        var {dataList} = this.state;
        return (
            <View style={[styles.container]}>
                <NavigationBar title={this.props.title}
                               leftBtnIcon="arrow-back"
                               leftBtnPress={this._handleBack.bind(this)}/>
                <View style={[styles.listPanel]}>
                    {
                        this.state.err ?
                            <View style={styles.indicator}>
                                <Text style={{color: '#38b48b'}}>获取数据失败</Text>
                            </View>
                            :
                            dataList ?
                                <TypeListView dataSource={dataList}
                                              navigator={this.props.navigator}
                                              onEndReached={this._onEndReached.bind(this)}
                                />
                                :
                                null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listPanel: {
        marginBottom: px2dp(50)
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    },
});