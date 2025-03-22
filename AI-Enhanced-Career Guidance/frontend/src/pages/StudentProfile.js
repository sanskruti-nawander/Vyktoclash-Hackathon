import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profiles/student/${userId}`);
        setProfile(response.data);
      } catch (error) {
        setError(`Error fetching profile: ${error.response ? error.response.data.message : error.message}`);
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Profile</h1>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Date of Birth:</strong> {profile.dob}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Contact Number:</strong> {profile.contactNumber}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>School:</strong> {profile.school}</p>
        <p><strong>Percentage:</strong> {profile.percentage}</p>
        <p><strong>Favorite Subjects:</strong> {profile.favoriteSubjects}</p>
        <p><strong>Extra Curricular:</strong> {profile.extraCurricular}</p>
      </div>
    </div>
  );
};

export default StudentProfile;