import Members from "./members";
import Projects from "./projects";
import Settings from "./settings";
import SshKeys from "./settings/sshKeys";
import Show from "./show";

const Namespace = {
  Members,
  Projects,
  Settings: {
    Settings,
    SshKeys,
  },
  Show,
};

export default Namespace;
