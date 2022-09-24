
import { injected } from "./wallet/Connector";
import web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { Buy } from "./components/Buy";
import { Sell } from "./components/Sell"
import { TokenToToken } from "./components/TokenToToken";

export const tokenList = require('./tokenList.json');
export const dexabi = require('./dexabi.json');
export const dex_v1 = "0xD163C162229CAc2c6C308c18De5DB81F239c73e2";

function App() {

  const { active, account, library, activate, deactivate } = useWeb3React();


  async function connect() {
    try {
      await activate(injected);
      console.log("Connected")
    } catch (ex) {
      console.log(ex)
    }
  }
  async function disconnect() {
    try {
      deactivate()
      console.log("Disconnected")
    } catch (ex) {
      console.log(ex)
    }
  }



  // async function addLiquidity(token_address, ether, max_tokens) {
  //   try {
  //     console.log(fromToken)
  //     console.log(toToken)
  //     console.log(fromAmount)
  //     console.log(toAmount)
  //     const contract = new library.eth.Contract(dexabi, dex_v1);
  //     const exchange_address = await contract.methods.get_exchange(token_address).call();
  //     // console.log(exchange_address)
  //     let data = await contract.methods.addLiquidity(exchange_address, 1, max_tokens).send({ from: account, value: web3.utils.toWei(ether, 'ether') });
  //     console.log(data)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }

  // }

  return (
    <div className="App">
            <div className="appNav">
            
                <div className="my-2 buttonContainer buttonContainerTop">
                </div>

                <div className="rightNav">
                    <div className="connectButtonContainer">

                        {
                            account == undefined
                                ? <button type="button" onClick={() => connect()} className="main-mint-btn">Connect Wallet</button>
                                : <button type="button" onClick={() => disconnect()} className="main-mint-btn">Connected</button>
                        }
                    </div>
                    <div className="my-2 buttonContainer">
                    </div>
                </div>
            </div>
            <div className="appBody">
                <div className="swapContainer">
                   <Buy/>
                </div>
                <div className="swapContainer">
                   <Sell/>
                </div>
                <div className="swapContainer">
                  <TokenToToken/>
                </div>
            </div>
        </div>
  )
}


export default App;