import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";
import { AreaName } from "../types";
import { useAdminParcels } from "../hooks/useAdminParcels";
import { classNames } from "../utils/styles/classNames";
import lodash from "lodash";

const containerStyle = {
  width: "100%",
  height: "90%",
};

const center = {
  id: 1,
  geo: {
    lat: 43.89,
    lng: -79.29,
  },
};

export const ParcelPlaning = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
    region: "ca",
  });
  const allParcels = useAdminParcels();

  const [routes, setRoutes] = useState([]);

  const onClick = (parcel: any) => {
    const parcelIndex = routes.findIndex((i: any) => i.id === parcel.id);

    if (parcelIndex >= 0) {
      const newRoutes = routes.slice(0, parcelIndex);
      setRoutes(newRoutes);
    } else {
      const newRoutes = [...routes, parcel];
      setRoutes(newRoutes as never[]);
    }
  };

  const defaultAreaBadges = useMemo(() => {
    return allParcels.map((area) => ({
      title: area.data?.name,
      areaName: area.data?.areaName,
      isDisabled: area.data?.count === 0,
      count: area.data?.count,
    }));
  }, [allParcels]);

  const [activeBadges, setActiveBadges] = useState<AreaName[]>([]);

  const parcels = useMemo(() => {
    // Replace with actual parcels data
    const areaMatchesFilter = allParcels.filter(
      //   (area) => area.data?.areaName === AreaName.Markham,
      (area) => {
        return activeBadges.includes(area.data?.areaName as AreaName);
      },
    );

    const areaData = areaMatchesFilter.reduce((pre: any, curr: any) => {
      if (curr.data?.pacakges) {
        return [...pre, ...curr.data.pacakges];
      }
      return pre;
    }, []);

    if (areaData && areaData.length) {
      const orignal2 = areaData.map((i: any) => ({
        id: i._id,
        geo: { ...i.geo.geometry.location },
      }));

      return orignal2.map((m: any) => ({
        ...m,
        label: `${
          routes.findIndex((r: any) => r.id === m.id) >= 0
            ? routes.findIndex((r: any) => r.id === m.id) + 1
            : ""
        }`,
        opacity: routes.findIndex((r: any) => r.id === m.id) >= 0 ? 0.6 : 1,
      }));
    } else {
      return [];
    }
  }, [routes, allParcels, activeBadges]);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    (map: any) => {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      // Use default center
      if (parcels && parcels.length > 0) {
        const bounds = new window.google.maps.LatLngBounds(parcels[0].geo);
        parcels.map((i: any) => {
          bounds.extend(i.geo);
        });
        map.fitBounds(bounds);
        setMap(map);
      }
    },
    [parcels],
  );

  const onUnmount = useCallback((map: any) => {
    setMap(null);
  }, []);

  const onClickBadge = (clickedAreaName: AreaName) => {
    if (activeBadges.includes(clickedAreaName)) {
      const newActiveBadges = lodash.remove(activeBadges, (x) => {
        return x !== clickedAreaName;
      });
      setActiveBadges(newActiveBadges);
    } else {
      setActiveBadges([...activeBadges, clickedAreaName]);
    }
  };

  return isLoaded ? (
    <>
      <div className="flex flex-row mb-8 flex-wrap">
        {defaultAreaBadges.map((badge) => (
          <button
            onClick={() => onClickBadge(badge.areaName as AreaName)}
            key={badge.title}
            disabled={badge.isDisabled}
            type="button"
            className={classNames(
              badge.isDisabled
                ? `rounded cursor-not-allowed px-2 mr-7 mb-2 py-1 text-s font-semibold text-white shadow-sm bg-gray-500`
                : `rounded ${
                    activeBadges.includes(badge.areaName as AreaName)
                      ? "bg-indigo-800"
                      : "bg-gray-500"
                  } relative inline-block px-2 mr-7 mb-2 py-1 text-s font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800`,
            )}
          >
            {badge.title}
            <span className="absolute -top-2 -right-1 block translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white">
              <span className="">
                {badge.count && (
                  <p className="text-center bg-red-600 px-1.5 py-1 rounded-full text-xs">
                    {`${badge.count}`}
                  </p>
                )}
              </span>
            </span>
          </button>
        ))}
      </div>
      <GoogleMap
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
          {parcels.map((p: any) => (
            <Marker
              position={p.geo}
              label={p.label}
              opacity={p.opacity}
              key={p.id}
              onClick={() => onClick(p)}
            />
          ))}
        </>
      </GoogleMap>
      <div className="flex flex-row space-x-5 mt-10">
        {/* <button
          type="button"
          className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset
        </button> */}
        <button
          type="button"
          className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};
