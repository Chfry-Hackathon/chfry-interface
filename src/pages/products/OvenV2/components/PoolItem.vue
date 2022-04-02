<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-pool-item-container {
    margin-top: 32px;
  }
}
.m-pool-item-container {
  width: 294px;
  height: 191px;
  background-image: url("../../../../assets/ovenV2/pool_item_bg.svg");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-left: 10px;

  .m-pool-item-content {
    width: 100%;
    height: 100%;
    padding-top: 22px;
  }
  .m-pool-item-title {
    font-family: Arial Black;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
    padding-bottom: 14px;
  }
  .m-pool-item-total-box {
    display: flex;
    align-content: center;
    justify-content: space-around;
    font-family: Arial Black;
    font-style: normal;
    font-weight: 900;
    font-size: 22px;
    color: #000000;
    .m-pool-item-total-content {
      display: flex;
      align-content: center;
      line-height: 42px;
      .icon {
        display: inline-block;
        padding-left: 12px;
        img {
          display: inline-block;
          width: 42px;
          height: 42px;
        }
      }
    }
  }
  .m-pool-item-btn-box {
    padding-top: 20px;
    display: flex;
    align-content: center;
    justify-content: space-around;
  }
}
</style>
<template>
  <div class="m-pool-item-container">
    <div class="m-pool-item-content">
      <div class="m-pool-item-title">{{ token.symbol }} WALLET BALANCE</div>
      <div class="m-pool-item-total-box">
        <div class="m-pool-item-total-content">
          <a-tooltip class="t1">
            <template slot="title">
              {{ toThousands(token.amount) }}
            </template>
            {{ resetString(token.amount) }}
          </a-tooltip>
          <span class="icon">
            <img
              :src="require('../../../../assets/icon/' + token.symbol + '.svg')"
            />
          </span>
        </div>
      </div>
      <div class="m-pool-item-btn-box">
        <a-button class="chr-c-btn" @click="stake">STAKE</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetString, toThousands } from "../../../../utils/tools";

export default {
  components: {},
  props: {
    token: {
      symbol: "",
      address: "",
      amount: Number,
    },
    toStake: Function,
  },
  data() {
    return {
      toThousands: toThousands,
      resetString: resetString,
    };
  },
  methods: {
    stake() {
      if (this.toStake) this.toStake(this.token);
    },
  },
  watch: {},
  computed: {},

  mounted() {},
};
</script>
//
<style lang="scss" scoped>
// @media screen and (max-width: 750px) {
//   .chr-c-btn {
//     min-width: 102px !important;
//     height: 31px;
//     border: 1px solid #000000;
//     font-size: 10px;
//     line-height: 15px;
//   }
//   .pool-item {
//     position: relative;
//     width: 187px;
//     height: 122px;
//     padding: 13px 1px 22px 7px;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;

//     background-image: url("../../../../assets/tool/fryer_box_bgm3.svg#svgView(preserveAspectRatio(none))");
//     -webkit-background-size: 100% 100%;
//     background-size: 100% 100%;
//     margin: 16px 0;

//     .p1 {
//       font-family: Arial Black;
//       font-style: normal;
//       font-weight: 900;
//       font-size: 10px;
//       line-height: 14px;
//       color: #000000;
//     }

//     .p2 {
//       /*margin: 12px 0 16px;*/
//       display: flex;
//       align-items: center;
//       width: 100%;
//       justify-content: center;

//       .t1 {
//         margin-right: 12px;

//         font-family: Arial Black;
//         font-style: normal;
//         font-weight: 900;
//         font-size: 12px;
//         line-height: 17px;
//         color: #000000;
//       }
//     }

//     .icon {
//       width: 24px;
//       height: 24px;
//       display: flex;
//       justify-content: center;
//       align-items: center;

//       img {
//         width: 24px;
//       }
//     }
//   }
// }

// @media screen and (max-width: 1279px) and (min-width: 751px) {
//   .pool-item {
//     position: relative;
//     width: 253px;
//     height: 190px;
//     padding: 30px 16px 40px 26px;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     background-image: url("../../../../assets/tool/fryer_box_bg.svg");
//     -webkit-background-size: 100% 100%;
//     background-size: 100% 100%;

//     .p1 {
//       font-family: Arial Black;
//       font-style: normal;
//       font-weight: 900;
//       font-size: 14px;
//       line-height: 20px;
//       color: #000000;
//     }

//     .p2 {
//       margin: 12px 0 16px;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       justify-content: center;

//       .t1 {
//         margin-right: 12px;
//         font-family: Arial Black;
//         font-style: normal;
//         font-weight: 900;
//         font-size: 18px;
//         line-height: 25px;
//         color: #000000;

//         color: #000000;
//       }
//     }

//     .icon {
//       width: 32px;
//       height: 32px;
//       display: flex;
//       justify-content: center;
//       align-items: center;

//       img {
//         width: 32px;
//       }
//     }
//   }
// }
// @media screen and (max-width: 1439px) and (min-width: 1280px) {
//   .pool-item {
//     position: relative;
//     width: 294px;
//     height: 240px;
//     padding: 34px 30px 32px 40px;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     background-image: url("../../../../assets/tool/fryer_box_bg.svg");
//     -webkit-background-size: 100% 100%;
//     background-size: 100% 100%;

//     .p1 {
//       font-family: Arial Black;
//       font-style: normal;
//       font-weight: 900;
//       font-size: 15.0229px;
//       line-height: 21px;

//       color: #000000;
//     }

//     .p2 {
//       margin: 24px 0;
//       margin: 24px 0;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       justify-content: center;

//       .t1 {
//         margin-right: 12px;
//         font-family: Arial Black;
//         font-style: normal;
//         font-weight: 900;
//         font-size: 27.1799px;
//         line-height: 38px;

//         color: #000000;
//       }
//     }

//     .icon {
//       width: 42px;
//       height: 42px;
//       display: flex;
//       justify-content: center;
//       align-items: center;

//       img {
//         width: 42px;
//       }
//     }
//   }
// }
// @media screen and (min-width: 1440px) {
//   .pool-item {
//     position: relative;
//     width: 294px;
//     height: 240px;
//     padding: 34px 30px 32px 40px;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     background-image: url("../../../../assets/tool/fryer_box_bg.svg");
//     -webkit-background-size: 100% 100%;
//     background-size: 100% 100%;

//     .p1 {
//       font-family: Arial Black;
//       font-style: normal;
//       font-weight: 900;
//       font-size: 15.0229px;
//       line-height: 21px;

//       color: #000000;
//     }

//     .p2 {
//       margin: 24px 0;
//       margin: 24px 0;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       justify-content: center;

//       .t1 {
//         margin-right: 12px;
//         font-family: Arial Black;
//         font-style: normal;
//         font-weight: 900;
//         font-size: 27.1799px;
//         line-height: 38px;

//         color: #000000;
//       }
//     }

//     .icon {
//       width: 42px;
//       height: 42px;
//       display: flex;
//       justify-content: center;
//       align-items: center;

//       img {
//         width: 42px;
//       }
//     }
//   }
// }
//
</style>
