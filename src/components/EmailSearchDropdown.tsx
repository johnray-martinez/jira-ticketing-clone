import {
  useEffect,
  useState,
  Fragment,
  ChangeEvent,
  useRef,
  FormEvent,
  useCallback,
  memo,
} from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { User } from "@/types/user";
import { get } from "../helpers/fetch";

type EmailSearchDropdownProps = {
  addParticipant: (participantsList: User) => void;
};

const EmailSearchDropdown = ({ addParticipant }: EmailSearchDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");
  const loading = open && options.length === 0;
  const timeoutId = useRef(0);

  useEffect(() => {
    clearTimeout(timeoutId.current);

    timeoutId.current = window.setTimeout(async () => {
      const res = await get(`/api/user?query=${keyword}`);

      setOptions(res.result);
    }, 500);
  }, [keyword]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const onSubmitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email } = e.target as typeof e.target & {
        email: HTMLFormElement;
      };
      const user = options.find(u => u.email === email.value);

      addParticipant(user as User);
      (e.target as HTMLFormElement).reset();
    },
    [options, addParticipant]
  );
  return (
    <Box component="form" onSubmit={onSubmitHandler}>
      <Autocomplete
        id="Email search"
        open={open}
        fullWidth
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        getOptionLabel={option => option.email}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            label="Email"
            name="email"
            variant="standard"
            value={keyword}
            onChange={onChangeHandler}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default memo(EmailSearchDropdown);
