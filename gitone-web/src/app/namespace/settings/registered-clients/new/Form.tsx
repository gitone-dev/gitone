import {
  CreateRegisteredClientInput,
  RegisteredClientEdge,
  useCreateRegisteredClientMutation
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { registeredClient as pattern } from "@/utils/regex";
import { fromGlobalId } from "@/utils/relay";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  fullPath: string;
}

export default function Form(props: Props) {
  const { fullPath } = props;
  const navigate = useNavigate();
  const [redirectUris, setRedirectUris] = useState<Array<string>>([""]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateRegisteredClientInput>({
    defaultValues: {
      clientName: "",
      redirectUris: redirectUris,
    },
  });

  const onAddRedirectUri = () => {
    setRedirectUris([...redirectUris, ""]);
  };

  const onChangeRedirectUri = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      redirectUris[index] = event.target.value;
      setRedirectUris(redirectUris);
    };
  };

  const onDeleteRedirectUri = (index: number) => {
    return () => {
      setRedirectUris(redirectUris.filter((_, i) => i != index));
    };
  };

  const [createRegisteredClientMutation] = useCreateRegisteredClientMutation();

  const onCreate = handleSubmit((input: CreateRegisteredClientInput) => {
    createRegisteredClientMutation({
      variables: { input },
      update(cache, { data: result }) {
        const registeredClient = result?.payload?.registeredClient;
        if (!registeredClient) return;

        cache.modify({
          fields: {
            registeredClients(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: RegisteredClientEdge) =>
                    readField("id", edge.node) === registeredClient.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "RegisteredClientEdge",
                    node: toReference(registeredClient),
                  },
                ],
              };
            },
          },
        });
      },
      onCompleted(data) {
        const registeredClient = data?.payload?.registeredClient;
        if (!registeredClient?.id) return;
        enqueueSnackbar("添加成功", { variant: "success" });

        const id = fromGlobalId(registeredClient.id).id;
        navigate(`../${id}`, { replace: true });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="新建 OIDC 客户端" component="form" onSubmit={onCreate}>
      <TextField
        sx={{ display: "none" }}
        {...register("fullPath", { value: fullPath })}
      />
      <TextField
        error={Boolean(errors.clientName)}
        fullWidth
        helperText={errors.clientName?.message || pattern.clientName.helper}
        label="标题"
        margin="dense"
        required
        size="small"
        {...register("clientName", { ...pattern.clientName.rules })}
      />
      <TextField
        error={Boolean(errors.description)}
        fullWidth
        helperText={errors.description?.message || pattern.description.helper}
        label="简介"
        multiline
        minRows={3}
        {...register("description", { ...pattern.description.rules })}
      />
      <Box>
        <FormLabel>Redirect Uris</FormLabel>
        {redirectUris.map((value, index) => (
          <Fragment key={`${index}-${value}`}>
            <TextField
              defaultValue={value}
              fullWidth
              size="small"
              onChange={onChangeRedirectUri(index)}
              margin="dense"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={onDeleteRedirectUri(index)}>
                    <RemoveIcon />
                  </IconButton>
                ),
              }}
            />
          </Fragment>
        ))}
        <Button fullWidth startIcon={<AddIcon />} onClick={onAddRedirectUri}>
          添加
        </Button>
      </Box>
      <Button type="submit" variant="contained">
        提交
      </Button>
    </ChunkPaper>
  );
}
