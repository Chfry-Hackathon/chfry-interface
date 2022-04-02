<template>
  <div class="m-popup-container" v-if="isShow === 'true'">
    <div class="m-popup-container">
      <div class="close" @click="setIsShowFlag('false')">
        <img src="../assets/home/close.svg" alt="" />
      </div>
      <div class="m-img-container">
        <div class="m-desc">
          Discover bugs and vulnerabilities on CHFRY Finance and get yourself up
          to 100,000 USD in bug bounty
        </div>
        <div class="m-button-box">
          <a :href="global.pathList.Immunefi" target="“_blank”">
            BOUNTIES VIA IMMUNEFI
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "../common/Global.vue";
export default {
  data() {
    return {
      global,
      isShow: "true",
    };
  },
  methods: {
    setIsShowFlag(v) {
      window.sessionStorage.setItem("chfry_popup_isShow", v);
      this.isShow = v;
    },
  },
  created() {
    const isShow = window.sessionStorage.getItem("chfry_popup_isShow");
    console.log(isShow);
    if (isShow === null) {
      window.sessionStorage.setItem("chfry_popup_isShow", "true");
    } else {
      this.isShow = isShow;
    }
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-popup-container {
    padding-top: 20px;
    z-index: 88;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .close {
      position: absolute;
      top: 32px;
      right: 15px;
      z-index: 99;
      cursor: pointer;
      user-select: none;
    }
    .m-popup-container {
      .m-img-container {
        width: 312px;
        height: 132px;
        background-image: url("../assets/home/popup2xh5.png");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-right: 33px;
        padding-left: 72px;
        .m-desc {
          padding-top: 16px;
          padding-bottom: 4px;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #171717;
        }
        .m-button-box {
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          a {
            color: #ed1583;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1304px) and (min-width: 751px) {
  .m-popup-container {
    padding-top: 20px;
    z-index: 88;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .close {
      position: absolute;
      top: 32px;
      right: 15px;
      z-index: 99;
      cursor: pointer;
      user-select: none;
    }
    .m-popup-container {
      .m-img-container {
        width: 399px;
        height: 142px;
        background-image: url("../assets/home/popup2x.png");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-right: 42px;
        padding-left: 100px;
        .m-desc {
          padding-top: 12px;
          padding-bottom: 8px;
          text-align: center;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          color: #171717;
        }
        .m-button-box {
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          a {
            color: #ed1583;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) and (min-width: 1305px) {
  .m-popup-container {
    z-index: 88;
    position: absolute;
    left: 0;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .close {
      position: absolute;
      top: 12px;
      right: 16px;
      z-index: 99;
      cursor: pointer;
      user-select: none;
    }
    .m-popup-container {
      .m-img-container {
        width: 399px;
        height: 142px;
        background-image: url("../assets/home/popup2x.png");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-right: 42px;
        padding-left: 100px;
        .m-desc {
          padding-top: 12px;
          padding-bottom: 8px;
          text-align: center;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          color: #171717;
        }
        .m-button-box {
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          a {
            color: #ed1583;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1441px) {
  .m-popup-container {
    z-index: 88;
    position: absolute;
    left: 0;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .close {
      position: absolute;
      top: 12px;
      right: 16px;
      z-index: 99;
      cursor: pointer;
      user-select: none;
    }
    .m-popup-container {
      .m-img-container {
        width: 399px;
        height: 142px;
        background-image: url("../assets/home/popup2x.png");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-right: 42px;
        padding-left: 100px;
        .m-desc {
          padding-top: 12px;
          padding-bottom: 8px;
          text-align: center;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          color: #171717;
        }
        .m-button-box {
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          a {
            color: #ed1583;
          }
        }
      }
    }
  }
}
</style>
