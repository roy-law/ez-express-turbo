import React from "react";
import { PacmanLoader } from "react-spinners";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { DeliveriesTable } from "../components/dashboard/DeliveriesTable";
import { EmptyDeliveriesTableState } from "../components/dashboard/EmptyDeliveriesTableState";
import { format, add } from "date-fns";
import { useParcelsDayApiV2 } from "../hooks/api";

export function Dashboard() {
  const today = format(new Date(), "yyyy-MM-dd");
  const tmr = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
  const { data: todayData, isLoading, isIdle } = useParcelsDayApiV2(today);
  const { data: tmrData } = useParcelsDayApiV2(tmr);

  if (isLoading || isIdle) {
    return (
      <main className="flex justify-center items-center flex-1 flex-col">
        <PacmanLoader className="ring-indigo-500" color="#4F46E5" size={18} />
      </main>
    );
  }

  const isDataAvailable =
    (todayData && todayData.length > 0) || (tmrData && tmrData.length > 0);

  return (
    <div className="p-8">
      {/* <DashboardStats /> */}
      {isDataAvailable ? (
        <>
          <DeliveriesTable data={todayData} title="Today's Deliveries" />

          {tmrData && tmrData.length > 0 && (
            <>
              <p className="text-2xl font-semibold pt-10">Upcoming</p>
              <DeliveriesTable data={tmrData} title="Tomorrow's Deliveries" />
            </>
          )}
        </>
      ) : (
        <EmptyDeliveriesTableState />
      )}
    </div>
  );
}
