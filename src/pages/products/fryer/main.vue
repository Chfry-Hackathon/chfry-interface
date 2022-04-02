<template>
    <div class="fryer-main">
        <div class="chr-title">
            <div class="t1">
                <span class="t1-span1">{{navs[Number(curTabId)].itemData.title}}</span>
                <span class="t1-span2">{{navs[Number(curTabId)].itemData.title}}</span>
            </div>
            <div class="t2">{{replaceSymbol(navs[Number(curTabId)].itemData.content)}}</div>
        </div>
        <div v-if="isLoading" style="text-align: center;padding: 8rem 0;">
            <a-spin size="large"/>
        </div>
        <a-tabs v-else :default-active-key="curTabId" @change="changeTabs" :tabBarGutter="12">
            <a-tab-pane v-for="(item,index) in navs" :key="index+''" :tab="item.title">

                <FryerItem  :itemData="item" :execute="execute" :pool="cheData.pool"></FryerItem>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>


<script>
    import FryerItem from "./components/FryerItem"
    import {
        approvePoolToken,
        getTokenAddress,
        deposit,
        withdraw,
        borrow,
        repay,
        liquidate,
        getPoolinfo,
        getPoolAllowance,
        getTokenSymbol,
    } from "../../../sdk/cheese-sdk"
    import {toFixed4, trace,toFixed0,toFixed1, toFixed2} from "../../../utils/tools"
    import {getBalanceToken} from "../../../api/user"
    import {mapGetters} from "vuex";
    import fryerData from './fryerData.vue'
    import BigNumber from "bignumber.js";
    import moment from 'moment'
    // import {mapGetters} from "vuex"

    export default {
        components: {FryerItem},
        mixins: [fryerData],
        props: {},
        data() {
            return {
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
                isLoading:true,
                curTabId: "0",
                navs: [
                    {
                        title: "Deposit",
                        itemData: {
                            title: "Frying Baskets",
                            content: "Deposit USDT/USDC/DAI in order to borrow fUSD",
                            btn: "Deposit",
                            title1: "Wallet Balance",
                            title2: "Collateral Balance",
                            amount1: 0,
                            amount2: 0,
                            symbol1:"",
                            symbol2:"",
                        },
                        loading:false,

                    },
                    {
                        title: "Borrow",
                        itemData: {
                            title: "Frying Baskets",
                            content: "Borrow up to 50% the value of your collateral in fUSD.",
                            btn: "Borrow",
                            title1: "Available to Borrow",
                            title2: "fUSD Balance",
                            amount1: 0,
                            amount2: 0,
                            symbol1:"",
                            symbol2:"",
                        },
                        loading:false,
                    },
                    {
                        title: "Withdraw",
                        itemData: {
                            title: "Frying Baskets",
                            content: "Wtihdraw your deposited USDT/USDC/DAI ",
                            btn: "Withdraw",
                            title1: "Available to Withdraw",
                            title2: "",
                            amount1: 0,
                            amount2: 0,
                            symbol1:"",
                            symbol2:"",
                        },
                        loading:false,
                    },
                    {
                        title: "Repay",
                        itemData: {
                            title: "Frying Baskets",
                            content: "Repay your debt with USDT/USDC/DAI and fUSD",
                            btn: "Repay",
                            title1: "Wallet Balance (USDT/fUSD)",
                            title2: "Remaining fUSD Debt",
                            title3: 'DATE OF MATURITY',
                            amount1: [0, 0],
                            amount2: 0,
                            amount3:'0',
                            symbol1:"",
                            symbol2:"",
                        },
                        loading:false,
                    },
                    {
                        title: "Liquidate",
                        itemData: {
                            title: "Frying Baskets",
                            content: "The ultimate self-paying loan incubator — use your collateral to repay your debt",
                            btn: "Liquidate",
                            title1: "Your Collateral Balance",
                            title2: "Remaining fUSD Debt",
                            amount1: 0,
                            amount2: 0,
                            symbol1:"",
                            symbol2:"",
                        },
                        loading:false,
                    },

                ],

                cheData: {
                    pool: {
                        symbol: "",
                        address: "",
                        balance: "",
                        collateral: "",
                        poolInfo: {},
                        allowance: 0,
                    },
                    FRIES: {
                        symbol: "FRIES",
                        address: "",
                        balance: "",
                        allowance: 0,
                    }
                }

            };
        },
        methods: {
            changeTabs(key) {
                trace("key=", key)
                this.curTabId = key;
            },

            execute(name, data,item,bf) {
                trace("execute-",name,data,item)

                if (name == "Deposit") {
                    trace("toDposit-",this.cheData.pool.allowance,data.amount,this.cheData.pool.allowance < data.amount)

                    if (Number(this.cheData.pool.allowance) < Number(data.amount)) {
                        item.loading = true;
                        approvePoolToken(this.cheData.pool.address, "", "fryer", (code, hash) => {
                            trace("approvePoolToken-",this.cheData.pool.symbol, code, hash);
                            if (code == 1) {
                                this.checkInfo();
                            }
                            if(code>=1){
                                item.loading = false;
                            }
                        });
                        return;
                    }
                    item.loading = true;
                    trace("to-deposit-amount=",this.cheData.pool.address, data.amount)
                    deposit(this.cheData.pool.address, data.amount, (code, hash) => {
                        trace("deposit-",this.cheData.pool.symbol, code, hash);
                        if (code == 1) {
                            if(bf) bf();
                            this.checkInfo();

                        }
                        if(code>=1){
                            item.loading = false;
                        }
                    });
                } else if (name == "Withdraw") {
                    item.loading = true;
                    withdraw(this.cheData.pool.address, data.amount, (code, hash) => {
                        trace("withdraw-",this.cheData.pool.symbol, code, hash);
                        if (code == 1) {
                            if(bf) bf();
                            this.checkInfo();
                        }
                        if(code>=1){
                            item.loading = false;
                        }
                    });
                } else if (name == "Borrow") {
                    item.loading = true;
                    borrow(this.cheData.pool.address, data.amount, (code, hash) => {
                        trace("borrow-",this.cheData.pool.symbol, code, hash);
                        if (code == 1) {
                            if(bf) bf();
                            this.checkInfo();
                        }
                        if(code>=1){
                            item.loading = false;
                        }
                    });
                } else if (name == "Repay") {
                  trace("repay-amount",data.amount,data.amountfries,)
                  trace("repay-allowance",this.cheData.pool.allowance ,this.cheData.FRIES.allowance)

                    if (Number(data.amount) > Number(this.cheData.pool.allowance )) {
                        item.loading = true;
                        approvePoolToken(this.cheData.pool.address, this.cheData.pool.address, "fryer", (code, hash) => {
                            trace("approvePoolToken-FRIES", code, hash);
                            if (code == 1) {
                                this.checkInfo();
                            }
                            if(code>=1){
                                item.loading = false;
                            }
                        });
                        return;
                    }
                    if (Number(data.amountfries) > Number(this.cheData.FRIES.allowance)) {
                        item.loading = true;
                        approvePoolToken(this.cheData.pool.address, this.cheData.FRIES.address, "fryer", (code, hash) => {
                            trace("approvePoolToken-FRIES", code, hash);
                            if (code == 1) {
                                this.checkInfo();
                            }
                            if(code>=1){
                                item.loading = false;
                            }
                        });
                        return;
                    }

                    item.loading = true;
                    repay(this.cheData.pool.address, data.amount||0, data.amountfries||0, (code, hash) => {
                        trace("repay-",this.cheData.pool.symbol, code, hash);
                        if (code == 1) {
                            if(bf) bf();
                            this.checkInfo();
                        }
                        if(code>=1){
                            item.loading = false;
                        }
                    });
                } else if (name == "Liquidate") {
                    item.loading = true;
                    liquidate(this.cheData.pool.address, data.amount, (code, hash) => {
                        trace("liquidate-",this.cheData.pool.symbol, code, hash);
                        if (code == 1) {
                            if(bf) bf();
                            this.checkInfo();
                        }
                        if(code>=1){
                            item.loading = false;
                        }
                    });
                }

            },


            async checkInfo() {
                //pool
                this.cheData.pool.balance = await getBalanceToken(this.cheData.pool.address);
                this.cheData.pool.poolInfo = (await getPoolinfo(this.cheData.pool.address)).data;
                this.cheData.pool.allowance = Number(await getPoolAllowance(this.cheData.pool.address, "", "fryer"));
                // this.cheData.pool.allowance1 = await getPoolAllowance(this.cheData.pool.address, "", "fryer");
                this.cheData.pool.allowance2 = Number(await getPoolAllowance(this.cheData.pool.address,this.cheData.FRIES.address,  "fryer"));
                //FRIES
                this.cheData.FRIES.address = getTokenAddress(this.cheData.FRIES.symbol);
                this.cheData.FRIES.balance = Number(await getBalanceToken(this.cheData.FRIES.address));
                this.cheData.FRIES.allowance = Number(await getPoolAllowance(this.cheData.pool.address, this.cheData.FRIES.address, "fryer"));

                this.navs[0].itemData.amount1 = toFixed4(this.cheData.pool.balance);
                this.navs[0].itemData.amount2 = toFixed4(this.cheData.pool.poolInfo.TotalDeposited);
                this.navs[0].itemData.symbol1 = this.cheData.pool.symbol;
                this.navs[0].itemData.symbol2 = this.cheData.pool.symbol;

                this.navs[1].itemData.amount1 = toFixed4(this.cheData.pool.poolInfo.maxDebt);
                this.navs[1].itemData.amount2 = toFixed4(this.cheData.pool.poolInfo.TotalDebt);
                this.navs[1].itemData.symbol1 = this.cheData.FRIES.symbol;
                this.navs[1].itemData.symbol2 = this.cheData.FRIES.symbol;

                this.navs[2].itemData.amount1 = toFixed4(this.cheData.pool.poolInfo.maxWithdraw);
                this.navs[2].itemData.symbol1 = this.cheData.pool.symbol;

                this.navs[3].itemData.title1 = ["Wallet Balance "+this.cheData.pool.symbol,"Wallet Balance fUSD"];
                this.navs[3].itemData.amount1 = [toFixed4(this.cheData.pool.balance), toFixed4(this.cheData.FRIES.balance)];
                this.navs[3].itemData.amount2 = toFixed4(this.cheData.pool.poolInfo.TotalDebt);
                this.navs[3].itemData.symbol1 = this.cheData.pool.symbol;
                this.navs[3].itemData.symbol2 = this.cheData.FRIES.symbol;

                this.navs[4].itemData.amount1 = toFixed4(this.cheData.pool.poolInfo.TotalDeposited);
                this.navs[4].itemData.amount2 = toFixed4(this.cheData.pool.poolInfo.TotalDebt);
                this.navs[4].itemData.symbol1 = this.cheData.pool.symbol;
                this.navs[4].itemData.symbol2 = this.cheData.FRIES.symbol;

                trace("cheData-", this.cheData, this.navs)
                this.isLoading = false;
                const filterRes = this.pools.filter(item => item.symbol == this.cheData.pool.symbol)
                const apy = filterRes[0].apy;
                this.setDateMaturity(apy)
            },
            // 存100 债务50 收益率10%  ｜ 50/（100*10%）*365 = day
            async setDateMaturity(apy) {
                await this.fryerCheckInfo();
                const repayData = this.navs[3].itemData;
                const banance = this.navs[0].itemData.amount2;
                const debt = repayData.amount2;
                const apyRes = new BigNumber(apy).div(100).toFixed();
                repayData.amount3 = this.dateMaturityFormula(banance, debt, apyRes)
            },
            dateMaturityFormula(banance, debt, apy) {
                const res = new BigNumber(banance).times(new BigNumber(apy));
                const date = new BigNumber(debt).div(res)
                const times = date.times(365).toFixed();
                const resTime = toFixed0(times)
                const time = this.addDate(resTime == Infinity ? 0 : resTime)
                return time;
            },
            addDate(days=0, years=0, months=0 ) {
                return moment().add({years,months, days}).format('YYYY-MM-DD');
            },
            replaceSymbol(str){
                return str.replace("USDT/USDC/DAI",this.cheData.pool.symbol)
            },


        },
        watch: {
            pools:{
                handler:function (newValue,) {
                    const newArr = JSON.parse(JSON.stringify(newValue))
                    const filterRes = newArr.filter(item => item.symbol == this.cheData.pool.symbol)
                    const apy = filterRes[0].apy;
                    this.setDateMaturity(apy)
                },
                deep:true,
                immediate:true
            },
            account() {
                if (this.isLogin) {
                    this.checkInfo();
                }
            },
            $route(to, from) {
                if (to.path.indexOf("fryer") > 0) {
                    if (this.isLogin) {
                        this.checkInfo();
                    }
                }
            },
            config() {
                this.checkInfo();
            },

        },
        computed: {
            ...mapGetters(["config", "isLogin", "account","curFryerAddress"]),
        },

        mounted() {
            trace("isLogin", this.isLogin)
            if (this.isLogin) {
               try{
                   this.cheData.pool.address = this.curFryerAddress;
                   this.cheData.pool.symbol = getTokenSymbol(this.cheData.pool.address);

                   this.checkInfo();
               }
               catch (e) {
                   trace("err",e)
               }
            }else{
                this.$router.push({path:"/fryer"});
            }
        },



    };
</script>
<style lang="scss" scoped>

    @import "./main_375.scss";
    @import "./main_1024.scss";
    @import "./main_1280.scss";
    @import "./main_1440.scss";



    ::v-deep .ant-tabs-nav-container-scrolling{
        padding-right: 0;
        padding-left: 0;
    }

    ::v-deep .ant-tabs-nav .ant-tabs-tab:hover{
        opacity: .7;
    }
    ::v-deep .ant-tabs-nav .ant-tabs-tab-active:hover {
        color: #fbc861;
        background-color: rgba(244, 153, 173, 0.95);
        border: 1px solid #525252;
    }
    
    ::v-deep .ant-tabs-ink-bar{
        display: none !important;
    }
    



</style>
