<template>
    <div class="page-baskets">
        <div class="chr-title">
            <div class="t1">
                <span class="t1-span1">OVEN</span>
                <span class="t1-span2">OVEN</span>
            </div>
            <div class="t2">Stake and Grill your fUSD and convert them to
                <br>{{replaceSymbol("USDT/USDC/DAI over time")}}
            </div>
        </div>
        <div v-if="isLoading" style="text-align: center;padding: 8rem 0;">
            <a-spin size="large"/>
        </div>
        <div v-else>
            <div>
                <div class="item-con" v-if="loadInfo">
                <oven-item :active="onstake" :data="curPool.stake"></oven-item>
                    <div class="btns" v-if="isMobile">
                        <a-button class="chr-btn chr-btn22"  @click="grill" :loading="grill_data.loading" :disabled="grill_data.disabled">GRILL</a-button>
                    </div>
                <oven-item :active="onunstake" :data="curPool.unstake"></oven-item>
                    <div class="btns" v-if="isMobile">
                        <a-button class="chr-btn chr-btn22"  @click="withdraw" :loading="withdraw_data.loading" :disabled="withdraw_data.disabled">WITHDRAW</a-button>
                    </div>
                </div>
            </div>

            <div class="btns" v-if="!isMobile">
                <a-button class="chr-btn chr-btn22"  @click="grill" :loading="grill_data.loading" :disabled="grill_data.disabled">GRILL</a-button>
                <a-button class="chr-btn chr-btn22"  @click="withdraw" :loading="withdraw_data.loading" :disabled="withdraw_data.disabled">WITHDRAW</a-button>
            </div>

          <div class="p1" v-if="curPool.totals" style="justify-content: space-around;">
            <token-msg v-for="(item,index) in curPool.totals.slice(0,1)" :key="item.text" :token="item"></token-msg>
            <token-msg v-for="(item,index) in curPool.totals.slice(4,5)" :key="item.text" :token="item"></token-msg>
          </div>

<!--          <template v-if="isMobile">-->
<!--              <div class="p1" v-if="curPool.totals">-->
<!--                  <token-msg v-for="(item,index) in curPool.totals.slice(0,2)" :key="item.text" :token="item"></token-msg>-->
<!--              </div>-->
<!--              <div class="p1" v-if="curPool.totals" style="margin-top: 24px;">-->
<!--                  <token-msg v-for="(item,index) in curPool.totals.slice(2)" :key="item.text" :token="item"></token-msg>-->
<!--              </div>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--              <div class="p1" v-if="curPool.totals">-->
<!--                  <token-msg v-for="(item,index) in curPool.totals.slice(0,3)" :key="item.text" :token="item"></token-msg>-->
<!--              </div>-->
<!--              <div class="p1" v-if="curPool.totals" style="justify-content: center;margin-top: 24px;">-->
<!--                  <token-msg v-for="(item,index) in curPool.totals.slice(3)" :key="item.text" :token="item"></token-msg>-->
<!--              </div>-->
<!--          </template>-->

        </div>
    </div>
</template>


<script>
    import OvenItem from "./components/OvenItem"
    import {toFixed4, trace} from "../../../utils/tools"
    import {mapGetters} from "vuex"
    import {ovenStake, ovenExchange,claim,exchange, ovenUnstake, getOvenPoolInfo, approvePoolToken, getPoolAllowance,getTokenAddress,getTokenSymbol} from "../../../sdk/cheese-sdk"
    import {getBalanceToken} from "../../../api/user"
    import TokenMsg from "../../../components/tokenMsg";

    export default {
        components: {TokenMsg, OvenItem},
        props: {},
        data() {
            return {
                isLoading:true,
                loadInfo:false,
                curSymbol:"",
                // curTabId: "0",
                // tabList: [
                //     "USDT",
                //     "USDC",
                //     "DAI",
                // ],
                pools: {
                    USDT: null,
                    USDC: null,
                    DAI: null,
                },
                curPool: {},
                grill_data:{
                    disabled:true,
                    loading:false,
                },
                withdraw_data:{
                    disabled:true,
                    loading:false,
                },
            };
        },
        methods: {
            onstake(amount,bf) {
                if (Number(this.curPool.allowance) < Number(amount)) {
                    let fryUSD = getTokenAddress("FRIES");
                    this.curPool.stake.loading = true;
                    if(bf) bf(this.curPool.stake.loading)
                    approvePoolToken(this.curPool.address, fryUSD, "oven", (code, hash) => {
                        trace("approvePoolToken-", this.curPool.address, code, hash);
                        if (code == 1) {

                            this.checkInfo(true);
                        }
                        if(code>=1){
                            this.curPool.stake.loading = false;
                            if(bf) bf(this.curPool.stake.loading)
                        }
                    });
                    return
                }
                this.curPool.stake.loading = true;
                if(bf) bf(this.curPool.stake.loading)
                trace("this.curPool.stake=",this.curPool)
                ovenStake(this.curPool.address, amount, (code, hash) => {
                    trace("ovenStake", code, hash);
                    if (code == 1) {
                        this.checkInfo(true);
                    }
                    if(code>=1){
                        this.curPool.stake.loading = false;
                        if(bf) bf(this.curPool.stake.loading)
                    }
                })
            },
            onunstake(amount,bf) {
                this.curPool.unstake.loading = true;
                if(bf) bf(this.curPool.unstake.loading)
                ovenUnstake(this.curPool.address, amount, (code, hash) => {
                    trace("ovenUnstake", code, hash);
                    if (code == 1) {
                        this.checkInfo(true);
                    }
                    if(code>=1){
                        this.curPool.unstake.loading = false;
                        if(bf) bf(this.curPool.unstake.loading)
                    }
                })
            },
            grill() {
                //ovenExchange
                this.grill_data.loading = true;

                exchange(this.curPool.address, (code, hash) => {
                    trace("ovenExchange", code, hash);
                    if (code == 1) {
                        this.checkInfo(true);
                    }
                    if(code>=1){
                        this.grill_data.loading = false;
                    }
                })
            },
            withdraw() {
                this.withdraw_data.loading = true;
                claim(this.curPool.address, (code, hash) => {
                    trace("ovenExchange", code, hash);
                    if (code == 1) {
                        this.checkInfo(true);
                    }
                    if(code>=1){
                        this.withdraw_data.loading = false;
                    }
                })
            },

            async checkInfo(b) {
                if(!this.isLogin) return;
                this.isLoading = true;
                let address = this.curOvenAddress;
                let pool = {};
                trace("checkInfo",this.curSymbol,address)
                if (b) {
                    pool = this.pools[this.curSymbol] = (await getOvenPoolInfo(address)).data;
                    trace("99 -pool",pool);
                } else {
                    pool = this.pools[this.curSymbol] || (await getOvenPoolInfo(address)).data;
                    trace("100 -pool",pool);
                    this.pools[this.curSymbol] = pool;
                }
                pool.address = address;
                let fryUSD = getTokenAddress("FRIES");
                pool.allowance = await getPoolAllowance(pool.address, fryUSD, "oven");
                pool.balance = await getBalanceToken(fryUSD)
                trace("curPool=", pool)
                pool.totals=[
                    {
                        text:"TOTAL STAKED fUSD",
                        amount:toFixed4(pool.totalSupplyFriesTokens) ,
                        icon:"FRIES",
                    },
                    {
                        text:"AVAILABLE TO GRILL",
                        amount:toFixed4(pool.GrillableTokens),
                        icon:this.curSymbol,
                    },
                    {
                        text:"ESTIMATED DAILY YIELD",
                        amount:toFixed4(pool.ESTIMATED_DAILY_YIELD),
                        icon:this.curSymbol,
                    },
                    {
                        text:"WITHDRAWABLE AMOUNT",
                        amount:toFixed4(pool.withdrawAmount),
                        icon:this.curSymbol,
                    },
                    {
                        text:"AVAILABLE TO GRILL",
                        amount:toFixed4(pool.buffer),
                        icon:this.curSymbol,
                    },
                ];
                // this.grill_data.disabled = (pool.buffer<=0);
                this.grill_data.disabled = (pool.GrillableTokens<=0);
                this.withdraw_data.disabled = (pool.withdrawAmount<=0);

                pool.stake={
                    title:"STAKE",
                    symbol:this.curSymbol,
                    title1:"fUSD Balance to stake",
                    title2:"Grillable Tokens",
                    amount1:toFixed4(pool.balance),
                    amount2:toFixed4(pool.GrillableTokens),
                    loading:false,
                    disabled:true,
                };
                pool.unstake={
                    title:"UNSTAKE",
                    symbol:this.curSymbol,
                    title1:"fUSD Balance to unstake",
                    title2:"Withdrawable Token",
                    amount1:toFixed4(pool.depositedAl),
                    amount2:toFixed4(pool.withdrawAmount),
                    loading:false,
                    disabled:true,
                }
                if(Number(pool.allowance)<1){
                    pool.stake.title="APPROVE";
                }else {
                    pool.stake.title="STAKE";
                }

                this.curPool = pool;
                this.loadInfo = true;
                this.isLoading = false;
                trace("this.curPool=",this.curPool)

            },

            replaceSymbol(str){
                return str.replace("USDT/USDC/DAI",this.curSymbol)
            },

        },
        watch: {
            account() {
                if (this.isLogin) {
                    this.curSymbol = getTokenSymbol(this.curOvenAddress)
                    this.checkInfo();
                }
            },
            $route(to, from) {
                if (to.path.indexOf("ovenV1") > 0) {
                    if (this.isLogin) {
                        this.checkInfo();
                    }
                }
            },
        },
        computed: {
            ...mapGetters(["isLogin", "account","curOvenAddress","isMobile"]),
        },

        mounted() {
            trace("this.isLogin=", this.isLogin)
            if (this.isLogin) {
                this.curSymbol = getTokenSymbol(this.curOvenAddress)
                this.checkInfo();
            }else{
                this.$router.push({path:"/ovenV1"});
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "./main_375.scss";
    @import "./main_1024.scss";
    @import "./main_1280.scss";
    @import "./main_1440.scss";




</style>
