import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { fetchParcel } from "../services/api";
import { useParams } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { getCityByPostalCode } from "@repo/utils";
import { QUERY_NAME, useQueryKeys } from "../hooks/useQueryKeys";
import MicrosoftYahei from "../assets/MicrosoftYahei.ttf";

interface ShippingLabelPageProps {
  number: number;
  total: number;
  fromName: string;
  fromAddress: string;
  fromPhone: string;
  toName: string;
  toAddress: string;
  toPhone: string;
  trackingNumber: string;
  qrcode: string;
  customerRef: string;
  areaName: string;
  notes: string;
}

Font.register({
  family: "MicrosoftYahei",
  src: MicrosoftYahei,
});

const ShippingLabelPage = ({
  number,
  total,
  fromName,
  fromAddress,
  fromPhone,
  toName,
  toAddress,
  toPhone,
  trackingNumber,
  qrcode,
  customerRef,
  areaName,
  notes,
}: ShippingLabelPageProps) => {
  return (
    <Page size="C6" style={{ flex: 1, padding: 10, paddingBottom: 0 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {customerRef && (
          <Text style={{ top: 5, right: 5, position: "absolute" }}>
            #{customerRef}
          </Text>
        )}
        <Text style={{ fontSize: 40 }}>EZX</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: 4,
        }}
      >
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginRight: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            width: 30,
            height: 8,
            marginHorizontal: 3,
            transform: "skew(-50, 0)",
          }}
        />
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              TO:
            </Text>
            <Text style={{ marginLeft: 5 }}>{toPhone}</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                paddingBottom: 7,
                fontFamily: "MicrosoftYahei",
              }}
            >
              {toName}
            </Text>
            <Text style={{ paddingBottom: 2 }}>
              {toAddress.split(",")[0].trim()}
            </Text>
            <Text style={{ paddingBottom: 2 }}>
              {toAddress.split(",")[1].trim()}
            </Text>
            <Text style={{ paddingBottom: 2 }}>
              {toAddress.split(",")[2].trim()}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            marginTop: 30,
          }}
        >
          <Image src={qrcode} style={{ width: 100 }} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderLeft: 0,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 50 }}>
            {areaName && areaName.includes(" ")
              ? areaName
                  .split(" ")
                  .reduce((pre, curr) => pre + curr[0], "")
                  .toUpperCase()
              : areaName && areaName.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flex: 1.38,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Text style={{ fontSize: 50, color: "white" }}>
            {number} / {total}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              FROM:
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                paddingBottom: 7,
                fontSize: 10,
                fontFamily: "MicrosoftYahei",
              }}
            >
              {fromName}
            </Text>
            <Text style={{ paddingBottom: 2, fontSize: 10 }}>
              {fromAddress.split(",")[0].trim()}
            </Text>
            <Text style={{ paddingBottom: 2, fontSize: 10 }}>
              {fromAddress.split(",")[1].trim()}
            </Text>
            <Text style={{ paddingBottom: 2, fontSize: 10 }}>
              {fromAddress.split(",")[2].trim()}
            </Text>
            <Text style={{ paddingBottom: 2, fontSize: 10 }}>{fromPhone}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            paddingVertical: 5,
            borderLeft: 1,
            paddingHorizontal: 6,
          }}
        >
          <Text style={{ fontSize: 10, fontFamily: "MicrosoftYahei" }}>
            MEMO: {notes}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "white" }}>{trackingNumber}</Text>
      </View>
    </Page>
  );
};

export function ShippingLabel() {
  const { parcelId = "", numberOfParcels = 1 } = useParams();
  const { user, depot, token } = useUserContext();
  const { parcelQueryKeys } = useQueryKeys();
  const { data, isLoading, isIdle } = useQuery(
    parcelQueryKeys(parcelId)[QUERY_NAME.PARCEL_DETAIL],
    () => fetchParcel({ parcelId, token: token?.token }),
    { enabled: !!parcelId && !!depot && !!user },
  );

  if (isLoading || isIdle) {
    return <p>is loading</p>;
  }

  const parcelsAry = Array.from(
    { length: Number(numberOfParcels) },
    (x, i) => i + 1,
  );

  return (
    <div className="h-full bg-blue-100">
      <PDFViewer className="h-full w-full">
        <Document>
          {parcelsAry.map((v, i) => {
            return (
              <ShippingLabelPage
                number={v}
                key={i.toString()}
                total={Number(numberOfParcels)}
                fromName={user?.companyName ?? ""}
                fromAddress={depot?.formattedAddress ?? ""}
                fromPhone={depot?.phone ?? ""}
                toName={data.name}
                toAddress={data.formattedAddress}
                toPhone={data.phone}
                trackingNumber={data.trackingNumber}
                qrcode={data.qrcode}
                notes={data.notes}
                customerRef={data.customerRef}
                areaName={getCityByPostalCode(data.postalCode)}
              />
            );
          })}
        </Document>
      </PDFViewer>
    </div>
  );
}
