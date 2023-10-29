import Members from "./members";
import New from "./new";
import Projects from "./projects";
import Settings from "./settings";
import SshKeys from "./settings/sshKeys";
import Show from "./show";

const Groups = {
  Members,
  New,
  Projects,
  Settings: {
    Settings,
    SshKeys,
  },
  Show,
};

export default Groups;
