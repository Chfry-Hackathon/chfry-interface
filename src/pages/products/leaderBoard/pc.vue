<template>
  <div class="m-leader-board-container">
    <div class="m-leader-board-content">
      <div class="title">LEADERBOARD</div>
      <div class="table-wrapper">
        <div class="m-leader-board-header">
          <span>WALLET ADDRESS</span>
          <span>FLASH LOAN SCORE</span>
          <span>POSITION SCORE</span>
          <span>TOTAL SCORE</span>
          <span>CHEESE REWARDS</span>
        </div>
        <div class="m-leader-board-table" v-if="isLoading">
          <p style="paddingTop:40px"></p>
          <loading-rows>
            <div v-for="(items, index) in 50" :key="index"></div>
          </loading-rows>
        </div>
        <div class="m-leader-board-table" v-if="!isLoading">
          <div class="m-leader-board-table-item" v-for="(item, index) in dataList" :key="index">
            <div>
              <Tooltip
                :data="`${item.EOA.slice(0, 4) + '***' + item.EOA.slice(-8)}`"
                :detail="item.EOA"
              />
            </div>
            <div>
              <Tooltip
                :data="fixD(item.flashLoanScore, 2)"
                :detail="fixD(item.flashLoanScore, 5)"
              />
            </div>
            <div>
              <Tooltip :data="fixD(item.positionScore, 2)" :detail="fixD(item.positionScore, 5)" />
            </div>
            <div>
              <Tooltip :data="fixD(item.totalScore, 2)" :detail="fixD(item.totalScore, 5)" />
            </div>
            <div>
              <Tooltip :data="fixD(item.rewards, 2)" :detail="fixD(item.rewards, 5)" />
              <img :src="require('../../../assets/icon/CHEESE.svg')" alt="cheese" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fixD } from "../../../utils/common-method";
import Tooltip from "../NewFlash/components/common/Tooltip";
import LoadingRows from "../../../components/LoadingRows.vue";

export default {
  props: ["dataList", "isLoading"],
  components: {
    Tooltip,
    LoadingRows,
  },
  data() {
    return {
      fixD,
    };
  },
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 1143px) {
  .m-leader-board-container {
    padding-top: 50px;
  }
}

@media screen and (max-width: 1142px) and (min-width: 856px) {
  .m-leader-board-container {
    padding-top: 100px;
  }
}

@media screen and (max-width: 855px) and (min-width: 751px) {
  .m-leader-board-container {
    padding-top: 230px;
  }
}
@media screen and (max-width: 750px) and (min-width: 376px) {
  .m-leader-board-container {
    padding-top: 230px;
  }
}
.m-leader-board-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 90px;
  .m-leader-board-content {
    width: 1182px;
    height: 1938px;
    background: url("../../../assets/leaderBoard/leader_board_bg.svg#svgView(preserveAspectRatio(none))")
      no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding: 80px 44.44px 65px 44.44px;
    display: flex;
    flex-direction: column;
    .title {
      width: 100%;
      text-align: center;
      padding-bottom: 53px;
      font-family: "Bugaki";
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 43px;
      color: #000000;
      flex-shrink: 0;
    }
    .table-wrapper {
      flex: 1;
      padding-left: 40px;
      padding-right: 40px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .m-leader-board-header {
        padding-bottom: 36px;
        border-bottom: 1px solid #000000;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        span {
          width: 20%;
          flex-shrink: 0;
          font-family: "Arial Black";
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          text-align: center;
        }
        span:nth-child(1) {
          text-align: left;
        }
        span:nth-child(5) {
          text-align: right;
        }
      }
      .m-leader-board-table {
        flex: 1;
        overflow-y: scroll;
        .m-leader-board-table-item {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #000000;
          &:hover {
            background: #fdb1c2;
          }

          div {
            width: 20%;
            flex-shrink: 0;
            font-family: "Arial";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #000000;
            text-align: center;
          }
          div:nth-child(1) {
            text-align: left;
          }
          div:nth-child(5) {
            /* text-align: right; */
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              padding-right: 8px;
            }
            img {
              display: inline-block;
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
