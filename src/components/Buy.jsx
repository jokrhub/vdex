import '../App.css';

import { useState } from 'react';
import { tokenList } from '../App';
import { useWeb3React } from "@web3-react/core";
import { dexabi, dex_v1 } from '../App';
import Web3 from 'web3';

export function Buy() {

    const { active, account, library, activate, deactivate } = useWeb3React();
    const [token_address, setTokenAddress] = useState(tokenList[0].address)
    const [expected_tokens, setExpectedTokens] = useState(0);
    
    const [ether, setEther] = useState("")

    async function buyTokens(ether, token_address) {
        // try {
            console.log(ether, token_address)
            const wei = library.utils.toWei(ether, 'ether')
            const contract = new library.eth.Contract(dexabi, dex_v1);
            const exchange_address = await contract.methods.get_exchange(token_address).call();
            const expected_tokens = await contract.methods.get_token_value(token_address, wei).call();
            setExpectedTokens(expected_tokens);
            
            console.log(exchange_address, expected_tokens)
            await contract.methods.buy(token_address).send({ from: account, value: wei });
        // }
        // catch (err) {
        //     console.log(err)
        // }

    }

    const get_tokens_value = async (ether) => {
        if (!ether) {
            setExpectedTokens(0);
            return
        }
        const contract = new library.eth.Contract(dexabi, dex_v1);
        const exchange_address = await contract.methods.get_exchange(token_address).call();
        const expected_tokens = await contract.methods.get_token_value(token_address, library.utils.toWei(ether, 'ether')).call();
        setExpectedTokens(expected_tokens);
    }


    return (
        <div className="swapBody">
            <h2> Buy </h2>

            <span> Select token: </span>
            <select value={token_address} onChange={(e) => setTokenAddress(e.target.value)}>
                {tokenList.map((option) => (
                    <option value={option.address}>{option.name}</option>
                ))}
            </select><br/>

            <span>  Ether (wei): </span> 
            <input type="text" value={ether} onChange={(e) => { setEther(e.target.value); get_tokens_value(e.target.value) }} ></input><br/> <br/>

            <span>Expected Tokens: {expected_tokens}</span>

            <div className="swapButtonContainer">
                {
                    <button type="button" onClick={() => buyTokens(ether, token_address)} className="main-mint-btn">Swap</button>
                }
            </div>
        </div>


    );

}

