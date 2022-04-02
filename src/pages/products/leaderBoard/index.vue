<template>
  <MobileModule v-if="isMobile" :dataList="dataList" :isLoading="isLoading" />
  <PcModule v-else :dataList="dataList" :isLoading="isLoading" />
</template>

<script>
import { mapGetters } from "vuex";
import MobileModule from "./mobile.vue";
import PcModule from "./pc.vue";
import { getLeaderBoardData, getCurrentEpochRound } from "../../../sdk/cheese-sdk";
import Bignumber from "bignumber.js";
import { convertBigNumberToNormal } from "../../../sdk/cheese-sdk/lib.utils";
import { fixD } from "../../../utils/common-method";

export default {
  components: {
    MobileModule,
    PcModule,
  },
  data() {
    return {
      isLoading: false,
      timer: null,
      fixD,
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
  },
  methods: {
    getUniqueData(params, epoch) {
      var temp = {};
      for (var i in params) {
        let key = params[i].EOA;
        if (temp[key]) {
          temp[key].EOA = params[i].EOA;
          temp[key].positionScore = new Bignumber(temp[key].positionScore)
            .plus(new Bignumber(params[i].positionScoreList[epoch]))
            .toFixed();
        } else {
          temp[key] = {};
          temp[key].EOA = params[i].EOA;
          temp[key].positionScore = params[i].positionScoreList[epoch];
        }
      }
      const newArray = [];
      for (var k in temp) {
        newArray.push(temp[k]);
      }
      return newArray;
    },
    getData() {
      if (!this.isLogin) return [];

      Promise.all([getLeaderBoardData(), getCurrentEpochRound()])
        .then((res) => {
          this.isLoading = false;
          const [leaderBoardData, EpochRound] = res;
          if (EpochRound == 0) return [];
          const epoch = EpochRound - 1;
          const { flashLoanScores, positionScores, rewards } = leaderBoardData;
          const data = [];
          if (flashLoanScores && flashLoanScores.length > 0) {
            flashLoanScores.forEach((item) => {
              data.push({
                EOA: item.EOA,
                flashLoanScore: convertBigNumberToNormal(item.flashLoanScoreList[epoch]),
              });
            });
          }
          if (positionScores && positionScores.length > 0) {
            const positionScoresData = this.getUniqueData(positionScores, epoch);
            positionScoresData.forEach((item) => {
              if (data && data.length > 0) {
                data.forEach((ite) => {
                  if (ite.EOA.toLocaleUpperCase() === item.EOA.toLocaleUpperCase()) {
                    const positionScore = convertBigNumberToNormal(item.positionScore);
                    const time = 3600 * 24 * 14; //main
                    // const time = 300 //testnet
                    const curPositionScore = new Bignumber(positionScore)
                      .div(new Bignumber(time))
                      .toFixed();
                    ite.positionScore = new Bignumber(curPositionScore).pow(2).toFixed();
                    const sum = new Bignumber(ite.positionScore)
                      .plus(new Bignumber(ite.flashLoanScore))
                      .toFixed();
                    ite.totalScore = sum;
                  }
                });
              }
            });
          }
          if (rewards && rewards.length > 0) {
            rewards.forEach((item) => {
              if (data && data.length > 0) {
                data.forEach((ite) => {
                  if (ite.EOA.toLocaleUpperCase() === item.EOA.toLocaleUpperCase()) {
                    ite.rewards = convertBigNumberToNormal(item.RewardList[epoch]);
                  }
                });
              }
            });
          }
          const dataTwo = JSON.parse(JSON.stringify(data));
          const noZeroTotalScore = dataTwo.filter((item) => item.totalScore != 0);
          if (!noZeroTotalScore || noZeroTotalScore.length == 0) return [];
          const leaderBoard = noZeroTotalScore.sort((a, b) => b.rewards - a.rewards);
          this.dataList = leaderBoard;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getData();
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getData();
    }, 1000 * 5);
  },
};
</script>
