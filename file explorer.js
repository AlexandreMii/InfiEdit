import React from 'react';

const FileExplorer = ({ onUpload }) => {
  return (
    <div>
      <h2>Explorer les fichiers</h2>
      <input type="file" onChange={(e) => onUpload(e.target.files[0])} />
      <p>Sélectionnez une vidéo pour la modifier.</p>
    </div>
  );
};

export default FileExplorer;

