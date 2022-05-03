import uplinkGeneral from "./general";
import uplinkAuthentication from "./authentication";





import {  UpLink} from "../utils/my-types";

const uplink: UpLink = (io, store) => {
  const general = uplinkGeneral(io, store);
  const authentication = uplinkAuthentication(io, store);

  return {
    general,
    authentication,
  };
};

export default uplink;
