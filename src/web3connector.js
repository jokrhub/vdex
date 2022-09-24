
import { useWeb3React } from "@web3-react/core";


const _contract_ = async () => {
    const {active, account, library, activate, deactivate } = await useWeb3React();
    return {active: active, account: account, library: library, activate: activate, deactivate: deactivate}
}
export const Truffle = _contract_();

