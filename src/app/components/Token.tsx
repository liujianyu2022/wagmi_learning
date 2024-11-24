
import {
    useAccount,
    useConnect,
    useDisconnect,
    useSwitchChain,
    useBalance
} from 'wagmi'

const tokenAddress = ""

export default function Token() {

    const {address: userAddress} = useAccount()

    const {data: tokenBalance} = useBalance({
        address: userAddress,
        token: tokenAddress
    })

    return (
        <div>
            tokenBalance: {tokenBalance?.formatted} {tokenBalance?.symbol}
        </div>
    )
}