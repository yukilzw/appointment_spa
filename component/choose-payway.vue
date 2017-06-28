<template>
    <div class="page">
        <header class="l-f">
            <touch class="page-back" @tap="pageBack"></touch>挂号支付
        </header>
        <div class="page-wrapper">
            <ul class="ul">
                <li class="li">
                    <p>挂号费：</p>
                    <div><span id="price">{{patientDetail.pay}} 元</span></div>
                </li>
            </ul>
            <ul class="ul">
                <li class="li">
                    <p>支付方式：</p>
                </li>
                <touch @tap="changePayWay(0)" class="way li" :class="{active:wayActive[0]}">
                    <p>就诊卡</p>
                    <div><span></span></div>
                </touch>
                <touch @tap="changePayWay(1)" class="way li" :class="{active:wayActive[1]}">
                    <p class="two-words">微信</p>
                    <div><span></span></div>
                </touch>
            </ul>
            <touch @tap="msTip('这只是个DEMO~')" class="bottom">
                提交
            </touch>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import store,{mapState} from '../js/store'
    import router from '../js/router'
    import {msTip} from '../library/common'
    export default {
        data(){
            return {
                wayActive:[1,0]
            }
        },
        computed:mapState(['patientDetail']),
        methods:{
            changePayWay(i){
                this.wayActive=[0,0];
                this.wayActive[i]=1;
            },
            pageBack(){
                router.go(-1)
            },
            pageGo(){
                router.push({ path: '', query: { } })
            },
            msTip(text){
                msTip(text)
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../css/base";
.ul{
    .px(margin,20);
    .px2(padding,0,30);
    background-color: white;
    border:1px solid @color-line;
    .px(border-radius,20);
    .li{
        position: relative;
        .px(line-height,80);
        .px(height,80);
        p{
            float: left;
        }
        p.two-words{
            letter-spacing:1em;
        }
    }
    .way{
        border-top:1px solid @color-line;
        div{
            position: absolute;
            .px(height,40);
            .px(width,40);
            .px(top,20);
            .px(right,4);
            border-radius: 50%;
            border:1px solid @color-un;
            span{
                display: none;
                height: 70%;
                width: 70%;
                border-radius: 50%;
                margin:15%;
                background-color: @color-un;
            }
        }
    }
    .way.active{
        div{
            border-color: @color1;
            span{
                display: block;
                background-color: @color1;
            }
        }
    }
}
#price{
    float: right
}
</style>