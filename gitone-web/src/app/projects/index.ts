import Blob from "./blob/index";
import Branches from "./branches";
import Commit from "./commit";
import Commits from "./commits";
import Compare from "./compare";
import New from "./new";
import Releases from "./releases";
import Settings from "./settings";
import Show from "./show";
import Tags from "./tags";
import Tree from "./tree";

const Projects = {
  Blob,
  Branches,
  Commit,
  Commits,
  Compare,
  New,
  Releases,
  Settings: {
    Settings,
  },
  Show,
  Tags,
  Tree,
};

export default Projects;
