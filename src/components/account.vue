<template>
    <div class="chr-account">
        <div class="container">
           <div class="con1">
               <div class="t1">Account</div>
               <div class="p1">
                   <span class="t2">Connected with Coinbase Wallet</span>
                   <span>
                       <a-button class="btn1" shape="round" >Change</a-button>
                   </span>
               </div>
           </div>
           <div class="con">
               <div class="con-m">
                   <span class="icon"><img src="@/assets/tool/tool_icon_jazz.svg" /> </span>
                   <span class="span1">{{account.slice(0,6)+"****"+account.slice(-4)}}</span>
               </div>
               <div style="margin-top: 30px;">
                   <a-button class="link-btn" style="padding-left: 0;" icon="copy" type="link">Copy Address</a-button>
                   <a-button class="link-btn" icon="login" type="link">View on Etherscan</a-button>
               </div>
           </div>
            <a-button class="close" icon="close" @click="closePage"></a-button>
        </div>
    </div>
</template>


<script>

    import {mapGetters} from "vuex"

    export default {
        components: {},
        props: {},
        data() {
            return {
                isLogin: false,
                lp: {
                    token: {
                        title: "ETH",
                        address: "",
                    },
                    earnList: [],
                    apy: 55.25,
                    tvl: 5565556.05,
                    deposit: 5565556.05,
                    staked: 5565556.05,
                    earning: "-"
                }
            };
        },
        methods: {

            closePage(){
                this.$bus.emit("showAccount", false);
            },

        },
        watch: {

            account() {
                this.isLogin = (this.account.length > 12)
            }
        },
        computed: {
            ...mapGetters(["account"])
        },

        mounted() {
            this.isLogin = (this.account.length > 12)
        },
    };
</script>
<style lang="scss" scoped>
    .chr-account {
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;

        .container {
            position: relative;
            width: 600px;
            margin: 8rem auto;
            background-color: white;
            padding: 3rem 2rem;
            border-radius: 1rem;
            box-shadow: 0px 0px 5px 5px rgb(205 224 219 / 10%);
            .con1{
                margin-top: 1rem;


            }
            .p1{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .t1{
                font-size: 20px;
                /*font-family: PingFangSC-Semibold, PingFang SC;*/
                font-weight: 600;
                color: #444444;
                line-height: 28px;
            }

            .t2{
                font-size: 14px;
                /*font-family: PingFangSC-Semibold, PingFang SC;*/
                font-weight: 600;
                color: rgba(68, 68, 68, 0.5);
                line-height: 20px;
            }

            .btn1{
                border: 1px solid #14C598;
                font-size: 12px;
                /*font-family: PingFangSC-Semibold, PingFang SC;*/
                font-weight: 600;
                color: #14C598;
                line-height: 17px;
            }

            .con{
                position: relative;
                padding: 28px 25px;
                background: #FDFDFD;
                border-radius: 19px;
                border: 1px solid rgba(68, 68, 68, 0.2);

                font-size: 14px;
                /*font-family: PingFangSC-Semibold, PingFang SC;*/
                font-weight: 600;
                color: rgba(68, 68, 68, 0.5);
                line-height: 20px;

                .con-m{
                    display: flex;
                    align-items: center;
                }

                .icon{
                    width: 36px;
                    height: 36px;
                    -webkit-border-radius: 36px;
                    -moz-border-radius: 36px;
                    border-radius: 36px;
                    display: inline-block;

                    img{
                        width: 100%;
                    }

                    margin-right: 20px;
                }

                .link-btn{
                    font-size: 14px;
                    /*font-family: PingFangSC-Semibold, PingFang SC;*/
                    font-weight: 600;
                    color: rgba(68, 68, 68, 0.5);
                    line-height: 20px;
                }

                .link-btn:hover{
                    color: #14C598;
                }

                .span1{
                    font-size: 30px;
                    font-family: SwedenSans-Bold, SwedenSans;
                    font-weight: bold;
                    color: #444444;
                    line-height: 37px;
                    letter-spacing: 1px;
                }
            }

            .close{
                position: absolute;
                right: 1.5rem;
                top: 1rem;
                border: 0;
                font-size: 1.2rem;
            }
        }
    }
</style>
