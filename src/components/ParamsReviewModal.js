import { Modal, Box, Typography, TextField, Button, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/ParamsReviewModal.css';

const ParamsReviewModal = ({ isOpen, action, onConfirm, onClose, darkMode}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (action && action.args) {
          const initialFormData = action.args.reduce((accum, arg) => ({
            ...accum,
            [arg.name]: arg.value || '',
          }), {});
          setFormData(initialFormData);
        }
      }, [action]);
      

    const handleChange = (event) => {
        const updatedFormData = {
            ...formData,
            [event.target.name]: event.target.value,
        };
        console.log(updatedFormData);  // Log updated form data
        setFormData(updatedFormData);
    };

    const handleSubmit = () => {
        console.log("HandleSubmit"); 
        console.log(formData); 
        onConfirm(formData);
        //onClose();
    };

    const theme = createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
    });
  
    return (
        <Modal open={isOpen} onClose={onClose} className={`modal ${darkMode ? 'dark-mode' : ''}`}>
          <ThemeProvider theme={theme}>
            <Box className={`form-box ${darkMode ? 'dark-mode' : ''}`}>
              <Typography variant="h6" component="h2" className="title">
                Review Action Arguments 
              </Typography>
              <Typography variant="h7">
                {action?.name}
              </Typography>
              {/* Generate input fields for each required argument */}
              {action?.args?.filter(arg => !arg.optional).map((arg, index) => (
                <TextField
                  key={index}
                  name={arg.name}
                  label={arg.name}
                  type={arg.type}
                  onChange={handleChange}
                  helperText={arg.description}
                  fullWidth
                  value={formData[arg.name] || ''}
                  className={`text-field required-text-field ${darkMode ? 'dark-mode' : ''}`}
                />
              ))}
    
              {/* Generate an accordion for optional arguments */}
              {action?.args?.some(arg => arg.optional) && (
                <Accordion className='accordion'>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Optional Parameters</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={`accordion-details ${darkMode ? 'dark-mode' : ''}`}>
                    {action?.args?.filter(arg => arg.optional).map((arg, index) => (
                      <TextField
                        key={index}
                        name={arg.name}
                        label={arg.name}
                        type={arg.type}
                        onChange={handleChange}
                        helperText={arg.description}
                        fullWidth
                        value={formData[arg.name] || ''}
                        className={`text-field optional-text-field ${darkMode ? 'dark-mode' : ''}`}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
    
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit} className="button">
                    Confirm
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={onClose} className="button">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Modal>
    );
};

export default ParamsReviewModal;
