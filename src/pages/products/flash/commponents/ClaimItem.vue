<template>
    <div class="claim-item">
        <div class="title">{{claim.title}}</div>
        <div class="p1">{{
            claim.startTime == 0 
            ? ('10.02.2021' + " - " + hkGetTimeYMD(claim.endTime))
            : (hkGetTimeYMD(claim.startTime) + " - " + hkGetTimeYMD(claim.endTime))}}
        </div>
        <div class="p2">
            <span class="p2-con">
                <span class="p2-con-item">
                    <span class="p2-con-item-t1">{{claim.text1||"CHEESE REWARDS"}}</span>
                    <span class="p2-con-item-t2-con">
                        <span class="p2-con-item-t2">{{toThousands(toFixed4(claim.reward))}}</span>
                        <span class="p2-con-item-icon"><img :src="require('../../../../assets/icon/'+'CHEESE'+'.svg')" /></span>
                    </span>
                </span>
                <span class="p2-con-item">
                    <span class="p2-con-item-t1">{{claim.text2||"FLASH LOAN"}}</span>
                    <span class="p2-con-item-t2-con">
                        <span class="p2-con-item-t2">{{toThousands(toFixed4(claim.flashloan))}}</span>
                        <span class="p2-con-item-icon"><img :src="require('../../../../assets/icon/'+'USD'+'.svg')" /></span>
                    </span>
                </span>
            </span>
            <span class="btns">
                <a-button class="chr-c-btn" @click="toClaim(claim)" :loading="claim.isloading" :disabled="claim.claimed">CLAIM</a-button>
            </span>
        </div>
    </div>
</template>


<script>
    import {hkGetTimeYMD, toFixed4, toThousands} from "../../../../utils/tools"

    export default {
        components: {},
        props: {
            claim:{

            },
            toClaim:Function,

        },
        data() {
            return {
                hkGetTimeYMD:hkGetTimeYMD,
                toThousands:toThousands,
                toFixed4:toFixed4,
            };
        },
        methods: {
            onClaim(){

            },

        },
        watch: {

        },
        computed: {
        },

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 750px) {
        .claim-item{
            position: relative;
            width: 100%;
            /*margin-bottom: 12px;*/

            .title{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 12px;
                line-height: 17px;
                color: #000000;
                margin-bottom: 8px;
            }

            .p1{
                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 12px;
                line-height: 17px;
                color: #000000;

                margin-bottom: 16px;
            }

            .p2{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-top: 1px solid black;

                .p2-con{
                    width: 100%;
                    display: flex;
                    .p2-con-item{
                        display: inline-flex;
                        flex-direction: column;
                        margin-right: 30px;
                        height: 50px;
                        justify-content: space-between;

                        .p2-con-item-t1{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 12px;
                            line-height: 17px;
                            color: #000000;

                        }
                        .p2-con-item-t2-con{
                            display: inline-flex;
                            align-items: center;
                        }
                        .p2-con-item-t2{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 12px;
                            line-height: 17px;
                            color: #000000;

                            margin-right: 12px;
                        }
                        .p2-con-item-icon{
                            img{
                                width: 24px;
                            }
                        }

                    }

                }

                .btns{
                    margin-top: 12px;

                    button{
                        min-width: 102px;
                        border: 1px solid #000000;
                        font-size: 10px;
                        line-height: 15px;
                    }
                }

                .t1{

                    font-family: Arial Black;
                    font-style: normal;
                    font-size: 27px;
                    line-height: 42px;

                    color: #000000;
                }
                .icon{
                    margin-left: 16px;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 100%;
                }
            }
        }
    }


    @media screen and (max-width: 1279px) and (min-width: 751px) {
        .claim-item{
            position: relative;
            width: 100%;
            margin-bottom: 20px;

            .title{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 14px;
                line-height: 20px;
                color: #000000;
                margin-bottom: 8px;
            }

            .p1{
                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 16px;
                line-height: 23px;
                color: #000000;

                margin-bottom: 16px;
            }

            .p2{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                border-top: 1px solid black;

                .p2-con{
                    display: flex;
                    .p2-con-item{
                        display: inline-flex;
                        flex-direction: column;
                        margin-right: 50px;
                        height: 67px;
                        justify-content: space-between;

                        .p2-con-item-t1{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 16px;
                            line-height: 23px;
                            color: #000000;

                        }
                        .p2-con-item-t2-con{
                            display: inline-flex;
                            align-items: center;
                        }
                        .p2-con-item-t2{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 18px;
                            line-height: 25px;
                            color: #000000;

                            margin-right: 12px;
                        }
                        .p2-con-item-icon{
                            img{
                                width: 32px;
                            }
                        }

                    }

                }

                .t1{

                    font-family: Arial Black;
                    font-style: normal;
                    font-size: 27px;
                    line-height: 42px;

                    color: #000000;
                }
                .icon{
                    margin-left: 16px;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 100%;
                }
            }
        }
    }


    @media screen and (max-width: 1439px) and (min-width: 1280px) {
        .claim-item{
            position: relative;
            width: 100%;
            margin-bottom: 20px;

            .title{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 16px;
                line-height: 23px;
                color: #000000;

                margin-bottom: 8px;
            }

            .p1{
                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 20px;
                line-height: 28px;
                color: #000000;

                margin-bottom: 20px;
            }

            .p2{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                border-top: 1px solid black;

                .p2-con{
                    display: flex;
                    .p2-con-item{
                        display: inline-flex;
                        flex-direction: column;
                        margin-right: 60px;
                        height: 68px;
                        justify-content: space-between;

                        .p2-con-item-t1{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 16px;
                            line-height: 23px;
                            color: #000000;

                        }
                        .p2-con-item-t2-con{
                            display: inline-flex;
                            align-items: center;
                        }
                        .p2-con-item-t2{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 20px;
                            line-height: 28px;
                            color: #000000;

                            margin-right: 16px;
                        }
                        .p2-con-item-icon{
                            img{
                                width: 32px;
                            }
                        }

                    }

                }

                .t1{

                    font-family: Arial Black;
                    font-style: normal;
                    font-size: 27px;
                    line-height: 42px;

                    color: #000000;
                }
                .icon{
                    margin-left: 16px;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 100%;
                }
            }
        }
    }
    @media screen and (min-width: 1440px) {
        .claim-item{
            position: relative;
            width: 100%;
            margin-bottom: 20px;

            .title{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 16px;
                line-height: 23px;
                color: #000000;

                margin-bottom: 8px;
            }

            .p1{
                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 20px;
                line-height: 28px;
                color: #000000;

                margin-bottom: 20px;
            }

            .p2{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                border-top: 1px solid black;

                .p2-con{
                    display: flex;
                    .p2-con-item{
                        display: inline-flex;
                        flex-direction: column;
                        margin-right: 60px;
                        height: 68px;
                        justify-content: space-between;

                        .p2-con-item-t1{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 16px;
                            line-height: 23px;
                            color: #000000;

                        }
                        .p2-con-item-t2-con{
                            display: inline-flex;
                            align-items: center;
                        }
                        .p2-con-item-t2{
                            font-family: Arial Black;
                            font-style: normal;
                            /*font-weight: 900;*/
                            font-size: 20px;
                            line-height: 28px;
                            color: #000000;

                            margin-right: 16px;
                        }
                        .p2-con-item-icon{
                            img{
                                width: 32px;
                            }
                        }

                    }

                }

                .t1{

                    font-family: Arial Black;
                    font-style: normal;
                    font-size: 27px;
                    line-height: 42px;

                    color: #000000;
                }
                .icon{
                    margin-left: 16px;
                }
            }


            .icon{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    width: 100%;
                }
            }
        }
    }




</style>
