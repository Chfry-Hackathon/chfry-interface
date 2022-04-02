<style lang="scss" scope>
.m-chfry-line-pc-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .m-chfry-line-pc-content {
    width: 1124px;
    .m-chfry-line-pc-item-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .m-chfry-line-pc-item-logo {
        width: 306px;
        height: 236px;
        display: flex;
        align-items: center;
        justify-content: end;
      }
      .m-chfry-line-pc-item-arrow {
        width: 103px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .m-chfry-line-pc-item-content {
      }
    }
    .m-chfry-line-pc-buttom-arrow-box {
      height: 103px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      .m-chfry-line-pc-buttom-arrow-img-box {
        width: 306px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>

<template>
  <section class="m-chfry-line-pc-container">
    <div class="m-chfry-line-pc-content">
      <div class="m-chfry-line-pc-item-box">
        <div class="m-chfry-line-pc-item-logo">
          <img style="width:185px;height:174px;display:block;" src="../../../assets/home/newLogo.png" alt="">
        </div>
        <div class="m-chfry-line-pc-item-arrow">
          <img src="../../../assets/home/rightArrow.svg" alt="" />
        </div>
        <div class="m-chfry-line-pc-item-content">
          <line-item :dataItem="dataList[0]"></line-item>
        </div>
        <div class="m-chfry-line-pc-item-arrow">
          <img src="../../../assets/home/rightArrow.svg" alt="" />
        </div>
        <div class="m-chfry-line-pc-item-content">
          <line-item :dataItem="dataList[1]"></line-item>
        </div>
      </div>
      <div class="m-chfry-line-pc-buttom-arrow-box">
        <div class="m-chfry-line-pc-buttom-arrow-img-box">
          <img src="../../../assets/home/buttomArrow.svg" alt="" />
        </div>
      </div>
      <div class="m-chfry-line-pc-item-box">
        <div class="m-chfry-line-pc-item-content">
          <line-item :dataItem="dataList[4]"></line-item>
        </div>
        <div class="m-chfry-line-pc-item-arrow">
          <img src="../../../assets/home/leftArrow.svg" alt="" />
        </div>
        <div class="m-chfry-line-pc-item-content">
          <line-item :dataItem="dataList[3]"></line-item>
        </div>
        <div class="m-chfry-line-pc-item-arrow">
          <img src="../../../assets/home/leftArrow.svg" alt="" />
        </div>
        <div class="m-chfry-line-pc-item-content">
          <line-item :dataItem="dataList[2]"></line-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LineItem from "./LineItem.vue";

export default {
  components: { LineItem },
  props: {
    dataList: {
      type: Array,
      default: [],
    },
  },
};
</script>
