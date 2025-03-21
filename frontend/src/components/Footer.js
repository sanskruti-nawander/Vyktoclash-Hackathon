import React from 'react';
import { Email, Phone } from '@mui/icons-material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: '#1F2937',
  color: '#ffffff',
  padding: '1.5rem 2rem',
  textAlign: 'center',
  borderTop: '1px solid #eaeaea',
});

const FooterContent = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

const FooterText = styled('p')({
  margin: 0,
  fontSize: '1rem',
});

const FooterLink = styled('a')({
  color: '#4F46E5',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FooterContact = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
});

const ContactItem = styled('p')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  margin: 0,
});

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2024 Career Pathfinder AI. All rights reserved.</FooterText>
        <FooterContact>
          <ContactItem>
            <Email />
            <FooterLink href="mailto:info@careerpathfinderai.com">info@careerpathfinderai.com</FooterLink>
          </ContactItem>
          <ContactItem>
            <Phone />
            <FooterLink href="tel:+1234567890">+1 234 567 890</FooterLink>
          </ContactItem>
        </FooterContact>
      </FooterContent>
    </FooterContainer>
  );
}