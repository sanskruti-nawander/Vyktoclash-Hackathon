import React from 'react';
import Footer from '../components/Footer.js';
import LandingImage from '../assets/images/Landingmain.svg';
import HeroBgImage from '../assets/images/herobg.png'; // Background image for the hero section
import { useNavigate } from "react-router-dom";
import AptitudeImage from '../assets/images/aptitude.png'; // Example image, adjust the path as necessary
import CareerImage from '../assets/images/career2.png'; // Example image, adjust the path as necessary
import SkillGapImage from '../assets/images/skillgap.png'; // Example image, adjust the path as necessary
import FuturePlanningImage from '../assets/images/futureplanning.png'; // Example image, adjust the path as necessary
import PersonalisedResultsImage from '../assets/images/personalisedresults.png'; // Example image, adjust the path as necessary
import ChatbotImage from '../assets/images/chatbot.png'; // Example image, adjust the path as necessary
import HighSchoolImage from '../assets/images/stu.png'; // Image for high school students
import UndergradImage from '../assets/images/underg.png'; // Image for undergraduate students
import WorkingProfessionalImage from '../assets/images/workingp.png'; // Image for working professionals
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tilt } from 'react-tilt';
import appLogo from '../assets/images/daan.png'; // Add the path to your app logo image

const buttonStyle = {
  backgroundColor: '#4c51bf',
  color: '#ffffff',
  padding: '0.75rem 2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  marginRight: '1rem',
  fontSize: '1rem',
  transition: 'transform 0.2s',
};

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  textAlign: 'center',
  transition: 'transform 0.2s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  marginBottom: '1rem',
};

const cardHoverStyle = {
  transform: 'scale(1.05)',
  boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
};

const frostedGlassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Darker shade for better visibility
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
};

const heroSectionStyle = {
  textAlign: 'center',
  background: `url(${HeroBgImage}) no-repeat center center/cover`,
  height: '100vh', // Cover the entire screen
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerStyle = {
  backgroundColor: 'rgba(76, 81, 191, 0.3)', // Purple shade for the background color
  backdropFilter: 'blur(10px)',
  color: '#ffffff',
  padding: '1rem',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  gap: '1.5rem',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ffffff',
  position: 'relative',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
};

const linkHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)', // Darker shade for the hover effect
  transform: 'scale(1.05)',
};

const featuresSectionStyle = {
  padding: '5rem 0',
  background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', // Matching the theme of the rest of the page
};

const LandingPage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleGetStartedClick = () => {
    navigate("/signup"); // Redirect to the signup route
  };

  const successStories = [
    { name: "Harsh Kotwal", story: "Career Pathfinder AI helped me identify my strengths and choose a career path that I am passionate about. The personalized recommendations were spot on!" },
    { name: "Vijay Sajin KT", story: "The skill gap analysis feature was a game-changer for me. It highlighted the areas I needed to improve and provided resources to help me get there." },
    { name: "Hannan Chaugule", story: "The future planning feature gave me insights into industry trends and helped me plan my career progression effectively. Highly recommend!" },
    { name: "Varad Bhat", story: "The interactive chatbot was very helpful in guiding me through the career assessment process. It made everything so much easier!" },
    { name: "Aryan Sikariya", story: "I was able to identify my strengths and weaknesses with the aptitude assessment. It was very insightful and helped me make informed decisions." },
    { name: "Sanskruti Nawander", story: "The personalized results feature allowed me to track my progress and see how I was improving over time. It was very motivating!" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0 }}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={appLogo} alt="Udaan Logo" style={{ width: '100px', height: 'auto', marginRight: '1rem' }} />
         
        </div>
        <nav style={navStyle}>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/ExploreCareerOptions')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Career Library
          </span>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/contact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Contact
          </span>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/login')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Login
          </span>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={frostedGlassStyle}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Discover Your Perfect Career</h2>
          <p style={{ fontSize: '1.125rem', color: '#2d3748', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Make smart decisions with our revolutionary AI enabled career guidance tools and expert career counsellors.
          </p>
          <div>
            <button style={buttonStyle} onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <p style={{ fontSize: '1rem', color: '#4a5568', marginTop: '1.5rem' }}>
            Career Assessment | Personalised Guidance | Profile Building
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0', background: 'none' }}>
        <img src={LandingImage} alt="Landing" style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: '0 auto' }} />
      </section>

      {/* Features Section */}
      <section id="features" style={featuresSectionStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Key Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <FeatureCard
              title="Aptitude Assessment"
              description="Evaluate strengths, inclinations, and cognitive abilities with AI."
              image={AptitudeImage}
            />
            <FeatureCard
              title="Career Recommendations"
              description="Tailored recommendations based on aspirations and interests."
              image={CareerImage}
            />
            <FeatureCard
              title="Skill Gap Analysis"
              description="Identify skill gaps and recommend learning resources."
              image={SkillGapImage}
            />
            <FeatureCard
              title="Speech Based Mock Interview"
              description="Simulate real interview scenarios with AI-driven speech analysis to enhance your communication skills"
              image={FuturePlanningImage}
            />
            <FeatureCard
              title="Personalised Results"
              description="Track progress and career insights in real-time."
              image={PersonalisedResultsImage}
            />
            <FeatureCard
              title="Active Community"
              description="Conversational interface to guide and assist users."
              image={ChatbotImage}
            />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" style={{ padding: '5rem 0', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Who Can Use This Site?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <InsightCard
              title="High School Students"
              description="Explore career options and get guidance on choosing the right path for your future."
              image={HighSchoolImage}
            />
            <InsightCard
              title="Undergrad Students"
              description="Identify your strengths and get personalized recommendations to enhance your career prospects."
              image={UndergradImage}
            />
            <InsightCard
              title="Working Professionals"
              description="Analyze your skills, identify gaps, and get insights on how to advance your career."
              image={WorkingProfessionalImage}
            />
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" style={{ padding: '5rem 0', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Success Stories</h3>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <iframe
              width="80%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube video link
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '10px', display: 'block', margin: '0 auto' }}
            ></iframe>
          </div>
          <Slider {...settings}>
            {successStories.map((story, index) => (
              <SuccessStory key={index} name={story.name} story={story.story} />
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

// Reusable FeatureCard Component
const FeatureCard = ({ title, description, image }) => {
  return (
    <Tilt options={{ max: 25, scale: 1.05 }}>
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = cardHoverStyle.transform;
          e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = cardStyle.boxShadow;
        }}
      >
        <img src={image} alt={title} style={imageStyle} />
        <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>{title}</h4>
        <p style={{ color: '#4a5568' }}>{description}</p>
      </div>
    </Tilt>
  );
};

// Reusable SuccessStory Component
const SuccessStory = ({ name, story }) => {
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = cardHoverStyle.transform;
        e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = cardStyle.boxShadow;
      }}
    >
      <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{name}</h4>
      <p style={{ color: '#718096' }}>{story}</p>
    </div>
  );
};

// Reusable InsightCard Component
const InsightCard = ({ title, description, image }) => {
  return (
    <Tilt options={{ max: 25, scale: 1.05 }}>
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = cardHoverStyle.transform;
          e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = cardStyle.boxShadow;
        }}
      >
        <img src={image} alt={title} style={imageStyle} />
        <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>{title}</h4>
        <p style={{ color: '#4a5568' }}>{description}</p>
      </div>
    </Tilt>
  );
};

export default LandingPage;