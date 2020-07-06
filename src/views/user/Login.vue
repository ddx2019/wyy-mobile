<template>
  <div class="login">
    <div class="logo-box">
      <div class="logo">
        <i class="iconfont icon-weibiaoti-"></i>
      </div>
    </div>
    <h5>您还没有登录噢(つェ⊂)</h5>
    <div class="button" @click="clickLoginByPhone">手机登录</div>
    <div class="button-uid" @click="clickLoginByUid">UID登录</div>
    <!-- 输入UID -->
    <van-popup
      class="uid"
      close-icon-position="top-left"
      close-icon="arrow"
      closeable
      v-model="isShowUid"
      position="right"
      :style="{ width: '100%' ,height:'100%'}"
      @opened="uidOpened"
    >
      <van-dialog
        confirm-button-text="登录"
        confirm-button-color="#FE2738"
        @cancel="isShowUid=false"
        @confirm="loginByUid"
        @opened="openedDialog"
        v-model="isShowUidDialog"
        show-cancel-button
        :before-close="beforeClose"
      >
        <div class="input">
          <input ref="uIdRef" type="number" v-model="uid" placeholder="请输入网易云的UID" />
        </div>
      </van-dialog>
    </van-popup>
    <!-- 输入手机号码 -->
    <van-popup
      class="phone"
      close-icon-position="top-left"
      close-icon="arrow"
      closeable
      v-model="isShowPhone"
      position="right"
      :style="{ width: '100%' ,height:'100%'}"
      @opened="phoneOpened"
    >
      <p>未注册手机号登录后将自动创建账号</p>
      <div class="input">
        <div class="left">
          <span>+86</span>
          <input
            ref="phoneRef"
            v-model="phone"
            type="number"
            placeholder="请输入手机号"
            oninput="if(value.length > 11) value = value.slice(0, 11)"
          />
        </div>
        <van-icon v-show="phone" name="close" @click="clearPhone" />
      </div>
      <div @click="phoneNext" class="button" :class="[phone.length==11?'active':'']">下一步</div>
    </van-popup>
    <!-- 输入密码 -->
    <van-popup
      class="password"
      close-icon-position="top-left"
      close-icon="arrow"
      closeable
      v-model="isShowPassword"
      position="right"
      :style="{ width: '100%' ,height:'100%'}"
      @opened="passwordOpened"
    >
      <div class="input">
        <div class="left">
          <input ref="passwordRef" v-model="password" type="password" placeholder="请输入密码" />
        </div>
        <van-icon v-show="password" name="close" @click="clearPassword" />
      </div>
      <div @click="passwordNext" class="button" :class="[password?'active':'']">立即登录</div>
    </van-popup>
    <!-- 输入验证码 -->
    <van-popup
      class="captcha"
      close-icon-position="top-left"
      close-icon="arrow"
      closeable
      v-model="isShowCaptcha"
      position="right"
      :style="{ width: '100%' ,height:'100%'}"
    >
      <h5>验证码已发送至</h5>
      <p>
        <span class="phone">+86 {{phone | dealwith}}</span>
        <span
          @click="sendCaptcha"
          class="second"
          :class="[secondCaptchaActive?'ing':'']"
        >{{secondCaptchaActive?defaultSecond+'s':'重新发送'}}</span>
      </p>
      <!-- 验证码输入框 -->
      <van-password-input />
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" />
    </van-popup>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import {
  Popup,
  Icon,
  Toast,
  Dialog,
  PasswordInput,
  NumberKeyboard
} from "vant";
import { checkPhone } from "@/utils/utils";
import request from "@/api/index";
export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
  },

  data() {
    return {
      isShowPhone: false,
      isShowCaptcha: false,
      isShowPassword: false,
      isShowUid: false,
      isShowUidDialog: false,
      secondCaptchaActive: false, //验证码倒计时是否激活
      defaultSecond: 60, //默认验证码倒计时时间
      aptchaValue: "", //验证码值
      showKeyboard: true, //是否显示键盘

      uid: "",
      phone: "", //输入的手机号码
      password: "" //密码
    };
  },

  created() {
    this.asyncSetCurrentTabBar(4);
  },

  filters: {
    dealwith(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    }
  },

  watch: {
    aptchaValue(value) {
      if (value.length == 4) {
        this.checkCaptcha(this.phone, value);
      }
    }
  },

  methods: {
    ...mapActions(["asyncSetCurrentTabBar"]),

    /**dialog关闭前的回调 */
    beforeClose(action, done) {
      if (action == "cancel") {
        done();
      } else {
        done(false);
      }
    },

    /**键盘输入时 */
    onInput(key) {
      this.aptchaValue = (this.aptchaValue + key).slice(0, 4);
    },

    /**点击键盘中的删除时 */
    onDelete() {
      this.aptchaValue = this.aptchaValue.slice(0, this.aptchaValue.length - 1);
    },

    /**点击 重新发送 */
    sendCaptcha() {
      if (this.secondCaptchaActive) {
        return;
      } else {
        this.getCaptcha(this.phone);
      }
    },

    /**验证码倒计时 */
    secondCaptcha() {
      this.secondCaptchaActive = true;
      let timeName = window.setInterval(() => {
        this.defaultSecond--;
        if (this.defaultSecond == 0) {
          window.clearInterval(timeName);
          this.defaultSecond = 60;
          this.secondCaptchaActive = false;
        }
      }, 1000);
    },

    /**获取验证码 */
    getCaptcha(phone) {
      request.getCaptcha(phone).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.isShowCaptcha = true;
          this.secondCaptcha();
        } else {
          Toast("验证码获取失败");
        }
      });
    },

    /**校验验证码是否正确 */
    checkCaptcha(phone, captcha) {
      request
        .checkCaptcha(phone, captcha)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            //校验成功
            Toast("验证码正确");
          }
        })
        .catch(() => {
          Toast("验证码错误");
          this.aptchaValue = "";
        });
    },

    /** 检测手机号码是否已经注册*/
    checkCellphone(phone) {
      request.checkCellphone(phone).then(res => {
        console.log(res);
        if (res.exist == -1) {
          //没有注册
          console.log("没有注册");
          this.getCaptcha(this.phone);
        } else {
          console.log("已经注册");
          this.isShowPassword = true;
        }
      });
    },

    /**点击立即登录 */
    passwordNext() {
      if (this.password.length == 0) {
        return;
      }
      this.loginByPhone(this.phone, this.password);
    },

    /**uid登录 */
    loginByUid() {
      // this.isShowUid=false
      if (this.uid == "") {
        Toast("UID不能为空");
        return;
      } else {
        /**获取我的歌单 */
        request.getUserList(this.uid).then(res => {
          console.log(res);
          if (res && res.code == 200 && res.playlist.length != 0) {
            window.sessionStorage.setItem(
              "playlist",
              JSON.stringify(res.playlist)
            );
            window.localStorage.setItem("uId", this.uid);
            this.$router.push({ path: "/user", query: { flag: true } });
          } else {
            Toast("无效的UID,请重新输入");
          }
        });
      }
    },

    /**手机号码登录 */
    loginByPhone(phone, password) {
      request.loginByPhone(phone, password).then(res => {
        console.log(res);
        if (res) {
          //登录成功
          window.localStorage.setItem("userId", res.account.id);
          this.$router.push("/user");
        } else {
          Toast("用户名或密码错误");
          this.$refs.passwordRef.focus();
        }
      });
    },

    /**点击手机号码的下一步 */
    phoneNext() {
      if (this.phone.length != 11) {
        return;
      }
      if (!checkPhone(this.phone)) {
        Toast("请输入正确的手机号");
        return;
      }
      //检测手机号码是否已经注册
      this.checkCellphone(this.phone);
    },

    /**点击手机登录 */
    clickLoginByPhone() {
      this.isShowPhone = true;
    },

    /**点击UID登录 */
    clickLoginByUid() {
      this.isShowUid = true;
    },

    /**手机号的弹出层 开启后 触发 */
    phoneOpened() {
      this.$refs.phoneRef.focus();
    },

    /**点击清除手机号 */
    clearPhone() {
      this.phone = "";
      this.$refs.phoneRef.focus();
    },

    /**点击清除密码 */
    clearPassword() {
      this.password = "";
      this.$refs.passwordRef.focus();
    },

    /**密码的弹出层 开启后 触发 */
    passwordOpened() {
      this.$refs.passwordRef.focus();
    },

    /**uid的弹出层 开启后 触发 */
    uidOpened() {
      this.isShowUidDialog = true;
    },

    /**uid的 dialog弹出后 触发*/
    openedDialog() {
      this.$refs.uIdRef.focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #ac0614;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  flex-shrink: 0;

  .logo-box {
    margin-top: 25%;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#FDA01F,#93FD1F,#1F71FD,#FD1FE9);
    animation: rotate 1.5s linear infinite;
    border-radius: 50%;

    @keyframes rotate {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(360deg);
      }
    }

    .logo {
      width: 70px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      color: #fff;
      border-radius: 50%;
      background-color: rgb(250, 4, 4);
      // border: 1px solid white;
      

      i {
        font-size: 48px;
        font-weight: 900;
      }
    }
  }

  h5 {
    font-size: 20px;
    margin-top: 20%;
  }

  .button,
  .button-uid {
    padding: 10px 30px;
    border-radius: 50px;
    // border: 1px solid #fff;
    font-size: 20px;
    margin-top: 20%;
    color: #ff0418;
    background-color: #fff;
    font-weight: bold;
  }

  .button-uid {
    margin-top: 5%;
  }

  .van-popup.phone,
  .van-popup.password {
    color: #333;
    padding: 20px;

    p {
      margin-top: 50px;
      font-size: 14px;
      color: #999;
    }

    .input {
      margin-top: 40px;
      border-bottom: 1px solid #eee;
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        span {
          font-size: 18px;
          font-weight: bold;
        }

        input {
          border: none;
          margin-left: 10px;
          font-size: 16px;
        }
      }

      .van-icon {
        color: #999;
        padding-top: 2px;
      }
    }

    .button {
      width: 100%;
      height: 40px;
      font-weight: normal;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      margin: 40px auto 0;
      padding: 0;
      border-radius: 40px;
      background: linear-gradient(to right, #fe4958, #fe1326);
      filter: opacity(30%);
    }
    .button.active {
      filter: opacity(100%);
    }
  }

  .van-popup.password .input .left {
    width: 90%;
    input {
      margin-left: 0;
      width: 100%;
    }
  }

  .van-popup.uid .input {
    padding: 20px;
    display: flex;
    justify-content: center;

    input {
      border: 1px solid #eee;
      padding: 8px 15px;
      border-radius: 8px;
      color: #333;
      font-size: 18px;
      -webkit-appearance: none;
    }
  }

  .van-popup.captcha {
    color: #333;
    padding: 20px;

    h5 {
      margin-top: 50px;
      font-size: 17px;
      font-weight: bold;
    }

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .phone {
        color: #999;
        font-size: 16px;
      }

      .second {
        font-size: 14px;
        color: #2339b6;
      }

      .second.ing {
        color: #999;
      }
    }

    .van-password-input {
      margin-top: 30px;
    }
  }
}
</style>