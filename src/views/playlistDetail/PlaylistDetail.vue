<template>
  <div class="playlist-detail">
    <div v-if="!isLoadingData">
      <div
        class="background-img"
        :style="{ backgroundImage: 'url(' + coverImgUrl + '?param=200y200)' }"
      ></div>
      <div class="wrap">
        <header>
          <!-- <div class="left" :style="{ backgroundImage: 'url(' + coverImgUrl + '?param=200y200)' }"></div> -->
          <div class="left">
            <img v-lazy="coverImgUrl" alt />
          </div>

          <div class="right">
            <h5>{{name}}</h5>
            <div class="author">
              <img :src="avatarUrl+'?param=50y50'" alt />
              <span>{{nickname}}</span>
            </div>
            <p>{{description}}</p>
          </div>
        </header>
        <div class="list-box">
          <div class="title">
            <i @click="goPlayingAll" class="iconfont icon-zanting"></i>
            <p @click="goPlayingAll">全部播放</p>
            <span>(共{{songList.length}}首)</span>
          </div>
          <ul class="song-list">
            <li
              @click="goPlaying(item.id)"
              :class="[activeIndx==index?'active':'']"
              v-for="(item,index) in songList"
              :key="item.id"
            >
              <van-icon v-if="activeIndx==index" class="number" name="volume-o" />
              <div v-else class="number">{{index+1}}</div>
              <div class="name">
                <p>
                  {{item.name}}
                  <span v-if="item.alia[0]">({{item.alia[0]}})</span>
                </p>
                <span>{{item.ar[0].name}}&nbsp;-&nbsp;{{item.al.name}}</span>
              </div>
            </li>
          </ul>
          <div class="null"></div>
        </div>
      </div>
    </div>
    <div v-else class="loadingData">
      <van-loading type="spinner" color="#1FFDFA" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Icon, Loading } from "vant";
import request from "@/api/index";
export default {
  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },

  data() {
    return {
      isLoadingData: true,
      activeIndx: null, //正在播放的歌曲下标
      coverImgUrl: "", //封面背景
      name: "", //歌单标题
      avatarUrl: "", //头像
      nickname: "", //昵称
      description: "", //描述
      songList: [] //歌曲信息
    };
  },

  activated() {
    this.getPlaylistDetail(this.$route.query.id);
    this.isLoadingData = true
  },

  computed: {
    ...mapGetters(["getSongId"])
  },

  methods: {
    ...mapActions(["asyncSetSongId", "asyncSetCurrentSongList"]),

    /**获取歌单详情 */
    getPlaylistDetail(id) {
      request.getPlaylistDetail(id).then(res => {
        console.log(res);
        this.coverImgUrl = res.playlist.coverImgUrl;
        this.name = res.playlist.name;
        this.avatarUrl = res.playlist.creator.avatarUrl;
        this.nickname = res.playlist.creator.nickname;
        this.description = res.playlist.description;
        this.songList = res.playlist.tracks;
        this.isLoadingData = false;
        this.songList.forEach((item, index) => {
          if (item.id == this.getSongId) {
            this.activeIndx = index;
          }
        });
      });
    },

    /**点击列表 跳 播放 */
    goPlaying(id) {
      this.asyncSetSongId(id);
      this.asyncSetCurrentSongList(this.songList);
      this.$router.push("/playing");
    },

    /**点击全部播放 */
    goPlayingAll() {
      this.asyncSetSongId(this.songList[0].id);
      this.asyncSetCurrentSongList(this.songList);
      this.$router.push("/playing");
    }
  }
};
</script>
<style lang="scss" scoped>
.playlist-detail {
  flex-shrink: 0;
  width: 100%;

  .background-img {
    width: 100%;
    height: 165px;
    background-position: center;
    background-size: cover;
    filter: blur(20px);
  }

  .wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    header {
      padding: 25px 15px 45px 15px;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      width: 100%;

      .left {
        width: 115px;
        height: 115px;
        // background-color: aqua;
        // border-radius: 6px;
        // background-position: center;
        // background-size: cover;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }

      .right {
        flex: 1;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // background-color: red;

        h5 {
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          overflow: hidden;
          /* //作为弹性伸缩盒子模型显示。 */
          display: -webkit-box;
          /* //设置伸缩盒子的子元素排列方式--从上到下垂直排列 */
          -webkit-box-orient: vertical;
          /* //显示的行，文本超出 显示几行 */
          -webkit-line-clamp: 2;
          text-align: justify;
        }

        .author {
          display: flex;
          align-items: center;
          padding: 5px 0;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          span {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            margin-left: 5px;
            overflow: hidden;
            /* //作为弹性伸缩盒子模型显示。 */
            display: -webkit-box;
            /* //设置伸缩盒子的子元素排列方式--从上到下垂直排列 */
            -webkit-box-orient: vertical;
            /* //显示的行，文本超出 显示几行 */
            -webkit-line-clamp: 2;
          }
        }

        p {
          overflow: hidden;
          /* //作为弹性伸缩盒子模型显示。 */
          display: -webkit-box;
          /* //设置伸缩盒子的子元素排列方式--从上到下垂直排列 */
          -webkit-box-orient: vertical;
          /* //显示的行，文本超出 显示几行 */
          -webkit-line-clamp: 2;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          text-align: justify;
        }
      }
    }

    .list-box {
      //   padding: 0 15px;
      border-radius: 20px 20px 0 0;
      position: relative;
      top: -20px;
      background-color: #fff;

      .title {
        display: flex;
        align-items: center;
        padding: 12px 0;

        i {
          font-size: 20px;
          font-weight: bold;
          width: 40px;
          text-align: center;
        }

        p {
          font-size: 16px;
          font-weight: bold;
        }

        span {
          font-size: 12px;
          color: #999;
          margin-left: 3px;
        }
      }

      .song-list {
        li {
          display: flex;
          align-items: center;
          padding: 8px 0;

          .number {
            width: 40px;
            color: #999;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .name {
            flex: 1;
            padding-right: 20px;

            p {
              overflow: hidden;
              /* text-overflow: ellipsis; */
              /* //作为弹性伸缩盒子模型显示。 */
              display: -webkit-box;
              /* //设置伸缩盒子的子元素排列方式--从上到下垂直排列 */
              -webkit-box-orient: vertical;
              /* //显示的行，文本超出 显示几行 */
              -webkit-line-clamp: 1;
              font-size: 16px;
              //   font-weight: bold;

              span {
                color: #999;
                margin-left: 3px;
              }
            }

            & > span {
              overflow: hidden;
              /* text-overflow: ellipsis; */
              /* //作为弹性伸缩盒子模型显示。 */
              display: -webkit-box;
              /* //设置伸缩盒子的子元素排列方式--从上到下垂直排列 */
              -webkit-box-orient: vertical;
              /* //显示的行，文本超出 显示几行 */
              -webkit-line-clamp: 1;
              font-size: 11px;
              color: #999;
            }
          }
        }

        li.active p,
        li.active .number {
          color: red;
        }
      }

      .null {
        width: 100%;
        height: 50px;
      }
    }
  }
}

.loadingData {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>