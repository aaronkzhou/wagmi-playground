import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

function MintNFT() {
  const {
    config,
    error: prepareError,
    isError: isPrepareError
  } = usePrepareContractWrite({
    addressOrName: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    contractInterface: ['function mint()'],
    functionName: 'mint'
  });
  const { data, error, isError, write }: any = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && <div>Error: {(prepareError || error)?.message}</div>}
    </div>
  );
}

export default MintNFT;
