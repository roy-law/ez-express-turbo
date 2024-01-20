import { useQuery } from "react-query";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { useCallback, useEffect, useState } from "react";
import { fetchAreaPostalCode } from "../services/api/areaManagement/fetchAreaPostalCode";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { capitalize } from "lodash";
import {
  AddCircleOutline,
  AddCircleOutlineTwoTone,
  AddCircleRounded,
} from "@mui/icons-material";
import { Chip, Container, FormControl, Input } from "@mui/material";

export const AreaManagement = () => {
  const { token } = useUserContext();
  const [show, setShow] = useState("");
  const { data } = useQuery(["area management", token?.token], () =>
    fetchAreaPostalCode(token?.token),
  );
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  console.log("Roy", "===", data);

  return (
    <div>
      {/* <Notification show={!!show} onClose={() => setShow("")} message={show} /> */}
      <BackToHeader />
      <br />
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}>
            {capitalize(data?.[0].city)}
          </Typography>
          <Typography>$ {data?.[0].price}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data &&
            data[0].postalCode.map((d: string) => (
              <>
                <Chip
                  key={d}
                  label={d}
                  variant="outlined"
                  sx={{ marginRight: 2 }}
                  onDelete={() => console.log("hi")}
                />
              </>
            ))}
          <FormControl variant="standard">
            <Input id="standard-adornment-amount" />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
