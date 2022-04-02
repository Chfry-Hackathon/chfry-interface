<template>
    <div class="chr-pool">
        <div class="con">
            <div class="token">
                <span class="icon"><img src="@/assets/logo.svg" /></span>
                <span>{{token.symbol}}</span>
            </div>
            <div class="t1">0.00</div>
        </div>
        <div class="t2">Available: {{token.available}} {{token.symbol}}</div>
    </div>
</template>

<script>

    export default {
        components: {  },
        props: {
            token:{
                symbol:"",
                address:"",
                available:Number,
            }
        },
        data() {
            return {

            };
        },
        methods:{

        },
        watch: {

        },
        computed: {},

        mounted() {


        },
    };
</script>
<style lang="scss" scoped>


    ::v-deep .ant-progress-inner {
        background-color: #D8D8D8;
    }


    .chr-pool{
        position: relative;
        width: 100%;
        margin: 8px auto;
        padding: 22px;
        background: #FDFDFD;
        border-radius: 19px;
        border: 1px solid rgba(68, 68, 68, 0.2);



        .con{
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            margin-bottom: 20px;

            .token{
                width: 140px;
                height: 57px;
                background: #FFFFFF;
                box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1);
                border-radius: 19px;
                text-align: center;

                display: flex;
                justify-content: center;
                align-items: center;

                font-size: 16px;
                /*font-family: PingFangSC-Semibold, PingFang SC;*/
                font-weight: 600;
                color: #444444;
                line-height: 22px;

                .icon{
                    margin-right: 10px;
                }
            }
            .t1{
                font-size: 30px;
                font-family: SwedenSans-Bold, SwedenSans;
                font-weight: bold;
                color: #444444;
                line-height: 37px;
            }

        }
        .t2{
            font-size: 14px;
            /*font-family: PingFangSC-Regular, PingFang SC;*/
            font-weight: 400;
            color: #444444;
            line-height: 20px;
        }
    }
</style>
