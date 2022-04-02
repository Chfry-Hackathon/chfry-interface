<template>
    <div :class="isHome?'main-layout-page1':'main-layout-page2'">
        <a-layout>
            <a-layout-header style="background: transparent;border: 0;">
                <header-page :isHome="isHome"></header-page>
            </a-layout-header>
            <a-layout-content style="min-height: calc(100vh - 64px);background: transparent;">
                <content-page></content-page>
                <login class="chr-pane" v-if="showLogin"></login>
                <login-error class="chr-pane" v-if="showLoginErr"></login-error>

                <chrfy-bot v-if="!isHome"></chrfy-bot>
            </a-layout-content>
        </a-layout>
      <div class="chr-help-con" v-if="curHelp==1">
        <a-popover overlayClassName="chr-btn-help-popover-con" placement="bottomLeft" :trigger="isMobile?'click':'hover'">
          <template slot="content">
            <div class="chr-btn-help-popover-box">
              <div class="m-box"></div>
              <div class="m-text">
                The fryer is like a vault that collects the user's base asset and deposits it at yield pools to generate yield advances (this procedure is similar to what lending platforms such as AAVE offer). Afterward, a user can borrow a synthetic asset - fUSD, minted by the fryer while meeting the debt ratio requirement. The collateral types that the protocol will accept are USDT, DAI, USDC.
              </div>
            </div>
          </template>

          <div style="padding-bottom: 8px;">
            <a-button class="chr-btn chr-btn-help"></a-button>
          </div>
        </a-popover>
      </div>
      <div class="chr-help-con" v-else-if="curHelp==2">
        <a-popover overlayClassName="chr-btn-help-popover-con" placement="bottomLeft" :trigger="isMobile?'click':'hover'">
          <template slot="content">
            <div class="chr-btn-help-popover-box">
              <div class="m-box"></div>
              <div class="m-text">
                The oven is like a debt converter that allows users to stake their synthetic assets(fUSD) and have them converted into their base assets over time.
              </div>
            </div>
          </template>

          <div style="padding-bottom: 8px;">
            <a-button class="chr-btn chr-btn-help"></a-button>
          </div>
        </a-popover>
      </div>

      <div class="chr-help-con" v-else-if="curHelp==3">
        <a-popover overlayClassName="chr-btn-help-popover-con" placement="bottomLeft" :trigger="isMobile?'click':'hover'">
          <template slot="content">
            <div class="chr-btn-help-popover-box">
              <div class="m-box"></div>
              <div class="m-text">
                The Cheese Factory is the center of all incentive programs, where staking pools like farming and staking take place. The purpose - to distribute CHEESE tokens to the community and provide liquidity for fUSD and CHEESE holders.
              </div>
              <div class="m-title">fUSD3CRV LP pool</div>
              <div class="m-text">
                <ul><li>Provide the liquidity to fUSD3CRV LP on CRV</li>
              <li>Get your LP token</li>
              <li>Come back on CHFRY and stake that LP token in the fUSD3CRV LP pool</li>
              <li>Receive CHEESE awards</li></ul></div>
              <div class="m-title">CHEESE/ETH LP pool</div>
              <div class="m-text"><ul><li>Provide the liquidity to CHEESE/ETH LP pool on the exchange (TBA)</li>
              <li>Get your LP token</li>
              <li>Come back on CHFRY and stake that LP token in CHEESE/ETH LP pool</li>
              <li>Receive CHEESE awards</li></ul></div>
              <div class="m-title">fUSD pool</div>
              <div class="m-text"><ul><li>Stake fUSD tokens</li>
              <li>Receive CHEESE awards</li></ul></div>
              <div class="m-title">CHEESE pool</div>
              <div class="m-text"><ul><li>Stake CHEESE tokens</li>
              <li>Receive CHEESE awards</li></ul></div>
              <div class="m-title">alUSD token pool </div>
              <div class="m-text"><ul><li>Stake alUSD tokens</li>
              <li>Receive CHEESE awards</li></ul></div>

              <div class="m-title">Notes: </div>
              <div class="m-text">
                <ul>
                  <li>EXTERNAL FARMS → Other opportunities to earn with CHEESE/fUSD</li>
                </ul>
              </div>

              <div class="m-title">Alchemix: </div>
              <div class="m-text">
                <ul>
                  <li>
                    Saddle d4 Pool → Deposit alUSD, FEI, FRAX, and/or LUSD to earn ALCX, TRIBE, FXS, and LQTY
                    alUSD/ETH Onsen → Deposit alUSD and ETH on Sushiswap to earn SUSHI
                    mStable alUSD Feeder Pool → Deposit alUSD to earn MTA
                  </li>
                </ul>
              </div>
              
            </div>
          </template>

          <div style="padding-bottom: 8px;">
            <a-button class="chr-btn chr-btn-help"></a-button>
          </div>
        </a-popover>
      </div>

      <div class="chr-help-con" v-else-if="curHelp==4">
        <a-popover overlayClassName="chr-btn-help-popover-con" placement="bottomLeft"
                   :trigger="isMobile?'click':'hover'">
          <template slot="content">
            <div class="chr-btn-help-popover-box">
              <div class="m-box"></div>
              <div class="m-text">
                The Flash Flyer - The flash loan arm of CHFRY — a special rewards pool for flash loan users
                and your gateway to flash loan-powered applications.
              </div>
            </div>
          </template>

          <div style="padding-bottom: 8px;">
            <a-button class="chr-btn chr-btn-help"></a-button>
          </div>
        </a-popover>
      </div>
      <div class="chr-help-con" v-else-if="curHelp==5">
        <a-popover overlayClassName="chr-btn-help-popover-con" placement="bottomLeft"
                   :trigger="isMobile?'click':'hover'">
          <template slot="content">

             <div class="chr-btn-help-popover-box">
              <div class="m-box"></div>
              <div class="m-text">
                 <div class="oven-stake-help-container">
              <div class="oven-stake-help-title">How to Grill and Withdraw your tokens </div>
              <ul class="oven-stake-help-content">
                <li>Click the Grill button to grill fUSD to USDC</li>
                <li>Click the Withdraw button to withdraw your USDC</li>
              </ul>
            </div>
              </div>
            </div>
            
           
            
          </template>

          <div style="padding-bottom: 8px;">
            <a-button class="chr-btn chr-btn-help"></a-button>
          </div>
        </a-popover>
      </div>

    </div>
</template>

<script>
    import global from "../common/Global"
    import {mapGetters} from "vuex"
    import HeaderPage from "./header";
    import ContentPage from "./content";
    import Login from "../components/login"
    import {trace} from "../utils/tools"
    import LoginError from "../components/loginError"
    import ChrfyBot from "../components/chrfyBot";

    export default {
        components: {
            ChrfyBot,
            LoginError,
            Login,
            HeaderPage,
            ContentPage,
        },
        props: {},
        data() {
            return {
              curHelp:1,
                global:global,
                showLogin: false,
                showLoginErr: false,
                isHome:false,
            };
        },
        watch: {
            $route(to, from) {
                this.isHome = (this.$router.currentRoute.path=="/");
                trace("isHome=",this.isHome,this.$router.currentRoute.path)
              this.changeCurHelp()
            },
            // "$store.getters.isMobile"(newVal, oldVal) {
            //   this.isMobile = newVal;
            // },
        },
        computed: {
            ...mapGetters(["isLogin","isMobile"]),
        },
        methods: {
            // windowChange() {
            //   let width = document.documentElement.clientWidth;
            //   this.isMobile = width <= 750;
            // },

          changeCurHelp(){
            let curRouter = this.$router.currentRoute.path;
            console.log(curRouter);
            if(curRouter=="/fryer"){
              this.curHelp=1;
            }else if(curRouter=="/oven"){
              this.curHelp=2;
            }else if(curRouter=="/cheese"){
              this.curHelp=3;
            }else if(curRouter=="/flash"){
              this.curHelp=0;
            }else if(curRouter=="/oven/stake"){
              this.curHelp=5;
            }else{
              this.curHelp=0;
            }

          },

            resize(){
                let screenWidth = document.body.clientWidth;
                let screenHeight = document.body.clientHeight;

                let _isMobile = screenWidth<=750;
                this.$store.dispatch("user/setMobile",_isMobile)
                window.onresize = () => {
                    return (() => {
                        screenWidth = document.body.clientWidth;
                        screenHeight = document.body.clientHeight;

                        _isMobile = screenWidth<=750;
                        this.$store.dispatch("user/setMobile",_isMobile)
                    })();
                };
            },
        },
        created() {
            this.resize();
            // this.windowChange();
            // window.onresize = () => this.windowChange();
        },
        async mounted() {
            this.$bus.on("showLogin", (value) => {
                this.showLogin = value
            });
            // this.$bus.on("showLoginErr", (value) => {
            //     this.showLoginErr = value;
            // });

            trace("curRouter=",this.$router.currentRoute.path);
            this.isHome = (this.$router.currentRoute.path=="/");
            this.changeCurHelp()

            // "walletconnect" | "metamask" | "huobiwallet" | "mathwallet" | "tokenpocket"
           if(!this.isLogin){
              //  if(global.isClose) return

               let res = await this.$store.dispatch("user/getLogin")
               if(res||this.isMobile){
                   let type = res?res.type:"tokenpocket";
                   trace("isMobile=",this.isMobile,type)
                   try{
                       let data1 = await this.$store.dispatch('user/login', {type:type, callback:(data) => {
                               trace("----change----", data);
                               if(data.chainID!=97&&data.chainID!=1&&data.chainID!=3&& data.chainID!=42){
                                   this.$bus.emit("showLoginErr",true);
                               }else{
                                   // this.$router.push({"path":"/"});
                               }
                           }})
                       trace("data1=",data1)
                       if(data1.chainID==97||data1.chainID==1||data1.chainID==3|| data1.chainID==42){     //登入成功
                           this.$store.dispatch("user/saveLogin",{
                               type:type
                           })
                       }else{
                           this.$store.dispatch("user/clearLogin",{
                               type:type
                           })
                           this.$bus.emit("showLoginErr",true);
                       }
                   }catch (e) {
                       trace("err=",e)
                       this.$bus.emit("showLoginErr",true);
                   }


               }
           }
        },
    };
</script>
<style lang="scss" scoped>


    .main-layout-page1 {
        background-image: url("../assets/bg.jpg") ;
        background-repeat: repeat-y;
        background-size: 100%;
    }
    .main-layout-page2 {
        background-image: url("../assets/bg2.jpg") ;
        background-repeat: repeat-y;
        background-size: 100%;
    }

    .ant-layout-footer {
        padding: 24px 0 0 0;
    }

    .ant-layout-header,
    .ant-layout-content {

        // padding: 0;
    }

    .ant-layout-header {
        position: fixed;
        z-index: 999999;
        width: 100%;
        border-bottom: 1px solid rgb(214 214 214 / 50%);
        padding: 0;
        // padding: 0 160px;
    }

    .ant-layout-content {
        margin-top: 64px;
    }

    .chr-pane {
        position: fixed;
        z-index: 999999;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
    }
</style>
