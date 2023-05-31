import {
    CameraFlyTo,
    Clock,
    Entity,
    PathGraphics,
    PointGraphics,
    Viewer,
} from "resium";
import {
    Ion,
    createWorldTerrain,
    Cartesian3,
    JulianDate,
    SampledPositionProperty,
    TimeIntervalCollection,
    TimeInterval,
    Color,
    VelocityOrientationProperty,
    IonResource,
} from "cesium";
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
    /* Initialiser l'horloge du visualiseur : */
    const timeStepInSeconds = 30; // Intervalle de temps en secondes entre chaque étape
    const totalSeconds = timeStepInSeconds * (data.length - 1); // Calcul du nombre total de secondes
    const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z"); // Définition de la date de début
    const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate()); // Calcul de la date de fin en ajoutant les secondes au début

    const positionProperty = new SampledPositionProperty();

    const airplaneLine = (
        <Entity
            availability={
                new TimeIntervalCollection([
                    new TimeInterval({ start: start, stop: stop }),
                ])
            }
            position={positionProperty}
            // point={{ pixelSize: 30, color: Color.GREEN }}
            model={{
                uri: "../../public/model/Cesium_Air.glb",
                minimumPixelSize: 128,
                maximumScale: 256,
            }}
            orientation={new VelocityOrientationProperty(positionProperty)}
            tracked
            selected>
            <PathGraphics width={3} />
        </Entity>
    );

    const flightData = data.map((item, index) => {
        // Déclare le temps pour cet échantillon individuel et le stocke dans une nouvelle instance de JulianDate.
        const time = JulianDate.addSeconds(
            start,
            index * timeStepInSeconds,
            new JulianDate()
        );
        const position = Cartesian3.fromDegrees(
            item.longitude,
            item.latitude,
            item.height
        );
        // Stocke la position avec son horodatage.
        // Ici, nous ajoutons les positions en une seule fois, mais elles peuvent être ajoutées en temps réel à mesure que les échantillons sont reçus depuis un serveur.
        positionProperty.addSample(time, position);
        return (
            <Entity key={index} position={positionProperty}>
                {" "}
                <PointGraphics pixelSize={10} />{" "}
            </Entity>
        );
    });

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
                {airplaneLine}
            </Viewer>
        </div>
    );
};

export default MapResium;
