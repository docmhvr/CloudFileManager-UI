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
    const config = {
      region: process.env.REACT_APP_AWS_REGION,
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      }
    };

    const client = new S3Client(config);

    const uploadFileToS3 = async (fileUpload) => {
      const input = {
        Body: fileUpload,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: fileUpload.name,
        ContentType: fileUpload.type,
    };

      try {
        const command = new PutObjectCommand(input);
        const resp = await client.send(command);
        console.log('Upload successful!!', resp.data);
        return `https://${input.Bucket}.s3.us-west-1.amazonaws.com/${input.Key}`; // Might coz error need to check if doesn't work after testing
      } 
      catch (err) {
        console.error('Upload failed', err);
        throw err;
      }
    };

    try {
      if (!fileUpload) {
        console.error('No file selected for upload.');
        return;
      }

      const filePath = await uploadFileToS3(fileUpload);
      console.log(`File uploaded to: ${filePath}`);

      // Call API Gateway to save file path and text input in DynamoDB
      const response = await axios.post(process.env.REACT_APP_API_URL, {             
        textInput,
        fileName: fileUpload.name,
        filePath,
      });

      console.log('Data sent to API Gateway successfully!!', response.data);
    } 
    catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='input'>
      <Typography variant="h5" gutterBottom>
        React-AWS Application
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
        Status
      </Typography>
      {/* Add status updates here */}
    </div>
  );
}

export default FormComponent;