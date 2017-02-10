import React, { Component , PropTypes} from 'react';
import { Text, View, Platform, TouchableNativeFeedback, TouchableHighlight, StyleSheet} from 'react-native';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/px2dp';

export default class RowItem extends Component{
    constructor(props){
        super(props);

    }
    static propTypes = {
        renderSegment: PropTypes.bool,
        onPress: PropTypes.func,
        segmentColor: PropTypes.string,
        titleColor: PropTypes.string,
        rowItemBackgroundColor: PropTypes.string,
        arrowColor: PropTypes.string
    }
    static defaultProps = {
        renderSegment: true,
        segmentColor: '#ccc',
        titleColor: '#000',
        rowItemBackgroundColor: '#fff',
        arrowColor: '#ccc',
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
    _renderContent(){
        const {title, icon, renderSegment, iconColor, isShowRightArrow} = this.props;
        const {rowItemBackgroundColor, segmentColor, titleColor, arrowColor} = this.context;
        return (
            <View style={[styles.container, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.leftCell}>
                    <View style={[styles.iconBorder, {backgroundColor: iconColor}]}>
                        <Icon name={icon} color={rowItemBackgroundColor} size={px2dp(16)}/>
                    </View>
                </View>
                <View style={styles.rightCell}>
                    <View style={styles.cell}>
                        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
                        {isShowRightArrow ?
                            <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(18)}/>
                            :
                            null
                        }
                    </View>
                    { renderSegment ?
                        <View style={[styles.segmentLine, {backgroundColor: segmentColor}]}/>
                        :
                        null
                    }
                </View>
            </View>
        )

    }
    render(){
        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(40),
        alignItems: 'center'
    },
    title: {
        marginLeft: px2dp(5)
    },
    iconBorder: {
        borderRadius: 5,
        width: px2dp(23),
        height: px2dp(23),
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftCell: {
        width: px2dp(40),
        height: px2dp(40),
        paddingLeft: px2dp(17),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightCell: {
        flex: 1,
        height: px2dp(40),
        marginLeft: px2dp(15),
    },
    cell: {
        flex: 1,
        paddingRight: px2dp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    segmentLine: {
        height: theme.segment.width
    }
})