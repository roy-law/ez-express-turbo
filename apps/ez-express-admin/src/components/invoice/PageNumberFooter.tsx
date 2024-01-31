import { View, Text } from "@react-pdf/renderer";

export const PageNumberFooter = () => {
  return (
    <>
      <View
        fixed
        style={{
          position: "absolute",
          alignItems: "center",
          marginLeft: 15,
          width: "100%",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 16,
            margin: 5,
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </View>
      <View style={{ height: 20, width: "100%" }} fixed />
    </>
  );
};
