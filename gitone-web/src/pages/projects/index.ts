import Members from "./members";
import New from "./new";
import Settings from "./settings";
import SshKeys from "./settings/sshKeys";
import Show from "./show";

const Projects = {
  Members,
  New,
  Settings: {
    Settings,
    SshKeys,
  },
  Show,
};

export default Projects;
