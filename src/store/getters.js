export default {
    getIsPlaying: state => state.isPlaying, //获取是否在播放
    getcurrentTime: state => state.currentTime, //获取当前播放时间
    getaudioEle: state => state.audioEle, //获取播放器元素
    getSongId: state => state.songId, //获取歌曲ID
    getCurrentTabBar: state => state.currentTabBar, //获取当前选中TabBar
    getCurrentSongList: state => state.currentSongList, //获取当前播放的歌曲列表
    getPlayingType: state => {
        if (state.playingType == 0) {
            return {
                type: 0,
                class: "icon-xunhuan-wangyiicon"
            }
        } else if (state.playingType == 1) {
            return {
                type: 1,
                class: "icon-danquxunhuan"
            }
        } else {
            return {
                type: 2,
                class: "icon-suijibofang-wangyiicon"
            }
        }
    }, //获取当前播放的模式
    
    getMusicUrl: state => state.musicUrl, //获取音乐的url地址
}