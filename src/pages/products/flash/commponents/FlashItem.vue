<template>
    <div class="flash-item">
        <div class="p1" v-html="token.text"></div>
        <div class="p2">
            <span class="t1">{{token.amount}}</span>
            <span class="icon">
                <img :src="require('../../../../assets/icon/'+token.symbol+'.svg')" />
            </span>
        </div>
    </div>
</template>


<script>
    export default {
        components: {},
        props: {
            token:{
                text:"",
                symbol:"",
                address:"",
                amount:Number
            },
        },
        data() {
            return {


            };
        },
        methods: {


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
        .flash-item{
        position: relative;
        width: 155px;
        height: 101px;
        padding: 23px 0px 30px 5px;

        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-image: url("../../../../assets/tool/fryer_box_bg2.svg");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;

        .p1{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 10px;
            line-height: 14px;
            color: #000000;
        }

        .p2{
            margin-top: 12px;
            display: flex;
            justify-content: center;

            .t1{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 12px;
                line-height: 24px;
                color: #000000;

            }
            .icon{
                margin-left: 16px;
            }
        }


        .icon{
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                width: 100%;
            }
        }
    }}


    @media screen and (max-width: 1279px) and (min-width: 751px) { .flash-item{
        position: relative;
        width: 253px;
        height: 163px;
        padding: 24px 0px 34px 10px;

        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-image: url("../../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;

        .p1{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 14px;
            line-height: 22px;
            color: #000000;
        }

        .p2{
            margin-top: 12px;
            display: flex;
            justify-content: center;

            .t1{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 22px;
                line-height: 31px;
                color: #000000;

            }
            .icon{
                margin-left: 16px;
            }
        }


        .icon{
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                width: 100%;
            }
        }
    }}
    @media screen and (max-width: 1439px) and (min-width: 1280px) { .flash-item{
        position: relative;
        width: 294px;
        height: 163px;
        padding: 24px 30px 34px 40px;

        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-image: url("../../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;

        .p1{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 16px;
            line-height: 23px;
            color: #000000;
        }

        .p2{
            margin-top: 12px;
            display: flex;
            justify-content: center;

            .t1{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 22px;
                line-height: 31px;
                color: #000000;

            }
            .icon{
                margin-left: 16px;
            }
        }


        .icon{
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                width: 100%;
            }
        }
    }}
    @media screen and (min-width: 1440px) { .flash-item{
        position: relative;
        width: 294px;
        height: 163px;
        padding: 24px 30px 34px 40px;

        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-image: url("../../../../assets/tool/fryer_box_bg2.svg#svgView(preserveAspectRatio(none))");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;

        .p1{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 16px;
            line-height: 23px;
            color: #000000;
        }

        .p2{
            margin-top: 12px;
            display: flex;
            justify-content: center;

            .t1{

                font-family: Arial Black;
                font-style: normal;
                /*font-weight: 900;*/
                font-size: 22px;
                line-height: 31px;
                color: #000000;

            }
            .icon{
                margin-left: 16px;
            }
        }


        .icon{
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                width: 100%;
            }
        }
    }}

</style>
