import {
  UpdateVisibilityInput,
  Visibility,
  useUpdateVisibilityMutation,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

interface Props {
  fullPath: string;
  visibility: Visibility;
}

function UpdateVisibilityPaper(props: Props) {
  const { fullPath, visibility } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, register } = useForm<UpdateVisibilityInput>();
  const [updateVisibilityMutation] = useUpdateVisibilityMutation();

  const onSubmit = handleSubmit((input: UpdateVisibilityInput) => {
    updateVisibilityMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="可见性" component="form" onSubmit={onSubmit}>
      <TextField
        sx={{ display: "none" }}
        {...register("fullPath", { value: fullPath })}
      />
      <FormControl fullWidth>
        <FormLabel>可见性</FormLabel>
        <RadioGroup row defaultValue={visibility}>
          <FormControlLabel
            value={Visibility.Private}
            label="私有"
            control={<Radio />}
            {...register("visibility")}
          />
          <FormControlLabel
            value={Visibility.Public}
            label="公开"
            control={<Radio />}
            {...register("visibility")}
          />
        </RadioGroup>
        <FormHelperText>组织可见性</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained">
        保存
      </Button>
    </ChunkPaper>
  );
}

export default UpdateVisibilityPaper;
