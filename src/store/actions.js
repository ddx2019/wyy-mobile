export default {
    /**修改播放状态 */
    asyncSetPlayingState({
        commit
    }, playingState) {
        commit('setPlayingState', playingState)
    },

    /**修改当前播放时间 */
    asyncSetCurrentTime({
        commit
    }, currentTime) {
        commit('setCurrentTime', currentTime)
    },

    /**修改播放器元素 */
    asyncSetAudioEle({
        commit
    }, audioEle) {
        commit("setAudioEle", audioEle)
    },

    /**修改音乐ID */
    asyncSetSongId({
        commit
    }, songId) {
        commit("setSongId", songId)
    },

    /**修改当前TabBar */
    asyncSetCurrentTabBar({
        commit
    }, currentTabBar) {
        commit("setCurrentTabBar", currentTabBar)
    },

    /**修改当前播放的歌曲列表 */
    asyncSetCurrentSongList({
        commit
    }, currentSongList) {
        commit("setCurrentSongList", currentSongList)
    },

    /**修改当前播放的模式 */
    asyncSetPlayingType({
        commit
    }) {
        commit("setPlayingType")
    },

    /**修改音乐的url地址 */
    asyncSetMusicUrl({
        commit
    }, musicUrl) {
        commit("setMusicUrl", musicUrl)
    },

    /**顺序播放下一曲 */
    asyncOrderNextSong({commit}){
        commit("orderNextSong")
    },

    /**顺序播放上一曲 */
    asyncOrderPrevSong({commit}){
        commit("orderPrevSong")
    },

    /**随机播放下一曲 或 上一曲  */
    asyncRandomSong({commit}){
        commit("randomSong")
    }
}