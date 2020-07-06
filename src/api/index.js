import request from './axios'

//userId:361753092

export default {

    /**获取歌曲详情 */
    getMusicDetail(ids) {
        return request({
            method: 'get',
            url: '/song/detail',
            params: {
                ids
            }
        })
    },

    /**获取歌词 */
    getLyric(id) {
        return request({
            method: 'get',
            url: '/lyric',
            params: {
                id
            }
        })
    },

    /**获取推荐歌单 */
    getRecommendedList() {
        return request({
            method: 'get',
            url: '/personalized',
        })
    },

    /**获取排行榜歌单 */
    getRankingList() {
        return request({
            method: 'get',
            url: '/toplist/detail',
        })
    },

    /**获取我的歌单 */
    getUserList(uid) {
        return request({
            method: 'get',
            url: '/user/playlist',
            params: {
                uid
            }
        })
    },

    /**获取歌单详情 */
    getPlaylistDetail(id) {
        return request({
            method: 'get',
            url: '/playlist/detail',
            params: {
                id
            }
        })
    },

    /**获取歌曲Url */
    getSongUrl(id) {
        return request({
            method: 'get',
            url: '/song/url',
            params: {
                id
            }
        })
    },

    /**检测手机号码是否已经注册 */
    checkCellphone(phone) {
        return request({
            method: 'get',
            url: '/cellphone/existence/check',
            params: {
                phone
            }
        })
    },

    /**手机号码登录 */
    loginByPhone(phone, password) {
        return request({
            method: 'get',
            url: '/login/cellphone',
            params: {
                phone,
                password
            }
        })
    },

    /**获取验证码 */
    getCaptcha(phone) {
        return request({
            method: 'get',
            url: '/captcha/sent',
            params: {
                phone
            }
        })
    },

    /**校验验证码是否正确 */
    checkCaptcha(phone, captcha) {
        return request({
            method: 'get',
            url: '/captcha/verify',
            params: {
                phone,
                captcha
            }
        })
    },

}