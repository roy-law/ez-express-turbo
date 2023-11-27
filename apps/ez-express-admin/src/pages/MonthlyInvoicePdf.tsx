import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { fetchAllDepots, fetchOrderHistory } from "../services/api";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";
import lodash from "lodash";
import { ChangeEvent, useState } from "react";

export const MonthlyInvoicePdf = () => {
  const { month, depotId = "" } = useParams();
  const { token } = useUserContext();
  const date = new Date();
  date.setMonth(Number(month));

  const from = format(startOfMonth(date), "yyyy-MM-dd");
  const to = format(endOfMonth(date), "yyyy-MM-dd");

  const { data } = useQuery(
    ["day range", from, to, depotId, token?.token],
    () => fetchOrderHistory({ depotId, from, to, token: token?.token }),
    {
      enabled: !!token?.token && !!depotId,
      select: (data) => {
        return data.reduce((pre: any, curr: any) => {
          const dayParcels = curr.parcels.map((p: any) => ({
            ...p,
            day: curr.day,
          }));
          return [...pre, ...dayParcels];
        }, []);
      },
    },
  );

  const { data: depotData } = useQuery(
    ["all depots", token?.token],
    () => fetchAllDepots({ token: token?.token }),
    {
      enabled: !!token?.token,
      select: (data) => {
        return data.find((depot: any) => depot._id === depotId);
      },
    },
  );

  const [discount, setDiscount] = useState("");
  const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  if (!data || !depotData) {
    return <p>loading</p>;
  }

  return (
    <div className="h-full">
      <div className="flex space-x-2 items-center mx-7">
        <label
          htmlFor="discount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Discount
        </label>
        <div className="my-2">
          <input
            type="discount"
            name="discount"
            id="discount"
            onChange={onChangeDiscount}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=" 10"
          />
        </div>
      </div>
      <PDFViewer className="h-full w-full">
        <Document>
          <Page
            size="A4"
            style={{ flex: 1, padding: 10, paddingBottom: 0 }}
            wrap
          >
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <Text style={{ textAlign: "left", borderBottom: 1 }}>
                Invoice #{`${format(date, "yyyy-MM-dd")}`}
              </Text>
              <Text style={{ fontSize: 12 }}>
                services from {from} to {to}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 30,
              }}
            >
              <Text>{depotData.company.companyName}</Text>
              <Text style={{ paddingVertical: 5 }}>
                {depotData.formattedAddress}
              </Text>
              <Text>
                H.S.T. Registration Number: {depotData.company.hstNumber}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 30,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{"Bill to: "}</Text>
              <Text>{"14762789 Canada inc. (Ez Express Inc.)"}</Text>
              <Text style={{ paddingVertical: 5 }}>
                {"Unit 128-3330 Midland, Scarborough, M1V 5E7"}
              </Text>
              <Text>H.S.T. Registration Number: {"77237 2917 RT0001"}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: 1,
                marginBottom: 5,
              }}
            >
              <Text style={{ width: "20%" }}>{"Date"}</Text>
              <Text style={{ width: "30%" }}>{"Description"}</Text>
              <Text style={{ width: "15%", textAlign: "left" }}>
                {"Quantity"}
              </Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                {"Unit Price"}
              </Text>
              <Text style={{ width: "20%", textAlign: "right" }}>
                {"Tax Amount"}
              </Text>
            </View>
            {data &&
              lodash.sortBy(data, ["day"]).map((d: any, index: number) => (
                <View
                  key={d._id}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "left",
                      width: "5%",
                    }}
                  >
                    {(index + 1).toString()}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "left",
                      width: "15%",
                    }}
                  >
                    {d.day}
                  </Text>
                  <Text
                    style={{ fontSize: 12, width: "30%", textAlign: "left" }}
                  >
                    Delivery Fee ({d.city})
                  </Text>
                  <Text
                    style={{ fontSize: 12, width: "10%", textAlign: "right" }}
                  >
                    {1}
                  </Text>
                  <Text
                    style={{ fontSize: 12, width: "20%", textAlign: "right" }}
                  >
                    ${d.price.toFixed(2)}
                  </Text>
                  <Text
                    style={{ fontSize: 12, width: "25%", textAlign: "right" }}
                  >
                    ${(d.price * d.province.tax).toFixed(2)}
                  </Text>
                </View>
              ))}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ width: "20%" }}>{""}</Text>
              <Text style={{ width: "30%" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "left" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                {"Subtotal"}
              </Text>
              <Text style={{ width: "20%", textAlign: "right" }}>
                ${lodash.sumBy(data, (parcel) => parcel.price).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: "20%" }}>{""}</Text>
              <Text style={{ width: "30%" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "left" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                {"HST 13%"}
              </Text>
              <Text style={{ width: "20%", textAlign: "right" }}>
                $
                {lodash
                  .sumBy(data, (parcel) => parcel.price * parcel.province.tax)
                  .toFixed(2)}
              </Text>
            </View>
            {!!discount && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ width: "20%" }}>{""}</Text>
                <Text style={{ width: "30%" }}>{""}</Text>
                <Text style={{ width: "15%", textAlign: "left" }}>{""}</Text>
                <Text style={{ width: "15%", textAlign: "right" }}>
                  {"Discount"}
                </Text>
                <Text style={{ width: "20%", textAlign: "right" }}>
                  - $ {Number(discount).toFixed(2)}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: "20%" }}>{""}</Text>
              <Text style={{ width: "30%" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "left" }}>{""}</Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                {"Total"}
              </Text>
              <Text style={{ width: "20%", textAlign: "right" }}>
                $
                {(
                  lodash.sumBy(
                    data,
                    (parcel) => parcel.price * (1 + parcel.province.tax),
                  ) - Number(discount)
                ).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                padding: 10,
              }}
            >
              <Text
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                fixed
              />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
