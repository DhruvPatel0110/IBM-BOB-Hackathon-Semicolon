import { createContext, useContext, useState } from 'react';

const TranscriptContext = createContext();

export const useTranscript = () => {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error('useTranscript must be used within TranscriptProvider');
  }
  return context;
};

export const TranscriptProvider = ({ children }) => {
  const [transcript, setTranscript] = useState(null);
  const [transcriptId, setTranscriptId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [actionItems, setActionItems] = useState(null);

  const value = {
    transcript,
    setTranscript,
    transcriptId,
    setTranscriptId,
    summary,
    setSummary,
    actionItems,
    setActionItems,
  };

  return (
    <TranscriptContext.Provider value={value}>
      {children}
    </TranscriptContext.Provider>
  );
};

// Made with Bob