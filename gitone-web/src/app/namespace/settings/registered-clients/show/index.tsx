import { useRegisteredClientQuery } from "@/generated/types";
import AvatarPaper from "@/shared/AvatarPaper";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { registeredClientId } from "@/utils/relay";
import { useParams } from "react-router-dom";
import Form from "./Form";

export default function Show() {
  const { id } = useParams();

  const { data, loading, error } = useRegisteredClientQuery({
    variables: { id: registeredClientId(id as string) },
  });

  const registeredClient = data?.registeredClient;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!registeredClient || !registeredClient.avatarUrl) {
    return <ErrorBox message="查询错误" />;
  }

  return (
    <>
      <AvatarPaper avatarUrl={registeredClient.avatarUrl} />
      <ChunkPaper primary="修改">
        <Form registeredClient={registeredClient} />
      </ChunkPaper>
    </>
  );
}
