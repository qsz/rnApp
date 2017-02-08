import {Share, ToastAndroid} from 'react-native';
import px2dp from './px2dp';

export default class ShareUtil{
    share(content, url){
        Share.share({
            message: url,
            url: url,
            title: content
        }).then(this._showResult).catch((error)=>{ToastAndroid.show('分享失败', ToastAndroid.SHORT)});
    }
    _showResult(result) {
        if (result.action === Share.sharedAction) {
            //Toast.show('分享成功',{position: px2dp(-80)});
        }
    }
}