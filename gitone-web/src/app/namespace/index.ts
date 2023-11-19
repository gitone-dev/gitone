import Blob from "./blob";
import Branches from "./branches";
import Commit from "./commit";
import Commits from "./commits";
import Members from "./members";
import Projects from "./projects";
import Settings from "./settings";
import SshKeys from "./settings/sshKeys";
import Show from "./show";
import Tags from "./tags";
import Tree from "./tree";

const Namespace = {
  Blob,
  Branches,
  Commit,
  Commits,
  Members,
  Projects,
  Settings: {
    Settings,
    SshKeys,
  },
  Show,
  Tags,
  Tree,
};

export default Namespace;
