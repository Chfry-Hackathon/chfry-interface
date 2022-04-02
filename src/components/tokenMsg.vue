<template>
    <div class="token-msg">
        <div class="t1">{{token.text}}</div>
        <div class="p2">
          <span class="t2">
            <template v-if="String(token.amount).length>6">
               <a-tooltip>
                  <template slot="title">
                    {{toThousands(token.amount)}}
                  </template>
                  {{resetString(token.amount)}}
                </a-tooltip>
            </template>
            <template v-else>{{toThousands(token.amount)}}</template>
          </span>
            <span class="icon">
            <img v-if="token.icon === 'MIM' " :src="require('../assets/icon/MIM.png')"/>
            <img v-else :src="require('../assets/icon/'+token.icon+'.svg')"/>
            
        </span>

        </div>
    </div>
</template>

<script>


    import {toThousands,resetString} from "../utils/tools";

    export default {
        components: {},
        props: {
            token: {},
        },
        data() {
            return {
                toThousands:toThousands,
                resetString:resetString,
            };
        },
        methods: {},
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


    @media screen and (max-width: 750px){.token-msg {
        width: 155px;
        height: 101px;
        background: url("../assets/fryer/fryer_box_bg4.svg") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        padding: 23px 5px 30px 10px;
        /*margin: 12px;*/

        .t1 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 10px;
            line-height: 12px;

            color: #000000;
            text-align: center;
        }

        .p2 {
            display: flex;
            align-items: center;
            margin-top: 10px;
            justify-content: center;
        }

        .t2 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 17px;
            color: #000000;
        }

        .icon {
            /*width: 28px;*/

            height: 28px;
            display: flex;
            margin-left: 10px;

            img {
                height: 100%;
            }
        }

    }}

    @media screen and (max-width: 1279px) and (min-width: 751px) {.token-msg {
        width: 245px;
        height: 125px;
        background: url("../assets/fryer/fryer_box_bg3.svg#svgView(preserveAspectRatio(none))") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        padding: 30px 20px 40px 30px;
        /*margin: 12px;*/

        .t1 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 21px;

            color: #000000;
            text-align: center;
        }

        .p2 {
            display: flex;
            align-items: center;
            margin-top: 8px;
            justify-content: center;
        }

        .t2 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 24px;
            line-height: 38px;
            color: #000000;
        }

        .icon {
            /*width: 28px;*/

            height: 28px;
            display: flex;
            margin-left: 10px;

            img {
                height: 100%;
            }
        }

    }}
    @media screen and (max-width: 1439px) and (min-width: 1280px) {.token-msg {
        width: 275px;
        height: 125px;
        background: url("../assets/fryer/fryer_box_bg3.svg#svgView(preserveAspectRatio(none))") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        padding: 30px 20px 40px 30px;
        margin: 12px;

        .t1 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 21px;

            color: #000000;
            text-align: center;
        }

        .p2 {
            display: flex;
            align-items: center;
            margin-top: 8px;
            justify-content: center;
        }

        .t2 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 24px;
            line-height: 38px;
            color: #000000;
        }

        .icon {
            /*width: 28px;*/
            width: max-content;
            height: 28px;
            display: flex;
            margin-left: 10px;

            img {
                height: 100%;
            }
        }

    }}
    @media screen and (min-width: 1440px) {.token-msg {
        width: 275px;
        height: 125px;
        background: url("../assets/fryer/fryer_box_bg3.svg#svgView(preserveAspectRatio(none))") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        padding: 30px 20px 40px 30px;
        margin: 12px;

        .t1 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 12px;
            line-height: 21px;

            color: #000000;
            text-align: center;
        }

        .p2 {
            display: flex;
            align-items: center;
            margin-top: 8px;
            justify-content: center;
        }

        .t2 {
            font-family: Arial Black;
            font-style: normal;
            /*font-weight: 900;*/
            font-size: 24px;
            line-height: 38px;
            color: #000000;
        }

        .icon {
            /*width: 28px;*/
            height: 28px;
            display: flex;
            margin-left: 10px;

            img {
                height: 100%;
            }
        }

    }}


</style>
