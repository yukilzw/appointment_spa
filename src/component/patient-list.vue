<template>
    <div class="page">
        <header class="l-f">
            <touch class="page-back" @tap="pageBack"></touch>就诊人列表
        </header>
        <div class="page-wrapper">
            <ul id="detail-wrapper">
                <touch class="li" v-bind:key="i" v-for="(people,i) in patientList" :class="{active:people.d}" @tap="pageBack(people.name,i)">
                    <p>{{people.name}}</p>
                    <div><span></span></div>
                </touch>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import store, { mapState } from '../store/store';
    import router from '../route/router';
    export default {
        computed: mapState(['patientList']),
        methods: {
            pageBack(people, i) {
                if(people && i) {
                    store.commit('setPatientDetailName', {
                        people: people,
                        i: i
                    });
                }
                router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../css/base";
#detail-wrapper{
    .px(margin,20);
    .li{
        position: relative;
        .px(margin-bottom,20);
        border:1px solid @color-line;
        background-color: white;
        .px(line-height,80);
        .px(height,80);
        .px(padding-left,35);
        .px(border-radius,13);
        div{
            position: absolute;
            .px(height,40);
            .px(width,40);
            .px(top,20);
            .px(right,30);
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
    .li.active{
        div{
            border-color: @color1;
            span{
                display: block;
                background-color: @color1;
            }
        }
    }
}
</style>