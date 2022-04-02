<style lang="scss" scoped>
.m-leader-board-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 90px;
  .m-leader-board-content {
    /* width: 100%; */
    width: 343px;
    height: 901px;
    background: url("../../../assets/leaderBoard/leader_board_bg_mobile.svg#svgView(preserveAspectRatio(none))")
      no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding: 24px 17px 13px 17px;
    display: flex;
    flex-direction: column;
    .title {
      width: 100%;
      text-align: center;
      padding-bottom: 29px;

      font-family: "Bugaki";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
      flex-shrink: 0;
    }
    .table-wrapper {
      flex: 1;
      padding-left: 12px;
      padding-right: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .m-leader-board-header {
        padding-bottom: 24px;
        border-bottom: 1px solid #000000;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        .account,
        .total-score,
        .reward {
          width: 33.333%;
          flex-shrink: 0;
          font-family: "Arial Black";
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 17px;
          color: #171717;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .account {
          align-items: flex-start;
        }
        .reward {
          align-items: flex-end;
        }
      }
      .m-leader-board-table {
        flex: 1;
        overflow-y: scroll;
        .m-leader-board-table-item {
          width: 100%;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #000000;
          &:hover {
            background: #fdb1c2;
          }

          div {
            width: 33.333%;
            font-family: "Arial";
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #000000;
            text-align: center;
          }
          div:nth-child(1) {
            text-align: left;
          }
          div:nth-child(3) {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
              padding-right: 6px;
            }
            img {
              display: inline-block;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="m-leader-board-container">
    <div class="m-leader-board-content">
      <div class="title">LEADERBOARD</div>
      <div class="table-wrapper">
        <div class="m-leader-board-header">
          <div class="account">
            <span>WALLET</span>
            <span>ADDRESS</span>
          </div>
          <div class="total-score">
            <span>TOTAL</span>
            <span>SCORE</span>
          </div>
          <div class="reward">
            <span>CHEESE</span>
            <span>REWARDS</span>
          </div>
        </div>
         <div class="m-leader-board-table" v-if="isLoading">
            <p style="paddingTop:20px"></p>
            <loading-rows>
              <div v-for="(items, index) in 30" :key="index"></div>
            </loading-rows>
        </div>
         </div>
        <div class="m-leader-board-table" v-if="!isLoading">
          <div class="m-leader-board-table-item" v-for="(item, index) in dataList" :key="index">
            <div>
              <Tooltip
                :data="`${item.EOA.slice(0, 2) + '***' + item.EOA.slice(-4)}`"
                :detail="item.EOA"
              />
            </div>
            <!-- <div>
              <Tooltip
                :data="fixD(item.flashLoanScore, 5)"
                :detail="fixD(item.flashLoanScore, 10)"
              />
            </div>
            <div>
              <Tooltip :data="fixD(item.positionScore, 5)" :detail="fixD(item.positionScore, 10)" />
            </div> -->
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
