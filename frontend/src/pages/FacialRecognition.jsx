import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FacialRecognition = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      setReady(true);
    };

    loadModels();
  }, []);

  if (!ready) {
    return <p>Loading face recognition models...</p>;
  }

  return (
    <div>
      <h2>Facial Recognition Ready</h2>
      {/*i'll update my video/canvas UI here */}
    </div>
  );
};

export default FacialRecognition;
