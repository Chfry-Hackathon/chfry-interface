import { Trace, addMetamaskChain as _addMetamaskChain, toPrecision as _toPrecision, logout as _logout, connect as _connect, getBalance as _getBalance, isETHAddress as _isETHAddress } from "./lib.utils";
export declare const T: typeof Trace;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const logout: typeof _logout;
export declare const connect: typeof _connect;
export declare const getBalance: typeof _getBalance;
export declare const toPrecision: typeof _toPrecision;
export declare const isETHAddress: typeof _isETHAddress;
export declare const addMetamaskChain: typeof _addMetamaskChain;
export declare var rankList: {
    data: [];
};
/**
 * 根据token symbol获取address
 * @param token_symbol
 * @returns
 */
export declare function getTokenAddress(token_symbol: string): string;
/**
 * 设置合约地址
 * @param key
 * @param obj
 */
export declare function setContractAddress(key: "1" | "97", obj: any): void;
/**
 * 设置token地址
 * @param key
 * @param obj
 */
export declare function setTokensAddress(key: "1" | "97", obj: any): void;
/**
 * 根据token address,获取symbol
 * @param token_address
 * @returns
 */
export declare function getTokenSymbol(token_address: string): string;
/**
 * 获取pool授权值
 * @param token_address
 * @param otherToken
 * @param type
 * @returns
 */
export declare function getPoolAllowance(token_address: string, otherToken: string, type: "fryer" | "cheese" | "team" | "oven"): Promise<string | undefined>;
/**
 * 获取pool的信息
 * @param token_address pool address
 * @returns
 */
export declare function getPoolinfo(token_address: string): Promise<{
    data: {
        balance: string;
        maxDebt: number;
        TotalDebt: string;
        maxWithdraw: string | number;
        TotalDeposited: string;
        TotalCredit: string;
    };
}>;
/**
 * 拿闪电贷额度
 * @returns
 */
export declare function maxFlashLoan(): Promise<{
    data: {
        USDC: string;
        USDT: string;
        DAI: string;
        totalCheeseClaimed: string;
    };
}>;
export declare function getCheeseEthLpPrice(): Promise<string>;
/**
 * 拿stake pools
 * @returns
 */
export declare function getStakePools(): Promise<{
    data: {
        pid: any;
        weight: any;
        token: any;
        symbol: any;
        totalAmount: string;
        apr: any;
        lastBlockTimeStamp: any;
    }[];
}>;
/**
 * 用户对应pool收益信息
 * @param pid pool编号
 * @returns
 */
export declare function getUserStakeInfo(pid: string): Promise<{
    data: {
        amount: string;
        debt: string;
        income: string;
        reward: string;
        totalIncome: string;
    };
}>;
/**
 * tema stake 信息
 * @returns
 */
export declare function getTeamStakeInfo(): Promise<{
    data: {
        amount: string;
        debt: string;
        income: string;
        reward: string;
        totalIncome: string;
    };
}>;
/**
 * 拿ovenpool的信息
 * @param token_address
 */
export declare function getOvenPoolInfo(token_address: string): Promise<{
    data: {
        buffer: string;
        totalSupplyFriesTokens: string;
        EXCHANGE_PERIOD: any;
        ESTIMATED_DAILY_YIELD: number;
        pendingdivs: string;
        depositedAl: string;
        inbucket: string;
        realised: string;
        exchangeAmount: number;
        GrillableTokens: number;
        withdrawAmount: string;
    };
}>;
/**
 * 对token pool授权
 * @param token_address  pool token
 * @param otherToken
 * @param callback
 */
export declare function approvePoolToken(token_address: string, otherToken: string, type: "fryer" | "cheese" | "team" | "oven", callback: (code: number, hash: string) => void): Promise<void>;
/**
 * deposit 存(dai/usdt/usdc)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
export declare function deposit(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * withdraw 取(dai/usdt/usdc)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
export declare function withdraw(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * borrow 借币(friesUsd)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
export declare function borrow(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * liquidate 用我抵押的钱（dai/usdt/usdc）来还借出来的(friesUsd)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
export declare function liquidate(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * repay （dai/usdt/usdc）+friesUsd 还款
 * @param token_address pool address
 * @param amount
 * @param amountfries
 * @param callback
 */
export declare function repay(token_address: string, amount: string, amountfries: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 用户质押
 * @param pid 编号
 * @param amount
 * @param callback
 */
export declare function userStake(pid: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 *  用户取出
 * @param pid
 * @param amount
 * @param callback
 */
export declare function userUnstake(pid: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 收取收益
 * @param pid
 * @param callback
 */
export declare function userClaim(pid: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * teamStake
 * @param amount
 * @param callback
 */
export declare function teamStake(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * teamUnstake
 * @param amount
 * @param callback
 */
export declare function teamUnstake(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * teamClaim
 * @param callback
 */
export declare function teamClaim(callback: (code: number, hash: string) => void): Promise<void>;
/**
 * oven ovenStake
 * @param amount
 * @param callback
 */
export declare function ovenStake(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * oven ovenUnstake
 * @param amount
 * @param callback
 */
export declare function ovenUnstake(token_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * oven ovenExchange
 * @param callback
 */
export declare function ovenExchange(token_address: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * oven转换
 * @param token_address
 * @param callback
 */
export declare function exchange(token_address: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * oven收割
 * @param token_address
 * @param callback
 */
export declare function claim(token_address: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * test
 * @param callback
 */
export declare function test(callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 获取闪电贷列表
 * @param offset
 * @param size
 * @returns
 */
export declare function flashLoanList(offset: number, size: number): Promise<{
    data: {
        startTime: number;
        endTime: number;
        reward: string;
        flashloan: string;
        index: string;
        claimed: boolean;
    }[];
}>;
/**
 * 获取闪电贷总领取的收益
 * @returns
 */
export declare function flashTotalClaimeds(): Promise<{
    data: string;
}>;
/**
 * 根据期领取收益
 * @param index 列表中的index
 * @param callback
 */
export declare function flashLoanClaimed(index: string, callback: (code: number, hash: string) => void): Promise<void>;
