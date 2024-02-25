import { Group } from "@/generated/types";
import { useLocation } from "react-router-dom";
import GroupForm from "./GroupForm";
import SubgroupForm from "./SubgroupForm";

export default function New() {
  const location = useLocation();
  const group = location.state as Group;

  if (group) {
    return <SubgroupForm group={group} />;
  } else {
    return <GroupForm />;
  }
}
