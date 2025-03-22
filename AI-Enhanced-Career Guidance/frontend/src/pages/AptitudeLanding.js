import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import dbaptiImage from '../assets/images/aptibut.png';

const AptitudeLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useParams();
  const user = location.state?.user;
  const [language, setLanguage] = useState('English');

  const handleStart = () => {
    navigate(`/numerical-ability/${userType}`, { state: { userType, user, language } });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3e8ff",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%", padding: "20px" }}>
        <Card
          style={{
            boxShadow: "0 8px 16px rgba(76, 81, 191, 0.3)",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          <Grid container>
            {/* Left Section */}
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eae4ff",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
              }}
            >
              <Typography variant="h6" style={{ fontWeight: "bold", color: "#5a00a1" }}>
               {dbaptiImage}
              </Typography>
            </Grid>

            {/* Right Section */}
            <Grid item xs={8}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", color: "#5a00a1" }}
                >
                  Welcome to the Aptitude Test
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ marginBottom: "10px", color: "#4a4a4a" }}
                >
                  The test will have 3 sections:
                  <ul>
                    <li>Numerical</li>
                    <li>Verbal</li>
                    <li>Logical</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom style={{ color: "#4a4a4a" }}>
                  Each section will have 5 questions, and you will have 30 minutes to complete the entire test.
                </Typography>
                <FormControl fullWidth style={{ marginTop: "20px" }}>
                  <InputLabel id="language-select-label">Select Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={language}
                    onChange={handleLanguageChange}
                    style={{ borderRadius: "8px", backgroundColor: "#fafafa" }}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Marathi">Marathi</MenuItem>
                    <MenuItem value="Bengali">Bengali</MenuItem>
                    <MenuItem value="Malayalam">Malayalam</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleStart}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#5a00a1",
              color: "#ffffff",
              boxShadow: "0 4px 8px rgba(76, 81, 191, 0.2)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Start Test
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AptitudeLanding;
