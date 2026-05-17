# TODO.md

# AI Meeting Intelligence Platform — Task Breakdown

---

# TASK 1 — Audio Upload & Transcription System

## Objective
Implement the core audio upload and transcription pipeline.

## Features
- Drag & drop audio upload
- File selection support
- Upload progress UI
- Audio validation
- Display uploaded file details
- Convert speech to text
- Render transcript in transcript panel

## Requirements
- Support MP3, WAV, M4A
- Show loading animation during processing
- Handle upload errors gracefully
- Store transcript in application state

## Expected Output
- User uploads audio
- Transcript appears in dashboard
- Transcript panel becomes scrollable and searchable

---

# TASK 2 — AI Summary & Action Item Generation

## Objective
Generate intelligent summaries and extract actionable insights from transcripts.

## Features
- AI-generated summary cards
- Key insight extraction
- Action item generation
- Topic detection
- Meeting highlights

## Requirements
- Use Groq/Gemini API
- Send transcript as prompt context
- Generate concise summaries
- Extract actionable tasks
- Display structured AI cards

## Expected Output
- Summary cards rendered dynamically
- Action items displayed in Action Items panel
- Topics and highlights visible in dashboard

---

# TASK 3 — Speaker Recognition & Voice Mapping

## Objective
Identify speakers in transcripts and allow persistent speaker mapping.

## Features
- Detect speaker labels
- Display unknown speakers
- Manual speaker assignment
- Save speaker mappings locally
- Reuse mappings in future uploads

## Workflow
1. Transcript generates:
   - Speaker 1
   - Speaker 2
   - Speaker 3

2. User assigns names:
   - Speaker 1 → John
   - Speaker 2 → Sarah

3. Store mapping locally

4. Future uploads attempt automatic speaker matching

## Requirements
- Use local storage initially
- Highlight unidentified speakers
- Show timestamps for unidentified voice segments

## Expected Output
- Named speakers appear in transcript
- Previous mappings persist across sessions

---

# TASK 4 — Authentication & User Sessions

## Objective
Allow users to register/login and continue their work across sessions.

## Features
- Google login
- Email login
- Session persistence
- User dashboard state
- Save transcript history

## Requirements
- Use Firebase Authentication
- Maintain lightweight architecture
- Persist user session locally/cloud
- Protect user-specific data

## Expected Output
- Users can login/signup
- Previous sessions and transcripts persist
- Personalized dashboard experience

---

# TASK 5 — Export & AI Chat Assistant

## Objective
Allow users to export summaries and interact with an AI assistant based on transcript context.

## Features
- Export transcript as TXT
- Export summary as PDF
- AI chatbot for transcript Q&A
- Transcript-aware responses
- Share summary via email

## Requirements
- Use jsPDF for PDF export
- Use transcript as AI context
- Generate contextual answers
- Email sharing support

## Expected Output
- Downloadable PDF/TXT files
- Working AI assistant panel
- Users can ask questions about meeting content
- Share button sends summary to another user/email