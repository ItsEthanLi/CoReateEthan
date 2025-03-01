'use client';
import { UserButton, SignedOut, SignedIn, SignInButton, useAuth } from '@clerk/nextjs';
import React, { useState } from 'react';

export default function Home() {
  const { getToken } = useAuth();
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [mentorData, setMentorData] = useState({
    name: '',
    specialty: '',
    skills: ''
  });

  // Function to show the form
  const doMentorClick = () => {
    setShowMentorForm(true);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form...');
      const token = await getToken();
      
      const response = await fetch('/api/mentors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mentorData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit');
      }

      console.log('Success:', result);
      alert('Mentor profile submitted!');
      setShowMentorForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit mentor profile: ${error.message}`);
    }
  };

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <h1>Welcome to CoReate Career Navigation! WIP</h1>
        <UserButton userProfileMode='modal' showName />

        {!showMentorForm && (
          <button onClick={doMentorClick}>I'm a mentor</button>
        )}

        {showMentorForm && (
          <form onSubmit={handleSubmit}>
            <h2>Mentor Signup</h2>

            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={mentorData.name}
              onChange={handleChange}
              required
            />

            <label>Specialty:</label>
            <input
              type="text"
              name="specialty"
              placeholder="E.g., Software Engineering"
              value={mentorData.specialty}
              onChange={handleChange}
              required
            />

            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              placeholder="E.g., React, Node.js, JavaScript"
              value={mentorData.skills}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowMentorForm(false)}>Cancel</button>
          </form>
        )}
      </SignedIn>
    </div>
  );
}
