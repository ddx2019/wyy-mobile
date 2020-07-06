<template>
  <div class="user-warp">
    <h5>
      我的歌单
      <span>
        欢迎：{{userName}}
        <img @click="showButton" :src="avatarUrl+'?param=50y50'" />
        <transition name="bounce">
          <span @click="logout" v-show="isShowButton">
            退出
            <span></span>
          </span>
        </transition>
      </span>
    </h5>

    <div class="container">
      <div
        @click="goPlaylistDetail(item.id)"
        class="item"
        v-for="(item,index) in userList"
        :key="index"
      >
        <!-- <div
          class="img"
          :style="{ backgroundImage: 'url(' + item.coverImgUrl + '?param=200y200)' }"
        ></div> -->
        <div class="img" >
          <img v-lazy="item.coverImgUrl" alt="">
        </div>
        <p>{{item.name}}</p>
      </div>
      <div class="null"></div>
    </div>

    <!-- 虚化背景 -->
    <div ref="maskRef" class="mask"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import request from "@/api/index";
export default {
  data() {
    return {
      userList: [], //我的歌单列表
      userName: "", //用户名
      avatarUrl: "", //用户头像
      isShowButton: false //是否显示退出按钮
    };
  },

  created() {
    if (this.$route.query.flag) {
      //从uid登录页面过来的
      let temPlaylist = JSON.parse(window.sessionStorage.getItem("playlist"));
      this.userList = temPlaylist;
      this.avatarUrl = temPlaylist[0].creator.avatarUrl;
      this.userName = temPlaylist[0].creator.nickname;
    } else {
      this.getUserList(
        window.localStorage.getItem("userId") ||
          window.localStorage.getItem("uId")
      );
    }
  },
  activated() {
    this.asyncSetCurrentTabBar(4);
    this.userList = JSON.parse(window.sessionStorage.getItem('userList'))
  },
  mounted() {
    if (this.$route.query.flag) {
      this.$refs.maskRef.style.backgroundImage = `url(${this.avatarUrl +
        "?param=200y200"})`;
    }
  },
  methods: {
    ...mapActions(["asyncSetCurrentTabBar"]),

    /**点击头像 */
    showButton() {
      this.isShowButton = true;
      let temTime = window.setTimeout(() => {
        this.isShowButton = false;
        window.clearTimeout(temTime);
      }, 2000);
    },

    /**点击退出登录 */
    logout() {
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("uId");
      this.$router.push("/recommend");
    },

    /**获取我的歌单 */
    getUserList(id) {
      request.getUserList(id).then(res => {
        console.log(res);
        if (res && res.code == 200 && res.playlist.length != 0) {
          this.userList = res.playlist;
          this.avatarUrl = res.playlist[0].creator.avatarUrl;
          this.$refs.maskRef.style.backgroundImage = `url(${this.avatarUrl +
            "?param=200y200"})`;
          this.userName = res.playlist[0].creator.nickname;
          window.sessionStorage.setItem('userList',JSON.stringify(res.playlist))
        }
      });
    },

    /**点击歌单 去歌单详情 */
    goPlaylistDetail(id) {
      console.log(id);
      this.$router.push({ path: "playlistDetail", query: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-warp {
  overflow-y: scroll;
  color: #fff;
  flex-shrink: 0;
  width: 100%;

  h5 {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 15px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      position: relative;

      img {
        width: 30px;
        border-radius: 50%;
        margin-left: 10px;
      }

      span {
        position: absolute;
        bottom: -35px;
        right: -3px;
        padding: 2px 5px;
        background-color: rgb(202, 199, 13);
        border-radius: 5px;
        font-size: 16px;

        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: rgb(202, 199, 13);
          position: absolute;
          left: 50%;
          top: 0;
          transform: rotate(45deg) translateX(-50%);
          border-radius: 0px;
          padding: 0;
        }
      }
    }
  }

  .container {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    // justify-content: space-around;

    .item {
      width: 33%;
      // height: 130px;
      //   background-color: aqua;
      display: flex;
      flex-direction: column;
      align-items: center;

      .img {
        width: 100px;
        height: 100px;
        // background-color: royalblue;
        // border-radius: 6px;
        // background-size: cover;
        // background-position: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }

      p {
        width: 90px;
        height: 28px;
        line-height: 14px;
        padding-top: 2px;
        box-sizing: content-box;
        margin-bottom: 15px;
        text-align: justify;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 11px;
      }
    }

    .null {
      width: 100%;
      height: 50px;
    }
  }

  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: cover;
    background-position: center;
    filter: blur(30px);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>