<template>
    <div class="page-home">
        <template>
            <span class="p p1">Serve up the Future of Finance
            </span>
            <span class="p p2">
                The ultimate DeFi protocol-equivalent of<br v-if="isMobile"> fast food
                <br v-if="!isMobile">that powers decadent yields<br v-if="isMobile"> and satisfies cravings for<br v-if="isMobile"> multiple use cases.
            </span>
        </template>

        <span class="p p3">
            <img class="m-logo-pic" src="../../assets/home/newLogo.png" alt="">
            <!--<img src="../../assets/home_img1.gif"/>-->
             <!-- <lottie-animation
                     ref="anim"
                     :loop="true"
                     :autoPlay="true"
                     :speed="1"
                     :animationData="require('../../assets/cheeseloading.json')"
             /> -->
            <!--<lottie-player :options="{autoplay:true,speed:2.5,width:'250px'}" src="../../assets/cheeseloading.json" />-->
        </span>
        <span class="p p4 btn-box" v-if="!global.isClose">
            <a-button class="chr-btn chr-btn2 btn" @click="handleTo('/fryer')">SELF-REPAYING LOAN</a-button>
            <a-button class="chr-btn chr-btn2 btn leverage" @click="handleTo('/flash/long')">LEVERAGE TRADING</a-button>
        </span>
        <tvl-module />

        <div style="margin-top: 60px;">
            <div class="p p1">
                Fry Me to the Moon
            </div>
            <div class="p p2">
                The ultimate incubator that helps you
                <br>harvest your future yields, today.
            </div>
            <div class="p p4 box-pane2">
                <div class="box-pane-con box-pane-con1">
                    <img class="img1" src="../../assets/cheese_coin_img1.svg" />
                    <!--:toStake="toDeposit"-->
                    <BoxItem :toBuy="toBuy" :key="token1.symbol"  :token="token1"></BoxItem>
                </div>
                <div class="box-pane-con box-pane-con2">
                    <BoxItem :toBuy="toBuy" :key="token2.symbol"  :token="token2"></BoxItem>
                    <img class="img2" src="../../assets/fry_coin_img1.svg" />
                </div>


            </div>
        </div>


        <div style="margin-top: 60px;">
            <div class="p p1">
                What's Cookin' Good Lookin?
            </div>
            <div class="p p2">
                CHFRY enables multiple scenarios to ensure
                <br>fUSD-pegged convergence to its underlying
                <br>basket of stablecoins (USDC/USDT/DAI).

            </div>

            <div class="p p4 box-pane">
                <span class="box2">
                    <div class="box2-con1">
                       <span class="box2-con-p1">
                            Diversified,
                        <br>Competitive Yields
                       </span>
                    </div>
                    <div class="box2-con2">
                        Uncorrelated high yield
                        <br>strategies mean your debt
                        <br>repayments can't be
                        <br>interrupted by market
                        <br>fluctuations.
                    </div>
                </span>

                <span class="box2">
                    <div class="box2-con1">
                       <span class="box2-con-p1">
                            Zero Liquidation
                        <br>Risk
                       </span>
                    </div>
                    <div class="box2-con2">
                       Your deposited collateral
                        <br>can't be liquidated. Ever.
                    </div>
                </span>

                <span class="box2">
                    <div class="box2-con1">
                       <span class="box2-con-p1">
                            Low Maintenance,
                        <br>Low Fees
                       </span>
                    </div>
                    <div class="box2-con2">
                       Sit back and relax while
                        <br>your loan repays itself at
                        <br>warp speed.
                    </div>
                </span>

            </div>

<!--            <div class="p p4 btns" v-if="!global.isClose">-->
<!--                <a-button class="chr-btn chr-btn2" @click="openPage(4)">FIND OUT MORE</a-button>-->
<!--            </div>-->
            <Roadmap :dataList="dataList" />
            <div class="p p5">
                <div class="t1">Find out More</div>
                <div class="t2">
                    <a-button class="chr-btn chr-btn7" @click="openPage('Gitbook')">GITBOOK</a-button>
                    <a-button class="chr-btn chr-btn7" @click="openPage('Github')">GITHUB</a-button>
                </div>
                <div class="t2">
                    <a-button class="chr-btn chr-btn7" @click="openPage('WhitePaper')">WHITEPAPER</a-button>
                    <a-button class="chr-btn chr-btn7" @click="openPage('Audit')">AUDIT REPORT</a-button>
                </div>
            </div>

            <div class="p p5">
                <div class="t1">Join our communities
                    <br>for exclusive offers and updates</div>
                <div class="t2">
                   <a-button class="btn" @click="openPage('Discord')">
                       <img class="t2-1" src="../../assets/tool/icon_link_Discord.svg" />
                       <span class="t2-2">Discord</span>
                   </a-button>
                    <a-button class="btn" @click="openPage('Telegram')">
                       <img class="t2-1" src="../../assets/tool/icon_link_Telegram.svg" />
                       <span class="t2-2">Telegram</span>
                   </a-button>
                    <a-button class="btn" @click="openPage('Twitter')">
                       <img class="t2-1" src="../../assets/tool/icon_link_Twitter.svg" />
                       <span class="t2-2">Twitter</span>
                   </a-button>
                   <a-button class="btn" @click="openPage('Medium')">
                        <img class="t2-1" src="../../assets/ido/medium.svg" />
                        <span class="t2-2">Medium</span>
                    </a-button>
                    <a-button class="btn" @click="openPage('Immunefi')">
                        <img class="t2-1" src="../../assets/tool/Immunefi.svg" />
                        <span class="t2-2">Immunefi</span>
                    </a-button>
                </div>
            </div>


            <!--<div class="p-bd" v-if="0">-->
                <!--<span class="p-bd-span" @click="openPage(1)">-->
                    <!--<img class="img1" src="../../assets/icon_github.svg"/>-->
                    <!--<span class="p-bd-span-p1">-->
                        <!--<img class="img11" src="../../assets/text_github.svg" />-->
                    <!--</span>-->
                <!--</span>-->
                <!--<span class="p-bd-span" @click="openPage(2)">-->
                    <!--<img class="img2" src="../../assets/icon_sushiswap.svg"/>-->
                    <!--<span class="p-bd-span-p1"><img class="img21" src="../../assets/text_sushiswap.svg" /></span>-->
                <!--</span>-->
                <!--<span class="p-bd-span" @click="openPage(3)">-->
                    <!--<img class="img3" src="../../assets/icon_discord.svg"/>-->
                    <!--<span class="p-bd-span-p1"><img class="img31" src="../../assets/text_discord.svg" /></span>-->
                <!--</span>-->

            <!--</div>-->
        </div>
    </div>
</template>


<script>
    import global from "../../common/Global"
    import {mapGetters} from "vuex"
    import BoxItem from "./components/boxItem"
    import LottieAnimation from 'lottie-web-vue'
    import Roadmap from './components/Roadmap.vue'
    import TvlModule from './components/TvlModule.vue'
    import Popup from '../../components/popup.vue'

    export default {
        components: {BoxItem,LottieAnimation,Roadmap,TvlModule,Popup},
        props: {},
        data() {
            return {
                global:global,
                token1:{
                    symbol:"CHEESE COIN",
                    address:"",
                    amount:"",
                    icon:"CHEESE.svg",
                },
                token2:{
                    symbol:"FUSD COIN",
                    address:"",
                    amount:"",
                    icon:"FRIES.svg",
                },
                dataList: [
                    {
                        title: "Q1 2021",
                        data: [
                            {
                                text: 'Market Research'
                            },
                            {
                                text: 'Idea and Concept Formation'
                            },
                        ]
                    },
                    {
                        title: "Q2 2021",
                        data: [
                            {
                                text: 'Team Formation'
                            },
                            {
                                text: 'Project Planning'
                            },
                            {
                                text: 'Protocol Beta'
                            },
                            {
                                text: 'Audit Completion'
                            },
                        ]
                    },
                    {
                        title: "Q3 2021",
                        data: [
                            {
                                text: 'Whitepaper Release'
                            },
                            {
                                text: 'Testnet Launch'
                            },
                            {
                                text: 'Community Building'
                            },
                            {
                                text: 'IDO'
                            },
                            {
                                text: 'NFTs'
                            },
                            {
                                text: 'Mainnet Launch (V1)'
                            }
                        ]
                    },
                    {
                        title: "Q4 2021",
                        data: [
                            {
                                text: 'DAO Development'
                            },
                            {
                                text: 'Flash Fryer AppDevelopment'
                            },
                            {
                                text: 'Hackathons Organization'
                            },
                            {
                                text: 'fUSD Cross-Layer Development'
                            },
                        ]
                    },
                    {
                        title: "Q1 2022",
                        data: [
                            {
                                text: 'Full On-chain Governance System'
                            },
                            {
                                text: 'Multi Chain Interoperability'
                            },
                            {
                                text: 'More Collateral Types'
                            },
                            {
                                text: 'CHFRY Vault (Yield Diversification)'
                            },
                            
                        ]
                    },
                ]
            };
        },
        methods: {
            handleTo(v){
                this.$router.push({path: v})
            },
            toBuy(token) {
                if(token.symbol.indexOf('CHEESE') !== -1) {
                    window.open(this.global.pathList.buyCheese)
                }
                if(token.symbol.indexOf('FUSD') !== -1) {
                    window.open(this.global.pathList.buyFryusd)
                }
            },
            started() {
                if (this.isLogin) {
                    this.$router.push({path: "/fryer"})
                }
            },

            openPage(value){
                window.open(this.global.pathList[value])
            }


        },
        watch: {},
        computed: {
            ...mapGetters(["isLogin","isMobile"])
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>
    @import "./index_375.scss";
    @import "./index_1024.scss";
    @import "./index_1280.scss";
    @import "./index_1440.scss";

    .p5{
       .t2{
           .btn{
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               background-color: transparent;
               border: 0;
               width: 50px !important;

               .t2-1{
                   margin-bottom: 8px;
                   width: 42px;

               }
               .t2-2{
                   font-family: Arial;
                   font-style: normal;
                   font-weight: normal;
                   font-size: 13px;
                   line-height: 15px;
                   color: #000000;
               }
           }
       }
    }

    @media screen and (max-width: 1279px) and (min-width: 751px) {}
    @media screen and (max-width: 1439px) and (min-width: 1280px) {}
    @media screen and (min-width: 1440px) {}


</style>
