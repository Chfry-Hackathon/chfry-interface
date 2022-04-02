<template>
    <div class="chr-login">
        <div class="container">
            <div class="title">

                <span class="t1">CONNECT YOUR WALLET</span>

            </div>
            <div class="content">
                <span class="t2">Select a wallet provider from the list below
                    <br>to connect to your wallet</span>
            </div>
            <div>
                <!--<a-button class="btn-item" v-for="(item,index) in btns" :key="item.label" type="primary" block-->
                          <!--@click="toLogin(item)">-->
                    <!--<span class="p1">{{item.label}}</span>-->
                    <!--<span class="p2">-->
                            <!--<img :src="require('../assets/wallet-icon/'+item.name+'.svg')"/>-->
                    <!--</span>-->
                <!--</a-button>-->

                <a-button :class="['chr-btn', 'btn-item','chr-btn-'+item.name]" v-for="(item,index) in btns" :key="item.label" :loading="item.loading" @click="toLogin(item)">
                    <span class="p2">
                    <img :src="require('../assets/wallet-icon/'+item.name+'.svg')"/>
                    </span>
                    <span class="p1">{{item.label}}</span>
                </a-button>
            </div>
            <a-button class="close" @click="closePage" type="link">
                <img src="../assets/tool/tool_icon_close.svg" />
            </a-button>
            <div class="chr-login-bp" v-if="false">
                <span class="t1">Can’t connect to your wallet? </span>
                <span class="t2">Learn how</span>
            </div>
        </div>
    </div>
</template>

<script>

    import {trace} from "../utils/tools"
    import {getBalanceToken, loginWal} from "../api/user"
    import { switchNetwork } from "../utils/wallet";

    export default {
        components: {},
        props: {},
        data() {
            return {
                btns: [
                    {
                        id: 1,
                        label: "METAMASK",
                        name: "metamask",
                        icon: "",
                        loading:false,
                    },
                    // {
                    //     id: 2,
                    //     label: "Coinbase Wallet",
                    //     icon: "",
                    // },
                    {
                        id: 3,
                        label: "WALLETCONNECT",
                        name: "walletconnect",
                        icon: "",
                        loading:false,
                    },
                    // {
                    //     label: "Formatic",
                    //     icon: "",
                    // },
                    // {
                    //     id: 4,
                    //     label: "Portis",
                    //     icon: "",
                    // },
                ]
            };
        },
        methods: {
            async toLogin(item) {
                trace("login-", item);
                // "walletconnect" | "metamask" | "huobiwallet" | "mathwallet" | "tokenpocket"
                item.loading = true;

                try{
                    const connect = async () => {
                        let data1 = await this.$store.dispatch('user/login', {type:item.name, callback:(data) => {
                                trace("----change----", data);
                                if(data.chainID!=97&&data.chainID!=1&&data.chainID!=3 && data.chainID!=42){
                                    this.$bus.emit("showLoginErr",true);
                                }else{
                                    // this.$router.push({"path":"/"});
                                }
                            }})

                        if(data1.chainID==97||data1.chainID==1||data1.chainID==3 || data1.chainID==42){     //登入成功
                            this.$store.dispatch("user/saveLogin",{
                                type:item.name
                            })
                            this.closePage();
                        }else{
                            this.$store.dispatch("user/clearLogin",{
                                type:item.name
                            })
                            this.$bus.emit("showLoginErr",true);
                        }
                    }
                    if(item.name === "metamask") {
                        switchNetwork().then(async () => {
                            await connect()
                        }).catch((e)=>{
                            console.error(e);
                            this.$bus.emit("showLoginErr",true);
                        })
                        return ;
                    }else {
                        await connect()
                     }
                }catch (e) {
                    trace(e)
                    this.$bus.emit("showLoginErr",true);
                }


                item.loading = false;




            },
            closePage(){
                this.$bus.emit("showLogin", false);
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
    .chr-login {
        background-color: rgb(199 171 171 / 91%);


        .container {
            position: relative;
            width: 539px;
            max-width: 100%;
            height: 520px;
            /*min-height: 60vh;*/
            margin: 8rem auto;
            padding: 32px 55px 32px 76px;
            background-image: url("../assets/login_bg.svg");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            .close{
                position: absolute;
                right: 32px;
                top: 25px;
                border: 0;
                font-size: 1.2rem;
                padding: 0;
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
                    font-size: 18px;
                    line-height: 25px;

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
                    font-size: 16px;
                    line-height: 28px;
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
                width: 378px;
                height: 76px;
                /*background: #FDFDFD;*/
                /*border-radius: 19px;*/
                /*border: 1px solid rgba(68, 68, 68, 0.2);*/
                display: flex;
                align-items: center;
                /*justify-content: space-between;*/
                padding: 17px 74px 27px !important;

                .p1 {

                    font-family: Arial Black;
                    font-style: normal;
                    /*font-weight: 900;*/
                    font-size: 14px;
                    line-height: 20px;
                    /* identical to box height */


                    color: #000000;
                }

                .p2 {
                    width: 34px;
                    height: 34px;
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

            .chr-login-bp{
                position: absolute;
                bottom: 32px;
                text-align: center;
                font-size: 16px;
                line-height: 18px;
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
</style>
