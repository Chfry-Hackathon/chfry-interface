/**
 *
 * @param type "walletconnect" | "metamask" | "huobiwallet" | "mathwallet" | "tokenpocket"
 * @param callback
 * @returns {Promise<any>}
 */
import {connect, getBalance} from "../sdk/cheese-sdk";
import {trace} from "../utils/tools";

export function loginWal(type,callback){

    return new Promise((resolve, reject)=>{
        connect(type,(res)=>{

            if(callback) callback(res);
        }).then((data)=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        })
    })
}

export function getBalanceToken(address){
    return new Promise((resolve, reject)=>{
        getBalance(address).then((balance) => {
            resolve(balance)
        }).catch(err=>{
            reject(err);
        })
    })
}

