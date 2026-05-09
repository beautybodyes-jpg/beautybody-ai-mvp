"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, RefreshCw, Check, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

interface CameraCaptureProps {
  onCapture: (imageUrl: string, file: File) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [mode, setMode] = useState<"select" | "camera" | "preview">("select");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user", 
          width: { ideal: 1280 }, 
          height: { ideal: 1280 } 
        },
      });
      setStream(mediaStream);
      setMode("camera");
      setError(null);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch {
      setError("Camera access denied. Please use photo upload instead.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  }, [stream]);

  const takePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setCapturedFile(file);
      setMode("preview");
      stopCamera();
    }, "image/jpeg", 0.92);
  }, [stopCamera]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setIsUploading(true);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setCapturedFile(file);
    setMode("preview");
    setError(null);
    setIsUploading(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (previewUrl && capturedFile) {
      onCapture(previewUrl, capturedFile);
    }
  }, [previewUrl, capturedFile, onCapture]);

  const handleRetake = useCallback(() => {
    setPreviewUrl(null);
    setCapturedFile(null);
    setMode("select");
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {mode === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-champagne-500/8 flex items-center justify-center mx-auto mb-5 border border-champagne-500/10">
                <Camera className="w-8 h-8 text-champagne-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display text-white mb-2">Capture Your Skin</h3>
              <p className="text-white/50 text-sm mb-7 leading-relaxed">
                For best results, remove makeup, find natural light, and pull your hair back.
              </p>
              <div className="space-y-3">
                <Button onClick={startCamera} className="w-full" glow size="lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Open Camera
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  size="lg"
                  isLoading={isUploading}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-score-priority text-sm p-3 rounded-xl bg-score-priority/5 border border-score-priority/10"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {mode === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-6 border-2 border-dashed border-white/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-champagne-400/30 rounded-full" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className="text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    Front Camera
                  </span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    Position your face in the oval
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button 
                variant="secondary" 
                className="flex-1" 
                size="lg"
                onClick={() => { stopCamera(); setMode("select"); }}
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Button>
              <Button className="flex-1" glow size="lg" onClick={takePhoto}>
                <Camera className="mr-2 h-5 w-5" />
                Capture
              </Button>
            </div>
          </motion.div>
        )}

        {mode === "preview" && previewUrl && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-champagne-400/20 rounded-2xl pointer-events-none" />
              <div className="absolute top-4 right-4">
                <span className="text-white/80 text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  Preview
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="secondary" className="flex-1" size="lg" onClick={handleRetake}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Retake
              </Button>
              <Button className="flex-1" glow size="lg" onClick={handleConfirm}>
                <Check className="mr-2 h-5 w-5" />
                Analyze My Skin
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
