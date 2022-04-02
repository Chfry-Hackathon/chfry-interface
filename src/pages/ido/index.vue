<style lang="scss"></style>
<template>
  <div class="page-home">
    <template>
      <span class="p p1">IDO Launch </span>
      <span class="p p2">
        CHFRY x Balancer
        <br />
        1 PM UTC, September 28th 2021
      </span>
    </template>
    <div class="m-ido-container">
      <div class="m-ido-content">
        <div class="m-ido-left">
          <div class="m-img-box">
            <img v-if="isMobile" src="../../assets/ido/375chart.svg" alt="" />
            <img v-else src="../../assets/ido/chart.svg" alt="" />
          </div>
        </div>
        <div class="m-ido-right">
          <div class="m-ido-img-top-wrapper">
            <div class="title">TIME LEFT</div>
            <div class="time-content">
              <p class="start">
                Start:
                {{ time.start }}
                <!-- Sept. 28, 2021, 1PM  -->
              </p>
              <p class="end">
                End:&nbsp;
                {{ time.end }}
                <!-- Sept. 30, 2021, 12:59PM -->
              </p>
            </div>
          </div>
          <div class="m-ido-img-bottom-wrapper">
            <div class="title">SPOT PRICE (WETH)</div>
            <!-- <div class="content">0.001502</div> -->
            <div class="content" v-if="price">{{ price }}</div>
            <div class="connect-wall" v-else>
              <span>Connect your wallet to check the spot price</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-participation-guide-wrapper">
      <div class="m-participation-guide-content">
        <div
          class="m-participation-guide-btn"
          @click="
            handleToLink(
              'https://copperlaunch.com/v1/auctions/0xfc3cca33112b1861c165badc997c970a0a447d5a'
            )
          "
        >
          COPPER ENTRANCE
        </div>
        <div
          class="m-participation-guide-btn btn2"
          @click="
            handleToLink(
              'https://app.balancer.fi/#/trade/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59'
            )
          "
        >
          POOL ENTRANCE
        </div>
      </div>
    </div>

    <div class="m-participation-guide-wrapper two">
      <div class="m-participation-guide-content">
        <div
          class="m-participation-guide-btn"
          @click="
            handleToLink(
              'https://medium.com/@chfry_finance/cheese-ido-on-balancer-how-to-participate-3f24f27a6030'
            )
          "
        >
          PARTICIPATION GUIDE
        </div>
        <div
          class="m-participation-guide-btn btn2"
          @click="
            handleToLink(
              'https://docs.google.com/spreadsheets/d/1F7YRDC07eTutUQEtZaBQsfVjLScF0jYI/edit#gid=1296823031'
            )
          "
        >
          LBP SIMULATOR
        </div>
      </div>
    </div>

    <div>
      <div class="p p5">
        <div class="t1">Find out More</div>
        <div class="t2">
          <a-button class="chr-btn chr-btn7" @click="openPage('Gitbook')"
            >GITBOOK</a-button
          >
          <a-button class="chr-btn chr-btn7" @click="openPage('Github')"
            >GITHUB</a-button
          >
        </div>
      </div>

      <div class="p p5">
        <div class="t1">
          Join our communities <br />for exclusive offers and updates
        </div>
        <div class="t2">
          <a-button class="btn" @click="openPage('Discord')">
            <img class="t2-1" src="../../assets/tool/icon_link_Discord.svg" />
            <span class="t2-2">Discord</span>
          </a-button>
          <a-button class="btn" @click="openPage('Telegram')">
            <img class="t2-1" src="../../assets/tool/icon_link_Telegram.svg" />
            <span class="t2-2">Telegram</span>
          </a-button>
          <a-button class="btn" @click="openPage('Twitter')">
            <img class="t2-1" src="../../assets/tool/icon_link_Twitter.svg" />
            <span class="t2-2">Twitter</span>
          </a-button>
          <a-button class="btn" @click="openPage('Medium')">
            <img class="t2-1" src="../../assets/ido/medium.svg" />
            <span class="t2-2">Medium</span>
          </a-button>
        </div>
      </div>
    </div>

    <div style="margin-top:53px">
      <chrfy-bot></chrfy-bot>
    </div>
  </div>
</template>

<script>
import global from "../../common/Global";
import { mapGetters } from "vuex";
import BoxItem from "./components/boxItem";
import LottieAnimation from "lottie-web-vue";
import { getGradualUpdate, getSpotPrice } from "../../sdk/cheese-sdk";
import { resetString } from "../../utils/tools";
import { idoCountdown } from "../../utils/countdown";
import ChrfyBot from "../../components/chrfyBot.vue";

export default {
  components: { BoxItem, LottieAnimation, ChrfyBot },
  props: {},
  data() {
    return {
      startTime: "1632834000000",
      endTime: "1633093199000",
      resetString: resetString,
      price: "",
      timer: "",
      time: {
        start: "",
        end: "",
      },
      global: global,
      token1: {
        symbol: "CHEESE COIN",
        address: "",
        amount: "",
        icon: "CHEESE.svg",
      },
      token2: {
        symbol: "FUSD COIN",
        address: "",
        amount: "",
        icon: "FRIES.svg",
      },
    };
  },
  methods: {
    started() {
      if (this.isLogin) {
        this.$router.push({ path: "/fryer" });
      }
    },
    async getTime() {
      // if (!this.isLogin) return;
      // const [startTime, endTime] = await getGradualUpdate();

      // this.time.start = startTime;
      // this.time.end = endTime;
      this.time.start = idoCountdown(this.startTime, "Sept. 28, 2021, 1PM");
      this.time.end = idoCountdown(this.endTime, "Oct 1 12:59 PM");
      if (!this.isLogin) {
        this.price = "";
        return;
      }
      const price = await getSpotPrice();
      this.price = this.resetString(price, 6);
    },
    handleToLink(v) {
      window.open(v);
    },

    openPage(value) {
      window.open(this.global.pathList[value]);
    },
  },
  watch: {
    isLogin() {
      this.getTime();
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
  },

  mounted() {
    let res = idoCountdown("2021-09-27 14:50:21");
    console.log(res);
    this.getTime();
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
@import "./index_375.scss";
@import "./index_1024.scss";
@import "./index_1280.scss";
@import "./index_1440.scss";

.p5 {
  .t2 {
    .btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 0;
      width: 50px !important;

      .t2-1 {
        margin-bottom: 8px;
        width: 42px;
      }
      .t2-2 {
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 15px;
        color: #000000;
      }
    }
  }
}

@media screen and (max-width: 1279px) and (min-width: 751px) {
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
}
@media screen and (min-width: 1440px) {
}
</style>
