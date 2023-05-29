import { CameraFlyTo, Clock, Entity, PointGraphics, Viewer } from "resium";
import { Ion, createWorldTerrain, Cartesian3, JulianDate } from "cesium";
import data from "./data/data.json";

const MapResium = () => {
    // Le token Cesium pour avoir accès a la planete etc ...
    Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDE1MWZkNy03ODA2LTQ1ZGUtYTU0Ny0wODk4YjJmNjRlNjgiLCJpZCI6MTM2MDM2LCJpYXQiOjE2ODI2Nzg0MTJ9.iHoaBQzYta71j7qcvnIAMkqQBowphzGGGnntMlqiCwI";
    const worldTerrain = createWorldTerrain();
    const dataPoint = {
        longitude: -122.38985,
        latitude: 37.61864,
        height: -27.32,
    };

    const flightData = data.map((item, index) => (
        <Entity
            key={index}
            position={Cartesian3.fromDegrees(
                item.longitude,
                item.latitude,
                item.height
            )}>
            {" "}
            <PointGraphics pixelSize={10} />{" "}
        </Entity>
    ));
    /* Initialiser l'horloge du visualiseur : */
    const timeStepInSeconds = 30; // Intervalle de temps en secondes entre chaque étape
    const totalSeconds = timeStepInSeconds * (data.length - 1); // Calcul du nombre total de secondes
    const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z"); // Définition de la date de début
    const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate()); // Calcul de la date de fin en ajoutant les secondes au début

    return (
        <div>
            <Viewer terrainProvider={worldTerrain} full>
                <Clock
                    startTime={start.clone()}
                    stopTime={stop.clone()}
                    currentTime={start.clone()}
                    multiplier={50}
                    shouldAnimate={true}
                />
                {flightData}
            </Viewer>
        </div>
    );
};

export default MapResium;
