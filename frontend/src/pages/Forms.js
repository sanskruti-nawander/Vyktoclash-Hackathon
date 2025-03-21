import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import "./CareerPredictionForm.css";

const CareerPredictionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [educationLevel, setEducationLevel] = useState("Schooling");
  const [formFields, setFormFields] = useState({});
  
  // Add states for the new fields
  const [currentGrade, setCurrentGrade] = useState("");
  const [marks10, setMarks10] = useState("");
  const [marks12, setMarks12] = useState("");
  const [hobbiesSkills, setHobbiesSkills] = useState("");
  const [achievements, setAchievements] = useState("");
  const [degreeStatus, setDegreeStatus] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearOfDegree, setYearOfDegree] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [experience, setExperience] = useState("");

  // Handle education level change
  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
    setFormFields({}); // Reset dynamic fields for the new level
  };

  // Handle input change for dynamic fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      dob,
      educationLevel,
      ...(educationLevel === "Schooling" ? { schooling: formFields } : {}),
      ...(educationLevel === "Undergraduate" ? { undergraduate: formFields } : {}),
      ...(educationLevel === "Working Professional" ? { workingProfessional: formFields } : {}),
    };

    try {
      const response = await axios.post("http://localhost:3001/api/career-prediction", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Form submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <div className="body">
      <Header />
      <section className="form-section">
        <div className="form-container">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Career Prediction Form</h2>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name here"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Highest Educational Qualification</label>
                <div className="form-radio-group">
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Schooling"
                      checked={educationLevel === "Schooling"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Schooling
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Undergraduate"
                      checked={educationLevel === "Undergraduate"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Undergraduate
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Working Professional"
                      checked={educationLevel === "Working Professional"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Working Professional
                  </label>
                </div>
              </div>

              {/* Conditional Fields for Schooling */}
              {educationLevel === "Schooling" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Current Grade</label>
                    <select
                      value={currentGrade}
                      onChange={(e) => setCurrentGrade(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select your current grade</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  {(currentGrade === "10" || currentGrade === "11" || currentGrade === "12") && (
                    <div className="form-group">
                      <label className="form-label">10th Marks</label>
                      <input
                        type="number"
                        value={marks10}
                        onChange={(e) => setMarks10(e.target.value)}
                        placeholder="Enter your 10th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                  )}
                  {currentGrade === "12" && (
                    <div className="form-group">
                      <label className="form-label">12th Marks</label>
                      <input
                        type="number"
                        value={marks12}
                        onChange={(e) => setMarks12(e.target.value)}
                        placeholder="Enter your 12th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Hobbies & Skills</label>
                    <textarea
                      value={hobbiesSkills}
                      onChange={(e) => setHobbiesSkills(e.target.value)}
                      placeholder="Enter your hobbies and skills here"
                      className="form-textarea"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Achievements</label>
                    <textarea
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      placeholder="Enter your achievements here"
                      className="form-textarea"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {/* Conditional Fields for Undergraduate */}
              {educationLevel === "Undergraduate" && (
                <>
                  <div className="form-group">
                    <label className="form-label">10th Marks</label>
                    <input
                      type="number"
                      value={marks10}
                      onChange={(e) => setMarks10(e.target.value)}
                      placeholder="Enter your 10th marks here"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">12th Marks</label>
                    <input
                      type="number"
                      value={marks12}
                      onChange={(e) => setMarks12(e.target.value)}
                      placeholder="Enter your 12th marks here"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree Status</label>
                    <select
                      value={degreeStatus}
                      onChange={(e) => setDegreeStatus(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select degree status</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year of Degree</label>
                    <input
                      type="number"
                      value={yearOfDegree}
                      onChange={(e) => setYearOfDegree(e.target.value)}
                      placeholder="Enter the year of your degree"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialization</label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Enter your specialization"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Skills</label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Enter your skills"
                      className="form-textarea"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {/* Conditional Fields for Working Professional */}
              {educationLevel === "Working Professional" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Skills</label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Enter your skills"
                      className="form-textarea"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Experience</label>
                    <textarea
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Enter your professional experience"
                      className="form-textarea"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">Resume (PDF)</label>
                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="form-file-input"
                  accept=".pdf"
                  required
                />
              </div>

              <button type="submit" className="form-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareerPredictionForm;
