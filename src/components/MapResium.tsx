import { Viewer } from "resium";
import { Ion, createWorldTerrain } from "cesium";

const MapResium = () => {
    // Le token Cesium pour avoir accès a la planete etc ...
    Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDE1MWZkNy03ODA2LTQ1ZGUtYTU0Ny0wODk4YjJmNjRlNjgiLCJpZCI6MTM2MDM2LCJpYXQiOjE2ODI2Nzg0MTJ9.iHoaBQzYta71j7qcvnIAMkqQBowphzGGGnntMlqiCwI";
    const worldTerrain = createWorldTerrain();
    return (
        <div>
            <Viewer terrainProvider={worldTerrain} full>
                {/* <Entity position={position} point={pointGraphics} /> */}
            </Viewer>
        </div>
    );
};

export default MapResium;
