import "./App.css";

import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
    useAsset,
    Player,
    Broadcast,
} from "@livepeer/react";

const client = createReactClient({
    provider: studioProvider({
        apiKey: process.env.REACT_APP_LIVEPEER_API_KEY,
    }),
});

function BroadcastComponent() {
    return (
        <Broadcast
            title="You are Live"
            streamKey="9b79-0ly3-blsp-l2sh"
            displayMediaOptions={{
                video: {
                    width: {
                        ideal: 1280,
                    },
                },
            }}
        />
    );
}

const PosterImage = () => {
    return (
        <img
            src="./blender-poster.webp"
            style={{ width: "100%", height: "100%" }}
            alt="Video player poster"
        />
    );
};

function SomeComponent() {
    const asset = useAsset({ assetId: "0eff0943-a52e-49ef-bdcf-5abae34a85e6" });

    return <div>Asset: {asset.data.name}</div>;
}

function PlayerComponent() {
    const asset = useAsset({ assetId: "0eff0943-a52e-49ef-bdcf-5abae34a85e6" });

    return (
        <Player
            title="Kitchen Sink Setup"
            playbackId={asset.data.playbackId}
            poster={<PosterImage />}
            showPipButton
            objectFit="cover"
            priority
        />
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <LivepeerConfig client={client}>
                    <h1>Livepeering!</h1>
                    {/* <PlayerComponent /> */}
                    <BroadcastComponent />
                </LivepeerConfig>
            </header>
        </div>
    );
}

export default App;
