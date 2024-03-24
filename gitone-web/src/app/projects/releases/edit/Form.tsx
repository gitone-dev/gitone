import {
  CreateReleaseInput,
  ReleaseEdge,
  Tag,
  TagEdge,
  TagFilter,
  useCreateReleaseMutation,
  useTagsLazyQuery,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { release as pattern } from "@/utils/regex";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { Maybe } from "graphql/jsutils/Maybe";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  fullPath: string;
  tag?: Tag;
}

export default function Form(props: Props) {
  const { fullPath, tag } = props;
  const tagEdge: TagEdge | null = tag ? { cursor: tag.id, node: tag } : null;
  const [options, setOptions] = useState<TagEdge[]>(tagEdge ? [tagEdge] : []);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CreateReleaseInput>({
    defaultValues: {
      tagName: tag?.name,
    },
  });
  const [tagsLazyQuery, { loading }] = useTagsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [createReleaseMutation] = useCreateReleaseMutation();

  const tagsQuery = useMemo(
    () =>
      debounce((query: string) => {
        const filterBy: TagFilter = { query };
        tagsLazyQuery({
          variables: { fullPath, first: 20, filterBy },
          onCompleted(data) {
            setOptions(data.repository.tags?.edges || []);
          },
        });
      }, 500),
    [tagsLazyQuery]
  );

  const onChange = (_event: unknown, edge: Maybe<TagEdge>) => {
    if (!edge?.node.name) return;

    setValue("tagName", edge.node.name);
  };

  const onInputChange = (_event: unknown, value: string) => {
    tagsQuery(value);
  };

  const onCreate = handleSubmit((input: CreateReleaseInput) => {
    createReleaseMutation({
      variables: { input },
      update(cache, { data: result }) {
        const release = result?.payload?.release;
        if (!release) return;

        cache.modify({
          fields: {
            releases(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: ReleaseEdge) =>
                    readField("id", edge.node) === release.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "ReleaseEdge",
                    node: toReference(release),
                  },
                ],
              };
            },
          },
        });
      },
      onCompleted(data) {
        const release = data?.payload?.release;
        if (!release?.id) return;
        enqueueSnackbar("创建成功", { variant: "success" });
        navigate(`/${fullPath}/-/releases/${release.tagName}`, {
          replace: true,
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="编辑" component="form" onSubmit={onCreate}>
      <TextField
        sx={{ display: "none" }}
        {...register("fullPath", { value: fullPath })}
      />
      <Autocomplete
        defaultValue={tagEdge}
        fullWidth
        sx={{ mt: 2 }}
        loading={loading}
        getOptionLabel={(option) => option.node.name || ""}
        filterOptions={(x) => x}
        options={options}
        loadingText="加载中"
        autoComplete
        includeInputInList
        noOptionsText="无"
        onChange={onChange}
        isOptionEqualToValue={(option, value) =>
          option.node.name === value.node.name
        }
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField {...params} required size="small" label="标签" />
        )}
        renderOption={(props, option) => {
          return (
            <ListItem {...props}>
              <ListItemText primary={option.node.name} />
            </ListItem>
          );
        }}
      />
      <TextField
        error={Boolean(errors.title)}
        fullWidth
        helperText={errors.title?.message || pattern.title.helper}
        label="标题"
        margin="dense"
        required
        size="small"
        {...register("title", { ...pattern.title.rules })}
      />
      <TextField
        error={Boolean(errors.description)}
        fullWidth
        helperText={errors.description?.message || pattern.description.helper}
        label="描述"
        multiline
        minRows={3}
        {...register("description", { ...pattern.description.rules })}
      />
      <Button type="submit" variant="contained">
        提交
      </Button>
    </ChunkPaper>
  );
}
