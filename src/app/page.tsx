'use client'

import { useEffect, useState } from 'react'
import { Address, formatUnits } from 'viem'

import {
  useAccount,                   // 获取账户信息（地址、链 ID 等）
  useConnect,                   // 管理钱包连接的状态，提供连接器和连接操作
  useDisconnect,                // 用于断开钱包连接
  useSwitchChain,
  useSwitchAccount,
  useBalance,
  Connector
} from 'wagmi'

import SendETH from './components/SendETH'
import LIUToken from './components/LIUToken'

function App() {
  const [userAddress, setUserAddress] = useState<Address>()

  const account = useAccount()
  const { switchAccount } = useSwitchAccount()              // 使用 useSwitchAccount hook

  const { connectors, connect, status, error } = useConnect()           // 提供了多个连接器（如 MetaMask、Coinbase Wallet 等），connect 用于连接钱包
  const { chains, switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect()

  const { data: userBanalce } = useBalance({ address: userAddress })


  useEffect(() => {
    if (account && account.address) {
      setUserAddress(account.address)                                   // 指向当前钱包中使用的账户
    } else {
      setUserAddress("0x")
    }
  }, [account])

  const handleSwitchAccount = (connector: Connector) => {
    switchAccount({ connector })
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          <div>status: {account.status}</div>
          <div>current address: {account.address}</div>
          <div>addresses: {JSON.stringify(account.addresses)}</div>
          <div>chainId: {account.chainId}</div>
          <div>balance: {userBanalce ? `${formatUnits(userBanalce.value, 18)} ${userBanalce.symbol}` : "Loading..."}</div>
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>Disconnect</button>
        )}

        {connectors.map((connector) => (
          <button key={connector.id} onClick={() => switchAccount({ connector })}>
            {connector.name}
          </button>
        ))}
      </div>



      <hr />
      <div>
        <div>switch network</div>
        {
          chains.map(chain => (
            <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>{`${chain.id} - ${chain.name}`}</button>
          ))
        }
      </div>

      <hr />
      <div>
        <p>SendETH</p>
        <SendETH />
      </div>
      <hr />

      <div>
        <p>LIU TOKEN</p>
        <LIUToken />
      </div>

      <hr />

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
