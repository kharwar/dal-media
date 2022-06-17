import { InputBase } from "@mui/material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const TextInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const {
    onChange,
    disabled,
    minRows,
    maxRows,
    autoFocus,
    sx,
    placeholder,
    multiline,
  } = props;

  useEffect(() => {
    onChange?.(text);
  }, [text]);

  useImperativeHandle(ref, () => ({
    getValue: () => text,
    setValue: (text) => setText(text),
  }));

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <InputBase
      inputRef={inputRef}
      value={text}
      onChange={onTextChange}
      disabled={disabled}
      minRows={minRows}
      maxRows={maxRows}
      autoFocus={autoFocus}
      fullWidth={true}
      multiline={multiline}
      placeholder={placeholder}
      sx={sx}
    />
  );
});

export default TextInput;
