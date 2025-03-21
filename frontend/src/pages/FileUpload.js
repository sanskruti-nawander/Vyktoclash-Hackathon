import React from 'react';

const FileUpload = ({ handleFileChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Upload Resume</label>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default FileUpload;