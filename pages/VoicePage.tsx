import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/providers/I18nProvider';
import { useParams, useRouter } from 'next/navigation';
import { convertTextToSpeech, TTSProgress, getStoryByIdFromLocalStorage, getTTSRateLimitStatus } from '../services/ttsService';
import Header from '../components/Header';
import JSZip from 'jszip';

const VoicePage: React.FC = () => {
  const { t } = useI18n();
  const params = useParams();
  const storyId = params?.storyId as string;
  const router = useRouter();

  const [storyText, setStoryText] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<TTSProgress>({ 
    current: 0, 
    total: 0, 
    currentChunk: '', 
    status: 'processing' 
  });
  const [audioFiles, setAudioFiles] = useState<Array<{blob: Blob, filename: string, url: string}>>([]);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitStatus, setRateLimitStatus] = useState(getTTSRateLimitStatus());
  const [selectedVoice, setSelectedVoice] = useState<string>('Kore');
  const [maxWords, setMaxWords] = useState<number>(3000);
  const [useCustomText, setUseCustomText] = useState(false);
  const [customText, setCustomText] = useState('');

  const getCurrentText = () => {
    return useCustomText ? customText : storyText;
  };

  useEffect(() => {
    // Get story text by ID from localStorage
    if (storyId) {
      const story = getStoryByIdFromLocalStorage(storyId);
      if (story) {
        setStoryText(story.content);
      } else {
        // Story not found, redirect to home
        router.push('/');
      }
    } else {
      // No story ID provided, redirect to home
      router.push('/');
    }
  }, [storyId, router]);

  // Update rate limit status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setRateLimitStatus(getTTSRateLimitStatus());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleConvertToSpeech = async () => {
    const textToConvert = getCurrentText();
    
    if (!textToConvert.trim()) {
      setError(t('tts.error.noContent') || 'No content to convert');
      return;
    }

    setIsConverting(true);
    setError(null);
    setAudioFiles([]);
    setProgress({ current: 0, total: 0, currentChunk: t('tts.progress.starting') || 'Starting...', status: 'processing' });

    try {
      const audioFiles = await convertTextToSpeech(textToConvert, (progressUpdate) => {
        setProgress(progressUpdate);
      }, selectedVoice, maxWords);
      
      setAudioFiles(audioFiles);
      setProgress({ 
        current: audioFiles.length, 
        total: audioFiles.length, 
        currentChunk: t('tts.progress.completed'),
        status: 'completed' 
      });
    } catch (error) {
      console.error('TTS conversion failed:', error);
      setError(t('tts.error.conversionFailed'));
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadFile = (audioFile: {blob: Blob, filename: string, url: string}) => {
    const link = document.createElement('a');
    link.href = audioFile.url;
    link.download = audioFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (audioFiles.length === 0) return;

    try {
      const zip = new JSZip();
      
      // Add each audio file to the zip
      for (const audioFile of audioFiles) {
        const arrayBuffer = await audioFile.blob.arrayBuffer();
        zip.file(audioFile.filename, arrayBuffer);
      }
      
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Download the zip file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `story_audio_${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error creating zip file:', error);
      // Fallback to individual downloads
      audioFiles.forEach((audioFile, index) => {
        setTimeout(() => handleDownloadFile(audioFile), index * 100);
      });
    }
  };

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Function to calculate number of chunks
  const splitTextIntoChunks = (text: string, maxWords: number): string[] => {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    
    for (let i = 0; i < words.length; i += maxWords) {
      const chunk = words.slice(i, i + maxWords).join(' ');
      chunks.push(chunk);
    }
    
    return chunks;
  };

  // Calculate chunks when text or maxWords changes
  const estimatedChunks = useMemo(() => {
    const textToAnalyze = getCurrentText();
    if (!textToAnalyze.trim()) return 0;
    return splitTextIntoChunks(textToAnalyze, maxWords).length;
  }, [getCurrentText(), maxWords]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleGoToImage = () => {
    if (storyId) {
      router.push(`/image/${storyId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {/* Navigation */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{t('tts.navigation.backToHome')}</span>
          </button>
          
          <button
            onClick={handleGoToImage}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{t('tts.navigation.goToImage')}</span>
          </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-white/10 p-6 md:p-8 space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
              {t('tts.title')}
            </h1>
            <p className="text-gray-400">{t('tts.description')}</p>
          </div>

          {/* Text Source Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-400 pl-4">Chọn nguồn văn bản</h2>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="textSource"
                    value="story"
                    checked={!useCustomText}
                    onChange={() => setUseCustomText(false)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Sử dụng truyện hiện tại</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="textSource"
                    value="custom"
                    checked={useCustomText}
                    onChange={() => setUseCustomText(true)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Nhập văn bản tùy chỉnh</span>
                </label>
              </div>
            </div>
          </div>

          {/* Custom Text Input */}
          {useCustomText && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-l-4 border-blue-400 pl-4">Nhập văn bản tùy chỉnh</h2>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Nhập văn bản bạn muốn chuyển đổi thành giọng nói..."
                  className="w-full h-40 bg-gray-600 text-gray-100 border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-xs">
                    Số từ: ~{getWordCount(customText)}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Số ký tự: {customText.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Voice Settings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-400 pl-4">{t('tts.voiceSettings.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="voiceSelect" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('tts.voiceSettings.voiceSelect')}
                </label>
                <select
                  id="voiceSelect"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {Object.entries(t('tts.voices')).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="maxWords" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('tts.voiceSettings.maxWords')}
                </label>
                <input
                  id="maxWords"
                  type="number"
                  value={maxWords}
                  onChange={(e) => setMaxWords(parseInt(e.target.value) || 3000)}
                  min="1000"
                  max="6000"
                  step="500"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-xs text-gray-400 mt-1">{t('tts.voiceSettings.maxWordsHelp')}</p>
              </div>
            </div>
          </div>
            
          {/* Chunks Estimation */}
          {getCurrentText() && (
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                  </svg>
                  <span className="text-sm text-blue-300 font-medium">
                    {estimatedChunks} {estimatedChunks === 1 ? t('tts.estimation.audioFile') : t('tts.estimation.audioFiles')}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  ~{Math.ceil(estimatedChunks * 2)} {t('tts.estimation.timeEstimate')}
                </div>
              </div>
            </div>
          )}

          {/* Story Preview */}
          {!useCustomText && storyText && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold border-l-4 border-green-400 pl-4">{t('tts.storyPreview')}</h2>
                <div className="text-sm text-gray-400">
                  {t('tts.wordCount')}: <span className="font-semibold text-green-400">{getWordCount(storyText)}</span>
                </div>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4 max-h-64 overflow-y-auto border border-gray-600">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {storyText.substring(0, 500)}
                  {storyText.length > 500 && (
                    <span className="text-gray-500">... ({t('tts.andMore') || 'and'} {storyText.length - 500} {t('tts.moreChars') || 'more characters'})</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Rate Limiting Status */}
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">{t('tts.rateLimitStatus') || 'TTS Rate Limit Status'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">{t('tts.requestsThisMinute') || 'Requests this minute'}:</span>
                <span className={`ml-2 font-semibold ${rateLimitStatus.requestsInCurrentMinute >= rateLimitStatus.maxRequestsPerMinute ? 'text-red-400' : 'text-green-400'}`}>
                  {rateLimitStatus.requestsInCurrentMinute}/{rateLimitStatus.maxRequestsPerMinute}
                </span>
              </div>
              <div>
                <span className="text-gray-400">{t('tts.queueSize') || 'Queue size'}:</span>
                <span className={`ml-2 font-semibold ${rateLimitStatus.queueSize > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {rateLimitStatus.queueSize}
                </span>
              </div>
            </div>
            {rateLimitStatus.queueSize > 0 && (
              <div className="mt-2 text-xs text-yellow-300">
                ⏳ {t('tts.queueInfo') || 'Requests in queue will be processed with 115-second delays to respect rate limits'}
              </div>
            )}
            {rateLimitStatus.isProcessing && (
              <div className="mt-2 text-xs text-blue-300">
                🔄 {t('tts.processingQueue') || 'Processing queued requests...'}
              </div>
            )}
          </div>

          {/* Convert Button */}
          <div className="flex justify-center">
            <button
              onClick={handleConvertToSpeech}
              disabled={isConverting || !getCurrentText().trim()}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isConverting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{t('tts.converting')}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.79l-4-3.207a1 1 0 01-.383-.79V6.207a1 1 0 01.383-.79l4-3.207a1 1 0 01.617-.134zM14 8.586V14a1 1 0 102 0V8.586l2.293 2.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414L14 8.586z" clipRule="evenodd" />
                  </svg>
                  <span>{t('tts.startConversion')}</span>
                </div>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {isConverting && (
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-300"
                  style={{ 
                    width: progress.total > 0 
                      ? `${(progress.current / progress.total) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  {progress.currentChunk} 
                  {progress.total > 0 && (
                    <span className="ml-2">
                      ({progress.current}/{progress.total})
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-200">
              {error}
            </div>
          )}

          {/* Audio Files */}
          {audioFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-400">{t('tts.audioFiles')}</h3>
                {audioFiles.length > 1 && (
                  <button
                    onClick={handleDownloadAll}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{t('tts.downloadAll')}</span>
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {audioFiles.map((audioFile, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-300 truncate">
                          {audioFile.filename}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('tts.chunk')} {index + 1}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(audioFile)}
                        className="ml-3 flex-shrink-0 p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Audio Player */}
                    <div className="mt-3">
                      <audio 
                        controls 
                        src={audioFile.url}
                        className="w-full h-8"
                        style={{
                          backgroundColor: 'transparent',
                          filter: 'sepia(1) saturate(2) hue-rotate(90deg)'
                        }}
                      >
                        {t('tts.audioNotSupported')}
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VoicePage; 