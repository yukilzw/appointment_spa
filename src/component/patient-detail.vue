<template>
    <div class="page">
        <header class="l-f">
            <touch class="page-back" @tap="pageBack"></touch>挂号详情
        </header>
        <div class="page-wrapper">
            <ul class="ul">
                <li>
                    <h3>挂号院区：</h3>
                    <p><span>{{HosName+'('+chooseHosArea+')'}}</span></p>
                </li>
                <li>
                    <h3>挂号类型：</h3>
                    <p><span>{{patientDetail.type}}</span></p>
                </li>
                <li>
                    <h3>门诊科室：</h3>
                    <p><span>{{chooseDepart}}</span></p>
                </li>
                <li>
                    <h3>门诊医生：</h3>
                    <p><span>{{patientDetail.docName}}</span></p>
                </li>
                <li>
                    <h3>门诊时间：</h3>
                    <p><span>{{patientDetail.time}}</span></p>
                </li>
                <li>
                    <h3>挂号费用：</h3>
                    <p><span>￥{{patientDetail.pay}}</span></p>
                </li>
            </ul>
            <touch class="ul" id="patient" @tap="pageGo('patientList')">
                <li>
                    <h3>就诊人：</h3>
                    <p><span>{{patientDetail.patientName}}</span><span id="next"></span></p>
                </li>
            </touch>
            <pre>温馨提示：
1.本系统挂号需要支付挂号费
2.若挂号当天不就诊，过期医院不再安排就诊及退费</pre>
            <touch @tap="pageGo('choosePayway')" class="bottom">
                提交
            </touch>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import store, { mapState } from '../store/store';
    import router from '../route/router';
    export default {
        computed: mapState(['HosName', 'chooseDepart', 'chooseHosArea', 'patientDetail']),
        mounted() {
            this.$nextTick(() => {
                const h3_width = document.getElementsByTagName('h3')[0].offsetWidth;
                const li_width = (650 / 750) * window.REM;
                const p = document.getElementsByTagName('p');
                for (let i = 0; i < p.length; i++) {
                    p[i].style.width = li_width - h3_width - 10 + 'px';
                }
            });
        },
        methods: {
            pageBack() {
                router.go(-1);
            },
            pageGo(path) {
                router.push({ path, query: { } });
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../css/base";
.ul{
    .px(margin,20);
    .px(padding,30);
    background-color: white;
    border:1px solid @color-line;
    .px(border-radius,20);
    li{
        overflow: hidden;
        h3{
            float:left;
            .px(line-height,75);
            font-weight: 500;
        }
        p{
            position: relative;
            float: right;
            text-indent:5px;
            &:after{
                 display:block;
                 content:"";
                 width: 100%;
                 height: 1px;
                 background-color: @color-line;
                 position: absolute;
                 .px(bottom,12);
             }
            span{
                .px(line-height,75);
            }
        }
    }
}
#patient{
    .px(padding-top,15);
    .px(padding-bottom,15);
    p:after{
        display: none;
    }
}
pre{
    .px2(margin,40,30);
    .px(line-height,45);
    color: #888888;
}
#next{
    display: block;
    float: right;
    .px(width,30);
    .px(height,75);
    background: url("../img/page-go-un.png")no-repeat right center;
    background-size: auto 50%;
}
</style>