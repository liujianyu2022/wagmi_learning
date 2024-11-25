import { http, cookieStorage, createConfig, createStorage } from 'wagmi'

import { mainnet, sepolia, avalancheFuji } from 'wagmi/chains'

import { 
  coinbaseWallet, 
  injected,                 // 浏览器扩展（如 MetaMask）提供的钱包连接
  walletConnect             // 通过 QR 码扫描连接移动钱包
} from 'wagmi/connectors'

export function getConfig() {
  return createConfig({

    // 指定支持的区块链网络
    chains: [mainnet, sepolia, avalancheFuji],      

    // 指定用于连接钱包的选项，包含了三种连接器
    connectors: [                                                                     
      injected(),                                                                     // 自动检测并连接浏览器扩展钱包（如 MetaMask）
      coinbaseWallet(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "" }),      // 连接支持 WalletConnect 协议的钱包
    ],

    // 指定存储方式，使用 cookieStorage 将配置信息存储在 cookies 中
    storage: createStorage({                            
      storage: cookieStorage,
    }),

    // 启用服务器端渲染支持（SSR）
    ssr: true,

    // 定义每个链的 HTTP 请求传输方式
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [avalancheFuji.id]: http(), 
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
