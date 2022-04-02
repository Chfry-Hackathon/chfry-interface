<template>
  <div class="m-indicator-item-container" :style="styled">
    <div class="m-indicator-item-content">
      <div class="m-indicator-item-title">
        {{ item.title }}
      </div>
      <div class="m-indicator-item-main">
        <div class="m-indicator-item-box">
          <span class="m-item-left">{{ item.count }}</span>
          <span class="m-item-right" v-if="item.symbol">
            <img
              :src="require('../../../../assets/icon/' + item.symbol + '.svg')"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    styled: {
      type: Object,
      default() {
        return {};
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-indicator-item-container {
    .m-indicator-item-content {
      width: 133px;
      height: 60px;
      background: url("../../../../assets/fryer/fryer_box_bg.svg") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-indicator-item-title {
        width: 100%;
        box-sizing: border-box;
        padding-top: 9px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 10px;
        color: #000000;
        text-align: center;
        -webkit-transform: scale(0.9);
        transform: scale(0.8);
      }
      .m-indicator-item-main {
        width: 100%;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 10px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .m-indicator-item-box {
          display: flex;
          align-items: center;
          .m-item-left {
            padding-right: 5px;
          }
          .m-item-right {
            img {
              display: inline-block;
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .m-indicator-item-container {
    .m-indicator-item-content {
      width: 277px;
      height: 127px;
      background-image: url("../../../../assets/fryer/indicator.svg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-indicator-item-title {
        width: 100%;
        box-sizing: border-box;
        padding-top: 25px;
        padding-bottom: 12px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        color: #000000;
        text-align: center;
      }
      .m-indicator-item-main {
        width: 100%;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 22px;
        line-height: 31px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .m-indicator-item-box {
          display: flex;
          align-items: center;
          .m-item-left {
            padding-right: 12px;
          }
          .m-item-right {
            img {
              display: inline-block;
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .m-indicator-item-container {
    .m-indicator-item-content {
      width: 277px;
      height: 127px;
      background-image: url("../../../../assets/fryer/indicator.svg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-indicator-item-title {
        width: 100%;
        box-sizing: border-box;
        padding-top: 25px;
        padding-bottom: 12px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        color: #000000;
        text-align: center;
      }
      .m-indicator-item-main {
        width: 100%;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 22px;
        line-height: 31px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .m-indicator-item-box {
          display: flex;
          align-items: center;
          .m-item-left {
            padding-right: 12px;
          }
          .m-item-right {
            img {
              display: inline-block;
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .m-indicator-item-container {
    .m-indicator-item-content {
      width: 277px;
      height: 127px;
      background-image: url("../../../../assets/fryer/indicator.svg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-indicator-item-title {
        width: 100%;
        box-sizing: border-box;
        padding-top: 25px;
        padding-bottom: 12px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        color: #000000;
        text-align: center;
      }
      .m-indicator-item-main {
        width: 100%;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 22px;
        line-height: 31px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .m-indicator-item-box {
          display: flex;
          align-items: center;
          .m-item-left {
            padding-right: 12px;
          }
          .m-item-right {
            img {
              display: inline-block;
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
