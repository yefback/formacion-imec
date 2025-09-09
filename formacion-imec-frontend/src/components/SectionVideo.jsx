import React from 'react';
import '../styles/SectionVideo.css';

const SectionVideo = () => {
  return (
    <section className="section-video-container">
      <video
        className="dashboard-video"
        controls
        poster="/asset/poster.jpg"
      >
        <source src="/asset/welcome.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
    </section>
  );
};

export default SectionVideo;

 