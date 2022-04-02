
<style lang="scss" scoped>
.m-dialog-farming-stake {
    width: 100%;
    height: 100%;
    .m-dialog-farming-round-box {
        padding-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .m-dialog-msg {
        width: 100%;
        text-align: center;
        padding-top: 43px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        color: #000000;
    }
    .m-dialog-link-submit-desc {
        padding-top: 23px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        text-align: center;
        color: #171717;
    }
    .m-dialog-submit-btn {
        padding-top: 56px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn {
            width: 120px;
            border: 3px solid #000000;
            font-family: Arial Black;
            font-style: normal;
            font-weight: 900;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            color: #000000;
            text-align: center;
            user-select: none;
            cursor: pointer;
            &:hover {
                border: 3px solid #4b4b4b;
                color: #4b4b4b;
            }
        }
    }
}
</style>
<template>
    <div class="cheese-main">
        <Dialog :dialogFlag="dialogFlag" @click="dialogFlag=false" title="STAKING RESULTS" v-if="!cur_is_mobile()">
            <div class="m-dialog-farming-stake">
                <div class="m-dialog-farming-round-box">
                    <img :src="require('../../../assets/cheese/round.svg')" alt="">
                </div>
                <div class="m-dialog-msg">
                    YOU HAVE SUCCESSFULLY STAKED $MIM
                </div>
                <div class="m-dialog-link-submit-desc">
                    Follow the link below to submit the event form
                </div>
                <div class="m-dialog-submit-btn">
                    <div class="btn" @click="handleDialogSubmit()">SUBMIT NOW</div>
                </div>
            </div>
        </Dialog>
        <div class="chr-title">
            <div class="t1">
                <span class="t1-span1">CHEESE FACTORY</span>
                <span class="t1-span2">CHEESE FACTORY</span>
            </div>
            <div class="t2"> From Farm to Table: Upsize your <br v-if="isMobile">earnings and
                <br v-if="!isMobile">top up those cheese <br v-if="isMobile">tokens via staking
            </div>
        </div>
        <div class="pool-con" v-if="!isMobile">
            <token-msg v-for="(item,index) in pools" :key="item.title" :token="item"></token-msg>
        </div>
        <template v-else>
            <div class="pool-con">
                <token-msg v-for="(item,index) in pools.slice(0,2)" :key="item.title" :token="item"></token-msg>
            </div>
            <div class="pool-con" style="margin-top: 32px;justify-content: center;">
                <token-msg v-for="(item,index) in pools.slice(2)" :key="item.title" :token="item"></token-msg>
            </div>

        </template>

        <div v-if="isLoading" style="text-align: center;padding: 1.2rem 0;">
            <a-spin size="large"/>
        </div>
        <div class="container" v-if="curPool.id">
            <!-- <staking-bonus v-if="curPool.token.symbol === 'MIM TOKEN' && !cur_is_mobile() " /> -->
            <div class="con-title">{{curPool.token?curPool.token.symbol:""}} POOL</div>
            <div class="bas-item" v-for="(item,index) in items" :key="index+''">
                <!--<div class="bas-item-title">{{item.title+"("+item.total+")"}}</div>-->
                <div class="bas-item-title" v-if="isShowStake(item)">{{item.title}}</div>
                <div class="bas-item-con" v-if="isShowStake(item)">
                    <div class="p1">
                        <div class="input-con" v-if="item.isPer">
                            <a-input class="chf-input" v-model="item.amount" :disabled="!item.isPer"
                                     @change="changAmount(item)"/>
                        </div>
                        <div class="input-con" v-else style="margin: 8px 0;">
                            <a-input class="chf-input" v-model="item.amount" :disabled="!item.isPer"
                                     @change="changAmount(item)"/>
                        </div>
                        <div class="per-con" v-if="item.isPer">
                            <a-slider v-model="item.per" @change="onChangePer(index,item)" :tooltipVisible="false"
                                      :disabled="Number(item.total)<=0">
                            </a-slider>
                            <span class="tooltip-con" :style="'margin-left:'+item.per+'%'">
                                <span class="tooltip-con-t1">{{item.per}}%</span>
                            </span>
                        </div>
                    </div>
                    <div class="p2" v-if="isShowStake(item)">
                        <a-button class="chr-c-btn" @click="execute(item)" :loading="item.isLoading"
                                  :disabled="item.disabled">{{item.btn}}
                        </a-button>
                    </div>
                </div>
            </div>

            <div class="b-btns" v-if="!isMobile">
                <!--<div>cheese balance :</div>-->
                <!--<div>{{cheese_balance}}</div>-->
                <a-button class="chr-btn chr-btn2" @click="claimAndUnstake" :loading="btnAllLoading" :disabled="btnAllDisabled">{{btnAll}}</a-button>
            </div>
        </div>
    </div>
</template>


<script>
    import StakingBonus from './components/stakingBonus/StakingBonus.vue'
    import {toFixed4, trace, toFixed1,toFixed0} from "../../../utils/tools"
    import Gloabal from "../../../common/Global"
    import {
        getStakePools,
        getUserStakeInfo,
        userStake,
        userUnstake,
        userClaim,
        approvePoolToken,
        getPoolAllowance,
        getTokenAddress
    } from "../../../sdk/cheese-sdk"
    import {mapGetters} from "vuex"
    import {getBalanceToken} from "../../../api/user"
    import PoolItem from "../../../components/PoolItem";
    import {BigNumber} from "bignumber.js";
    import TokenMsg from "../../../components/tokenMsg"
    import { is_Mobile } from '../../../utils/is'
    import Dialog from '../../../components/Dialog.vue'
    import global from "../../../common/Global.vue";

    export default {
        components: {TokenMsg, PoolItem, StakingBonus, Dialog},
        props: {},
        data() {
            return {
                dialogFlag: false,
                cheese_balance: "",
                btnAll: "CLAIM & UNSTAKE",
                btnAllDisabled: true,
                btnAllLoading: false,
                pers: [10, 25, 50, 75, 100],
                isLoading:false,
                items: [
                    {
                        title: "AMOUNT TO STAKE",
                        amount: "",
                        btn: "STAKE",
                        isPer: true,
                        per: 0,
                        id: 1,
                        total: 0,
                        isLoading: false,
                        disabled: false,
                    },
                    {
                        title: "AMOUNT TO UNSTAKE",
                        amount: "",
                        btn: "UNSTAKE",
                        isPer: true,
                        per: 0,
                        id: 2,
                        total: 0,
                        isLoading: false,
                        disabled: false,
                    },
                    {
                        title: "AVAILABLE REWARDS TO CLAIM",
                        amount: "",
                        btn: "CLAIM",
                        isPer: false,
                        per: 0,
                        id: 3,
                        total: 0,
                        isLoading: false,
                        disabled: false,
                    },
                ],
                pools: [
                    {
                        text: "AVAILABLE",
                        icon: "CHEESE",
                        symbol: "CHEESE",
                        address: "",
                        amount: 0
                    },
                    {
                        text: "STAKED",
                        icon: "CHEESE",
                        symbol: "CHEESE",
                        address: "",
                        amount: 0
                    },
                    {
                        text: "CHEESE BALANCE",
                        icon: "CHEESE",
                        symbol: "CHEESE",
                        address: "",
                        amount: 0
                    },
                ],

                curPool: {},
            };
        },
        methods: {
            isShowStake(item){
                console.log(item,'item');
                console.log(this.curCheesePool,'this.curCheesePool.isRetired');
                if(this.curCheesePool.isRetired && item.id === 1){
                    return false
                }
                return true;
            },
            handleDialogSubmit() {
                window.open(global.pathList.EventLink);
            },
            cur_is_mobile() {
                return is_Mobile()
            },
            onChangePer(index, item) {
                item.per = Number(item.per.toFixed(1));
                // item.amount = toFixed4(item.total * item.per * 0.01);
                item.amount = toFixed4(new BigNumber(item.total).times(item.per).times(0.01));
                item.disabled = (item.amount <= 0 || Number(item.amount)>item.total);
            },

            changAmount(item) {

                clearTimeout(window["fryeritem-changAmount-t"]);
                let cc = String(item.amount).replace(/[^0-9\.-]+/g, '');
                item.amount = cc;

                if(Number(item.amount) > 0){
                    if (Number(item.amount) > 0) {
                        // trace("per=",item.amount,new BigNumber(item.amount).times(100).div(item.total).toNumber())

                        if (item.amount / item.total < 0.001 || item.total <= 0) {
                            item.per = 0;
                        } else {
                            item.per = toFixed1(new BigNumber(item.amount).times(100).div(item.total).toNumber());
                            item.per = Math.min(item.per, 100);
                        }
                    } else {
                        item.per = 0;
                    }
                    item.disabled = (Number(item.amount) <= 0 || Number(item.amount)>item.total);
                }


                window["fryeritem-changAmount-t"] = setTimeout(() => {       // }, 850);
                    if (cc != "") item.amount = parseFloat(cc);
                    else {
                        item.amount  = "";
                    }

                    if (Number(item.amount) > 0) {
                        // trace("per=",item.amount,new BigNumber(item.amount).times(100).div(item.total).toNumber())

                        if (item.amount / item.total < 0.001 || item.total <= 0) {
                            item.per = 0;
                        } else {
                            item.per = toFixed1(new BigNumber(item.amount).times(100).div(item.total).toNumber());
                            item.per = Math.min(item.per, 100);
                        }
                    } else {
                        item.per = 0;
                    }
                    item.disabled = (Number(item.amount) <= 0 || Number(item.amount)>item.total);

                }, 850);
            }
            ,
            execute(item) {
                if (item.id == "1") {   //stake
                    trace(this.curPool.id, item)

                    if (Number(this.curPool.token.allowance) < Number(item.amount)) {
                        item.isLoading = true;
                        approvePoolToken("", this.curPool.token.token, "cheese", (code, hash) => {
                            trace("approvePoolToken-", this.curPool.token.symbol, code, hash);
                            if (code == 1) {
                                this.checkInfo();
                            }
                            if (code >= 1) {
                                item.isLoading = false;
                            }
                        });
                        return;
                    }
                    item.isLoading = true;
                    userStake(this.curPool.id, item.amount, (code, hash) => {
                        trace("userStake", code, hash)
                        if (code == 1) {
                            item.amount = 0;
                            item.per = 0;
                            this.checkInfo();
                            // if(this.curPool.token.symbol === 'MIM TOKEN') {
                            //     this.dialogFlag = true;
                            // }
                        }
                        if (code >= 1) {
                            item.isLoading = false;
                        }
                    })

                } else if (item.id == "2") {   //unstake
                    item.isLoading = true;
                    userUnstake(this.curPool.id, item.amount, (code, hash) => {
                        trace("userUnstake", code, hash)
                        if (code == 1) {
                            item.amount = 0;
                            item.per = 0;
                            this.checkInfo();
                        }
                        if (code >= 1) {
                            item.isLoading = false;
                        }
                    })

                } else if (item.id == "3") {   //claim
                    item.isLoading = true;
                    userClaim(this.curPool.id, (code, hash) => {
                        trace("userClaim", code, hash)
                        if (code == 1) {

                            this.checkInfo();
                        }
                        if (code >= 1) {
                            item.isLoading = false;
                        }
                    })
                }

            }
            ,

            claimAndUnstake(){
                if(Number(this.pools[1].amount)>0){
                    this.btnAllLoading = true;
                    userUnstake(this.curPool.id, this.pools[1].amount, (code, hash) => {
                        trace("userUnstake", code, hash)
                        if (code == 1) {
                            this.checkInfo();
                        }
                        if (code >= 1) {
                            this.btnAllLoading = false;
                        }
                    })
                }else if(Number(this.items[2].amount)>0){
                    this.btnAllLoading = true;
                    userClaim(this.curPool.id, (code, hash) => {
                        trace("userClaim", code, hash)
                        if (code == 1) {
                            this.checkInfo();
                        }
                        if (code >= 1) {
                            this.btnAllLoading = false;
                        }
                    })
                }
            },

            async checkInfo() {
                this.isLoading = true;
                let {symbol, token, pid,icon} = this.curCheesePool;
                trace("curpool=", JSON.stringify(this.curCheesePool),icon,symbol);
                // /this.curPool
                let apool = (await getUserStakeInfo(pid)).data;
                apool.token = {symbol, token, pid};

                apool.token.balance = toFixed4(await getBalanceToken(apool.token.token));
                apool.token.allowance = toFixed4(await getPoolAllowance("", apool.token.token, "cheese"));
                // text: "CHEESE AVAILABLE",
                this.pools[0].text = symbol+" AVAILABLE";
                this.pools[1].text = symbol+" STAKED";

                this.pools[0].amount = this.items[0].total = toFixed4(apool.token.balance);
                this.pools[1].amount = this.items[1].total = toFixed4(apool.amount);
                this.pools[2].amount = this.items[2].total = toFixed4(apool.income);
                this.items[2].amount = toFixed4(apool.income);
                this.pools[0].symbol = this.pools[1].symbol = icon;
                this.pools[0].icon = this.pools[1].icon = icon.slice(0,-4);

                this.items[0].disabled = true;
                this.items[1].disabled = true;
                this.items[2].disabled = (this.items[2].amount <= 0);

                this.items[0].btn = (apool.token.allowance < 100) ? "APPROVE" : "STAKE";


                trace("checkInfo", apool, this.pools)
                let address = getTokenAddress("CHEESE");
                this.cheese_balance = await getBalanceToken(address);
                this.pools[2].amount = toFixed4(this.cheese_balance);

                apool.id = pid;
                this.curPool = apool;

                if(Number(this.pools[1].amount)>0){
                    this.btnAll = "UNSTAKE ALL";
                    this.btnAllDisabled = false;
                }else if(Number(this.items[2].amount)>0){
                    this.btnAll = "CLAIM ALL";
                    this.btnAllDisabled = false;
                }else {
                    this.btnAll = "CLAIM & UNSTAKE";
                    this.btnAllDisabled = true;
                }
                this.changAmount(this.items[0])
                this.changAmount(this.items[1])

                this.isLoading = false;
            }

        },
        watch: {
            account() {
                if (this.isLogin) {
                    this.checkInfo();
                }
            },
            $route(to, from) {
                if (to.path.indexOf("cheese") > 0) {
                    if (this.isLogin) {
                        this.checkInfo();
                    }
                }
            },
        },
        computed: {
            ...mapGetters(["isLogin", "account", "curCheesePool", "cheesePools", "isMobile"]),
        },

        mounted() {
            if (this.isLogin) {
                this.checkInfo();
            } else {
                this.$router.push({path: "/cheese"});
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
