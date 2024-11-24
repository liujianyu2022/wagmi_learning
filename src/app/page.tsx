'use client'

import { useEffect, useState } from 'react'
import { Address } from 'viem'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useBalance
} from 'wagmi'

import SendETH from './components/SendETH'

function App() {
  const [userAddress, setUserAddress] = useState<Address>()

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { chains, switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect()

  const { data: userBanalce } = useBalance({ address: userAddress })


  useEffect(() => {
    if (account && account.address) {
      setUserAddress(account.address)
    } else {
      setUserAddress("0x")
    }
  }, [account])

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          <div>status: {account.status}</div>
          <div>addresses: {JSON.stringify(account.addresses)}</div>
          <div>chainId: {account.chainId}</div>
          <div>balance: {`${userBanalce?.formatted} ${userBanalce?.symbol}`}</div>
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        {
          chains.map(chain => (
            <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
              {`${chain.id} - ${chain.name}`}
            </button>
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
