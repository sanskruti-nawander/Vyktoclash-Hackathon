import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography 
} from '@mui/material';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import JobDetails from '../components/JobDetails'
import dataScientistImage from '../assets/images/Data.jpg'
import softwareEngineeringJobImage from '../assets/images/Software.jpg'
import DesignerImage from '../assets/images/Designer.jpg'
import MLImage from '../assets/images/ML.jpg'
import devOpsEngineerImage from '../assets/images/DevOps.jpg'
import productManagerImage from '../assets/images/Product.jpg'
import fullStackDeveloperImage from '../assets/images/FullStack.jpg'
import networkEngineerImage from '../assets/images/Network.jpg'
import mobileAppDeveloperImage from '../assets/images/MobileApp.jpg'
import cloudArchitectImage from '../assets/images/Cloud.jpg'
import cybersecurityAnalystImage from '../assets/images/Cybersecurity.jpg'
import qaEngineerImage from '../assets/images/QA.jpg'

const jobs = 
[
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Company',
    image: softwareEngineeringJobImage,
    description: 'We are looking for a highly skilled software engineer with expertise in building scalable web applications. You will be part of a dynamic team, responsible for architecting solutions and collaborating across departments to ensure the success of our product offerings.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software engineering',
      'Proficiency in JavaScript, TypeScript, and Node.js',
      'Experience with cloud technologies (AWS, Azure, GCP)',
      'Strong problem-solving skills and a collaborative mindset',
      'Experience with test-driven development and CI/CD pipelines',
    ],
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Data Corp',
    image: dataScientistImage,
    description: 'We are seeking a talented data scientist to join our growing analytics team. You will play a crucial role in analyzing large datasets, developing predictive models, and providing actionable insights to drive business decisions. The ideal candidate will have a strong foundation in statistical modeling, machine learning, and data visualization.',
    requirements: [
      'Master\'s degree or Ph.D. in Data Science, Statistics, or a related field',
      '5+ years of experience in data science and machine learning',
      'Proficiency in Python, R, and SQL',
      'Experience with deep learning frameworks (TensorFlow, PyTorch)',
      'Strong understanding of statistical techniques and data mining',
      'Experience with big data tools (Hadoop, Spark)',
      'Excellent communication skills to present insights to stakeholders',
    ],
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    image: DesignerImage,
    description: 'Join our creative team to design engaging user experiences across web and mobile platforms. As a UX/UI Designer, you will collaborate with product managers and developers to create intuitive interfaces and improve usability.',
    requirements: [
      'Bachelor\'s degree in Graphic Design, Interaction Design, or related field',
      '3+ years of experience in UX/UI design',
      'Proficiency with design tools (Sketch, Figma, Adobe XD)',
      'Strong understanding of user-centered design principles',
      'Experience with wireframing, prototyping, and user testing',
      'Ability to work in a fast-paced, collaborative environment',
    ],
  },
  {
    id: 4,
    title: 'Machine Learning Engineer',
    company: 'AI Innovations',
    image: MLImage,
    description: 'We are looking for a passionate machine learning engineer to develop cutting-edge algorithms that power our AI solutions. You will work closely with data scientists and software engineers to build scalable models that drive automation and intelligence.',
    requirements: [
      'Bachelor\'s or Master\'s degree in Computer Science, Engineering, or related field',
      '4+ years of experience in machine learning and AI model development',
      'Proficiency in Python, TensorFlow, and PyTorch',
      'Strong knowledge of algorithms, data structures, and optimization techniques',
      'Experience in model deployment and cloud platforms (AWS, GCP)',
      'Ability to work in a fast-paced, collaborative environment',
    ],
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    image: devOpsEngineerImage,
    description: 'Join our team as a DevOps Engineer and play a key role in automating and optimizing our deployment pipelines. You will work closely with development and operations teams to ensure seamless CI/CD processes and infrastructure scalability.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in DevOps, cloud infrastructure, and automation',
      'Proficiency in AWS, Docker, Kubernetes, and Terraform',
      'Experience with continuous integration tools (Jenkins, GitLab CI)',
      'Strong knowledge of Linux systems and networking',
      'Excellent problem-solving and debugging skills',
    ],
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'Tech Innovations',
    image: productManagerImage,
    description: 'We are looking for a Product Manager to lead cross-functional teams in delivering exceptional products. You will be responsible for defining product vision, creating roadmaps, and driving product development from concept to launch.',
    requirements: [
      'Bachelor\'s degree in Business, Engineering, or related field',
      '5+ years of experience in product management or product development',
      'Strong understanding of agile methodologies and product lifecycle',
      'Excellent communication and leadership skills',
      'Ability to analyze market trends and customer feedback',
      'Experience with product launch strategies and go-to-market planning',
    ],
  },
  {
    id: 7,
    title: 'Full Stack Developer',
    company: 'Global Tech Solutions',
    image: fullStackDeveloperImage,
    description: 'We are looking for a talented full stack developer to design, develop, and maintain complex web applications. You will work with both front-end and back-end technologies to build scalable and efficient solutions.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '4+ years of experience in full-stack development',
      'Proficiency in React, Node.js, and MongoDB',
      'Experience with RESTful APIs, microservices, and cloud-based solutions',
      'Strong knowledge of front-end frameworks (React, Angular, Vue)',
      'Ability to work in a collaborative and agile environment',
    ],
  },
  {
    id: 8,
    title: 'Network Engineer',
    company: 'IT Solutions',
    image: networkEngineerImage,
    description: 'Join our network engineering team to help build and maintain reliable and scalable network infrastructures. You will troubleshoot network issues, optimize performance, and ensure high availability for our clients.',
    requirements: [
      'Bachelor\'s degree in Computer Networks, Information Technology, or related field',
      '5+ years of experience in network design and administration',
      'Proficiency in networking protocols (TCP/IP, DNS, DHCP)',
      'Experience with Cisco, Juniper, and other network hardware',
      'Strong knowledge of network security principles and firewalls',
      'Ability to work with network monitoring and diagnostic tools',
    ],
  },
  {
    id: 9,
    title: 'Mobile App Developer',
    company: 'App Innovations',
    image: mobileAppDeveloperImage,
    description: 'We are looking for a skilled mobile app developer to create innovative and user-friendly mobile applications for iOS and Android. You will work closely with the design and product teams to develop high-quality apps.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in mobile app development',
      'Proficiency in Swift, Kotlin, and React Native',
      'Experience with mobile app frameworks and UI/UX principles',
      'Ability to optimize app performance and ensure seamless functionality',
      'Experience with mobile testing frameworks and version control (Git)',
    ],
  },
  {
    id: 10,
    title: 'Cloud Architect',
    company: 'Cloud Tech Solutions',
    image: cloudArchitectImage,
    description: 'As a Cloud Architect, you will be responsible for designing and implementing scalable cloud solutions for our clients. You will collaborate with engineers and stakeholders to define architecture, migration strategies, and best practices for cloud deployments.',
    requirements: [
      'Bachelor\'s or Master\'s degree in Computer Science, Engineering, or related field',
      '7+ years of experience in cloud architecture and infrastructure design',
      'Expertise in AWS, Azure, or Google Cloud Platform',
      'Strong experience with cloud security, networking, and storage solutions',
      'Experience in cloud migration and containerization (Docker, Kubernetes)',
      'Excellent communication and leadership skills',
    ],
  },
  {
    id: 11,
    title: 'Cybersecurity Analyst',
    company: 'SecureTech',
    image: cybersecurityAnalystImage,
    description: 'We are looking for a cybersecurity analyst to protect our systems and networks from potential threats. You will monitor security incidents, analyze risks, and implement security measures to ensure data confidentiality and integrity.',
    requirements: [
      'Bachelor\'s degree in Cybersecurity, Information Security, or related field',
      '3+ years of experience in cybersecurity',
      'Proficiency with security tools (Firewalls, SIEM, IDS/IPS)',
      'Experience with penetration testing and vulnerability assessments',
      'Strong understanding of security protocols and encryption techniques',
      'Excellent problem-solving and analytical skills',
    ],
  },
  {
    id: 12,
    title: 'QA Engineer',
    company: 'QualityTech',
    image: qaEngineerImage,
    description: 'Join our team as a QA Engineer and ensure the highest quality standards for our software products. You will develop automated test scripts, perform manual testing, and work closely with developers to ensure a bug-free product launch.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in quality assurance and software testing',
      'Experience with test automation tools (Selenium, Cypress)',
      'Strong knowledge of manual testing techniques and frameworks',
      'Experience with continuous integration tools (Jenkins, GitLab CI)',
      'Excellent attention to detail and communication skills',
    ],
  },
];

const SkillGap = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        minHeight: '100vh', 
        py: 4,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center" 
        color="primary"
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Explore Job and Internship Opportunities
      </Typography>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} onViewDetails={handleViewDetails} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {selectedJob && (
        <JobDetails job={selectedJob} onClose={handleCloseDetails} />
      )}
    </Container>
  );
};

export default SkillGap;