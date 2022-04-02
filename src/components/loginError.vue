<template>
    <div class="chr-login-error">
        <div class="container">
            <div class="title">

                <span class="t1">CONNECT TO A WALLET</span>

            </div>
            <div class="content">
                <div><img src="../assets/tool/tool_icon_warning.svg" /> </div>
                <div class="t2">Wallet provider information not found.
                    <br>Please select another wallet provider
                    <br>and try again.
                </div>
            </div>

            <a-button class="close" @click="closePage">
                <img src="../assets/tool/tool_icon_close.svg" />
            </a-button>
            <div class="chr-login-error-bp" v-if="false">
                <span class="t1">Can’t connect to your wallet? </span>
                <span class="t2">Learn how</span>
            </div>
        </div>
    </div>
</template>

<script>

    import {trace} from "../utils/tools"
    import {getBalanceToken, loginWal} from "../api/user"

    export default {
        components: {},
        props: {},
        data() {
            return {

            };
        },
        methods: {

            closePage(){
                this.$bus.emit("showLoginErr", false);
            }
        },
        watch: {
            "$store.getters.isMobile"(newVal, oldVal) {
                this.isMobile = newVal;
            },
        },
        computed: {},

        mounted() {
        },
    };
</script>
<style lang="scss" scoped>


    @media screen and (max-width: 750px){
        .chr-login-error {
            background-color: rgb(199 171 171 / 91%);


            .container {
                position: relative;
                width: 360px;
                height: 320px;
                /*min-height: 60vh;*/
                margin: 8rem auto;
                padding: 4px 5px 12px 26px;
                background-image: url("../assets/login_bg.svg");
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                .close{
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    border: 0;
                    font-size: 12px;
                    zoom: 0.8;
                }
                .title{
                    position: relative;
                    text-align: center;
                    color: #13C496;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    margin-top: 10px;

                    .t0{
                        width: 72px;
                        height: 72px;
                        background: #13C496;
                        box-shadow: 0px 8px 24px 0px rgb(65 163 114 / 30%);

                        border-radius: 72px;
                        overflow: hidden;

                        img{
                            width: 100%;
                            /*width: 50%;*/
                            /*margin: 25%;*/
                            /*filter: drop-shadow(2px 4px 6px white);*/
                        }
                    }
                    .t1{
                        font-family: Arial Black;
                        font-style: normal;
                        /*font-weight: 900;*/
                        font-size: 12px;
                        line-height: 14px;

                        color: #171717;
                    }
                }
                .content{
                    margin: 30px 0;
                    text-align: center;

                    .t2{
                        font-family: Arial;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 16px;
                        text-align: center;
                        color: #171717;
                    }

                    img{
                        width: 32vw;
                    }
                }
                /*.btn-item:hover{*/
                /*background: rgba(19, 196, 150, 0.2);*/
                /*border: 1px solid #13C496;*/
                /*}*/

                .btn-item {
                    margin: 20px 0;
                    width: 578px;
                    height: 108px;
                    display: flex;
                    align-items: center;
                    padding: 17px 74px 27px;

                    .p1 {
                        font-size: 18px;
                        /*font-family: PingFangSC-Semibold, PingFang SC;*/
                        font-weight: 600;
                        color: #444444;
                        line-height: 25px;
                    }

                    .p2 {
                        width: 68px;
                        height: 68px;
                        margin-right: 30px;
                        background-color: white;
                        border-radius: 68px;
                        border: 1px solid;
                        display: flex;
                        justify-content: center;

                        img {
                            max-width: 70%;
                        }
                    }

                }

                .chr-login-error-bp{
                    position: absolute;
                    bottom: 2px;
                    text-align: center;
                    font-size: 12px;
                    line-height: 14px;
                    text-align: center;
                    width: calc(100% - 32px);
                    margin: 18px auto;
                    .t1{
                        color: #171717;
                    }
                    .t2{
                        color: #F499AD;
                        border-bottom: 1px dotted #F499AD;
                    }


                }
            }
        }
    }

    @media screen and (min-width: 751px){
        .chr-login-error {
            background-color: rgb(199 171 171 / 91%);


            .container {
                position: relative;
                width: 702px;
                height: 640px;
                /*min-height: 60vh;*/
                margin: 8rem auto;
                padding: 24px 55px 32px 76px;
                background-image: url("../assets/login_bg.svg");
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                .close{
                    position: absolute;
                    right: 2.2rem;
                    top: 1.2rem;
                    border: 0;
                    font-size: 1.2rem;
                }
                .title{
                    position: relative;
                    text-align: center;
                    color: #13C496;
                    display: flex;
                    flex-direction: column;
                    text-align: left;


                    .t0{
                        width: 72px;
                        height: 72px;
                        background: #13C496;
                        box-shadow: 0px 8px 24px 0px rgb(65 163 114 / 30%);
                        margin: auto;
                        border-radius: 72px;
                        overflow: hidden;

                        img{
                            width: 100%;
                            /*width: 50%;*/
                            /*margin: 25%;*/
                            /*filter: drop-shadow(2px 4px 6px white);*/
                        }
                    }
                    .t1{
                        font-family: Arial Black;
                        font-style: normal;
                        /*font-weight: 900;*/
                        font-size: 22px;
                        line-height: 31px;
                        /* identical to box height */


                        color: #171717;
                    }


                }
                .content{
                    margin: 50px 0;
                    text-align: center;

                    .t2{
                        font-family: Arial;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 24px;
                        line-height: 36px;
                        /* or 150% */

                        text-align: center;

                        color: #171717;
                    }
                }
                /*.btn-item:hover{*/
                /*background: rgba(19, 196, 150, 0.2);*/
                /*border: 1px solid #13C496;*/
                /*}*/

                .btn-item {
                    margin: 20px 0;
                    width: 578px;
                    height: 108px;
                    /*background: #FDFDFD;*/
                    /*border-radius: 19px;*/
                    /*border: 1px solid rgba(68, 68, 68, 0.2);*/
                    display: flex;
                    align-items: center;
                    /*justify-content: space-between;*/
                    padding: 17px 74px 27px;

                    .p1 {
                        font-size: 18px;
                        /*font-family: PingFangSC-Semibold, PingFang SC;*/
                        font-weight: 600;
                        color: #444444;
                        line-height: 25px;
                    }

                    .p2 {
                        width: 68px;
                        height: 68px;
                        margin-right: 30px;
                        background-color: white;
                        border-radius: 68px;
                        border: 1px solid;
                        display: flex;
                        justify-content: center;

                        img {
                            max-width: 70%;
                        }
                    }

                }

                .chr-login-error-bp{
                    position: absolute;
                    bottom: 32px;
                    text-align: center;
                    font-size: 20px;
                    line-height: 23px;
                    text-align: center;
                    width: calc(100% - 131px);
                    margin: 18px auto;
                    .t1{
                        color: #171717;
                    }
                    .t2{
                        color: #F499AD;
                        border-bottom: 1px dotted #F499AD;
                    }


                }
            }
        }
    }

</style>
