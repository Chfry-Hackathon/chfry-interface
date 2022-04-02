<template>
    <div class="pool-item">
        <div class="p1" v-if="token.title">{{token.title}}</div>
        <div class="p1" v-else>{{token.symbol}} WALLET BALANCE</div>
        <div class="p2">
            <a-tooltip class="t1">
                <template slot="title">
                    {{toThousands(token.amount)}}
                </template>

                {{resetString(token.amount)==0?"0":resetString(token.amount,2)}}
            </a-tooltip>
            <!--<span class="t1">{{token.amount}}</span>-->
            <span class="icon">
                <img :src="require('../assets/icon/'+token.symbol+'.svg')" />
            </span>
        </div>
        <div class="m-mobile-apy-amount" v-if="isMobile">
            <span>APY</span>:
            <span>{{token.apy}}%</span>
        </div>
        <div class="m-apy-title" v-if="!isMobile">
            <span>APY</span>
        </div>
        <div class="m-apy-amount" v-if="!isMobile">
            <span>{{token.apy}}%</span>
        </div>
        <div class="p3" v-if="toDeposit">
            <a-button class="chr-c-btn"  @click="deposit">STAKE</a-button>
        </div>
    </div>
</template>


<script>
    import {toThousands,resetString} from "../utils/tools"
    import {mapGetters} from "vuex"

    export default {
        components: {},
        props: {
            token:{
                title:"",
                symbol:"",
                address:"",
                amount:""
            },
            toDeposit:Function,
        },
        data() {
            return {
                toThousands:toThousands,
                resetString:resetString,

            };
        },
        methods: {
            deposit(){
              if(this.toDeposit) this.toDeposit(this.token);
            },
        },
        watch: {

        },
        computed: {
             ...mapGetters(["isLogin","isMobile"]),
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 750px){


        .chr-c-btn{
            min-width: 102px !important;
            height: 31px;
            border: 1px solid #000000 ;
            font-size: 10px;
            line-height: 15px;
            -webkit-transform: scale(0.9);
            transform: scale(0.9);
        }
        .pool-item{
            position: relative;
            width: 187px;
            height: 122px;
            padding: 18px 3px 22px 7px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            background-image: url("../assets/tool/fryer_box_bgm2.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            margin-bottom: 32px;

            .p1{
                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 10px;
                line-height: 14px;
                color: #000000;
                -webkit-transform: scale(0.9);
                transform: scale(0.9);
                /*zoom: 0.8333;*/
            }
            .m-mobile-apy-amount {
                font-family: Arial Black;
                font-style: normal;
                font-weight: 600;
                font-size: 10px;
                 -webkit-transform: scale(0.9);
                transform: scale(0.9);
                line-height: 23px;
                color: #000000;
            }

            .p2{
                /*margin: 12px 0 16px;*/
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 12px;
                    line-height: 17px;
                    color: #000000;
                }
            }


            .icon{
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 24px;
                }
            }
        }
    }


    @media screen and (max-width: 1279px) and (min-width: 751px) {
        .pool-item{
            position: relative;
            width: 253px;
            height: 190px;
            padding: 30px 16px 40px 26px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../assets/tool/fryer_box_bg.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                padding-top: 10px;
                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 14px;
                line-height: 20px;
                color: #000000;
            }
            .m-apy-title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
               
                span {
                   font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;
                }
            }
            .m-apy-amount {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-bottom: 5px;
                span {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 22px;
                    line-height: 31px;
                    color: #000000;
                }
            }

            .p2{
                /* margin: 6px 0 0px; */
                box-sizing: border-box;
                padding-top: 5px;
                padding-bottom: 5px;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 18px;
                    line-height: 25px;
                    color: #000000;

                    color: #000000;
                }
            }


            .icon{
                width: 32px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 32px;
                }
            }
        }
    }
    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .pool-item{
            position: relative;
            width: 294px;
            height: 240px;
            padding: 34px 30px 32px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../assets/tool/fryer_box_bg.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 15.0229px;
                line-height: 21px;

                color: #000000;

            }
            .m-apy-title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-top: 5px;
                padding-bottom: 5px;
                span {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;
                }
            }
            .m-apy-amount {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-bottom: 5px;
                span {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 22px;
                    line-height: 31px;
                    color: #000000;
                }
            }

            .p2{
                margin-top: 14px;
                
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 27.1799px;
                    line-height: 38px;

                    color: #000000;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 42px;
                }
            }
        }
    }
    @media screen and (min-width: 1440px) {
        .pool-item{
            position: relative;
            width: 294px;
            height: 240px;
            padding: 34px 30px 32px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../assets/tool/fryer_box_bg.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 15.0229px;
                line-height: 21px;

                color: #000000;

            }

            .m-apy-title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-top: 5px;
                padding-bottom: 5px;
                span {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;
                }
            }
            .m-apy-amount {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-bottom: 5px;
                span {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 22px;
                    line-height: 31px;
                    color: #000000;
                }
            }

            .p2{
                margin-top: 14px;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 27.1799px;
                    line-height: 38px;

                    color: #000000;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 42px;
                }
            }
        }
    }




</style>
