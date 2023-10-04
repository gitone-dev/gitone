import { useLocation } from "react-router-dom";
import { Group } from "../../../generated/types";
import GroupForm from "./GroupForm";
import SubgroupForm from "./SubgroupForm";

function New() {
  const location = useLocation();
  const group = location.state as Group;

  if (group) {
    return <SubgroupForm group={group} />;
  } else {
    return <GroupForm />;
  }
}

export default New;
