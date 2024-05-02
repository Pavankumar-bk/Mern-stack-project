import React from "react";

// Component for displaying a modal with a resume image
const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      {/* Modal content */}
      <div className="modal-content">
        {/* Close button */}
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {/* Resume image */}
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
