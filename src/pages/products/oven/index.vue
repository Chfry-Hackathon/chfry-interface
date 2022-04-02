<template>
  <div class="page-baskets">
    <div class="chr-title">
      <div class="t1">
        <span class="t1-span1">OVEN</span>
        <span class="t1-span2">OVEN</span>
      </div>
      <div class="t2">Stake and Grill your fUSD and convert <br v-if="isMobile"> them to
        <br v-if="!isMobile">USDT/USDC/DAI over time</div>
    </div>
    <div class="p1">
      <img src="../../../assets/oven_img.svg"/>
    </div>
    <div class="pool-con">
      <pool-item v-for="(item,index) in ovenPools" :key="item.symbol" :toStake="toStake" :token="item"></pool-item>
    </div>


  </div>
</template>


<script>
  import PoolItem from "./components/PoolItem";
  import {mapGetters} from "vuex";
  import {getTokenAddress} from "../../../sdk/cheese-sdk";
  import {toFixed4, trace, toFixed0} from "../../../utils/tools";
  import {getBalanceToken} from "../../../api/user";
  import fryerData from '../fryer/fryerData.vue'
  import { getOvenAPY } from '../../../utils/getOvenApy'

  export default {
    components: {PoolItem},
    mixins: [fryerData],
    props: {},
    data() {
      return {
        ovenPools: [
          {
            symbol: "USDC",
            address: "",
            amount: 0,
            apy:'0'
          },
          {
            symbol: "USDT",
            address: "",
            amount: 0,
            apy:'0'
          },
          {
            symbol: "DAI",
            address: "",
            amount: 0,
            apy:'0'
          },
        ]

      };
    },
    methods: {
      async checkInfo(){
        if(this.isLogin){
          const requestList = []
          const newData = JSON.parse(JSON.stringify(this.ovenPools))
          newData.forEach(item => {
            item.address = getTokenAddress(item.symbol);
            requestList.push(getBalanceToken(item.address))
          });
          const result = await Promise.all(requestList);
          newData.forEach((item, index) => {
            const amount = result[index]
            item.amount = toFixed4(amount)
          })
          this.ovenPools = newData;

          // const fryerData = await this.fryerCheckInfo();
          // const apyParams = {}
          // fryerData.forEach(item => {
          //   apyParams[item.symbol] = item.apy;
          // })
          // const ovenAPYData = await getOvenAPY(apyParams);

          // const newDatas = JSON.parse(JSON.stringify(this.ovenPools))
          // newDatas.forEach(item=> {
          //   item.apy = ovenAPYData[item.symbol]
          // })
          //  this.ovenPools = newDatas;
          // console.log(ovenAPYData,'ovenAPYData');
          // this.pools.map(async item => {
          //   item.address = getTokenAddress(item.symbol);
          //   item.amount = toFixed4(await getBalanceToken(item.address))
          // })
          // trace("checkInfo=",this.pools)
        }
      },
      toStake(item){
        if(this.isLogin){
          this.$store.dispatch("user/setOven",item.address);
          this.$router.push({path:"/oven/stake"})
        }else {
          this.$bus.emit("showLogin",true);
        }
      },
    },
    watch: {
      account(){
        this.checkInfo();
      },
      config(){
        this.checkInfo();
      },
    },
    computed: {
      ...mapGetters(["account","isLogin","config","isMobile"])
    },

    mounted() {
      this.checkInfo();
    },
  };
</script>
<style lang="scss" scoped>
  @import "./index_375.scss";
  @import "./index_1024.scss";
  @import "./index_1280.scss";
  @import "./index_1440.scss";




</style>

