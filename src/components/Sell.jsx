import '../App.css';

import { useState } from 'react';
import { tokenList } from '../App';
import { useWeb3React } from "@web3-react/core";
import { dexabi, dex_v1 } from '../App';

export function Sell() {

    const { active, account, library, activate, deactivate } = useWeb3React();
    const [token_address, setTokenAddress] = useState(tokenList[0].address)
    const [tokens, setTokens] = useState("")

      async function sellTokens(tokens, token_address) {
          try {
            console.log(tokens, token_address)
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
            <h2> Sell </h2>

            <span> Select token: </span>
            <select value={token_address} onChange={(e) => setTokenAddress(e.target.value)}>
                {tokenList.map((option) => (
                    <option value={option.address}>{option.name}</option>
                ))}
            </select><br/>

            <span>  Tokens (wei): </span> 
            <input type="text" value={tokens} onChange={(e) => { setTokens(e.target.value) }} ></input><br/> <br/>



            <div className="swapButtonContainer">
                {
                    <button type="button" onClick={() => sellTokens(tokens, token_address)} className="main-mint-btn">Swap</button>
                }
            </div>
        </div>


    );

}

