import {loginWal, getBalance, getBalanceToken} from "../../api/user"
import {getTokenAddress} from "../../sdk/cheese-sdk";
import {trace} from "../../utils/tools";
import Global from "../../common/Global";

const getDefaultState = () => {
    return {
        config: {
            chain: "",
            chainID: 0,
        },
        account: "",
        balances: [],
        isLogin: false,
        curFryerAddress: "",
        curOvenAddress: "",
        curPoolAddress: "",
        cheesePools: [],
        curCheesePool: {},
        isMobile: false,
    }
}

const state = getDefaultState()

const mutations = {
    SET_MOBILE: (state, isMobile) => {
        state.isMobile = isMobile
    },
    SER_ACCOUTN: (state, account) => {
        state.account = account;
        if (account == "") {
            state.isLogin = false;
        }
    },
    SET_CONFIG: (state, config) => {
        state.config = config;
        state.isLogin = Global.configCheesePools(config.chainID);
        // state.isLogin = ((config.chainID == 97) || (config.chainID == 1))
    }
    ,
    SER_BALANCES: (state, balances) => {
        state.balances = []
        state.balances.push(balances);
    },
    SER_FRYER: (state, curFryerAddress) => {
        state.curFryerAddress = curFryerAddress
    },
    SET_OVEN: (state, curOvenAddress) => {
        state.curOvenAddress = curOvenAddress
    },
    SET_CHEESE: (state, curCheesePool) => {
        state.curPoolAddress = curCheesePool.token;
        state.curCheesePool = curCheesePool;
    },
    SET_CHEESEPOOLS: (state, cheesePools) => {
        state.cheesePools = cheesePools;
    },
}

const actions = {

    setMobile({commit}, isMobile) {
        commit('SET_MOBILE', isMobile);
    },
    // user login
    login({commit}, {type, callback}) {
        return new Promise((resolve, reject) => {
            let bf = async (data) => {
                // trace("upAccount",data)

                commit('SER_ACCOUTN', data.account);
                let {chain, chainID} = data;
                commit('SET_CONFIG', {chain, chainID});

                if (this.state.user.isLogin) {

                    commit("SER_BALANCES", {
                        symbol: "CHEESE",
                        address: getTokenAddress("CHEESE"),
                        balance: 0.00,
                    });
                    let cheese = {
                        symbol: "CHEESE",
                        address: getTokenAddress("CHEESE"),
                        balance: await getBalanceToken(getTokenAddress("CHEESE")),
                    }
                    trace("cheese-2", cheese)
                    commit("SER_BALANCES", cheese);
                }else{
                    reject("chainID-error")
                }

                if (callback) {
                    callback(data)
                }

            }
            loginWal(type, bf).then(async data => {
                // trace("type=",type,data)
                commit('SER_ACCOUTN', data.account);
                let {chain, chainID} = data;
                commit('SET_CONFIG', {chain, chainID});

                if (this.state.user.isLogin) {
                    commit("SER_BALANCES", {
                        symbol: "CHEESE",
                        address: getTokenAddress("CHEESE"),
                        balance: 0.00,
                    });
                    let cheese = {
                        symbol: "CHEESE",
                        address: getTokenAddress("CHEESE"),
                        balance: await getBalanceToken(getTokenAddress("CHEESE")),
                    }
                    commit("SER_BALANCES", cheese);

                    resolve(data)
                }else{
                    reject("chainID-error")
                }

            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({commit}) {
        window.localStorage.removeItem('walletconnect')
        commit('SER_ACCOUTN', "");
    },
    getBalance({commit}, address) {
        return new Promise((resolve, reject) => {
            getBalanceToken({address}).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    setFryer({commit}, address) {
        commit('SER_FRYER', address);
    },
    setOven({commit}, address) {
        commit('SET_OVEN', address);
    },
    setCheese({commit}, address, curCheesePool) {
        commit('SET_CHEESE', address, curCheesePool);
    },

    setPools({commit}, cheesePools) {
        commit('SET_CHEESEPOOLS', cheesePools);
    },

    saveLogin({commit}, data) {
        localStorage.setItem("login", JSON.stringify(data))
    },

    getLogin({commit}) {
        let obj = localStorage.getItem("login");
        if (obj) {
            obj = JSON.parse(obj)
        }
        return obj;
    },
    clearLogin({commit}) {
        localStorage.removeItem("login");
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

