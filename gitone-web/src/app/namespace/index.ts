import Members from "./members";
import Settings from "./settings";
import RegisteredClientsIndex from "./settings/registered-clients/index";
import RegisteredClientsNew from "./settings/registered-clients/new";
import RegisteredClientsShow from "./settings/registered-clients/show";
import SshKeysIndex from "./settings/ssh-keys/index";
import Show from "./show";

const Namespace = {
  Members,
  Settings: {
    Settings,
    SshKeys: {
      Index: SshKeysIndex,
    },
    RegisteredClients: {
      Index: RegisteredClientsIndex,
      New: RegisteredClientsNew,
      Show: RegisteredClientsShow,
    },
  },
  Show,
};

export default Namespace;
