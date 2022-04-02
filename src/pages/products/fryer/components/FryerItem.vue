<template>
    <div class="item-fryer" :style="itemData.title=='Repay'?(isMobile?'height:656px;':'height:1020px;'):''">
        <div class="item-fryer-title">{{itemData.title}}</div>
        <div class="m-box-con" :style="itemData.title=='Repay'?'':'flex-direction: row;'">
            <div v-if="0" class="m-box">
                <div class="t1">{{itemData.itemData.title1}}</div>
                <div class="p2">

                    <span class="t2" v-if="!itemData.itemData.amount1.length">
                        <template v-if="String(itemData.itemData.amount1).length>6">
                           <a-tooltip>
                              <template slot="title">
                                {{toThousands(itemData.itemData.amount1)}}
                              </template>
                              {{resetString(itemData.itemData.amount1)}}
                            </a-tooltip>
                        </template>
                        <template v-else>{{toThousands(itemData.itemData.amount1)}}</template>
                      </span>
                    <span class="t2" v-else>
                        <span>
                           <template v-if="String(itemData.itemData.amount1[0]).length>6">
                             <a-tooltip>
                                <template slot="title">
                                  {{toThousands(itemData.itemData.amount1[0])}}
                                </template>
                                {{resetString(itemData.itemData.amount1[0])}}
                              </a-tooltip>
                            </template>
                            <template v-else>{{toThousands(itemData.itemData.amount1[0])}}</template>
                        </span>
                        ,
                        <span>
                           <template v-if="String(itemData.itemData.amount1[1]).length>10">
                             <a-tooltip>
                                <template slot="title">
                                  {{toThousands(itemData.itemData.amount1[1])}}
                                </template>
                                {{resetString(itemData.itemData.amount1[1])}}
                              </a-tooltip>
                            </template>
                          <template v-else>{{toThousands(itemData.itemData.amount1[1])}}</template>
                        </span>
                    </span>
                    <span class="icon" v-if="!itemData.itemData.amount1.length">
                        <img :src="require('../../../../assets/icon/'+itemData.itemData.symbol1+'.svg')"/>
                    </span>
                    <span class="icon" v-else>
                        <img :src="require('../../../../assets/icon/'+itemData.itemData.symbol1+'.svg')"/>
                        <img :src="require('../../../../assets/icon/'+'FRIES'+'.svg')"/>
                    </span>
                </div>
            </div>


            <template v-if="!itemData.itemData.amount1.length">
                <div class="m-box">
                    <div class="t1">{{itemData.itemData.title1}}</div>

                    <div class="p2">
                        <!--<span class="t2">{{itemData.itemData.amount1}}</span>-->
                        <a-tooltip class="t2">
                            <template slot="title">
                                {{toThousands(itemData.itemData.amount1)}}
                            </template>
                            {{resetString(itemData.itemData.amount1,2)}}
                        </a-tooltip>
                        <span class="icon">
                        <img :src="require('../../../../assets/icon/'+itemData.itemData.symbol1+'.svg')"/>
                    </span>
                    </div>
                </div>
            </template>
            <div v-else style="display: flex;">
                <div class="m-box">
                    <div class="t1">{{itemData.itemData.title1[0]}}</div>
                    <div class="p2">
                        <!--<span class="t2">{{itemData.itemData.amount1[0]}}</span>-->
                        <a-tooltip class="t2">
                            <template slot="title">
                                {{toThousands(itemData.itemData.amount1[0])}}
                            </template>
                            {{resetString(itemData.itemData.amount1[0],2)}}
                        </a-tooltip>
                        <span class="icon">
                        <img :src="require('../../../../assets/icon/'+itemData.itemData.symbol1+'.svg')"/>
                    </span>
                    </div>
                </div>

                <div class="m-box">
                    <div class="t1">{{itemData.itemData.title1[1]}}</div>
                    <div class="p2">
                        <!--<span class="t2">{{itemData.itemData.amount1[1]}}</span>-->
                        <a-tooltip class="t2">
                            <template slot="title">
                                {{toThousands(itemData.itemData.amount1[1])}}
                            </template>
                            {{resetString(itemData.itemData.amount1[1],2)}}
                        </a-tooltip>
                        <span class="icon">
                        <img :src="require('../../../../assets/icon/'+'FRIES'+'.svg')"/>
                    </span>
                    </div>
                </div>
            </div>
            <div style="display: flex;">

                <div class="m-box" v-if="itemData.itemData.title2.length>0">
                    <div class="t1">{{itemData.itemData.title2}}</div>
                    <div class="p2">
                        <!--<span class="t2">{{itemData.itemData.amount2}}</span>-->
                        <a-tooltip class="t2">
                            <template slot="title">
                                {{toThousands(itemData.itemData.amount2)}}
                            </template>
                            {{resetString(itemData.itemData.amount2,2)}}
                        </a-tooltip>
                        <span class="icon">
                            <img :src="require('../../../../assets/icon/'+itemData.itemData.symbol2+'.svg')"/>
                        </span>
                    </div>
                </div>
                <div class="m-box" v-if="itemData.itemData.title3">
                    <div class="t1">{{itemData.itemData.title3}}</div>
                    <div class="p2">
                        <span class="t2">{{itemData.itemData.amount3}}</span>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="item-fryer-input-con">
            <div class="per-con">
                <a-input
                        v-model="amount"
                        :placeholder="itemData.title=='Repay'? itemData.itemData.symbol1:'0.00'"
                        :max-length="25"
                        class="chf-input"
                ></a-input>
            </div>
            <div class="per-con" style="margin-top: 30px;">

                <a-slider v-model="curPer" @change="onChangePer" :tooltipVisible="false"
                          :disabled="itemData.itemData.title1.length==2?(itemData.itemData.amount2<=0):(itemData.itemData.amount1<=0)">

                </a-slider>
                <span class="tooltip-con" :style="'margin-left:'+curPer+'%'">
                    <span class="tooltip-con-t1">{{curPer}}%</span>
                </span>
            </div>
            <template v-if="itemData.title=='Repay'">
                <div class="per-con">
                    <a-input
                            v-model="amountfries"
                            placeholder="fUSD"
                            :max-length="25"
                            class="chf-input"
                    ></a-input>
                </div>
                <div class="per-con" style="margin-top: 30px;">
                    <a-slider v-model="curPer2" @change="onChangePer2" :tooltipVisible="false"
                              :disabled="itemData.itemData.amount2<=0">
                    </a-slider>
                    <span class="tooltip-con" :style="'margin-left:'+curPer2+'%'">
                    <span class="tooltip-con-t1">{{curPer2}}%</span>
                </span>
                </div>
            </template>

        </div>
        <div class="btn-con">
            <template v-if="itemData.itemData.title1.length==2">
                <a-button class="che-btn chr-btn chr-btn22" :disabled="isAed" block :loading="itemData.loading"
                          @click="tapBtn(itemData.title)">{{(Number(amount) > Number(pool.allowance )||Number(amountfries) > Number(pool.allowance2))?'APPROVE':itemData.title}}
                </a-button>

            </template>
            <template v-else>
                <a-button class="che-btn chr-btn chr-btn22" :disabled="isDeposit" block
                          :loading="itemData.loading"
                          @click="tapBtn(itemData.title)">

                          {{
                              itemData.title == 'Borrow' ? itemData.title :
                              (pool.allowance == 0?'APPROVE':itemData.title)
                          }}
                </a-button>
            </template>
        </div>
    </div>
</template>


<script>
    import {resetString, toFixed1, toFixed4, toThousands, trace} from "../../../../utils/tools"
    import BigNumber from "bignumber.js";
    import {mapGetters} from "vuex"

    export default {
        components: {},
        props: {
            pool: {},
            itemData: {},
            execute: Function,
            currentSymbolAmount:0,
        },
        data() {
            return {
                toThousands: toThousands,
                resetString: resetString,
                amount: "",
                amountfries: "",
                curPer: 0,
                curPer2: 0,
                isAed: true,
                isDeposit: true,
            };
        },
        methods: {
            changeAed() {
                let add = new BigNumber(this.amount || 0).plus(this.amountfries || 0).toNumber();
                if (add <= 0 || add > this.itemData.itemData.amount2) {
                    this.isAed = true;
                } else {
                    this.isAed = false;
                }
                // trace("add=", add, this.amount, this.amountfries, this.itemData.itemData.amount2, this.isAed);
            },
            CheckImgExists(imgurl) {
                var ImgObj = new Image(); //判断图片是否存在
                ImgObj.src = imgurl;
                // console.log(ImgObj.fileSize);//打印出来是undefined
                //没有图片，则返回-1
                if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
                    return true;
                } else {
                    return false;
                }
            },
            require1(path) {
                // trace("path-Has=",this.CheckImgExists(path),path);
                return new Promise(async resolve => {
                    let res = await require(path.replace("svg", "png")).then((aa) => {
                        trace("aa=", aa, res)
                        resolve(aa);
                    })
                        .catch(async err => {
                            trace("err", err)
                            let res1 = await require(path.replace("svg", "png")).then((bb) => {
                                resolve(bb);
                            })
                        })
                    trace("res1=", res)
                })

            },
            onChangePer(e) {
                // console.log("curper=", this.curPer, this.curPer.toFixed(2), this.itemData.itemData)
                if (this.itemData.itemData.title1.length == 2 || this.itemData.itemData.btn === "Liquidate") {     //Repay
                    this.curPer = Number(this.curPer.toFixed(2));
                    this.amount = toFixed4(new BigNumber(this.itemData.itemData.amount2).times(this.curPer).times(0.01));
                } else {
                    this.curPer = Number(this.curPer.toFixed(2));
                    this.amount = toFixed4(new BigNumber(this.itemData.itemData.amount1).times(this.curPer).times(0.01));
                }
                this.changeAed();

            },
            onChangePer2(e) {
                this.curPer2 = Number(this.curPer2.toFixed(2));
                // this.amountfries = toFixed4(this.itemData.itemData.amount2 * this.curPer2 * 0.01);

                this.amountfries = toFixed4(new BigNumber(this.itemData.itemData.amount2).times(this.curPer2).times(0.01));
                this.changeAed();
            },
            tapBtn() {
                this.execute(this.itemData.title, {
                    amount: this.amount,
                    amountfries: this.amountfries
                }, this.itemData, () => {
                    this.amount = 0;
                    this.amountfries = 0;
                });

                trace("tapBtn--", this.itemData)
            }
        },
        created() {
        },
        watch: {

            amount(a) {
                clearTimeout(window["fryeritem-amount-t"]);
                let cc = String(a).replace(/[^0-9\.-]+/g, '');
                this.amount = a = cc;

                if(Number(this.amount)>0){
                    if (this.itemData.itemData.title1.length == 2 || this.itemData.itemData.btn === "Liquidate") {     //Repay
                        if (Number(a) == 0 || this.itemData.itemData.amount2 == 0) {
                            this.curPer = 0;
                        } else {
                            // this.curPer = 100 * this.amount / this.itemData.itemData.amount2;
                            // this.curPer = Number(this.curPer.toFixed(2));
                            if (this.amount / this.itemData.itemData.amount2 < 0.001) {
                                this.curPer = 0;
                            } else {
                                this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.itemData.itemData.amount2).toNumber());
                                this.curPer = Math.min(this.curPer, 100);
                            }

                        }
                    } else {
                        if (Number(a) == 0 || this.itemData.itemData.amount1 == 0) {
                            this.curPer = 0;
                        } else {
                            if (this.amount / this.itemData.itemData.amount1 < 0.001) {
                                this.curPer = 0;
                            } else {
                                this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.itemData.itemData.amount1).toNumber());
                                this.curPer = Math.min(this.curPer, 100);
                            }
                        }
                    }
                    this.changeAed();
                }
                if(Number(this.amount) <= 0 || Number(this.amount) > Number(this.itemData.itemData.amount1)) {
                    this.isDeposit = true;
                }else {
                    this.isDeposit = false;
                }
                window["fryeritem-amount-t"] = setTimeout(() => {       // }, 850);
                    if (cc != "") this.amount = a = parseFloat(cc);
                    else {
                        this.amount = a = "";
                    }
                    if (this.itemData.itemData.title1.length == 2 || this.itemData.itemData.btn === "Liquidate") {     //Repay
                        if (Number(a) == 0 || this.itemData.itemData.amount2 == 0) {
                            this.curPer = 0;
                        } else {
                            // this.curPer = 100 * this.amount / this.itemData.itemData.amount2;
                            // this.curPer = Number(this.curPer.toFixed(2));
                            if (this.amount / this.itemData.itemData.amount2 < 0.001) {
                                this.curPer = 0;
                            } else {
                                this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.itemData.itemData.amount2).toNumber());
                                this.curPer = Math.min(this.curPer, 100);
                            }

                        }
                    } else {
                        if (Number(a) == 0 || this.itemData.itemData.amount1 == 0) {
                            this.curPer = 0;
                        } else {
                            if (this.amount / this.itemData.itemData.amount1 < 0.001) {
                                this.curPer = 0;
                            } else {
                                this.curPer = toFixed1(new BigNumber(this.amount).times(100).div(this.itemData.itemData.amount1).toNumber());
                                this.curPer = Math.min(this.curPer, 100);
                            }
                        }
                    }
                    this.changeAed();
                }, 850);
            },
            amountfries(a) {

                clearTimeout(window["fryeritem-amountfries-t"]);
                let cc = String(a).replace(/[^0-9\.-]+/g, '');
                this.amountfries = a = cc;

                if(Number(this.amountfries)>0){
                    if (a == 0 || this.itemData.itemData.amount2 == 0) {
                        this.curPer2 = 0;
                    } else {
                        if (this.amountfries / this.itemData.itemData.amount2 < 0.001) {
                            this.curPer2 = 0;
                        } else {
                            this.curPer2 = toFixed1(new BigNumber(this.amountfries).times(100).div(this.itemData.itemData.amount2).toNumber());
                            // this.curPer2 = 100 * this.amountfries / this.itemData.itemData.amount2;
                            // this.curPer2 = Number(this.curPer2.toFixed(2));
                            this.curPer2 = Math.min(this.curPer2, 100);
                        }
                    }
                    this.changeAed();
                }

                window["fryeritem-amountfries-t"] = setTimeout(() => {
                    if (cc != "") this.amountfries = a = parseFloat(cc);
                    else {
                        this.amountfries = a = "";
                    }

                    if (a == 0 || this.itemData.itemData.amount2 == 0) {
                        this.curPer2 = 0;
                    } else {
                        if (this.amountfries / this.itemData.itemData.amount2 < 0.001) {
                            this.curPer2 = 0;
                        } else {
                            this.curPer2 = toFixed1(new BigNumber(this.amountfries).times(100).div(this.itemData.itemData.amount2).toNumber());
                            // this.curPer2 = 100 * this.amountfries / this.itemData.itemData.amount2;
                            // this.curPer2 = Number(this.curPer2.toFixed(2));
                            this.curPer2 = Math.min(this.curPer2, 100);
                        }
                    }
                    this.changeAed();
                }, 850);
            },

        },
        computed: {
            ...mapGetters(["isMobile"]),
            symbolAmount(){
                return this.currentSymbolAmount;
            }
        },

        mounted() {
            trace("itemData+pool =", this.itemData, this.pool)

        },
    };
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 750px) {
        .item-fryer {
            position: relative;
            width: 343px;
            height: 441px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2px auto 20px;
            padding: 32px;

            background: url("../../../../assets/fryer/fryer_frame_bgm.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .item-fryer-title {
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                color: #000000;

                margin-bottom: 16px;
            }

            .item-fryer-input-con {
                width: 100%;
                margin-bottom: 20px;
                border-top: 1px solid #000000;
                border-bottom: 1px solid #000000;
                /*padding: 60px 0 46px;*/
            }


            .chf-input {
                width: 100%;
                height: 36px;
                border: 1px solid;
                padding: 12px 16px;
                background-color: transparent;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;

                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 14px;
                line-height: 20px;
                color: #000000;
            }

            .btn-con {
                width: 100%;


                .che-btn {
                    width: 169px;
                    height: 83px;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;
                    color: #000000;

                    display: flex;
                    margin: 2px auto;
                    justify-content: center;
                    padding-top: 6px;

                }

                .che-btn:active {
                    padding-top: 12px;
                }
            }

            .m-box-con {
                position: relative;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }

            .m-box {
                width: 133px;
                height: 60px;
                background: url("../../../../assets/fryer/fryer_box_bg.svg") no-repeat;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                padding: 8px 2px 13px 7px;
                margin: 12px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 8px;
                    line-height: 11px;
                    color: #000000;
                    text-align: center;
                }

                .p2 {
                    display: flex;
                    align-items: center;
                    margin-top: 4px;
                    justify-content: center;
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 12px;
                    line-height: 17px;

                    color: #000000;
                }

                .icon {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    margin-left: 10px;

                    img {
                        width: 100%;
                    }
                }
            }

            .per-con {
                position: relative;
                text-align: center;
                margin: 16px auto 20px;
                /*width: calc(100% - 174px);*/

                .tooltip-con {
                    pointer-events: none;
                    position: absolute;
                    width: 76px;
                    height: 64px;
                    left: -12px;

                    background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;

                    display: inline-flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    padding: 6px 4px;

                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 23px;
                    color: #000000;


                    top: -30px;

                    .tooltip-con-t1 {
                        text-align: center;
                        width: 36px;
                        transform: scale(.8);
                        transform-origin: right;

                    }

                }

                .ant-slider {
                    width: 100%;
                    height: 24px;
                    border-radius: 10px;
                    border: 1px solid #000000;
                    padding: 0;
                    margin: 46px 0 10px;


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

    @media screen and (max-width: 1279px) and (min-width: 751px) {
        .item-fryer {
            position: relative;
            width: 614px;
            height: 697px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2px auto 100px;
            padding: 52px 50px;

            background: url("../../../../assets/fryer/fryer_frame_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .item-fryer-title {
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 28px;
                line-height: 43px;
                color: #000000;

                margin-bottom: 46px;
            }

            .item-fryer-input-con {
                width: 100%;
                margin-bottom: 32px;
                border-top: 1px solid #000000;
                border-bottom: 1px solid #000000;
                /*padding: 60px 0 46px;*/
            }


            .chf-input {
                width: 100%;
                height: 52px;
                border: 1px solid;
                padding: 12px 32px;
                background-color: transparent;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;

                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 20px;
                line-height: 28px;
                color: #000000;
            }

            .btn-con {
                width: 100%;


                .che-btn {
                    width: 251px;
                    height: 124px;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 30px;
                    color: #000000;

                    display: flex;
                    margin: 2px auto;
                    justify-content: center;
                    padding-top: 10px;

                }

                .che-btn:active {
                    padding-top: 20px;
                }
            }

            .m-box-con {
                position: relative;
                display: flex;
                justify-content: center;
                margin-bottom: 24px;
                flex-direction: column;
                align-items: center;
            }

            .m-box {
                width: 247px;
                height: 112px;
                background: url("../../../../assets/fryer/fryer_box_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                padding: 23px 5px 33px 15px;
                margin: 12px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 20px;
                    color: #000000;
                    text-align: center;
                }

                .p2 {
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    justify-content: center;
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 20px;
                    line-height: 28px;

                    color: #000000;
                }

                .icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    margin-left: 10px;

                    img {
                        width: 100%;
                    }
                }
            }

            .per-con {
                position: relative;
                text-align: center;
                margin: 24px auto 32px;
                /*width: calc(100% - 174px);*/

                .tooltip-con {
                    pointer-events: none;
                    position: absolute;
                    width: 76px;
                    height: 64px;
                    left: -12px;

                    background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;

                    display: inline-flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    padding: 6px 4px;

                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 23px;
                    color: #000000;


                    top: -30px;

                    .tooltip-con-t1 {
                        text-align: center;
                        width: 36px;
                        transform: scale(.8);
                        transform-origin: right;

                    }

                }

                .ant-slider {
                    width: 100%;
                    height: 24px;
                    border-radius: 10px;
                    border: 1px solid #000000;
                    padding: 0;
                    margin: 46px 0 10px;


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

    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .item-fryer {
            position: relative;
            width: 668px;
            height: 728px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2px auto 100px;
            padding: 52px;

            background: url("../../../../assets/fryer/fryer_frame_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .item-fryer-title {
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 28px;
                line-height: 43px;
                color: #000000;

                margin-bottom: 46px;
            }

            .item-fryer-input-con {
                width: 100%;
                margin-bottom: 32px;
                border-top: 1px solid #000000;
                border-bottom: 1px solid #000000;
                /*padding: 60px 0 46px;*/
            }


            .chf-input {
                width: 100%;
                height: 52px;
                border: 1px solid;
                padding: 12px 32px;
                background-color: transparent;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;

                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 20px;
                line-height: 28px;
                color: #000000;
            }

            .btn-con {
                width: 100%;


                .che-btn {
                    width: 291px;
                    height: 143px;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 30px;
                    color: #000000;

                    display: flex;
                    margin: 2px auto;
                    justify-content: center;
                    padding-top: 12px;

                }
                .che-btn:active {
                    padding-top: 20px;
                }
            }

            .m-box-con {
                position: relative;
                display: flex;
                justify-content: center;
                margin-bottom: 24px;
                flex-direction: column;
                align-items: center;
            }

            .m-box {
                width: 274px;
                height: 124px;
                background: url("../../../../assets/fryer/fryer_box_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                padding: 23px 20px 33px 30px;
                margin: 12px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;
                    text-align: center;
                }

                .p2 {
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    justify-content: center;
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 24px;
                    line-height: 34px;
                    color: #000000;
                }

                .icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    margin-left: 10px;

                    img {
                        width: 100%;
                    }
                }
            }

            .per-con {
                position: relative;
                text-align: center;
                margin: 24px auto 32px;
                /*width: calc(100% - 174px);*/

                .tooltip-con {
                    pointer-events: none;
                    position: absolute;
                    width: 76px;
                    height: 64px;
                    left: -12px;

                    background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;

                    display: inline-flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    padding: 6px 4px;

                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 23px;
                    color: #000000;


                    top: -30px;

                    .tooltip-con-t1 {
                        text-align: center;
                        width: 36px;
                        transform: scale(.8);
                        transform-origin: right;

                    }

                }

                .ant-slider {
                    width: 100%;
                    height: 24px;
                    border-radius: 10px;
                    border: 1px solid #000000;
                    padding: 0;
                    margin: 46px 0 10px;


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

    @media screen and (min-width: 1440px) {
        .item-fryer {
            position: relative;
            width: 668px;
            height: 728px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2px auto 100px;
            padding: 52px;

            background: url("../../../../assets/fryer/fryer_frame_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            .item-fryer-title {
                font-family: Bugaki;
                font-style: normal;
                font-weight: normal;
                font-size: 28px;
                line-height: 43px;
                color: #000000;

                margin-bottom: 46px;
            }

            .item-fryer-input-con {
                width: 100%;
                margin-bottom: 32px;
                border-top: 1px solid #000000;
                border-bottom: 1px solid #000000;
                /*padding: 60px 0 46px;*/
            }


            .chf-input {
                width: 100%;
                height: 52px;
                border: 1px solid;
                padding: 12px 32px;
                background-color: transparent;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;

                font-family: Arial Black;
                font-style: normal;
                font-weight: 900;
                font-size: 20px;
                line-height: 28px;
                color: #000000;
            }

            .btn-con {
                width: 100%;


                .che-btn {
                    width: 291px;
                    height: 143px;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 30px;
                    color: #000000;

                    display: flex;
                    margin: 2px auto;
                    justify-content: center;
                    padding-top: 12px;

                }
                .che-btn:active {
                    padding-top: 20px;
                }
            }

            .m-box-con {
                position: relative;
                display: flex;
                justify-content: center;
                margin-bottom: 24px;
                flex-direction: column;
                align-items: center;
            }

            .m-box {
                width: 274px;
                height: 124px;
                background: url("../../../../assets/fryer/fryer_box_bg.svg#svgView(preserveAspectRatio(none))") no-repeat;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                padding: 23px 20px 33px 30px;
                margin: 12px;

                .t1 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 16px;
                    line-height: 23px;
                    color: #000000;
                    text-align: center;
                }

                .p2 {
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    justify-content: center;
                }

                .t2 {
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 24px;
                    line-height: 34px;
                    color: #000000;
                }

                .icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    margin-left: 10px;

                    img {
                        width: 100%;
                    }
                }
            }

            .per-con {
                position: relative;
                text-align: center;
                margin: 24px auto 32px;
                /*width: calc(100% - 174px);*/

                .tooltip-con {
                    pointer-events: none;
                    position: absolute;
                    width: 76px;
                    height: 64px;
                    left: -12px;

                    background: url("../../../../assets/tool/icon_tool_tip.svg") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;

                    display: inline-flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    padding: 6px 4px;

                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 23px;
                    color: #000000;


                    top: -30px;

                    .tooltip-con-t1 {
                        text-align: center;
                        width: 36px;
                        transform: scale(.8);
                        transform-origin: right;
                    }

                }

                .ant-slider {
                    width: 100%;
                    height: 24px;
                    border-radius: 10px;
                    border: 1px solid #000000;
                    padding: 0;
                    margin: 46px 0 10px;


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

    ::v-deep .ant-radio-button-wrapper:not(:first-child)::before {
        background-color: transparent;
    }

    ::v-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
        background-color: transparent !important;
    }

    ::v-deep .ant-radio-button-wrapper {
        border: 0 !important;
        width: 20%;
    }

    ::v-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        color: white;
        background: #F499AD;
        border-color: #F499AD;
        -webkit-box-shadow: -1px 0 0 0 #F499AD;
        box-shadow: -1px 0 0 0 #F499AD;
        -webkit-border-radius: 35px;
        -moz-border-radius: 35px;
        border-radius: 35px;
    }


</style>
