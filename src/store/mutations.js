import {
    getRandom
} from '@/utils/utils'

export default {
    /**修改播放状态 */
    setPlayingState(state, playingState) {
        state.isPlaying = playingState
    },

    /**修改当前播放时间 */
    setCurrentTime(state, currentTime) {
        state.currentTime = currentTime
    },

    /**修改播放器元素 */
    setAudioEle(state, audioEle) {
        state.audioEle = audioEle
    },

    /**修改歌曲ID */
    setSongId(state, songId) {
        state.songId = songId
    },

    /**修改当前TabBar */
    setCurrentTabBar(state, currentTabBar) {
        if (state.currentTabBar[state.currentTabBar.length - 1] == currentTabBar) {
            return
        }
        state.currentTabBar.push(currentTabBar)
    },

    /**修改当前播放的歌曲列表 */
    setCurrentSongList(state, currentSongList) {
        if (typeof currentSongList == 'number') {
            state.currentSongList.splice(currentSongList, 1)
        } else {
            state.currentSongList = currentSongList
        }

    },

    /**修改当前播放的模式 */
    setPlayingType(state) {
        state.playingType++;
        if (state.playingType == 3) {
            state.playingType = 0
        }
    },

    /**修改音乐的url地址 */
    setMusicUrl(state, musicUrl) {
        state.musicUrl = musicUrl
    },

    /**顺序播放下一曲 */
    orderNextSong(state) {
        let itemIndex //当前播放的歌曲的下标
        state.currentSongList.forEach((ele, index) => {
            if (ele.id == state.songId) {
                itemIndex = index
                return
            }
        });
        if (itemIndex == state.currentSongList.length - 1) {
            //列表中的最后一首
            state.songId = state.currentSongList[0].id
        } else {
            state.songId = state.currentSongList[itemIndex + 1].id
        }

    },

    /**顺序播放上一曲 */
    orderPrevSong(state) {
        let itemIndex //当前播放的歌曲的下标
        state.currentSongList.forEach((ele, index) => {
            if (ele.id == state.songId) {
                itemIndex = index
                return
            }
        });
        if (itemIndex == 0) {
            //列表中的第一首
            state.songId = state.currentSongList[state.currentSongList.length - 1].id
        } else {
            state.songId = state.currentSongList[itemIndex - 1].id
        }

    },

    /**随机播放下一曲 或 上一曲 */
    randomSong(state) {
        let itemIndex //当前播放的歌曲的下标
        state.currentSongList.forEach((ele, index) => {
            if (ele.id == state.songId) {
                itemIndex = index
                return
            }
        });
        //随机出一个不包括正在播放列表的下标的随机数，作为下一个随机播放的下标
        let randomIndex = getRandom(0, state.currentSongList.length - 1, itemIndex)
        state.songId = state.currentSongList[randomIndex].id
    },
}