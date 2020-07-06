export default {
    isPlaying: false, //是否在播放
    currentTime: 0, //当前播放时间
    audioEle: null, //播放器元素
    songId: null, //歌曲ID
    currentTabBar: [], //历史TabBar选中项，返回时显示历史TabBar
    currentSongList: [], //当前播放的歌曲列表
    playingType: 0, //播放模式   0：循序播放（默认）1：单曲循环 2：随机播放
    musicUrl:null,//音乐的url地址
}