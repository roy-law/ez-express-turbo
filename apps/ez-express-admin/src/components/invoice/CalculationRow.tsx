import { View, Text } from "@react-pdf/renderer";

type CalculationRowProps = {
  label: string;
  value: string;
};

export const CalculationRow = ({ label, value }: CalculationRowProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
      wrap={false}
    >
      <Text style={{ width: "20%" }}>{""}</Text>
      <Text style={{ width: "10%" }}>{""}</Text>
      <Text style={{ width: "5%", textAlign: "left" }}>{""}</Text>
      <Text style={{ width: "45%", textAlign: "right" }}>{label}</Text>
      <Text style={{ width: "20%", textAlign: "right" }}>{value}</Text>
    </View>
  );
};
