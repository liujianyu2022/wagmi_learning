
import { type BaseError, useSendTransaction } from "wagmi"
import { parseEther } from "viem"

export default function SendETH() {
    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction()

    const sendETH = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const to = formData.get('address') as `0x${string}`
        const value = formData.get('value') as string

        sendTransaction({
            to,                                     // account2     0x5d1901eEF7c441Fcb2D144aEd32cA33D99842442
            value: parseEther(value)
        })
    }

    return (
        <div>
            <form onSubmit={sendETH}>
                <div>
                    address: <input name="address" placeholder="0xA0Cf…251e" required />
                </div>
                <div>
                    value: <input name="value" placeholder="0.05" required />
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Confirming...' : 'Send'}
                </button>
            </form>
            <div>
                {
                    hash && <div>hash: {hash}</div>
                }
                {
                    error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                }
            </div>
        </div>
    )
}
