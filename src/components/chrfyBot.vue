<template>
    <div class="chrfy-bot">

        <div class="chrfy-bot-con">
            <a-button @click="gopage('Discord')" type="link">Discord</a-button>
            <a-button @click="gopage('Telegram')" type="link">Telegram</a-button>
            <a-button @click="gopage('Twitter')" type="link">Twitter</a-button>
            <a-button @click="gopage('Medium')" type="link">Medium</a-button>
            <a-button @click="gopage('Gitbook')" type="link">Gitbook</a-button>
            <a-button @click="gopage('Github')" type="link">Github</a-button>
            <a-button @click="gopage('Immunefi')" type="link">Immunefi</a-button>
            <span v-if="!isMobile" class="t1">Copyright © 2021 CHFRY Finance. All rights reserved</span>
        </div>
        <div v-if="isMobile" class="t1" style="margin-bottom: 8px;padding-bottom: 8px">Copyright © 2021 CHFRY Finance. All rights reserved</div>

    </div>


</template>

<script>

    import Global from "../common/Global"

    import {mapGetters} from "vuex"
    export default {
        components: {},
        props: {},
        data() {
            return {
            };
        },
        methods: {

            gopage(value){
             window.open(Global.pathList[value])
            },


        },
        watch: {


        },
        computed: {
            ...mapGetters(["account","isMobile"])
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>

    .chrfy-bot{
        position: relative;
        width: 100%;
        min-height: 48px;

        /*background-color: #F499AD;*/

        .chrfy-bot-con{
            display: flex;
            align-items: center;
            justify-content: center;
        }

        button{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 17px;
            color: #171717;
            padding: 0 10px;
        }

        button:hover{
            color: #FBB33B;
            /*text-stroke: 1px #171717;*/
            /*-webkit-text-stroke: 1px #171717;*/
            text-shadow: black 1px 0 0, black 0 1px 0, black -1px 0 0 , black 0 -1px 0;
            /*border: 1px solid #171717;*/
        }
        .t1{
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 17px;
            /* identical to box height */

            text-align: center;
            color: #171717;
        }
    }
</style>