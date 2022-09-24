import '../App.css';

import { useState } from 'react';
import { tokenList } from '../App';
import { useWeb3React } from "@web3-react/core";
import { dexabi, dex_v1 } from '../App';

export function TokenToToken() {

    const { active, account, library, activate, deactivate } = useWeb3React();
    const [from_token_address, setFromTokenAddress] = useState(tokenList[0].address)
    const [to_token_address, setToTokenAddress] = useState(tokenList[0].address)
    const [tokens, setTokens] = useState("")

    async function swapTokenToToken(from_token_address, to_token_address, tokens) {
        try {
          console.log(tokens, from_token_address, to_token_address)
          // const contract = new library.eth.Contract(dexabi, dex_v1);
          // const exchange_address = await contract.methods.get_exchange(token_address).call();
          // console.log(exchange_address)
          // let data = await contract.methods.swap_token_to_eth(tokens, exchange_address, 1).send({ from: account });
        }
        catch (err) {
          console.log(err)
        }

      }

    return (

        <div className="swapBody">
            <span> From: </span>
            <select value={from_token_address} onChange={(e) => setFromTokenAddress(e.target.value)}>
                {tokenList.map((option) => (
                    <option value={option.address}>{option.name}</option>
                ))}
            </select><br/>

            <span> From Amount: </span> 
            <input type="text" value={tokens} onChange={(e) => { setTokens(e.target.value) }} ></input><br/> <br/>

            <span> To: </span>
            <select value={to_token_address} onChange={(e) => setToTokenAddress(e.target.value)}>
                {tokenList.map((option) => (
                    <option value={option.address}>{option.name}</option>
                ))}
            </select> <br/>

            {/* <span> To Amount: </span>
            <input type="text" value={toAmount} onChange={(e) => { setToAmount(e.target.value) }}></input> <br/> */}

            <div className="swapButtonContainer">
                {

                    <button type="button" onClick={() => {swapTokenToToken(from_token_address, to_token_address, tokens)}} className="main-mint-btn">Swap</button>
                }
            </div>
        </div>


    );

}

