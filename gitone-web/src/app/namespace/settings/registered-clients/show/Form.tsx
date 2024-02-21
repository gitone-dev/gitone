import {
  RegisteredClient,
  RegisteredClientEdge,
  UpdateRegisteredClientInput,
  useDeleteRegisteredClientMutation,
  useUpdateRegisteredClientMutation,
} from "@/generated/types";
import { registeredClient as pattern } from "@/utils/regex";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  registeredClient: RegisteredClient;
}

export default function Form(props: Props) {
  const { registeredClient } = props;
  const navigate = useNavigate();
  const [redirectUris, setRedirectUris] = useState<Array<string>>(
    registeredClient?.redirectUris || [""]
  );
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateRegisteredClientInput>({
    defaultValues: {
      id: registeredClient.id,
      clientName: registeredClient?.clientName || "",
      scopes: registeredClient?.scopes || [],
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

  const onCopy = (value: string | null | undefined) => {
    return () => {
      if (!value) return;
      copy(value);
      enqueueSnackbar("已复制 ClientId", { variant: "info" });
    };
  };

  const [updateRegisteredClientMutation] = useUpdateRegisteredClientMutation();
  const [deleteRegisteredClientMutation] = useDeleteRegisteredClientMutation();

  const onUpdate = handleSubmit((input: UpdateRegisteredClientInput) => {
    input.redirectUris = redirectUris;
    updateRegisteredClientMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  const onDelete = () => {
    deleteRegisteredClientMutation({
      variables: { input: { id: registeredClient.id } },
      update(cache, { data: result }) {
        const registeredClient = result?.payload?.registeredClient;
        if (!registeredClient) return;

        cache.modify({
          fields: {
            registeredClients(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: RegisteredClientEdge) =>
                  readField("id", edge.node) !== registeredClient.id
              );
              return { ...existingRefs, edges };
            },
          },
        });
      },
      onCompleted() {
        enqueueSnackbar("删除成功", { variant: "success" });
        navigate("..", { replace: true });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  return (
    <Box component="form" onSubmit={onUpdate}>
      <TextField
        disabled
        fullWidth
        label="ID"
        margin="dense"
        size="small"
        {...register("id")}
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
        margin="dense"
        multiline
        minRows={3}
        {...register("description", { ...pattern.description.rules })}
      />
      <TextField
        fullWidth
        size="small"
        label="Client ID"
        margin="dense"
        value={registeredClient.clientId}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onCopy(registeredClient.clientId)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="client Secret"
        margin="dense"
        value={registeredClient.clientSecret}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onCopy(registeredClient.clientSecret)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Scopes</FormLabel>
        <FormGroup row>
          <Controller
            control={control}
            name="scopes"
            render={({ field }) => (
              <FormControlLabel
                {...field}
                checked={field.value.includes("openid")}
                control={<Checkbox size="small" />}
                label="openid"
                value="openid"
                {...register("scopes")}
              />
            )}
          />
          <Controller
            control={control}
            name="scopes"
            render={({ field }) => (
              <FormControlLabel
                {...field}
                checked={field.value.includes("profile")}
                control={<Checkbox size="small" />}
                label="profile"
                value="profile"
                {...register("scopes")}
              />
            )}
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
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
        <Button type="submit" variant="contained">
          修改
        </Button>
        <Button onClick={onDelete}>删除</Button>
      </Box>
    </Box>
  );
}
