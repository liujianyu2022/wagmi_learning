
import { useSendTransaction } from "wagmi"
import { parseEther } from "viem"

export default function SendETH(){
    const {data: hash, isPending, sendTransaction} = useSendTransaction()

    const sendETH = () => {
        sendTransaction({
            to: "0x5d1901eEF7c441Fcb2D144aEd32cA33D99842442",           // account2
            value: parseEther("0.01")
        })
    }

    return (
        <div>
            <button onClick={sendETH}>SendETH</button>
            <div>
                {
                    hash && <span>hash: {hash}</span>
                }
            </div>
        </div>
    )
}
