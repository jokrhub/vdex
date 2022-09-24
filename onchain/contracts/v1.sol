// SPDX-License-Identifier: MIT-License

pragma solidity ^0.8.0;

// importing the interfaces
import "./interfaces/UniV1/IERC20.sol";
import "./interfaces/UniV1/IExchange.sol";
import "./interfaces/UniV1/IFactory.sol";

// importing the required contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Proxiable.sol";



// Uniswap ropsten addresses
library $
{
  address constant UniswapV1_FACTORY = 0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351;
}

// main contract
contract v1 is ERC20("VDex", "vd3x"), Proxiable  {
    // for proxy management 
    address public owner;
    bool public initalized = false;

    UniswapFactoryInterface factory;

    // initializer function (simulates the behaviour of constructor)
    function initialize() public {
        
        require(owner == address(0), "Already initalized");
        require(!initalized, "Already initalized");
        owner = msg.sender;
        initalized = true;

        // initializing the factor and router
        factory = UniswapFactoryInterface($.UniswapV1_FACTORY);
    }

    // to update the logic address
    function updateCode(address newCode) onlyOwner public {
        require(newCode != address(0), "Invalid Address");
        updateCodeAddress(newCode);
    }

    // modifier which checks the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }

    // returns the version of the current implementation
    function get_version() pure public returns(uint){
        return 1;
    }


    // to list a new ERC20 token to the exchange
    function create_exchange(address _token) public returns(address) {
        require(_token != address(0), "Invalid Address");
        return factory.createExchange(_token);
    }

    // get the exchange contract of a ERC20 Token
    function get_exchange(address _tokenAddress) public view returns(address) {
        require(_tokenAddress != address(0), "Invalid address");
        return factory.getExchange(_tokenAddress);
    }

    // get the token address of an exchange
    function get_token(address _exchangeAddress) public view returns(address) {
        require(_exchangeAddress != address(0), "Invalid address");
        return factory.getToken(_exchangeAddress);
    }

    // the integration 
    // to buy ERC20 tokens with ETH
    function buy(address _token) public payable {
        require(msg.value > 0, "Needed Eth");
        require(_token != address(0), "Invalid Address!");

        address _exchange = factory.getExchange(_token);
        UniswapExchangeInterface exchange = UniswapExchangeInterface(_exchange);

        uint tokenAmount = exchange.getEthToTokenOutputPrice(msg.value);
        exchange.ethToTokenTransferInput{value: msg.value}(tokenAmount, block.timestamp + 150, msg.sender);
    }

    // sell the tokens for ETH
    // approve contract address to transfer the tokens
    function sell(address _token, uint _tokens) public {
        require(_token != address(0), "Invalid Address!");
        require(_tokens > 0, "0 tokens can't be sold");

        address _exchange = factory.getExchange(_token);
        UniswapExchangeInterface exchange = UniswapExchangeInterface(_exchange);

        uint amount = exchange.getTokenToEthInputPrice(_tokens);

        IERC20(_token).transferFrom(msg.sender, address(this), _tokens);
        IERC20(_token).approve(_exchange, _tokens);

        exchange.tokenToEthTransferInput(_tokens, amount, block.timestamp + 150, payable(msg.sender));
    }

    // add liquidity hepler method to approve the nos of tokens
    // returns the no of tokens that should be approved before adding liquidity
    function approve_before_add(address _token, uint value) public view returns(uint) {
        require(_token != address(0), "Invalid Address!");

        address _exchange = factory.getExchange(_token);        
        uint eth_reserve = _exchange.balance;
        uint token_reserve = IERC20(_token).balanceOf(_exchange);
        return value * token_reserve / eth_reserve + 1;
    }

    // add liquidity
    // approve contract address to transfer the tokens
    function add_liquidity(address _token) public payable {
        require(msg.value > 0, "Needed Eth");
        require(_token != address(0), "Invalid Address!");

        address _exchange = factory.getExchange(_token);
        UniswapExchangeInterface exchange = UniswapExchangeInterface(_exchange);

        uint eth_reserve = _exchange.balance;
        uint token_reserve = IERC20(_token).balanceOf(_exchange);
        uint token_amount = msg.value * token_reserve / eth_reserve + 1;

        uint total_liquidity = exchange.totalSupply();
        uint liquidity_minted = msg.value * total_liquidity / eth_reserve;

        IERC20(_token).transferFrom(msg.sender, address(this), token_amount);
        IERC20(_token).approve(_exchange, token_amount);

        exchange.addLiquidity{value: msg.value}(liquidity_minted, token_amount, block.timestamp + 150);
        exchange.transfer(msg.sender,liquidity_minted);
    }

    // to remove liquidity from the exchange
    // approve the contract the `amount` to transfer
    function remove_liquidity(address _token, uint amount) public {
        address _exchange = factory.getExchange(_token);
        UniswapExchangeInterface exchange = UniswapExchangeInterface(_exchange);

        IERC20(_exchange).transferFrom(msg.sender, address(this), amount);

        uint total_liquidity = IERC20(_exchange).totalSupply();
        uint token_reserve = IERC20(_token).balanceOf(_exchange);
        uint eth_amount = amount * address(_exchange).balance / total_liquidity;
        uint token_amount = amount * token_reserve / total_liquidity;

        (uint eth, uint tokens) = exchange.removeLiquidity(amount, eth_amount , token_amount , block.timestamp + 150);
        
        payable(msg.sender).transfer(eth);
        IERC20(_token).transfer(msg.sender, tokens);
    }

    // to exchange the tokens
    // approve the contract to transer the tokens
    function exchange_token(address _tokenA, address _tokenB, uint _tokens) public {
        address exchangeA_address = factory.getExchange(_tokenA);
        UniswapExchangeInterface exchangeA = UniswapExchangeInterface(exchangeA_address);

        IERC20(_tokenA).transferFrom(msg.sender, address(this), _tokens);
        IERC20(_tokenA).approve(address(exchangeA), _tokens);

        uint eth_bought = exchangeA.getTokenToEthInputPrice(_tokens);
        // min_tokens bought is set to 1 by default
        exchangeA.tokenToTokenTransferInput(_tokens, 1, block.timestamp + 150, eth_bought, msg.sender, _tokenB);
    }

    // to recieve ether for remove_liquidity function
    receive() external payable {}
}

