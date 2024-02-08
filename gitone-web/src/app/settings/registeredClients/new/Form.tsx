import {
  CreateRegisteredClientInput,
  RegisteredClient,
  RegisteredClientEdge,
  useCreateRegisteredClientMutation,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { registeredClient as pattern } from "@/utils/regex";
import { fromGlobalId } from "@/utils/relay";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  fullPath: string;
  registeredClient?: RegisteredClient;
}

export default function Form(props: Props) {
  const { fullPath, registeredClient } = props;
  const navigate = useNavigate();
  const [redirectUris, setRedirectUris] = useState<Array<string>>(
    registeredClient?.redirectUris || [""]
  );
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateRegisteredClientInput>({
    defaultValues: {
      clientName: registeredClient?.clientName || "",
      scopes: registeredClient?.scopes || [],
      redirectUris: redirectUris,
    },
  });

  const [createRegisteredClientMutation] = useCreateRegisteredClientMutation();

  const onAdd = () => {
    setRedirectUris([...redirectUris, ""]);
  };

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
        const id = fromGlobalId(registeredClient.id).id;

        enqueueSnackbar("添加成功", { variant: "success" });
        navigate(`/-/settings/registered-clients/${id}`, { replace: true });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="创建 OIDC 客户端" component="form" onSubmit={onCreate}>
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
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Scopes</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="oidc"
            value="oidc"
            {...register("scopes")}
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="profile"
            value="profile"
            {...register("scopes")}
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormLabel>Redirect Uris</FormLabel>
        </Grid>
        {redirectUris.map((value, index) => (
          <Fragment key={`${index}-${value}`}>
            <Grid item xs={11} key={`left-${value}-${index}`}>
              <TextField
                fullWidth
                size="small"
                {...register(`redirectUris.${index}`)}
              />
            </Grid>
            <Grid item xs={1} key={`right-${value}-${index}`}>
              <IconButton>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12}>
          <Button fullWidth startIcon={<AddIcon />} onClick={onAdd}>
            添加
          </Button>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained">
        创建
      </Button>
    </ChunkPaper>
  );
}
