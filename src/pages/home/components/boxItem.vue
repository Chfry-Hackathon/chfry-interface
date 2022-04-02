<template>
    <div class="pool-item">
        <div class="p1">{{token.symbol}}</div>
        <div class="p2">
            <a-tooltip class="t1">
                <template slot="title">
                    {{toThousands(token.amount)}}
                </template>
                {{resetString(token.amount)}}
            </a-tooltip>
            <span class="icon">
                <img :src="require('../../../assets/icon/'+token.icon)" />
            </span>
        </div>
        <div class="p3">
            <a-button v-if="isMobile" style="min-width: 102px;height: 30px;border: 1px solid #000000;" class="chr-c-btn" @click="buy" :disabled="global.isClose">BUY</a-button>
            <a-button v-else class="chr-c-btn" @click="buy" :disabled="global.isClose">BUY</a-button>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from "vuex"
    import global from "../../../common/Global"
    // import {resetString,toThousands} from "../../../../utils/tools";
    import {resetString,toThousands} from "../../../utils/tools";

    export default {
        components: {},
        props: {
            token:{
                global:global,
                symbol:"",
                address:"",
                amount:Number,
                icon:"",
            },
            toBuy:Function,
        },
        data() {
            return {
                global:global,
                toThousands:toThousands,
                resetString:resetString,

            };
        },
        methods: {
            buy(){
                if(this.toBuy) this.toBuy(this.token);
            },

        },
        watch: {

        },
        computed: {
            ...mapGetters(["isMobile"])
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>
    @media screen and (max-width: 750px) {
        .pool-item{
            position: relative;
            width: 185px;
            height: 120px;
            padding: 15px 10px 16px 20px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../../../assets/tool/fryer_box_bg2m.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                color: #1D1D1B;

            }

            .p2{
                margin: 8px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 22px;

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
            height: 163px;
            padding: 16px 30px 26px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 16.4537px;
                line-height: 25px;
                color: #1D1D1B;

            }

            .p2{
                margin: 8px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
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
    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .pool-item{
            position: relative;
            width: 294px;
            height: 191px;
            padding: 16px 30px 26px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 16.4537px;
                line-height: 25px;
                color: #1D1D1B;

            }

            .p2{
                margin: 8px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
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

    @media screen and (min-width: 1440px) and (max-width: 1920px) {
        .pool-item{
            position: relative;
            width: 294px;
            height: 191px;
            padding: 16px 30px 26px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 16.4537px;
                line-height: 25px;
                color: #1D1D1B;

            }

            .p2{
                margin: 8px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
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
    @media screen and (min-width: 1930px) {
        .pool-item{
            position: relative;
            width: 294px;
            height: 240px;
            padding: 34px 30px 32px 40px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background-image: url("../../../assets/tool/fryer_box_bg2.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .p1{
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;

                color: #1D1D1B;

                color: #000000;

            }

            .p2{
                margin: 24px 0;
                margin: 24px 0;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;

                .t1{
                    margin-right: 12px;
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 27.1799px;
                    line-height: 38px;

                    color: #000000;
                }
            }

            .icon{
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 60px;
                }
            }
        }
    }




</style>
