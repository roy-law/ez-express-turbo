import React from "react";
import { PackageStatus } from "../types";

function ActiveBar() {
  return <div className="h-2 w-4 mr-2 bg-green-600 rounded-sm" />;
}

function InactiveBar() {
  return (
    <div className="h-2 w-4 mr-2 border-gray-400 border rounded-sm pattern-isometric pattern-green-600 pattern-bg-transparent pattern-opacity-60 pattern-size-1" />
  );
}

const getStatuses = (status: PackageStatus): boolean[] => {
  if (status === PackageStatus.Submitted) {
    return [true, false, false, false, false, false];
  } else if (status === PackageStatus.Confirmed) {
    return [true, true, false, false, false, false];
  } else if (status === PackageStatus.PickedUp) {
    return [true, true, true, false, false, false];
  } else if (status === PackageStatus.Dispatched) {
    return [true, true, true, true, false, false];
  } else if (status === PackageStatus.OnTheWay) {
    return [true, true, true, true, true, false];
  } else if (status === PackageStatus.Delivered) {
    return [true, true, true, true, true, true];
  } else if (status === PackageStatus.Returned) {
    return [true, true, true, true, true, false];
  } else {
    return [false, false, false, false, false, false];
  }
};

export function SimpleOrderProgressBar({ status }: { status: PackageStatus }) {
  const statuses = getStatuses(status);

  if (status === PackageStatus.Cancelled || status === PackageStatus.Rejected) {
    return (
      <div className="flex flex-row py-2">
        <div className="h-2 w-4 mr-2 bg-red-600 rounded-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-row pb-2 pt-4">
      {statuses.map((s, i) =>
        s ? <ActiveBar key={i} /> : <InactiveBar key={i} />,
      )}
    </div>
  );
}
