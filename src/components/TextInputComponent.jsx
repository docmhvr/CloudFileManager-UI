import React from 'react';
import TextField from '@mui/material/TextField';

function TextInputComponent({ handleTextInput }) {
  const onTextChange = (event) => {
    const text = event.target.value;
    handleTextInput(text);
    console.log('Text child:', text);
  };

  return (
    <TextField 
      onChange={onTextChange}
      id="outlined-basic" 
      label="File Description" 
      variant="outlined" 
    />
  );
}

export default TextInputComponent;
