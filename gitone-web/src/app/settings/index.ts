import Index from "./Index";
import Account from "./account";
import Emails from "./emails";
import Password from "./password";
import RegisteredClients from "./registeredClients";
import RegisteredClientsNew from "./registeredClients/new";
import RegisteredClientsShow from "./registeredClients/show";
import SshKeys from "./sshKeys";

const Settings = {
  Account,
  Emails,
  Index,
  Password,
  SshKeys,
  RegisteredClients: {
    Index: RegisteredClients,
    New: RegisteredClientsNew,
    Show: RegisteredClientsShow,
  },
};

export default Settings;
