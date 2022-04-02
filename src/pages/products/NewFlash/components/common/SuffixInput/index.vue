<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
  },
  props: {
    iconUrl1: {
      type: String,
      default: () => {
        return "";
      },
    },
    iconUrl2: {
      type: String,
      default: () => {
        return "";
      },
    },
    animationTrans: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    price: {
      default: () => {
        return "";
      },
    },
    isCountTo: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  render() {
    const on = {
      ...this.$listeners,
    };
    const props = {
      ...this.$attrs,
      ...this.$props,
    };
    const priceDom = this.isCountTo ? (
      <CountTo startVal={1} endVal={this.price} duration={1000} decimals={2} prefix={`$ `} />
    ) : (
      <span class="price">{this.price}</span>
    );
    const slots = (
      <div slot="suffix" class="m-chfry-input-suffix">
        {priceDom}
        <div class="icon-box ">
          <img
            class={`icon-1 ${this.animationTrans ? " icon-1-1" : " icon-1-1-1"}`}
            src={this.iconUrl1}
            alt=""
          />
          <img
            class={`icon-2 ${this.animationTrans ? " icon-2-2" : " icon-2-2-2"}`}
            src={this.iconUrl2}
            alt=""
          />
        </div>
      </div>
    );
    return (
      <a-input id="m-chfry-input" on={on} props={props} scopedSlots={this.$scopedSlots}>
        {slots}
        <slot></slot>
      </a-input>
    );
  },
};
</script>

<style lang="scss">
$bd-color: #000000;
$bg-color: #f499ad;

@media screen and (max-width: 750px) {
  .icon-1-1 {
    animation: TransformLeft1 0.5s linear;
  }
  .icon-1-1-1 {
    animation: TransformLeft11 0.5s linear;
  }
  .icon-2-2 {
    animation: TransformRight1 0.5s linear;
  }
  .icon-2-2-2 {
    animation: TransformRight11 0.5s linear;
  }
  @keyframes TransformRight1 {
    0% {
      left: 10px;
    }

    50% {
      left: 5px;
    }

    100% {
      left: 0;
    }
  }
  @keyframes TransformRight11 {
    0% {
      left: 10px;
    }

    50% {
      left: 5px;
    }

    100% {
      left: 0;
    }
  }
  @keyframes TransformLeft1 {
    0% {
      left: 0;
    }

    50% {
      left: 5px;
    }

    100% {
      left: 10px;
    }
  }
  @keyframes TransformLeft11 {
    0% {
      left: 0;
    }

    50% {
      left: 5px;
    }

    100% {
      left: 10px;
    }
  }
  .m-chfry-input-suffix {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      padding-right: 6px;
      font-family: Arial;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      color: #000000;
    }
    .icon-box {
      position: relative;
      display: inline-block;
      width: 31px;
      height: 14px !important;
      /* height: 14px !important; */
      .icon-1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
      }
      .icon-2 {
        position: absolute;
        top: 0;
        left: 10px;
        z-index: 2;
      }
    }
    img {
      display: inline-block;
      height: 14px !important;
    }
  }
  #m-chfry-input {
    width: 100%;
    height: 30px;
    background-color: $bg-color;
    border-right: 1px solid $bd-color;
    border-top: 1px solid $bd-color;
    border-bottom: 1px solid $bd-color;
    border-left: 1px solid $bd-color;

    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    color: #000000;
    &:focus {
      border-right: 1px solid $bd-color;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;
      box-shadow: none;
    }
  }
}
@media screen and (min-width: 751px) {
  .icon-1-1 {
    animation: TransformLeft1 0.5s linear;
  }
  .icon-1-1-1 {
    animation: TransformLeft11 0.5s linear;
  }
  .icon-2-2 {
    animation: TransformRight1 0.5s linear;
  }
  .icon-2-2-2 {
    animation: TransformRight11 0.5s linear;
  }
  @keyframes TransformRight1 {
    0% {
      left: 20px;
    }
    25% {
      left: 15px;
    }
    50% {
      left: 10px;
    }
    75% {
      left: 5px;
    }
    100% {
      left: 0;
    }
  }
  @keyframes TransformRight11 {
    0% {
      left: 20px;
    }
    25% {
      left: 15px;
    }
    50% {
      left: 10px;
    }
    75% {
      left: 5px;
    }
    100% {
      left: 0;
    }
  }
  @keyframes TransformLeft1 {
    0% {
      left: 0;
    }
    25% {
      left: 5px;
    }
    50% {
      left: 10px;
    }
    75% {
      left: 15px;
    }
    100% {
      left: 20px;
    }
  }
  @keyframes TransformLeft11 {
    0% {
      left: 0;
    }
    25% {
      left: 5px;
    }
    50% {
      left: 10px;
    }
    75% {
      left: 15px;
    }
    100% {
      left: 20px;
    }
  }
  .m-chfry-input-suffix {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      padding-right: 24px;
      font-family: Arial;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #000000;
    }
    .icon-box {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
      .icon-1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
      }
      .icon-2 {
        position: absolute;
        top: 0;
        left: 20px;
        z-index: 2;
      }
    }
    img {
      display: inline-block;
      height: 28px !important;
    }
  }
  #m-chfry-input {
    width: 100%;
    height: 44px;
    width: 100%;
    height: 44px;
    background-color: $bg-color;
    border-right: 1px solid $bd-color;
    border-top: 1px solid $bd-color;
    border-bottom: 1px solid $bd-color;
    border-left: 1px solid $bd-color;

    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    &:focus {
      border-right: 1px solid $bd-color;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;
      box-shadow: none;
    }
  }
}
</style>
