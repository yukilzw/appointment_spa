import Vue from 'vue';
import Vuex, { mapState } from 'vuex';

import defAvatar from '../img/xy.jpg';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        HosName: '武汉同济医院',
        departChoose: ['主院区', '光谷院区', '新城院区'],
        departName: [],
        chooseDepart: '',
        chooseHosArea: '',
        doctorExpert: [
            {
                name: '刘占威',
                photo: defAvatar,
                synopsis: '精通一阳指神功，阿弥陀佛~',
                detail: [
                    {
                        time: '8:00-12:00',
                        pay: 20,
                        rest: 0
                    },
                    {
                        time: '12:00-16:00',
                        pay: 20,
                        rest: 12
                    },
                    {
                        time: '17:00-20:00',
                        pay: 56.8,
                        rest: 0
                    }
                ]
            },
            {
                name: '刘占威2',
                photo: defAvatar,
                synopsis: '你们四个一起上，我刘某何惧？',
                detail: [
                    {
                        time: '8:50-12:00',
                        pay: 20,
                        rest: 0
                    },
                    {
                        time: '17:00-20:00',
                        pay: 56.8,
                        rest: 0
                    }
                ]
            },
            {
                name: '刘占威3',
                photo: defAvatar,
                synopsis: '你们五个一起上，我刘某何惧？',
                detail: [
                    {
                        time: '8:00-12:08',
                        pay: 201,
                        rest: 10
                    },
                    {
                        time: '12:00-16:002',
                        pay: 201,
                        rest: 12
                    },
                    {
                        time: '17:00-20:00',
                        pay: 56.8,
                        rest: 10
                    }
                ]
            },
            {
                name: '刘占威4',
                photo: defAvatar,
                synopsis: '无需多言，疑难杂症专家',
                detail: [
                    {
                        time: '8:00-12:00',
                        pay: 5,
                        rest: 999
                    }
                ]
            },
            {
                name: '刘占威5',
                photo: defAvatar,
                synopsis: '医学博士',
                detail: [
                    {
                        time: '8:00-12:00',
                        pay: 125,
                        rest: 21
                    }
                ]
            }
        ],
        doctorNormal: [
            {
                name: '刘占威3',
                photo: defAvatar,
                synopsis: '你们五个一起上，我刘某何惧？',
                detail: [
                    {
                        time: '8:00-12:00',
                        pay: 125,
                        rest: 1
                    }
                ]
            }
        ],
        patientDetail: {
            type: '',
            docName: '',
            time: '',
            pay: '',
            patientName: ''
        },
        patientList: [
            {
                name: '小明',
                d: 1
            },
            {
                name: '小红',
                d: 0
            },
            {
                name: '小雪',
                d: 0
            }
        ]
    },
    mutations: {
        changeDepart(state, obj) {
            let arr = ['内科', '外科', '男科', '妇科', '口腔科', '胸外科', '骨科', '复健科'];

            let inx = Math.floor(Math.random() * 3);

            state.departName = arr.slice(inx);
            state.chooseHosArea = obj.chooseHosArea;
        },
        setChooseDepart(state, obj) {
            state.chooseDepart = obj.chooseDepart;
        },
        setPatientDetail(state, obj) {
            let data = state[obj.type][obj.index].detail[obj.i];

            let date = new Date();

            state.patientDetail.type = obj.type === 'doctorExpert' ? '专家' : '普通';
            state.patientDetail.docName = state[obj.type][obj.index].name;
            state.patientDetail.pay = data.pay;
            state.patientDetail.time = +date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + data.time;
            state.patientList.forEach((val) => {
                if (val.d === 1) {
                    state.patientDetail.patientName = val.name;
                }
            });
        },
        setPatientDetailName(state, obj) {
            state.patientDetail.patientName = obj.people;
            state.patientList.forEach((val, inx) => {
                inx === obj.i ? val.d = 1 : val.d = 0;
            });
        }
    }
});

export { store as default, mapState };