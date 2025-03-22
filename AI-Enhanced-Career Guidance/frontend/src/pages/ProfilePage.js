import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Avatar, Box, TextField, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);  // To store role-specific data
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);  // Reference to the user's document in Firestore

      // Fetch user data
      getDoc(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userDocData = snapshot.data();
          setUserData(userDocData);

          // Based on the role, fetch the corresponding data from the specific collection
          const role = userDocData.role;  // Assuming role is stored in the user's document

          let roleCollection = '';
          if (role === 'undergraduate') {
            roleCollection = 'graduates';
          } else if (role === 'professional') {
            roleCollection = 'professionalForms';
          } else if (role === 'student') {
            roleCollection = 'students';
          }

          if (roleCollection) {
            const roleRef = collection(db, roleCollection);
            const roleQuery = query(roleRef, where("username", "==", userDocData.username));

            getDocs(roleQuery).then((querySnapshot) => {
              const roleData = [];
              querySnapshot.forEach((doc) => {
                roleData.push(doc.data());
              });
              setRoleData(roleData);
            }).catch((error) => {
              console.error(`Error fetching ${roleCollection}: `, error);
            });
          }
        } else {
          console.log("No user data available");
        }
      }).catch((error) => {
        console.error("Error fetching user data: ", error);
      });
    }
  }, []);

  const handleEdit = () => {
    setEditable(!editable);
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const styles = {
    container: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      padding: '1rem',
    },
    avatar: {
      width: '100px',
      height: '100px',
      marginBottom: '1rem',
    },
    profileDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    profileInfo: {
      marginTop: '1rem',
    },
    formControl: {
      marginBottom: '1rem',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName={userData.name} />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card style={styles.card}>
              <CardContent style={styles.profileDetails}>
                <Avatar alt={userData.name} src={userData.avatarUrl} style={styles.avatar} />
                <Typography variant="h6">{userData.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData.profession || 'Software Engineer'}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                  View Resume
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">Profile Details</Typography>
                <Box style={styles.profileInfo}>
                  <TextField
                    label="Name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Date of Birth"
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  {/* Add more fields as necessary */}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    style={{ marginTop: '1rem' }}
                  >
                    {editable ? 'Save' : 'Edit'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Role-specific data */}
            {roleData && roleData.length > 0 && (
              <Card style={styles.card}>
                <CardContent>
                  <Typography variant="h6">Role-Specific Data</Typography>
                  <div>
                    {roleData.map((data, index) => (
                      <div key={index}>
                        <Typography variant="body1">{data.title}</Typography>
                        <Typography variant="body2">{data.description}</Typography>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProfilePage;
