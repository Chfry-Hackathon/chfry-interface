<template>
  <div class="m-staking-bonus-container">
    <div class="m-staking-bonus-content">
      <div class="m-staking-bonus-img-box" @click="handleSetFlag()">
        HOW TO CLAIM A STAKING BONUS
      </div>
      <div class="m-staking-bonus-main-box" v-if="isShow">
        <div class="m-staking-bonus-desc">
          Stake at least 500 $MIM to claim your staking bonus. Refer to the
          table below for more information:
        </div>
        <div class="m-staking-bonus-table">
          <mim-table />
          <!-- <img
            :src="require('../../../../../assets/cheese/table.svg')"
            alt=""
          /> -->
        </div>
        <div class="m-after-staking-desc">
          After staking, wait for the pop-up window to direct you to the event
          form. Follow the instructions on the form:
        </div>
        <div class="m-staking-bonus-Additionally">
          <ul>
            <li>Follow us on Twitter</li>
            <li>RT the campaign tweet</li>
            <li>Join our TG and Discord channels</li>
            <li>Submit your ERC-20 wallet address</li>
          </ul>
          <div class="m-staking-airdropped">
            Get your CHEESE airdropped within the ten (10) days after the campaign ends.
          </div>
        </div>
        <div class="m-staking-bonus-btn-box">
          <div class="m-staking-bonus-btn" @click="handleLearnMore">
            LEARN MORE
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "../../../../../common/Global.vue";
import MimTable from "../MimTable/index.vue";
export default {
  components: {
    MimTable,
  },
  data() {
    return {
      isShow: false,
      global,
    };
  },
  methods: {
    handleSetFlag() {
      this.isShow = !this.isShow;
    },
    handleLearnMore() {
      window.open('https://medium.com/@chfry_finance/mim-staking-pool-on-chfry-with-5000-cheese-in-staking-bonus-2d24e6e30fc9');
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 750px){
  .m-staking-bonus-container{
    display:none;
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .m-staking-bonus-container {
    position: absolute;
    left: -291px;
  }
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .m-staking-bonus-container {
    position: absolute;
    left: -290px;
  }
}
@media screen and (min-width: 1440px) {
  .m-staking-bonus-container {
    position: absolute;
    left: -290px;
  }
}
.m-staking-bonus-container {
  .m-staking-bonus-content {
    width: 311px;
    .m-staking-bonus-img-box {
      width: 100%;
      height: 49px;
      background-image: url("../../../../../assets/cheese/staking.svg");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-family: Arial;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 49px;
      color: #000000;
      cursor: pointer;
      user-select: none;
      /* &:active {
        background-image: url("../../../../../assets/cheese/staking_active.svg");
        color: #f68b38;
      } */
      &:hover {
        background-image: url("../../../../../assets/cheese/staking_hover.svg");
      }
    }
    .m-staking-bonus-main-box {
      width: 100%;
      height: 632px;
      margin-top: 8px;
      border-radius: 12px;
      position: relative;
      background-image: url("../../../../../assets/cheese/staking_bg.svg");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-left: 25px;
      padding-right: 20px;
      .m-after-staking-desc {
        padding-top: 12px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
        text-align: left;
      }
      .information-window {
        padding-top: 20px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align: left;
        font-weight: 900;
        padding-bottom: 5px;
      }
      .m-staking-bonus-desc {
        padding-top: 20px;
        padding-bottom: 12px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align: left;
      }
      .m-staking-bonus-table {
        width: 266px;
        height: 164px;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .m-staking-bonus-Additionally {
        width: 100%;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
        text-align: left;
        ul {
          margin: 0;
          padding-top: 5px;
        }
      }
      .m-staking-airdropped {
        padding-top: 20px;
      }
      .m-staking-bonus-btn-box {
        padding-top: 23px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .m-staking-bonus-btn {
          width: 204px;
          height: 79px;
          background-image: url("../../../../../assets/cheese/btn.svg");
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 10px;
          line-height: 34px;
          color: #000000;
          user-select: none;
          cursor: pointer;
          &:active {
            margin-top: 3px;
            background-image: url("../../../../../assets/cheese/btn_active.svg");
          }
        }
      }
    }
  }
}
</style>
