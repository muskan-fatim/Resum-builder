'use client';
import { useState } from "react";
import styles from "./page.module.css";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: [{ degree: '', institution: '', year: '' }],
    workExperience: [{ jobTitle: '', company: '', duration: '' }],
  });

  const [showResume, setShowResume] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string, type?: 'education' | 'workExperience') => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      if (type === 'education') {
        // Update nested education array
        const updatedEducation = [...formData.education];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setFormData({ ...formData, education: updatedEducation });
      } else if (type === 'workExperience') {
        // Update nested workExperience array
        const updatedWorkExperience = [...formData.workExperience];
        updatedWorkExperience[index] = { ...updatedWorkExperience[index], [field]: value };
        setFormData({ ...formData, workExperience: updatedWorkExperience });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '' }],
    });
  };

  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { jobTitle: '', company: '', duration: '' }],
    });
  };

  const handleDisplayResume = () => {
    setShowResume(true);  
  };

  const ResumeDisplay = ({ formData }: { formData: any }) => (
    <div className={styles.resumecontainer}>
      <div className={styles.resumeheader}>
        <h1 className={styles.h1}>{formData.name}</h1>
        <p>{formData.email}</p>
      </div>
      
      <div className={styles.resumesection}>
        <h2>Education</h2>
        {formData.education.map((edu: any, index: number) => (
          <div key={index}>
            <p><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</p>
          </div>
        ))}
      </div>


      <div className={styles.resumesection}>
        <h2>Work Experience</h2>
        {formData.workExperience.map((work: any, index: number) => (
          <div key={index}>
            <p><strong>{work.jobTitle}</strong> at {work.company} ({work.duration})</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div>
      <form>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={e => handleInputChange(e)}
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => handleInputChange(e)}
        />
        
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              className={styles.input}
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={e => handleInputChange(e, index, 'degree', 'education')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={e => handleInputChange(e, index, 'institution', 'education')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={e => handleInputChange(e, index, 'year', 'education')}
            />
          </div>
        ))}
        <button
          className={styles.button}
          type="button"
          onClick={handleAddEducation}
        >
          Add Education
        </button>


        {formData.workExperience.map((work, index) => (
          <div key={index}>
            <input
              className={styles.input}
              type="text"
              placeholder="Job Title"
              value={work.jobTitle}
              onChange={e => handleInputChange(e, index, 'jobTitle', 'workExperience')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Company"
              value={work.company}
              onChange={e => handleInputChange(e, index, 'company', 'workExperience')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Duration"
              value={work.duration}
              onChange={e => handleInputChange(e, index, 'duration', 'workExperience')}
            />
          </div>
        ))}
        <button
          className={styles.button}
          type="button"
          onClick={handleAddWorkExperience}
        >
          Add Work Experience
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={handleDisplayResume}
        >
          Display Resume
        </button>
      </form>
      
      {showResume && <ResumeDisplay formData={formData} />}
    </div>
  );
};

export default ResumeBuilder;
