import {Platform, Dimensions, PixelRatio} from 'react-native';
import px2dp from '../utils/px2dp';

export default {
    mainThemeColor: '#38b48b',
    arrowColor: '#ccc',
    pageBackgroundColor: '#f4f4f4',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    rowItemBackgroundColor: '#fff',
    thumbnailColor: '#f1f1f1',
    subTitleColor: '#aaa',
    segmentColor: '#ccc',
    titleColor: '#000',
    tabIconColor: 'rgb(230,230,230)',
    segment: {
        color: '#ccc',
        width: 1/PixelRatio.get()
    },
    tabButton: {
        normalColor: '#aaa'
    },
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(40) : px2dp(49),
        paddingTop: Platform.Version >= 21 ? px2dp(20) : 0,
        //barColor: favoriteColor,
        titleColor: '#fff',
        titleSize: Platform.OS === 'android' ? px2dp(16) : px2dp(14),
        textBtnSize: Platform.OS === 'android' ? px2dp(12) : px2dp(11)
    },
    nightMode: {

    },
    lightMode: {

    },
}