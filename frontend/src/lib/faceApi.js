import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export async function loadFaceModels() {
  if (modelsLoaded) return;
  const base = process.env.PUBLIC_URL + '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(base + '/tiny_face_detector'),
    faceapi.nets.faceLandmark68Net.loadFromUri(base + '/face_landmark_68'),
    faceapi.nets.faceRecognitionNet.loadFromUri(base + '/face_recognition'),
  ]);
  modelsLoaded = true;
}

export async function imageToDescriptor(imgOrCanvas) {
  const detection = await faceapi
    .detectSingleFace(
      imgOrCanvas,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
    )
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!detection) return null;
  return Array.from(detection.descriptor);
}
