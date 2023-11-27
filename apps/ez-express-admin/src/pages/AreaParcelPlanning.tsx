import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AreaConfigMap,
  AreaName,
  DriverScheduleType,
  PackageStatus,
  WorkingShift,
} from "../types";
import { useAdminAreaParcel } from "../hooks/useAdminAreaParcel";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createSchedule, fetchSchedule, updateSchedule } from "../services/api";
import { useUserContext } from "../providers/UserContextProvider";
import { format } from "date-fns";
import { Notification } from "../components/Notification";
import { AssignedToSelector } from "../components/AssignedToSelector";
import MarkerPika from "../assets/logo.svg";

const containerStyle = {
  width: "100%",
  height: "90%",
};

const shippingCenter = {
  lat: 43.80743962467443,
  lng: -79.28927283558222,
};

const center = {
  id: 1,
  geo: {
    lat: 43.89,
    lng: -79.29,
  },
};

interface Props {
  areaName: AreaName;
}

export const AreaParcelPlanning = ({ areaName }: Props) => {
  const { queryKey, postalCode } = AreaConfigMap[areaName];
  const [show, setShow] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<{
    _id: string;
    username: string;
  }>();
  const { token } = useUserContext();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
    region: "ca",
  });
  const day = format(new Date(), "yyyy-MM-dd");
  const { data: areaData } = useAdminAreaParcel(areaName, day);

  const { data: scheduleData } = useQuery(
    [`${day} ${areaName} schedule`, token?.token],
    () =>
      fetchSchedule({
        token: token?.token,
        day,
        predefinedArea: areaName,
        type: DriverScheduleType.Delivery,
        shift: WorkingShift.Evening,
      }),
    {
      enabled: !!token?.token,
      staleTime: Infinity,
    },
  );

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

  const parcels = useMemo(() => {
    if (areaData && areaData.length) {
      const orignal2 = areaData.map((i: any) => ({
        id: i._id,
        geo: { ...i?.geo?.geometry.location },
        status: i.status,
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
  }, [routes, areaData]);

  useEffect(() => {
    if (
      scheduleData?.parcelsOrder &&
      scheduleData.parcelsOrder.length &&
      areaData &&
      areaData.length
    ) {
      const scheduledRoutes = scheduleData.parcelsOrder.map(
        (p: string, idx: number) => ({
          id: p,
          label: `${idx + 1}`,
          opacity: 0.6,
          ...areaData.find((parcel: any) => parcel._id === p),
        }),
      );

      setRoutes(scheduledRoutes);
    }
  }, [scheduleData, areaData]);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    (map: any) => {
      if (parcels && parcels.length > 0 && parcels[0].geo) {
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

  const queryClient = useQueryClient();
  const { mutate: mutateSchedule } = useMutation(createSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        `${day} ${areaName} schedule`,
        token?.token,
      ]);
      queryClient.invalidateQueries([queryKey, postalCode, token?.token]);

      setShow("Successfully created schedule!");

      setTimeout(() => {
        setShow("");
      }, 5000);
    },
  });

  const { mutate: mutateUpdateSchedule } = useMutation(updateSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        `${day} ${areaName} schedule`,
        token?.token,
      ]);
      queryClient.invalidateQueries([queryKey, postalCode, token?.token]);

      setShow("Successfully updated schedule!");

      setTimeout(() => {
        setShow("");
      }, 5000);
    },
  });

  return isLoaded ? (
    <>
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
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
              visible={
                ![
                  PackageStatus.Delivered,
                  PackageStatus.Cancelled,
                  PackageStatus.Rejected,
                  PackageStatus.Returned,
                ].includes(p.status)
              }
            />
          ))}
          <Marker
            position={shippingCenter}
            key={shippingCenter?.lat}
            icon={{
              url: MarkerPika,
              scaledSize: { width: 60, height: 60 } as any,
            }}
          />
        </>
      </GoogleMap>
      <div className="flex flex-row space-x-5 mt-10">
        <AssignedToSelector
          onSelected={setSelectedDriver}
          defaultDriver={scheduleData?.assignedTo}
        />
        <button
          type="button"
          onClick={() => {
            if (scheduleData?._id) {
              mutateUpdateSchedule({
                _id: scheduleData?._id,
                token: token?.token,
                parcelsOrder: routes.map((parcel: any) => parcel.id),
                assignedTo: selectedDriver?._id || scheduleData?.assignedTo,
              });
            } else {
              mutateSchedule({
                day,
                token: token?.token,
                parcelsOrder: routes.map((parcel: any) => parcel.id),
                predefinedArea: areaName,
                assignedTo: selectedDriver?._id || scheduleData?.assignedTo,
                type: DriverScheduleType.Delivery,
              });
            }
          }}
          className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};
