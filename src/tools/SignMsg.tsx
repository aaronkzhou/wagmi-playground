import * as React from 'react';
import { useSignMessage } from 'wagmi';
import { utils } from 'ethers';

function SignMessage() {
  const recoveredAddress = React.useRef<string>();

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = utils.verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    }
  });

  return (
    <form
      onSubmit={(event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message: any = formData.get('message');
        console.log('shitfffff')
        signMessage({ message });
      }}
    >
      <label htmlFor='message'>Enter a message to sign</label>
      <textarea id='message' name='message' placeholder='The quick brown fox…' />
      <button disabled={isLoading}>{isLoading ? 'Check Wallet' : 'Sign Message'}</button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}

export default SignMessage;
