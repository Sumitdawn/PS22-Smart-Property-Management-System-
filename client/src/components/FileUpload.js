import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only image files (JPEG, PNG, GIF) are allowed');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post('/api/users/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('File uploaded successfully!');
      setUploadedFiles(prev => [...prev, {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uploadedAt: new Date().toISOString()
      }]);
      setSelectedFile(null);
      
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      toast.error('Upload failed: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-container">
      <h3>File Upload</h3>
      
      <div className="upload-section">
        <div className="file-input-wrapper">
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-input-label">
            Choose Image File
          </label>
        </div>

        {selectedFile && (
          <div className="selected-file">
            <div className="file-info">
              <h4>Selected File:</h4>
              <p><strong>Name:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
              <p><strong>Type:</strong> {selectedFile.type}</p>
            </div>
            
            {selectedFile.type.startsWith('image/') && (
              <div className="file-preview">
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="Preview" 
                  className="preview-image"
                />
              </div>
            )}
          </div>
        )}

        <button 
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="upload-button"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Upload History</h4>
          <div className="files-list">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                  <span className="upload-date">
                    {new Date(file.uploadedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;