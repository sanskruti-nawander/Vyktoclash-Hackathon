import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'; // Importing FontAwesome icons

// Styled components for the layout and styling
const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-image: url('path_to_your_background_image.jpg'); /* Add your background image path */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  background-repeat: no-repeat;
`;

const ContactInfo = styled.div`
  width: 40%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
`;

const FormContainer = styled.div`
  width: 40%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
`;

const Header = styled.h2`
  font-size: 2rem;
  color: #4c51bf;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 2rem;
  color: #4c51bf;
`;

const Text = styled.div`
  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 5px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4c51bf;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3c44b1;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      {/* Contact Information Section */}
      <ContactInfo>
        <Header>Contact Us</Header>

        <ContactDetail>
          <Icon>
            <FaPhone />
          </Icon>
          <Text>
            <h3>CALL US</h3>
            <p>1 (234) 567-891, 1 (234) 987-654</p>
          </Text>
        </ContactDetail>

        <ContactDetail>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>
          <Text>
            <h3>LOCATION</h3>
            <p>121 Rock Street, 21 Avenue, New York, NY 92103-9000</p>
          </Text>
        </ContactDetail>

        <ContactDetail>
          <Icon>
            <FaClock />
          </Icon>
          <Text>
            <h3>BUSINESS HOURS</h3>
            <p>Mon - Fri ..... 10 am - 8 pm, Sat, Sun .... Closed</p>
          </Text>
        </ContactDetail>
      </ContactInfo>

      {/* Contact Form Section */}
      <FormContainer>
        <h3>Contact Form</h3>
        <ContactForm>
          <Input type="text" placeholder="Enter your Name" />
          <Input type="email" placeholder="Enter a valid email address" />
          <Textarea placeholder="Your Message" />
          <Button type="submit">Submit</Button>
        </ContactForm>
      </FormContainer>
    </ContactContainer>
  );
};

export default Contact;
