import {
  ajax,
  eastYork,
  etobicoke,
  markham,
  mississauga,
  newmarket,
  northYork,
  pickering,
  richmondHill,
  scarborough,
  stouffville,
  toronto,
  vaughan,
} from "@repo/utils";
import { BackToHeader } from "../components/BackToHeader";
import { Chip, Stack } from "@mui/material";
import { CSVLink } from "react-csv";

const all = [
  {
    areaName: "Scarborough",
    postalCode: scarborough,
    price: 7,
  },
  {
    areaName: "Toronto",
    postalCode: toronto,
    price: 8,
  },
  {
    areaName: "Etobicoke",
    postalCode: etobicoke,
    price: 10,
  },
  {
    areaName: "North York",
    postalCode: northYork,
    price: 8,
  },
  {
    areaName: "Markdham",
    postalCode: markham,
    price: 7,
  },
  {
    areaName: "Richmond Hill",
    postalCode: richmondHill,
    price: 7,
  },
  {
    areaName: "Vaughan",
    postalCode: vaughan,
    price: 8,
  },
  {
    areaName: "New Market",
    postalCode: newmarket,
    price: 10,
  },
  {
    areaName: "Mississauga",
    postalCode: mississauga,
    price: 12,
  },
  {
    areaName: "Pickering",
    postalCode: pickering,
    price: 12,
  },
  {
    areaName: "Ajax",
    postalCode: ajax,
    price: 12,
  },
  {
    areaName: "Stouffville",
    postalCode: stouffville,
    price: 12,
  },
];

export const PostalCodes = () => {
  const headers = [
    { label: "Area Name", key: "areaName" },
    { label: "Postal Code", key: "postalCode" },
  ];

  return (
    <>
      <div>
        <BackToHeader />
      </div>
      <br />
      <CSVLink data={all} headers={headers} style={{ color: "blue" }}>
        Download Postal Codes
      </CSVLink>
      <br />
      <Stack spacing={2}>
        {all.map((area) => (
          <div key={area.areaName}>
            <div>{area.areaName}</div>
            <Stack flexDirection={"row"} flexWrap={"wrap"}>
              {area.postalCode.map((p) => (
                <Chip key={p} label={p} sx={{ marginRight: 2, marginTop: 2 }} />
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
    </>
  );
};
