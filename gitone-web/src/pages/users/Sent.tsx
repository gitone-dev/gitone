import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Layout from "../../layout";
import ErrorPage from "../ErrorPage";

interface State {
  email?: string;
  message?: string;
}

function Sent() {
  const location = useLocation();
  const { email, message } = (location.state || {}) as State;

  if (!email) {
    return <ErrorPage message="无邮箱信息" />;
  }

  return (
    <Layout.Simple sx={{ py: 4 }}>
      <Typography>
        我们已向 <b>{email}</b>
        发送了一封{message}邮件，邮件送达可能需要几分钟。
      </Typography>
      <br />
      <Typography>如果你没有收到邮件，请检查你的垃圾邮件收件箱。</Typography>
      <br />
    </Layout.Simple>
  );
}

export default Sent;
