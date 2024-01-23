import { CheckIcon } from "@heroicons/react/20/solid";
import { PackageStatus } from "../types";
import { classNames } from "../utils/styles/classNames";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchParcelByTrackingNumber } from "../services/api/fetchParcelByTrackingNumber";
import { useMemo } from "react";
import { NavLogo } from "../components/NavLogo";

const PackageStatusToName = {
  [PackageStatus.Submitted]: "Electronic information submitted by shipper",
  [PackageStatus.Confirmed]: "Order confirmed",
  [PackageStatus.PickedUp]: "Order picked up by EZ Express Inc.",
  [PackageStatus.Dispatched]: "Order dispatched in the shipping center",
  [PackageStatus.OnTheWay]: "Order out for delivery",
  [PackageStatus.Delivered]: "Delivered to your building or house",
  [PackageStatus.Cancelled]: "Order cancelled by the shipper",
  [PackageStatus.Rejected]: "Order rejected by EZ Express Inc.",
  [PackageStatus.Returned]: "Order returned to the sender (Attempt delivery)",
};

const CurrentStatusToColor = {
  [PackageStatus.Submitted]: {
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    text: "text-indigo-600",
  },
  [PackageStatus.Confirmed]: {
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    text: "text-indigo-600",
  },
  [PackageStatus.PickedUp]: {
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    text: "text-indigo-600",
  },
  [PackageStatus.Dispatched]: {
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    text: "text-indigo-600",
  },
  [PackageStatus.OnTheWay]: {
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    text: "text-indigo-600",
  },
  [PackageStatus.Delivered]: {
    bg: "bg-green-600",
    border: "border-green-600",
    text: "text-green-800",
  },
  [PackageStatus.Cancelled]: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-red-800",
  },
  [PackageStatus.Rejected]: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-red-800",
  },
  [PackageStatus.Returned]: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-red-800",
  },
};

const CurrentStatusToNextStatus = {
  [PackageStatus.Submitted]: PackageStatus.Confirmed,
  [PackageStatus.Confirmed]: PackageStatus.PickedUp,
  [PackageStatus.PickedUp]: PackageStatus.Dispatched,
  [PackageStatus.Dispatched]: PackageStatus.OnTheWay,
  [PackageStatus.OnTheWay]: PackageStatus.Delivered,
  [PackageStatus.Delivered]: PackageStatus.Delivered,
  [PackageStatus.Cancelled]: PackageStatus.Cancelled,
  [PackageStatus.Rejected]: PackageStatus.Rejected,
  [PackageStatus.Returned]: PackageStatus.Returned,
};

const generateStep = (status: PackageStatus, createdAt: Date) => {
  return {
    name: PackageStatusToName[status],
    status: status,
    timestamp: format(new Date(createdAt), "MMM. dd 'at' h:mm aaa"),
  };
};

export const Tracking = () => {
  const { pathname } = useLocation();
  const { trackingNumber = "" } = useParams();
  const { isLoading, isPending, data } = useQuery({
    queryKey: ["/parcel/tracking", trackingNumber],
    queryFn: () => fetchParcelByTrackingNumber(trackingNumber.toUpperCase()),
    enabled: !!trackingNumber,
  });

  const steps: {
    status: PackageStatus;
    timestamp: string;
    name: string;
    stepStatus?: "complete" | "current";
  }[] = useMemo(() => {
    if (data && data.length) {
      const transformedData = data
        .sort(
          (
            a: { createdAt: Date; status: PackageStatus },
            b: { createdAt: Date; status: PackageStatus },
          ) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        )
        .map((d: any) => generateStep(d?.status, d?.createdAt))
        .map((d: any, idx: number) => {
          return {
            ...d,
            stepStatus: idx === 0 ? "current" : "complete",
          };
        });
      const isDestinationStatus =
        transformedData[0].status === PackageStatus.Returned ||
        transformedData[0].status === PackageStatus.Delivered ||
        transformedData[0].status === PackageStatus.Cancelled ||
        transformedData[0].status === PackageStatus.Rejected;

      return isDestinationStatus
        ? transformedData
        : [
            {
              ...generateStep(
                CurrentStatusToNextStatus[data[0].status as PackageStatus],
                new Date(),
              ),
              timestamp: "",
            },
            ...transformedData,
          ];
    }
    return [];
  }, [data]);

  if (isLoading || isPending || !data || !data.length) {
    return <p>loading</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row justify-center items-center">
        <div className="flex-1 flex-row flex items-center justify-center m-10 mb-20">
          <NavLogo size={150} />
          <p className="text-5xl bg-grey text-start ml-12">
            EZ Express Inc.{" "}
            <a
              href={"https://www.ezex.ca"}
              className="text-base"
              target={"_blank"}
              rel="noreferrer"
            >
              www.ezex.ca
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <nav aria-label="Progress">
          <ol className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li
                key={step.timestamp + stepIdx}
                className={classNames(
                  stepIdx !== steps.length - 1 ? "pb-10" : "",
                  "relative",
                )}
              >
                {step.stepStatus === "complete" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      href={pathname}
                      className="group relative flex items-start"
                    >
                      <span className="flex h-9 items-center">
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                          <CheckIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium">{step.name}</span>
                        <span className="text-sm text-gray-500">
                          {step.timestamp}
                        </span>
                      </span>
                    </a>
                  </>
                ) : step.stepStatus === "current" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      href={pathname}
                      className="group relative flex items-start"
                      aria-current="step"
                    >
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            CurrentStatusToColor[step.status].bg
                          } ${
                            CurrentStatusToColor[step.status].border
                          }  bg-white`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              CurrentStatusToColor[step.status].bg
                            }`}
                          />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span
                          className={`text-sm font-medium ${
                            CurrentStatusToColor[step.status].text
                          }`}
                        >
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {step.timestamp}
                        </span>
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      href={pathname}
                      className="group relative flex items-start"
                    >
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {step.timestamp}
                        </span>
                      </span>
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
