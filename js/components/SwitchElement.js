import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

export default class SwitchElement extends Component{
    constructor(props){
        super(props);
        this.state = {
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
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        renderSegment: PropTypes.bool,
        switcherValue: PropTypes.bool,
        onValueChange: PropTypes.func
    }
    static defaultProps = {
        renderSegment: true,
        iconColor: '#000',
        switcherValue: true
    }
    render(){
        const {title, icon, renderSegment, iconColor, switcherValue, onValueChange} = this.props;
        const {mainThemeColor, rowItemBackgroundColor, segmentColor, titleColor} = this.context;
        return(
            <View style={[styles.container, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.leftCell}>
                    <View style={[styles.iconBorder, {backgroundColor: iconColor}]}>
                        <Icon name={icon} color={rowItemBackgroundColor} size={px2dp(16)}/>
                    </View>
                </View>
                <View style={styles.rightCell}>
                    <View style={styles.cell}>
                        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
                        <Switch value={switcherValue} onValueChange={(value) => onValueChange(value)} onTintColor={mainThemeColor}/>
                    </View>
                    { renderSegment ?
                        <View style={[styles.segmentLine, {backgroundColor: segmentColor}]}/>
                        :
                        null
                    }
                </View>
            </View>
        );
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
});