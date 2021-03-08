import React, { useState } from "react";
import { Tab, Tabs, Paper, Box, Typography } from "@material-ui/core";
import FormLogin from "./FormLogin";
import FormSignup from "./FormSignup";

const SigninAndSignout = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paperStyle = { width: 300, margin: "20px auto" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <>
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Login" />

          <Tab label="SignUp" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FormLogin handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormSignup />
        </TabPanel>
      </Paper>
    </>
  );
};

export default SigninAndSignout;
