<script>
import {
  getTokenAddress,
  getFryerApyAddress,
  getUseFlashloans,
  getTotalAmount,
} from "../../../sdk/cheese-sdk";
import { toFixed4, toFixed2 } from "../../../utils/tools";
import { getBalanceToken } from "../../../api/user";
import { getFryerApy } from "../../../api/index";
import global from "../../../common/Global.vue";
import BigNumber from "bignumber.js";
import { convertBigNumberToNormal } from "../../../sdk/cheese-sdk/lib.utils";
  import { getOvenAPY } from '../../../utils/getOvenApy'

export default {
  data() {
    return {
      rate: global.poundage,
      pools: [
        {
          symbol: "USDC",
          address: "",
          amount: 0,
          apy: 0,
        },
        {
          symbol: "USDT",
          address: "",
          amount: 0,
          apy: 0,
        },
        {
          symbol: "DAI",
          address: "",
          amount: 0,
          apy: 0,
        },
      ],
    };
  },
  methods: {
    // (APY of yearn * 80% + APY of flash loan * 20%) * 85%
    formula(yearn, flashloan) {
      const a1 = new BigNumber(yearn).times(new BigNumber(0.8));
      const a2 = new BigNumber(flashloan).times(new BigNumber(0.2));
      const a3 = a1.plus(a2);
      const a4 = a3.times(new BigNumber(0.85));
      const a5 = a4.times(new BigNumber(100)).toFixed();
      const a6 = toFixed2(a5);
      return a6;
    },
    // 14天平均的闪电手续费收入/当前余额)/7*365 
    formulaFlashloanApy(poundage, banance) {
      return new BigNumber(poundage)
        .div(new BigNumber(banance))
        .div(new BigNumber(7))
        .times(new BigNumber(365))
        .toFixed();
    },
    past7DaysPoundage(data) {
      let res = 0;
      data.forEach((item) => {
        const amount = convertBigNumberToNormal(item.amount, item.decimal);
        res = new BigNumber(res).plus(new BigNumber(amount)).toFixed();
      });
      return new BigNumber(res).div(14).toFixed();
    },
    async past7DaysBalance(address) {
      const res = await getTotalAmount(address);
      return res;
      // return new BigNumber(res).times(new BigNumber(0.2)).toFixed();
    },

    async getUseFlashloansList() {
      return await getUseFlashloans();
    },
    filterToken(data, symbol) {
      return {
        [symbol]: data.filter((i) => i.tokenName === symbol),
      };
    },
    getSymbolPoundage(data, symbol) {
      const filtersData = this.filterToken(data, symbol);
      const poundage = this.past7DaysPoundage(filtersData[symbol]);
      const res = new BigNumber(poundage).times(this.rate).toFixed()
      return res;
    },
    async getApi() {
      // //APY of yearn
      // const apyRes = await getFryerApy();
      // //APY of flash loan
      // const flashloansListData = await this.getUseFlashloansList();
      // if (apyRes.status === 200 && apyRes.data.length > 0) {
      //   const data = apyRes.data;
      //   this.pools.map(async (item) => {
      //     const address = await getFryerApyAddress(item.symbol);
      //     // APY of flash loan
      //     item.address = getTokenAddress(item.symbol);
      //     const banance = await this.past7DaysBalance(item.address);
      //     const poundage = await this.getSymbolPoundage(
      //       flashloansListData,
      //       item.symbol
      //     );
      //     const flashloanApy = this.formulaFlashloanApy(poundage, banance);
      //     data.forEach((element) => {
      //       if (address === element.address) {
      //         item.apy = this.formula(element.apy.net_apy, flashloanApy);
      //       }
      //     });
      //   });
      // }

      const [apyRes, flashloansListData] = await Promise.all([getFryerApy(), getUseFlashloans()])
      if (apyRes.status === 200 && apyRes.data.length > 0) {
        const data = apyRes.data;
        const reuqestList = [];
        const newData = []

        this.pools.forEach((item)=> {
         reuqestList.push(this.past7DaysBalance(item.address))
        })
        const result = await Promise.all(reuqestList)

        this.pools.forEach((item,index)=> {
          const address = getFryerApyAddress(item.symbol);
          const banance = result[index];
          const poundage = this.getSymbolPoundage(
            flashloansListData,
            item.symbol
          );
          const flashloanApy = this.formulaFlashloanApy(poundage, banance);
          let apy = 0;
          data.forEach((element) => {
            if (address === element.address) {
              apy = this.formula(element.apy.net_apy, flashloanApy);
            }
          });
          newData.push({
            ...item,
            apy
          })
        })
        const apyParams = {}
        newData.forEach(item => {
          apyParams[item.symbol] = item.apy;
        })
        const ovenAPYData = await getOvenAPY(apyParams);
        newData.forEach(item=> {
            item.apy = ovenAPYData[item.symbol]
        })
        this.pools = newData;
        return newData;
      }

    },
    async fryerCheckInfo() {
      if (this.isLogin) {
        const reuqestList = [];
        this.pools.forEach((item)=>{
          reuqestList.push(getBalanceToken(getTokenAddress(item.symbol)))
        })
        const result = await Promise.all(reuqestList);
        const newData = []
         this.pools.forEach((item,index)=> {
          newData.push({
            ...item,
            address: getTokenAddress(item.symbol),
            amount: toFixed4(result[index])
          })
        })
        this.pools = newData;
        // this.pools.map(async (item) => {
        //   item.address = getTokenAddress(item.symbol);
        //   item.amount = toFixed4(await getBalanceToken(item.address));
        // });
        // trace("checkInfo=",this.pools)
       return this.getApi();
      }
    },
    toDeposit(item) {
      if (this.isLogin) {
        this.$store.dispatch("user/setFryer", item.address);
        this.$router.push({ path: "/fryer/deposit" });
      } else {
        this.$bus.emit("showLogin", true);
      }
    },
  },
  
};
</script>
