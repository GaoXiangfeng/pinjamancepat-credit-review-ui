import * as types from './type'
const state = {
    //国际化标记
    language: 'cn',
    //二级面包屑
    currentPath: 'dashboard',
    //三级面包屑
    thirdBread: '',
    isMoreMinutes: false,//是否超过三天案件提醒
    //订单列表查询条件
    form: {
        status: '-1',
        field: '-1',
        content: '',
        sort: 'DESC',
        sortBy: 'createTime',
        page: 1,
        pageSize: 20,
        from: '',
        to: '',
        time: [],
    },

}

const actions = {
    change_language ({commit}, language) {
        commit(types.CHANGE_LANGUAGE, language)
    },
    change_current_path ({commit}, currentPath) {
        commit(types.CHANGE_CURRENT_PATH, currentPath)
    },
    change_bread ({commit}, bread) {
        commit(types.CHANGE_THIRD_BREAD, bread)
    },
    change_form ({commit}, form) {
        commit(types.CHANGE_FORM, form)
    },
}

const mutations = {
    [types.CHANGE_LANGUAGE](state, language){
        state.language = language
    },
    [types.CHANGE_CURRENT_PATH](state, currentPath){
        state.currentPath = currentPath
    },
    [types.CHANGE_THIRD_BREAD](state, bread){
        state.thirdBread = bread
    },
    [types.CHANGE_FORM](state, form){
        state.form = form
    },
    [types.MORE_THAN_THREEDAYS](state, data){//释放30分钟前进行提醒
        state.isMoreMinutes = data
    },
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}
