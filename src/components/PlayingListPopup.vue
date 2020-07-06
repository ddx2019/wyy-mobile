<template>
  <van-popup
    :overlay-style="overlayStyle"
    @click-overlay="closePopup"
    :close-on-click-overlay="false"
    v-model="isShow"
    position="bottom"
    @closed="closedPopup"
    :style="{ height: '85%' }"
  >
    <div class="warp">
      <!-- <div class="button" @click="closePopup">关闭</div> -->
      <van-swipe ref="swipeRef" :loop="false" initial-swipe="1" indicator-color="#fff">
        <van-swipe-item>
          <div class="lastLis list-box">
            <h5>历史播放</h5>
            <ul>
              <li>给他任何</li>
              <li>突然间</li>
              <li>热环境</li>
              <li>就一台空调遥控</li>
              <li>热霍比特人九年</li>
              <li>虽然扽教育科</li>
              <li>的天热家庭人均你</li>
              <li>个太热九年</li>
              <li>给他软件</li>
              <li>惹的祸</li>
            </ul>
            <div class="button" @click="closePopup">关闭</div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="nowList list-box">
            <h5>
              当前播放
              <span>({{getCurrentSongList.length}})</span>
            </h5>
            <transition-group v-if="getCurrentSongList.length>0" name="list" tag="ul">
              <li
                @click="playingSong(item.id)"
                :class="[getSongId==item.id?'active':'']"
                v-for="(item,index) in getCurrentSongList"
                :key="item.id"
              >
                <van-icon v-if="getSongId==item.id" class="activeInon" name="volume-o" />
                <div class="left">
                  <p>{{item.name}}</p>
                  <span>-&nbsp;{{item.ar[0].name}}</span>
                </div>
                <van-icon @click.stop="deleteSong(index,item.id)" name="cross" />
              </li>
            </transition-group>
            <div v-else class="noData">无当前播放列表</div>
            <div class="button" @click="closePopup">关闭</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </van-popup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Popup, Swipe, SwipeItem, Icon, Toast } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      overlayStyle: {
        backgroundColor: "transparent"
      }
    };
  },

  computed: {
    ...mapGetters(["getCurrentSongList", "getSongId"])
  },

  methods: {
    ...mapActions(["asyncSetCurrentSongList", "asyncSetSongId"]),

    /**删除当前播放列表的歌曲 */
    deleteSong(index, id) {
      if (id == this.getSongId) {
        //如果删除的是正在播放的歌曲
        Toast("该歌曲正在播放");
        return;
      }

      this.asyncSetCurrentSongList(index);
    },

    /**点击当前播放列表 */
    playingSong(id) {
      this.asyncSetSongId(id);
    },

    /**点击关闭弹出层 */
    closePopup() {
      this.$emit("update:isShow", false);
    },

    /**弹出层关闭后触发 */
    closedPopup() {
      this.$refs.swipeRef.swipeTo(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.van-popup {
  background: transparent;
  display: flex;
  justify-content: center;
  color: #333;
  .warp {
    width: 100%;
    // height: 95%;
    // background-color: #fff;
    // border-radius: 20px;
  }

  ::v-deep .van-swipe {
    height: 100%;

    .van-swipe__indicators {
      top: 0px;
      bottom: auto;
    }

    .van-swipe-item {
      display: flex;
      align-items: center;
      justify-content: center;

      .list-box {
        width: 90%;
        height: 90%;
        background-color: #fff;
        border-radius: 20px;

        h5 {
          height: 50px;
          padding: 0 15px;
          line-height: 50px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          align-items: center;

          span {
            color: #999;
            margin-left: 5px;
          }
        }

        .noData {
          padding: 0 15px;
          height: calc(100% - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        ul {
          padding: 0 15px;
          height: calc(100% - 100px);
          overflow-y: scroll;
          overflow-x: hidden;
          li {
            padding: 10px 0;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
              flex: 1;
              // display: flex;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: flex;
              align-items: center;

              p {
                max-width: 100%;
                font-size: 16px;
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                // line-height: 16px;
              }
              span {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
                margin-left: 3px;
                // padding-top: 3px;
              }
            }

            .van-icon {
              padding: 5px;
              color: #999;
            }

            .activeInon {
              padding-left: 0;
              padding-right: 5px;
              color: red;
            }
          }

          li:last-of-type {
            border-bottom: none;
          }

          li.active {
            color: red;
            span {
              color: red;
            }
          }
        }

        .button {
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-top: 1px solid #f5f5f5;
        }
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(200px);
}
</style>