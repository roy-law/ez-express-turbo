import * as axios from "axios";

interface HeaderProps {
  bearToken?: string;
}

export const headersFactory = ({
  bearToken,
}: HeaderProps): axios.RawAxiosRequestHeaders => {
  return {
    Authorization: `Bearer ${bearToken}`,
  };
};
