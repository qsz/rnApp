import {Platform, Dimensions, PixelRatio} from 'react-native';
import px2dp from '../utils/px2dp';

export default {
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
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
        mainThemeColor: 'rgb(40,40,40)',
        arrowColor: 'rgb(200,200,200)',
        pageBackgroundColor: 'rgb(58,58,58)',
        segmentColor: 'rgb(54,54,54)',
        titleColor: 'rgb(177,177,177)',
        subTitleColor: 'rgb(130,130,130)',
        rowItemBackgroundColor: 'rgb(63,63,63)',
        tabIconColor: 'rgb(230,230,230)',
        thumbnailColor: 'rgb(130,130,130)',
        webViewToolbarColor: 'rgba(40,40,40,.9)'
    },
    lightMode: {
        mainThemeColor: '#38b48b',
        arrowColor: '#ccc',
        pageBackgroundColor: '#f4f4f4',
        segmentColor: '#ccc',
        titleColor: '#000',
        subTitleColor: '#aaa',
        rowItemBackgroundColor: '#fff',
        tabIconColor: '#38b48b',
        thumbnailColor: '#f1f1f1',
        webViewToolbarColor: 'rgba(255,255,255,.9)'
    },
}