<template>
  <section class="m-select-contianer">
    <div class="m-select-content">
      <div class="m-select-input-select-box">
        <div class="m-select-input-box">
          <slot></slot>
        </div>
        <div class="m-select-box" @click="handleClick">
          <div class="m-select-current-img-box" v-if="current">
            <img :src="current.url" alt="" />
          </div>
          <div class="m-select-current-text-box" v-if="current">
            <img
              :class="trans ? 'trans' : ''"
              :src="require('../../../../../assets/flash/down.svg')"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="m-select-input-select-box-bg"></div>
      <div class="m-select-optionx-box" v-if="selectData.length && trans">
        <div class="m-select-optionx-content">
          <span
            v-for="(item, index) in selectData"
            :key="index"
            :class="item.symbol === current.symbol ? 'powder' : ''"
            class="option-item"
            @click="
              $emit('click', item);
              trans = false;
            "
          >
            <img :src="item.url" alt="" />
            <span>{{ item.symbol }}</span>
          </span>
        </div>
        <div class="m-select-optionx-bg" :style="{ height: comHight }"></div>
      </div>
    </div>
  </section>
</template>

<script>
 import {mapGetters} from "vuex"
 
export default {
  data() {
    return {
      trans: false,
    };
  },
  props: ["selectData", "currentSymbol"],
  computed: {
    ...mapGetters(["isLogin","isMobile"]),
    comHight() {
      // if(this.isMobile) {
        
      // }
      return this.selectData.length * 36 + "px";
    },
    current() {
      if (!this.currentSymbol) return;
      return {
        symbol: this.currentSymbol.symbol,
        url: this.currentSymbol.url,
      };
    },
  },
  methods: {
    handleClick() {
      this.trans = !this.trans;
    },
  },
};
</script>

<style lang="scss" scope>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;

  margin: 0;
}
input {
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
@media screen and (max-width:750px) {
  .m-select-contianer {
    .m-select-content {
      position: relative;
      width: 290px;
      height: 57px;
      padding-left: 10px;
      .m-select-optionx-box {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 105px;
        .m-select-optionx-content {
          z-index: 3;
          position: absolute;
          right: 0;
          top: -7px;
          width: 101px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-bottom: 1px solid #000000;
          border-left: 1px solid #000000;
          border-right: 1px solid #000000;
          /* border: 1px solid #000000; */
          .option-item:hover {
            background: #f499ad;
          }
          .option-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 36px;
            padding-left: 12px;
            cursor: pointer;
            &.white {
              background: #ffffff;
            }
            &.powder {
              background: #f499ad;
            }
            img {
              width: 20px;
              height: 20px;
            }
            span {
              padding-left: 12px;
              height: 36px;
              line-height: 36px;
              font-family: Arial;
              font-style: normal;
              font-weight: bold;
              font-size: 12px;
              color: #000000;
            }
          }
        }
        .m-select-optionx-bg {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          background: #f68b38;
          border-bottom: 1px solid #000000;
          border-left: 1px solid #000000;
          border-right: 1px solid #000000;
          width: 101px;
          height: 200px;
        }
      }
      .m-select-input-select-box-bg {
        z-index: 1;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 285px;
        height: 52px;
        background: #f68b38;
        border: 1px solid #000000;
        left: 0;
        bottom: 0;
      }
      .m-select-input-select-box {
        z-index: 2;
        position: absolute;
        top: 0;
        right: 0;
        width: 285px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f499ad;
        border: 1px solid #000000;
        .m-select-input-box {
          flex: 1;
          height: 100%;
          display: flex;
          input {
            width: 100%;
            height: 100%;
            border: 0;
            background: transparent;
            text-indent: 32px;
            font-family: Arial Black;
            font-style: normal;
            font-weight: 900;
            font-size: 20px;
            color: #000000;
          }
        }
        .m-select-box {
          width: 96px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          .m-select-current-img-box {
            padding-left: 20px;
            img {
              width: 32px;
              height: 32px;
            }
          }
          .m-select-current-text-box {
            padding-left: 10px;

            img {
              width: 12px;
              height: 7px;
              transition: all 0.05s ease-in 0.05s;
              &.trans {
                transform-origin: center center;
                transform: rotate(180deg);
                transition: all 0.05s ease-in 0.05s;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and(min-width: 751px) {
  .m-select-contianer {
    .m-select-content {
      position: relative;
      width: 378px;
      height: 62px;
      .m-select-optionx-box {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 105px;
        .m-select-optionx-content {
          z-index: 3;
          position: absolute;
          right: 0;
          top: -10px;
          width: 95px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-bottom: 1px solid #000000;
          border-left: 1px solid #000000;
          border-right: 1px solid #000000;
          /* border: 1px solid #000000; */
          .option-item:hover {
            background: #f499ad;
          }
          .option-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 36px;
            padding-left: 12px;
            cursor: pointer;
            &.white {
              background: #ffffff;
            }
            &.powder {
              background: #f499ad;
            }
            img {
              width: 20px;
              height: 20px;
            }
            span {
              padding-left: 12px;
              height: 36px;
              line-height: 36px;
              font-family: Arial;
              font-style: normal;
              font-weight: bold;
              font-size: 12px;
              color: #000000;
            }
          }
        }
        .m-select-optionx-bg {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          background: #f68b38;
          border-bottom: 1px solid #000000;
          border-left: 1px solid #000000;
          border-right: 1px solid #000000;
          width: 95px;
          height: 200px;
        }
      }
      .m-select-input-select-box-bg {
        z-index: 1;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 368px;
        height: 52px;
        background: #f68b38;
        border: 1px solid #000000;
        left: 0;
        bottom: 0;
      }
      .m-select-input-select-box {
        z-index: 2;
        position: absolute;
        top: 0;
        right: 0;
        width: 368px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f499ad;
        border: 1px solid #000000;
        .m-select-input-box {
          flex: 1;
          height: 100%;
          display: flex;
          input {
            width: 100%;
            height: 100%;
            border: 0;
            background: transparent;
            text-indent: 32px;
            font-family: Arial Black;
            font-style: normal;
            font-weight: 900;
            font-size: 20px;
            color: #000000;
          }
        }
        .m-select-box {
          width: 96px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          .m-select-current-img-box {
            padding-left: 20px;
            img {
              width: 32px;
              height: 32px;
            }
          }
          .m-select-current-text-box {
            padding-left: 10px;

            img {
              width: 12px;
              height: 7px;
              transition: all 0.05s ease-in 0.05s;
              &.trans {
                transform-origin: center center;
                transform: rotate(180deg);
                transition: all 0.05s ease-in 0.05s;
              }
            }
          }
        }
      }
    }
  }
}
</style>
