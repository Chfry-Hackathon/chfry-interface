<template>
    <div class="cheese-item" ref="cheese_item">
        <div class="item-con">
            <div class="p1">
                <!--<img class="img1" v-if="pool.symbol2" :src="require('../../../../assets/icon/'+pool.symbol2+'.svg')" />-->
                <img class="img2" :src="require('../../../../assets/cheese/'+pool.symbol1)" />
            </div>
            <!--<div class="p2" style="margin-top: 28px;">{{pool.symbols}}</div>-->
        </div>
        <div>
            <div class="item-con">
                <div class="p2">STAKING APR</div>
                <div class="p22" style="margin-top: 12px;">{{pool.apr||"--"}}%</div>
                 <div class="p2 bor" style="margin-top: 12px; cursor: pointer;" @click="handleTo()">
                    TVL：{{ toFixed0(pool.tvl)}}
                </div>
                <div class="p2 bor" style="margin-top: 12px; cursor: pointer;" @click="handleTo()">
                    <div class="text">{{pool.text}}</div>
                </div>
                <!--<div class="p22" style="margin-top: 12px;">&#45;&#45;</div>-->
            </div>
            <div class="item-con item-con33" >
                <a-button @click="select" class="chr-c-btn">SELECT</a-button>
            </div>
        </div>

    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import { toFixed0 } from "../../../../utils/tools"
    export default {
        components: {},
        props: {
            onSelect:Function,
            pool:{
                symbols:"",
                symbol1:"",
                symbol2:"",
                apr:"",
            }
        },
        data() {
            return {
                toFixed0: toFixed0
            };
        },
        methods: {
            select(){
                if(this.onSelect) this.onSelect(this.pool);
            },
            handleTo(){
                window.open(this.pool.url)
            },
            setBg() {
                if(this.isMimCoin) {
                    this.$nextTick(()=>{
                        this.$refs.cheese_item.style.backgroundImage = `url('${require("../../../../assets/cheese/bg_h5.svg")}')`;
                    })
                }
            },
        },
        watch: {

        },
        computed: {
            ...mapGetters(["account","isLogin"]),
            isMimCoin() {
                return this.pool.symbol1 === "MIM_T.png";
            },
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>



    .cheese-item:last-child
    {
        margin-right: 0 !important;
    }


    @media screen and (max-width: 750px)
    {

        .chr-c-btn{
            min-width: 102px !important;
            height: 31px;
            border: 1px solid #000000 ;

            font-family: Bugaki;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 15px;
            color: #000000;
        }
        .cheese-item {
            position: relative;
            width: 160px;
            height: 389px;
            padding: 46px 5px 86px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: url("../../../../assets/cheese_item_box_bg.svg") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            float: left;
            margin-right: 40px;

            .item-con33{
                margin-top: 3px;
            }

            .item-con{
                text-align: center;

                .p1{

                    img{
                        max-height: 110px;
                    }
                    .img1{
                        margin-left: -16px;
                        float: right;
                    }

                    .img2{
                    }
                }

                .p2{

                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 20px;
                    color: #000000;
                     &.bor {

                         display: flex;
                         justify-content: space-around;
                        /* padding-bottom: 2px;
                        border-bottom: 1px dashed #171717; */
                        .text {
                            width: 115px;
                            padding-bottom: 2px;
                            border-bottom: 1px dashed #171717;
                        }
                    }
                }
                .p22{
                    font-family: Arial Black;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 24px;
                    line-height: 34px;
                    /* identical to box height */

                    text-align: center;

                    color: #000000;
                }

                button{
                    background-color: transparent;
                    min-width: 102px !important;
                    height: 31px;
                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;

                    color: #000000;

                    border-radius: 0;
                }

                button:hover,button:focus{
                    background-color: black;
                    color: #fbb33b;
                }
            }

        }
    }

    @media screen and (max-width: 1279px) and (min-width: 751px) {
        .cheese-item {
            position: relative;
            width: 208px;
            height: 512px;
            padding: 46px 10px 93px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: url("../../../../assets/cheese_item_box_bg.svg") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            float: left;
            margin-right: 40px;

            .item-con33{
                margin-top: 19px;
            }

            .item-con{
                text-align: center;

                .p1{

                    img{
                        max-height: 158px;
                    }
                    .img1{
                        margin-left: -16px;
                        float: right;
                    }

                    .img2{
                    }
                }

                .p2{

                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 15.0229px;
                    line-height: 21px;
                    color: #000000;
                    &.bor {
                        display: flex;
                        justify-content: space-around;
                        /* width: 115px; */
                        /* padding-bottom: 2px;
                        border-bottom: 1px dashed #171717; */
                        .text {
                            width: 115px;
                            padding-bottom: 2px;
                            border-bottom: 1px dashed #171717;
                        }
                    }
                }
                .p22{
                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 32px;
                    line-height: 45px;
                    text-align: center;

                    color: #000000;
                }

                button{
                    width: 139px;
                    height: 45px;
                    background-color: transparent;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;

                    color: #000000;

                    border: 2px solid #000000;
                    border-radius: 0;
                }

                button:hover,button:focus{
                    background-color: black;
                    color: #fbb33b;
                }
            }

        }
    }
    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .cheese-item {
            position: relative;
            width: 248px;
            height: 609px;
            padding: 88px 10px 128px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: url("../../../../assets/cheese_item_box_bg.svg") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            float: left;
            margin-right: 40px;

            .item-con33{
                margin-top: 22px;
            }

            .item-con{
                text-align: center;

                .p1{

                    img{
                        /*height: 80px;*/
                    }
                    .img1{
                        margin-left: -16px;
                        float: right;
                    }

                    .img2{
                    }
                }

                .p2{

                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 15.0229px;
                    line-height: 21px;
                    color: #000000;
                     &.bor {
                        display: flex;
                        justify-content: space-around;
                        /* width: 115px; */
                        /* padding-bottom: 2px;
                        border-bottom: 1px dashed #171717; */
                        .text {
                            width: 115px;
                            padding-bottom: 2px;
                            border-bottom: 1px dashed #171717;
                        }
                    }
                }
                .p22{
                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 32px;
                    line-height: 45px;
                    text-align: center;

                    color: #000000;
                }

                button{
                    width: 139px;
                    height: 45px;
                    background-color: transparent;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;

                    color: #000000;

                    border: 2px solid #000000;
                    border-radius: 0;
                }

                button:hover,button:focus{
                    background-color: black;
                    color: #fbb33b;
                }
            }

        }
    }
    @media screen and (min-width: 1440px) {
        .cheese-item {
            position: relative;
            width: 248px;
            height: 609px;
            padding: 88px 10px 128px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: url("../../../../assets/cheese_item_box_bg.svg") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            float: left;
            margin-right: 40px;

            .item-con33{
                margin-top: 22px;
            }

            .item-con{
                text-align: center;

                .p1{

                    img{
                        /*height: 80px;*/
                    }
                    .img1{
                        margin-left: -16px;
                        float: right;
                    }

                    .img2{
                    }
                }

                .p2{

                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 15.0229px;
                    line-height: 21px;
                    color: #000000;
                    &.bor {
                        display: flex;
                        justify-content: space-around;
                    
                        .text {
                            width: 115px;
                            padding-bottom: 2px;
                            border-bottom: 1px dashed #171717;
                        }
                    }
                }
                .p22{
                    font-family: Arial;
                    font-style: normal;
                    font-weight: 900;
                    font-size: 32px;
                    line-height: 45px;
                    text-align: center;

                    color: #000000;
                }

                button{
                    width: 139px;
                    height: 45px;
                    background-color: transparent;

                    font-family: Bugaki;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;

                    color: #000000;

                    border: 2px solid #000000;
                    border-radius: 0;
                }

                button:hover,button:focus{
                    background-color: black;
                    color: #fbb33b;
                }
            }

        }
    }

</style>

