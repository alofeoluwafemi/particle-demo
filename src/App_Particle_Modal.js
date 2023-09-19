import "./App.css";

import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";

// export const App = () => {
//     return <ConnectButton />;
// };

// if you want to custom connet button, you can use ConnectButton.Custom.
function App() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                openChainModal,
                accountLoading,
            }) => {
                return (
                    <div>
                        <button onClick={openConnectModal} disabled={!!account}>
                            Open Connect
                        </button>
                        <br />
                        <br />
                        <button onClick={openAccountModal} disabled={!account}>
                            Open Account
                        </button>
                        <br />
                        <br />
                        <button onClick={openChainModal} disabled={!account}>
                            Open Switch Network
                        </button>
                        <div>
                            <h3>{account ? "account" : ""}</h3>
                            <p>{account}</p>
                        </div>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}

export default App;
