'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { getConfig } from '../wagmi'

export function Providers(props: { children: ReactNode, initialState?: State}) {
  const {children, initialState} = props

  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())           // 创建一个新的 QueryClient 实例，这是 react-query 用来管理和缓存请求的客户端对象

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
