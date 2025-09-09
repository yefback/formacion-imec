import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ title, description, imagen, onClick }) => {
  return (
    <div className="course-card" onClick={onClick}>
      <div className="course-card-image" style={{ backgroundImage: `url(${imagen})` }} />
      <div className="course-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
