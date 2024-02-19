import { useEffect, useState } from "react";
import { BackToHeader } from "../components/BackToHeader";
import { RouteColorPaint } from "../components/parcelPlanning/RouteColorPaint";
import { Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useForm } from "react-hook-form";
import { useAdminTodayParcels } from "../hooks/useAdminTodayParcels";
import {
  APIProvider,
  Map,
  Marker as GMarker,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

const defaultMarkerColor = "#E04531";

const markerIconFactory = (color: string) => ({
  path: "M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z",
  fillColor: color,
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 1,
});

export const generateRandomColor = (existingColors: string[]): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (existingColors.includes(color));

  return color;
};

const deliverySchedule = [
  {
    color: "#E08538",
    label: "Route 1",
  },
  {
    color: "#56220b",
    label: "Route 2",
  },
];

// Example of a marker props
const center = {
  id: 1,
  geo: {
    lat: 43.89,
    lng: -79.29,
  },
};

type Schedule = {
  color?: string;
  label?: string;
  routes?: any[];
};

type ControlsProps = {
  onDrawComplete: (e: any) => void;
};
const Directions = () => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  const leg = routes[0]?.legs[0];
  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionRenderer) return;

    directionsService
      .route({
        origin: "3320 Midland Ave, Scarborough, ON M1V 4A7",
        destination: "500 College St, Toronto, ON",
        waypoints: [
          { location: "190 Borough Dr, Scarborough, ON M1P 0B6" },
          { location: "14 Cornerstone Road Markham ON CA" },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
        region: "ca",
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
        unitSystem: google.maps.UnitSystem.METRIC,
      })
      .then((response) => {
        console.log(response);
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionRenderer]);
  if (!leg) return null;

  return <div />;
};

const Controls = ({ onDrawComplete }: ControlsProps) => {
  const drawing = useMapsLibrary("drawing");
  const core = useMapsLibrary("core");
  const map = useMap();
  const [drawingManager, setDrawingManager] = useState<any>(null);

  useEffect(() => {
    if (drawing && core && !drawingManager) {
      const manager = new drawing.DrawingManager({
        drawingMode: drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: core?.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
      });

      setDrawingManager(manager);
    }
  }, [drawing, core, drawingManager, map]);

  useEffect(() => {
    if (drawingManager && map) {
      drawingManager.setMap(map);
    }
  }, [drawingManager, map]);

  useEffect(() => {
    if (core && drawingManager) {
      core.event.addListener(
        drawingManager,
        "rectanglecomplete" as any,
        (e: any) => {
          onDrawComplete(e);
          drawingManager.setDrawingMode(null);
          e.setMap(null);
        }
      );
    }
  }, [drawingManager, core, onDrawComplete]);

  return <div className="directions" />;
};

export const ParcelPlaning = () => {
  const [schedules, setSchedules] = useState(deliverySchedule);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({});
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  //   region: "ca",
  // });

  const { data: parcels } = useAdminTodayParcels();

  const [mapParcels, setMapParcels] = useState<any[]>([]);

  useEffect(() => {
    if (parcels && parcels.length > 0 && mapParcels.length < 1) {
      const tParcels = parcels.map((p: any) => {
        return {
          id: p._id,
          geo: p.geo.geometry.location,
          color: defaultMarkerColor,
        };
      });

      setMapParcels(tParcels);
    }
  }, [parcels, mapParcels]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ newRouteName: string }>();

  const [routes, setRoutes] = useState([]);

  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(
  //   (map: any) => {
  //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //     // Use default center
  //     if (mapParcels && mapParcels.length > 0) {
  //       const bounds = new window.google.maps.LatLngBounds(mapParcels[0].geo);
  //       mapParcels.map((i: any) => {
  //         bounds.extend(i.geo);
  //       });
  //       map.fitBounds(bounds);
  //       setMap(map);
  //     }
  //   },
  //   [mapParcels],
  // );

  // const onUnmount = useCallback((map: any) => {
  //   setMap(null);
  // }, []);

  //Add drag to select parcels on google maps

  const handleMarkerClick = (parcel: any) => {
    setMapParcels((currMapParcels) => [
      ...currMapParcels.filter((p: any) => p.id !== parcel.id),
      { ...parcel, color: selectedSchedule.color },
    ]);
  };

  return (
    <>
      <div>
        <BackToHeader />
      </div>
      <br />

      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={center.geo}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          clickableIcons: false,
          mapId: "1dae4956060d6c81",
        }}
      >
        <>
          {mapParcels?.length > 0 &&
            mapParcels.map((p: any) => (
              <Marker
                position={p.geo}
                // label={p.label}
                // opacity={p.opacity}
                icon={markerIconFactory(p.color)}
                key={p.id}
                onClick={() => handleMarkerClick(p)}
              />
            ))}
        </>
      </GoogleMap> */}
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY || ""}
        region="ca"
      >
        <Map
          center={center.geo}
          zoom={9}
          mapId={"1dae4956060d6c81"}
          disableDefaultUI
          disableDoubleClickZoom
          clickableIcons={false}
        >
          <>
            {mapParcels?.length > 0 &&
              mapParcels.map((p: any) => (
                <GMarker
                  position={p.geo}
                  // label={p.label}
                  // opacity={p.opacity}
                  icon={markerIconFactory(p.color)}
                  key={p.id}
                  onClick={() => handleMarkerClick(p)}
                />
              ))}
            <Controls
              onDrawComplete={(e: any) => {
                const bounds = e.getBounds();
                mapParcels.map((p: any) => {
                  console.log(bounds, p.geo);
                  if (bounds.contains(p.geo)) {
                    handleMarkerClick(p);
                  }
                });
              }}
            />
            <Directions />
          </>
        </Map>
      </APIProvider>

      <div className="py-5">
        <Stack direction="row" spacing={1} alignItems="flex-end">
          {schedules.map((route) => (
            <Stack key={route.label} alignItems="center">
              <ArrowDropDownIcon
                sx={{
                  color:
                    selectedSchedule.label === route.label
                      ? "black"
                      : "transparent",
                }}
              />
              <RouteColorPaint
                color={route.color}
                label={route.label}
                onClick={() => setSelectedSchedule(route)}
              />
            </Stack>
          ))}
        </Stack>
        <form
          onSubmit={handleSubmit((data) => {
            setSchedules((currentSchedule) => [
              ...currentSchedule,
              {
                color: generateRandomColor(currentSchedule.map((i) => i.color)),
                label: data.newRouteName,
              },
            ]);
            reset();
          })}
        >
          <input
            className="mt-5"
            placeholder="Enter New Route Name"
            {...register("newRouteName", {
              validate: (value) =>
                schedules.filter((i) => i.label === value).length < 1,
            })}
          />
          <p>{errors.newRouteName?.message}</p>
        </form>
      </div>
      <div className="flex flex-row space-x-5 mt-10">
        {/* <button
          type="button"
          className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset
        </button> */}
        <button
          type="button"
          className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </>
  );
};
