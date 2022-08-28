import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export function Profile() {
  const { address, connector, isConnected }: any = useAccount();
  const { data: ensAvatar }: any = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect }: any = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar} alt='ENS Avatar' />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector?.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
