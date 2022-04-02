<template>
    <div class="oven-item">
        <div class="title">
            <span class="t1">{{data.title}}</span>
        </div>
        <div class="item">
            <div class="t1">{{data.title1}}</div>
            <div>
                <span class="t2">{{data.amount1}}</span>
                <span class="icon">
                  <img :src="require('../../../../assets/icon/'+'FRIES'+'.svg')"/>
                </span>
            </div>
        </div>
        <div class="item">
            <div class="t1">{{data.title2}}</div>
            <div>
                <span class="t2">{{data.amount2}}</span>
                <span class="icon">
          <img :src="require('../../../../assets/icon/'+data.symbol+'.svg')"/>
        </span>
            </div>
        </div>

        <div class="item" style="padding-left: 0;">
            <div class="per-con">
                <a-input
                         v-model="amount"
                         placeholder="0.00"
                         :max-length="25"
                         class="chf-input"
                ></a-input>
            </div>
            <div class="per-con" style="margin-top: 20px;">
                <a-slider v-model="curPer" @change="onChangePer" :tooltipVisible="false"
                          :disabled="Number(data.amount1)<=0">
                </a-slider>
                <span class="tooltip-con" :style="'margin-left:'+curPer+'%'">
                    <span class="tooltip-con-t1">{{curPer}}%</span>
                </span>
            </div>
        </div>
        <!-- v-if="data.title !=='STAKE' " -->
        <div :style="isMobile?'text-align: center;margin-top: 24px;':'text-align: center;margin-top: 40px;'">
            <a-button class="chr-c-btn" @click="execute" :loading="loading" :disabled="data.disabled">{{data.title}}
            </a-button>
        </div>
    </div>
</template>


<script>
    import {resetString, toFixed1, toFixed4, toThousands, trace} from "../../../../utils/tools"
    import {BigNumber} from "bignumber.js"
    import {mapGetters} from "vuex"

    export default {
        components: {},
        props: {
            active: Function,
            data: {
                title: "",
                symbol: "",
                title1: "",
                title2: "",
                amount1: 0,
                amount2: 0,
                loading: false,
                loading1: false,
                disabled: true,
            }
        },
        data() {
            return {
                curTabId: "0",
                amount: "",
                per: "",
                curPer: 0,
                loading: false,
            };
        },
        methods: {
            onChangePer(e) {
                this.curPer = Number(this.curPer.toFixed(2));
                // this.amount = toFixed4(this.data.amount1 * this.curPer * 0.01);
                this.amount = toFixed4(new BigNumber(this.data.amount1).times(this.curPer).times(0.01));

                this.data.disabled = (Number(this.amount) > this.data.amount1);
                if (Number(this.amount) == 0) {
                    this.data.disabled = true;
                }
            },

            execute() {
                this.active(this.amount, (b) => {
                    this.loading = b;
                });
            }


        },
        watch: {
            data() {
                this.loading = this.data.loading;
                trace("data-change", this.data)
            },
            amount(a) {
                clearTimeout(window["ovenitem-amount-t"]);
                let cc = String(a).replace(/[^0-9\.-]+/g, '');
                this.amount = a = cc;

                if(Number(this.amount) > 0){
                    if (Number(this.amount) > 0) {
                        if (this.amount / this.data.amount1 < 0.001) {
                            this.curPer = 0;
                        } else {
                            this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.data.amount1).toNumber());
                            this.curPer = Math.min(this.curPer, 100);
                        }
                    } else {
                        this.curPer = 0;
                    }

                    this.data.disabled = (Number(this.amount) > this.data.amount1);
                    if (Number(this.amount) == 0) {
                        this.data.disabled = true;
                    }
                }

                window["ovenitem-amount-t"] = setTimeout(() => {  //   },850);
                    if (cc != "") this.amount = a = parseFloat(cc);
                    else {
                        this.amount = a = "";
                    }

                    if (Number(this.amount) > 0) {
                        if (this.amount / this.data.amount1 < 0.001) {
                            this.curPer = 0;
                        } else {
                            this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.data.amount1).toNumber());
                            this.curPer = Math.min(this.curPer, 100);
                        }
                    } else {
                        this.curPer = 0;
                    }

                    this.data.disabled = (Number(this.amount) > this.data.amount1);
                    if (Number(this.amount) == 0) {
                        this.data.disabled = true;
                    }
                }, 850);
            },
        },
        computed: {
            ...mapGetters(["isMobile"])
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>

    ::v-deep .ant-radio-button-wrapper {
        padding: 0 8px;
    }


    @media screen and (max-width: 750px) {
        .oven-item {
            position: relative;
            width: 343px;
            height: 446px;
            padding: 24px 33px;
            text-align: left;

            background: url("../../../../assets/oven_box_bg1.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .title {
                text-align: center;

                .t1 {
                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    color: #000000;

                }
            }

            .item {
                margin-top: 12px;
                border-top: 1px solid black;
                /*padding-left: 16px;*/

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 14px;
                    line-height: 20px;
                    color: #000000;

                    margin: 12px 0 8px
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 14px;
                    line-height: 20px;
                    color: #000000;

                }

                .icon {
                    width: 24px;
                    height: 24px;
                    margin-left: 12px;
                    display: inline-block;

                    img {
                        width: 100%;
                    }
                }


                .per-con {
                    position: relative;
                    text-align: center;
                    padding-top: 12px;

                    .chf-input {
                        width: 100%;
                        height: 36px;
                        border: 1px solid;
                        border-radius: 0;
                        padding: 12px 16px;
                        background-color: transparent;

                        font-family: Arial Black;
                        font-style: normal;
                        /*font-weight: 900;*/
                        font-size: 14px;
                        line-height: 20px;
                        color: #000000;
                    }

                    .tooltip-con {
                        pointer-events: none;
                        position: absolute;
                        width: 86px;
                        height: 72px;
                        left: -35px;

                        background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;

                        display: inline-flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        padding: 10px 2px;

                        font-family: Arial Black;
                        font-style: normal;
                        /*font-weight: 900;*/
                        font-size: 12px;
                        line-height: 17px;
                        color: #000000;


                        top: -6px;

                        .tooltip-con-t1 {
                            text-align: center;
                            width: 42px;
                            transform: scale(.8);
                            transform-origin: right;
                        }

                    }

                    .ant-slider {
                        width: 100%;
                        height: 26px;
                        border-radius: 10px;
                        border: 1px solid #000000;
                        padding: 0;


                        ::v-deep .ant-slider-rail {
                            height: 100%;
                            background-color: transparent;
                            border-radius: 10px;
                            /*border: 1px solid #000000;*/

                        }

                        ::v-deep .ant-slider-track {
                            height: 100%;
                            background-color: #FBB33B;
                            border-radius: 10px;
                        }

                        ::v-deep .ant-slider-handle {
                            display: none;
                        }
                    }
                }
            }

        }
    }


    @media screen and (max-width: 1279px) and (min-width: 751px) {
        .oven-item {
            position: relative;
            width: 396px;
            height: 627px;
            padding: 48px;
            margin: 0 10px;
            text-align: left;

            background: url("../../../../assets/oven_box_bg1.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .title {
                text-align: center;

                .t1 {
                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 24px;
                    line-height: 37px;
                    color: #000000;

                }
            }

            .item {
                margin-top: 20px;
                border-top: 1px solid black;
                padding-left: 16px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                    margin: 20px 0 8px
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                }

                .icon {
                    width: 32px;
                    height: 32px;
                    margin-left: 12px;
                    display: inline-block;

                    img {
                        width: 100%;
                    }
                }


                .per-con {
                    position: relative;
                    text-align: center;
                    padding-top: 20px;

                    .chf-input {
                        width: 100%;
                        height: 52px;
                        border: 1px solid;
                        border-radius: 0;
                        padding: 12px 16px;
                        background-color: transparent;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 27px;
                        line-height: 38px;
                        color: #000000;
                    }

                    .tooltip-con {
                        pointer-events: none;
                        position: absolute;
                        width: 86px;
                        height: 72px;
                        left: -35px;

                        background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;

                        display: inline-flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        padding: 10px 2px;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 12px;
                        line-height: 17px;
                        color: #000000;


                        top: -6px;

                        .tooltip-con-t1 {
                            text-align: center;
                            width: 42px;
                            transform: scale(.8);
                            transform-origin: right;
                        }

                    }

                    .ant-slider {
                        width: 100%;
                        height: 26px;
                        border-radius: 10px;
                        border: 1px solid #000000;
                        padding: 0;


                        ::v-deep .ant-slider-rail {
                            height: 100%;
                            background-color: transparent;
                            border-radius: 10px;
                            /*border: 1px solid #000000;*/

                        }

                        ::v-deep .ant-slider-track {
                            height: 100%;
                            background-color: #FBB33B;
                            border-radius: 10px;
                        }

                        ::v-deep .ant-slider-handle {
                            display: none;
                        }
                    }
                }
            }

        }
    }

    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .oven-item {
            position: relative;
            width: 444px;
            height: 627px;
            padding: 48px 56px;
            margin: 0 10px;
            text-align: left;

            background: url("../../../../assets/oven_box_bg1.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .title {
                text-align: center;

                .t1 {
                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 28px;
                    line-height: 43px;
                    color: #000000;
                }
            }

            .item {
                margin-top: 20px;
                border-top: 1px solid black;
                padding-left: 16px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                    margin: 20px 0 8px
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                }

                .icon {
                    width: 32px;
                    height: 32px;
                    margin-left: 12px;
                    display: inline-block;

                    img {
                        width: 100%;
                    }
                }


                .per-con {
                    position: relative;
                    text-align: center;
                    padding-top: 20px;

                    .chf-input {
                        width: 100%;
                        height: 52px;
                        border: 1px solid;
                        border-radius: 0;
                        padding: 12px 16px;
                        background-color: transparent;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 27px;
                        line-height: 38px;
                        color: #000000;
                    }

                    .tooltip-con {
                        pointer-events: none;
                        position: absolute;
                        width: 86px;
                        height: 72px;
                        left: -35px;

                        background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;

                        display: inline-flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        padding: 10px 2px;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 12px;
                        line-height: 17px;
                        color: #000000;


                        top: -6px;

                        .tooltip-con-t1 {
                            text-align: center;
                            width: 42px;
                            transform: scale(.8);
                            transform-origin: right;
                        }

                    }

                    .ant-slider {
                        width: 100%;
                        height: 26px;
                        border-radius: 10px;
                        border: 1px solid #000000;
                        padding: 0;


                        ::v-deep .ant-slider-rail {
                            height: 100%;
                            background-color: transparent;
                            border-radius: 10px;
                            /*border: 1px solid #000000;*/

                        }

                        ::v-deep .ant-slider-track {
                            height: 100%;
                            background-color: #FBB33B;
                            border-radius: 10px;
                        }

                        ::v-deep .ant-slider-handle {
                            display: none;
                        }
                    }
                }
            }

        }
    }

    @media screen and (min-width: 1440px) {
        .oven-item {
            position: relative;
            width: 444px;
            height: 627px;
            padding: 48px 56px;
            margin: 0 10px;
            text-align: left;

            background: url("../../../../assets/oven_box_bg1.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .title {
                text-align: center;

                .t1 {
                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 28px;
                    line-height: 43px;
                    color: #000000;
                }
            }

            .item {
                margin-top: 20px;
                border-top: 1px solid black;
                padding-left: 16px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                    margin: 20px 0 8px
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;

                }

                .icon {
                    width: 32px;
                    height: 32px;
                    margin-left: 12px;
                    display: inline-block;

                    img {
                        width: 100%;
                    }
                }


                .per-con {
                    position: relative;
                    text-align: center;
                    padding-top: 20px;

                    .chf-input {
                        width: 100%;
                        height: 52px;
                        border: 1px solid;
                        border-radius: 0;
                        padding: 12px 16px;
                        background-color: transparent;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 27px;
                        line-height: 38px;
                        color: #000000;
                    }

                    .tooltip-con {
                        pointer-events: none;
                        position: absolute;
                        width: 86px;
                        height: 72px;
                        left: -35px;

                        background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;

                        display: inline-flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        padding: 10px 2px;

                        font-family: Arial Black;
                        font-style: normal;
                        font-weight: 900;
                        font-size: 12px;
                        line-height: 17px;
                        color: #000000;


                        top: -6px;

                        .tooltip-con-t1 {
                            text-align: center;
                            width: 42px;
                            transform: scale(.8);
                            transform-origin: right;
                        }

                    }

                    .ant-slider {
                        width: 100%;
                        height: 26px;
                        border-radius: 10px;
                        border: 1px solid #000000;
                        padding: 0;


                        ::v-deep .ant-slider-rail {
                            height: 100%;
                            background-color: transparent;
                            border-radius: 10px;
                            /*border: 1px solid #000000;*/

                        }

                        ::v-deep .ant-slider-track {
                            height: 100%;
                            background-color: #FBB33B;
                            border-radius: 10px;
                        }

                        ::v-deep .ant-slider-handle {
                            display: none;
                        }
                    }
                }
            }

        }
    }


</style>
