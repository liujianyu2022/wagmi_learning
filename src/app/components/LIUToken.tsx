
import {
    useAccount,
    useConnect,
    useDisconnect,
    useSwitchChain,
    useBalance,

    useReadContract,
} from 'wagmi'

import { formatUnits } from "viem"

const tokenAddress = "0x1eeE1BeC29094CD94fb9c6b26c0441f0294c2498"                   // 这是部署在sepolia链上的 LIU TOKEN

// ERC20的人类可读abi
// 如果合约的构造函数有参数，那么在abi中必须包含构造函数
// const abiERC20 = [
//     "constructor(string memory _name, string memory _symbol)",        // ERC20的构造函数含有参数，因此我们必须把它包含在ABI中
//     "function name() view returns (string)",
//     "function symbol() view returns (string)",
//     "function totalSupply() view returns (uint256)",
//     "function balanceOf(address) view returns (uint)",
//     "function transfer(address to, uint256 amount) external returns (bool)",
//     "function mint(uint amount) external",
// ];

const abiERC20 = [
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ type: 'address', name: 'account' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }],
    },
  ] as const

export default function LIUToken() {

    const { address: currentAddress } = useAccount()                                // 获取当前连接的账户地址

    const { data: tokenBalance } = useBalance({
        address: currentAddress,
        token: tokenAddress
    })

    // 使用 wagmi 的 useContractRead hook 读取 balanceOf
    const { data: balance, isLoading, isError } = useReadContract({
        abi: abiERC20,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [ currentAddress! ],                               // 要查询余额的账户地址
    });

    return (
        <div>
            <div>
                tokenBalance: {tokenBalance ? `${formatUnits(tokenBalance.value, 18)} ${tokenBalance.symbol}` : "Loading..."}
            </div>
            <div>
                balance: {balance ? `${formatUnits(balance, 18)}` : "Loading..."}
            </div>

        </div>
    )
}