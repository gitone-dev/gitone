import Blob from "./blob";
import Branches from "./branches";
import Commit from "./commit";
import Commits from "./commits";
import Members from "./members";
import New from "./new";
import Settings from "./settings";
import SshKeys from "./settings/sshKeys";
import Show from "./show";
import Tags from "./tags";
import Tree from "./tree";

const Projects = {
  Blob,
  Branches,
  Commit,
  Commits,
  Members,
  New,
  Settings: {
    Settings,
    SshKeys,
  },
  Show,
  Tags,
  Tree,
};

export default Projects;
