import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextInputComponent from './TextInputComponent';
import FileUploadComponent from './FileUploadComponent';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios';

function FormComponent() {
  // combine other details and add state status / upload status -> to S3 -> than api calls -> lambda -> Dynamo!
  const [textInput, setTextInput] = useState('');
  const [fileUpload, setFileUpload] = useState(null);

  const handleTextInput = (text) => {
    setTextInput(text);
  };

  const handleFileInput = (file) => {
    setFileUpload(file);
  };

  const handleSubmit = async () => {
    try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
          },
      };

      const response = await axios.post(process.env.REACT_APP_API_URL,{
            textInput,
            fileName: fileUpload.name,
            filePath: fileUpload.name, // Assuming filePath is the file name
        },
        config
      );
      console.log('Data sent to API Gateway successfully!!', response.data);
    } 
    catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='input'>
      <Typography variant="h5" gutterBottom>
        Cloud File Manager
      </Typography>
      <Typography variant="h6" gutterBottom>
        Input
      </Typography>
      <TextInputComponent handleTextInput={handleTextInput} />
      <FileUploadComponent handleFileInput={handleFileInput} />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      <Typography variant="caption" display="block" gutterBottom sx={{ textAlign: 'right' }}>
        Upload Text and File to AWS
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <text>Upload your files to AWS Cloud for easy storage and download whenever wherever!</text>
      {/* Add status updates here */}
    </div>
  );
}

export default FormComponent;