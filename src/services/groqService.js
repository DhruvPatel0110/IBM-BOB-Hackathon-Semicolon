// Groq API Service for Speech-to-Text using Whisper
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';

export const transcribeAudio = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-large-v3');
    formData.append('language', 'en'); // Auto-detect if not specified
    formData.append('response_format', 'verbose_json'); // Get detailed response with timestamps
    formData.append('temperature', '0'); // More accurate transcription

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Transcription failed');
    }

    const data = await response.json();
    
    // Extract transcript and metadata
    return {
      text: data.text,
      duration: data.duration || 0,
      language: data.language || 'en',
      segments: data.segments || [],
      words: data.words || [],
    };
  } catch (error) {
    console.error('Groq transcription error:', error);
    throw error;
  }
};

// Helper function to format duration
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to count words
export const countWords = (text) => {
  return text.trim().split(/\s+/).length;
};

// Made with Bob
