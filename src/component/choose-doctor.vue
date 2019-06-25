<template>
<div class="page">
    <header class="l-f">
        <touch class="page-back" @tap="pageBack"></touch>今日挂号
    </header>
    <div class="page-wrapper">
        <ul class="choose-wrapper">
            <touch :class="{active:listActive[0]}" @tap="changeList(0)">专家号</touch>
            <touch :class="{active:listActive[1]}" @tap="changeList(1)">普通号</touch>
        </ul>
        <div v-if="listActive[0]" class="choose-doc scroll-wrapper">
            <div class="scroll">
                <li v-bind:key="index" v-for="(doc,index) in doctorExpert">
                    <touch @tap="showDetail(index,0)" class="doc-wrap-1 clearfix">
                        <img :src="doc.photo">
                        <p class="name">{{doc.name}}</p>
                        <p class="synopsis">{{doc.synopsis}}</p>
                        <p class="type">专家号</p>
                    </touch>
                    <transition name="detail" appear appear-class="detail-enter" appear-active-class="detail-enter-active">
                        <div v-if="showNumExpert[index]" class="detail-wrap" :style="{height:doc.detail.length*(75/750)+'rem'}">
                            <touch v-bind:key="i" v-for="(detail,i) in doc.detail" @tap="pageGo(detail.rest,index,i,'doctorExpert')" class="doc-wrap-2 clearfix">
                                <p class="time">{{detail.time}}</p>
                                <p class="pay">挂号费:￥<span>{{detail.pay}}</span></p>
                                <p class="rest" :class="{unable:!Number(detail.rest,i)}">剩余<span>{{detail.rest}}</span>号</p>
                            </touch>
                        </div>
                    </transition>
                </li>
            </div>
        </div>
        <div v-if="listActive[1]" class="choose-doc scroll-wrapper">
            <div class="scroll">
                <li v-bind:key="index" v-for="(doc,index) in doctorNormal">
                    <touch @tap="showDetail(index,1)" class="doc-wrap-1 clearfix">
                        <img :src="doc.photo">
                        <p class="name">{{doc.name}}</p>
                        <p class="synopsis">{{doc.synopsis}}</p>
                        <p class="type">普通号</p>
                    </touch>
                    <transition name="detail" appear appear-class="detail-enter" appear-active-class="detail-enter-active">
                        <div v-if="showNumNormal[index]" class="detail-wrap" :style="{height:doc.detail.length*(75/750)+'rem'}">
                            <touch v-bind:key="i" v-for="(detail,i) in doc.detail" @tap="pageGo(detail.rest,index,i,'doctorNormal')" class="doc-wrap-2 clearfix">
                                <p class="time">{{detail.time}}</p>
                                <p class="pay">挂号费:￥<span>{{detail.pay}}</span></p>
                                <p class="rest" :class="{unable:!Number(detail.rest)}">剩余<span>{{detail.rest}}</span>号</p>
                            </touch>
                        </div>
                    </transition>
                </li>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    import scroll from 'iscroll';
    import store, { mapState } from '../store/store';
    import router from '../route/router';
    import { msTip } from '../js/common';
    let iScroll;
    export default {
        data() {
            return {
                listActive: [1, 0],
                showNumExpert: [],
                showNumNormal: []
            };
        },
        computed: mapState(['doctorExpert','doctorNormal']),
        created() {
            this.doctorExpert.forEach(() => {
                this.showNumExpert.push(0);
            });
            this.doctorNormal.forEach(() => {
                this.showNumNormal.push(0);
            });
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => { iScroll = new scroll('.scroll-wrapper') }, 350);
            });
        },
        methods: {
            changeList(i) {
                this.listActive = [0, 0];
                this.listActive[i] = 1;
                setTimeout(() => { iScroll.refresh() }, 350);
            },
            showDetail(i, n) {
                if (!n) {
                    this.showNumExpert.forEach((val, inx, Arr) => {
                        if (inx === i) {
                            this.$set(Arr, i, !val);
                        }
                    });
                }else{
                    this.showNumNormal.forEach((val, inx, Arr) => {
                        if (inx === i) {
                            this.$set(Arr, i, !val);
                        }
                    });
                }
                setTimeout(() => { iScroll.refresh() }, 350);
            },
            pageGo(rest, index, i, type) {
                if (Number(rest)) {
                    store.commit('setPatientDetail', {
                        type,
                        index,
                        i
                    });
                    router.push({ path: 'patientDetail', query: {  } });
                } else {
                    msTip('该时段的号被抢光了~');
                }
            },
            pageBack() {
                router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../css/base";
.choose-wrapper{
    .px(width,710);
    .px(height,80);
    .px(margin,20);
    border-bottom:1px solid @color-line;
    background-color: white;
    overflow: hidden;
    .px(border-radius,20);
    div{
        width: 50%;
        .px(line-height,80);
        text-align: center;
        float: left;
    }
    div.active{
        transition:background-color .25s;
        background-color:@color1;
        color:#fff;
    }
}
.scroll-wrapper{
    position:absolute;
    .px(top,120);
    bottom:0;
    overflow: hidden
}
.scroll{
    .px(padding-bottom,40);
}
.choose-doc{
    li{
        .px(margin,20);
        margin-top:0;
        background-color: white;
    }
}
.doc-wrap-1{
    position: relative;
    .px(padding-left,20);
    .px(padding-right,20);
    img{
        display: block;
        .px(width,200);
        float: left;
        .px(margin,20);
        margin-left:0;
        border-radius:50%;
        border:1px solid @color-line;
    }
    .n-s{
        float: left;
        .px(width,300);
        .px(margin-top,20);
        .px(margin-bottom,20);
    }
    .name{
        .n-s;
        .px(margin-top,35);
    }
    .synopsis{
        .n-s;
        .px(line-height,36);
    }
    .type{
        position: absolute;
        top: 50%;
        .px(right,30);
        .px(padding-right,20);
        .px(margin-top,-18);
        .px(line-height,36);
        color: @color1;
        background: url("../img/page-go-color1.png")no-repeat right center;
        background-size: auto 75%;
    }
}
.detail-wrap{
    overflow: hidden;
    transform:translateZ(0px);
    .doc-wrap-2{
        .px(margin-left,20);
        .px(margin-right,20);
        position: relative;
        border-top:1px solid @color-line;
        .time{
            float: left;
            .px(height,75);
            .px(line-height,75);
        }
        .pay{
            position: absolute;
            .px(height,75);
            .px(line-height,75);
            .px(left,250);
        }
        .rest{
            position: absolute;
            right: 0;
            background-color:@color1;
            .px(width,165);
            .px(height,45);
            .px(line-height,49);
            .px(top,15);
            text-align: center;
            .px(border-radius,20);
            color: white;
        }
        .rest.unable{
            background-color: @color-un;
        }
    }
}

.detail-leave-active{
    opacity:0;
    height:0 !important;
    transition: all .38s
}
.detail-enter{
    opacity:0;
    height:0 !important;
}
.detail-enter-active{
    transition: all .38s;
}
</style>