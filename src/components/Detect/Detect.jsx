import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Detect.css";
import { v4 as uuidv4 } from "uuid";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import {
  drawConnectors,
  drawLandmarks,
  // HAND_CONNECTIONS,
} from "@mediapipe/drawing_utils";

import { HAND_CONNECTIONS } from "@mediapipe/hands";

import Webcam from "react-webcam";

import TextToSpeech from "../voice/voiceSynthezer";
import LoadingModal from "./LoadingModal";
let startTime = "";

const Detect = ({ className, handleWords, start }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mock_data = [
    "On this tuesday morning, in front of you faculty, we are presenting our prorotype.",
    "We plan a solution that meets",
  ];
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [progress, setProgress] = useState(0);

  const requestRef = useRef();

  const [detectedData, setDetectedData] = useState([]);

  const [currentImage, setCurrentImage] = useState(null);
  
  // Loading modal states
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const [loadingStage, setLoadingStage] = useState("fetching");
  const [isReady, setIsReady] = useState(false);
  
  // Track if recognizer has been initialized to prevent re-loading
  const isInitializedRef = useRef(false);

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    console.log = function () {};
  }

  const predictWebcam = useCallback(() => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(
      webcamRef.current.video,
      nowInMs
    );

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Draw the results on the canvas, if any.
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });

        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }
    if (results.gestures.length > 0) {
      setDetectedData((prevData) => [
        ...prevData,
        {
          SignDetected: results.gestures[0][0].categoryName,
        },
      ]);

      setGestureOutput(results.gestures[0][0].categoryName);
      handleWords(results.gestures[0][0].categoryName);
    } else {
      setGestureOutput("");
      handleWords("");
    }

    if (webcamRunning === true) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, runningMode, gestureRecognizer, setGestureOutput]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      // Don't show loading modal again, just return silently
      // The initial loading modal will handle the loading state
      return;
    }

    if (webcamRunning === true) {
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
    } else {
      setWebcamRunning(true);
      startTime = new Date();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [
    webcamRunning,
    gestureRecognizer,
    animate,
    detectedData,
  ]);

  const handleModalReady = () => {
    setShowLoadingModal(false);
  };

  useEffect(() => {
    // Only proceed if gesture recognizer is loaded
    if (!gestureRecognizer) {
      return;
    }

    // Only start/stop if the modal is closed (initial loading is complete)
    if (!showLoadingModal) {
      if (start === true) {
        setWebcamRunning(start);
        startTime = new Date();
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setWebcamRunning(start);
        cancelAnimationFrame(requestRef.current);
      }
    }
  }, [start, gestureRecognizer, animate, showLoadingModal]);

  // Load gesture recognizer only once on mount
  useEffect(() => {
    // Only load if not already initialized
    if (isInitializedRef.current) {
      return;
    }

    async function loadGestureRecognizer() {
      try {
        setLoadingStage("fetching");
        setShowLoadingModal(true);
        setIsReady(false);

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        setLoadingStage("initializing");
        
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://firebasestorage.googleapis.com/v0/b/sign-language-ai.appspot.com/o/sign_language_recognizer_25-04-2023.task?alt=media&token=fce5727a-48a2-426a-be07-956964695cec",
          },
          numHands: 2,
          runningMode: "IMAGE", // Start with IMAGE mode
        });
        
        setLoadingStage("loading");
        setGestureRecognizer(recognizer);
        isInitializedRef.current = true; // Mark as initialized
        
        // Small delay to show "ready" state
        setTimeout(() => {
          setIsReady(true);
          setLoadingStage("ready");
        }, 500);
      } catch (error) {
        console.error("Error loading gesture recognizer:", error);
        setLoadingStage("loading");
        // Retry or show error message
      }
    }
    loadGestureRecognizer();
  }, []); // Empty dependency array - only run once on mount

  return (
    <>
      <LoadingModal
        isOpen={showLoadingModal}
        loadingStage={loadingStage}
        isReady={isReady}
        onReady={handleModalReady}
      />
      <div className={`${className} bg-slate-400 rounded-3xl overflow-hidden`}>
        <div className=" w-full h-full  relative overflow-hidden rounded-3xl">
          <Webcam
            audio={false}
            ref={webcamRef}
            height={1200}
            className="webcam absolute top-0 left-0"
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full absolute top-0 left-0"
          />
        </div>

       
      </div>
    </>
  );
};

export default Detect;

// const x = ()=>{
//   return (
//       <div className="signlang_detection-container">
//         <div>
//           <div className="signlang_data-container">
//             <button onClick={enableCam}>
//               {webcamRunning ? "Stop" : "Start"}
//             </button>

//             <div className="signlang_data">
//               {/* <p className="gesture_output">{gestureOutput}</p> */}

//               {/* {progress ? <ProgressBar progress={progress} /> : null} */}
//             </div>
//           </div>

//           {/* <TextToSpeech text={gestureOutput} /> */}
//         </div>
//       </div>

//   )
// }
