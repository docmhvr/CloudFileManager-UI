import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

function OutputDataComponent() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    },
                };

                const result = await axios.get(process.env.REACT_APP_API, config);
                setRows(result.data ? (Array.isArray(result.data) ? result.data : [result.data]) : []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setRows([]);
            }
        };

        fetchData();
    }, []);

    const handleDownload = async (id) => {
        // try {
        //     const response = await axios.get(filePath, {
        //         responseType: 'blob',
        //         headers: {
        //             "Content-Type": "text/plain",
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Headers": "*",
        //             "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        //         },
        //     });
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', filePath.split('/').pop()); // Get the filename from the URL
        // document.body.appendChild(link);
        // link.click();
        // } 
        // catch (error) {
            console.error('Error downloading file:', error);
        // }
    };

    return (
        <div className='output'>
            <Typography variant="h6" gutterBottom>
                Output
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">File Name</TableCell>
                            <TableCell align="right">Details</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.textInput}
                                </TableCell>
                                <TableCell align="right">{row.fileName}</TableCell>
                                <TableCell align="right">{row.filePath}</TableCell>
                                <TableCell align="right">
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleDownload(row.id)}
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default OutputDataComponent;
