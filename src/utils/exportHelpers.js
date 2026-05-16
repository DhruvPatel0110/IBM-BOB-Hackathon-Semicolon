// Export helper functions for different file formats

export const exportAsText = (transcript, summary, actionItems) => {
  const content = `
AI TRANSCRIPTION EXPORT
========================

TRANSCRIPT
----------
${transcript.text}

SUMMARY
-------
Key Points:
${summary.keyPoints.map((point, idx) => `${idx + 1}. ${point.title}: ${point.description}`).join('\n')}

Topics: ${summary.topics.join(', ')}
Sentiment: ${summary.sentiment}

ACTION ITEMS
------------
${actionItems.map((item, idx) => `${idx + 1}. [${item.completed ? 'x' : ' '}] ${item.text} (Priority: ${item.priority}, Due: ${item.dueDate})`).join('\n')}

---
Generated on: ${new Date().toLocaleString()}
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transcript-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsJSON = (transcript, summary, actionItems) => {
  const data = {
    transcript,
    summary,
    actionItems,
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transcript-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsMarkdown = (transcript, summary, actionItems) => {
  const content = `
# AI Transcription Export

## Transcript

${transcript.text}

## Summary

### Key Points

${summary.keyPoints.map((point, idx) => `${idx + 1}. **${point.title}**: ${point.description}`).join('\n\n')}

**Topics**: ${summary.topics.join(', ')}  
**Sentiment**: ${summary.sentiment}

## Action Items

${actionItems.map((item, idx) => `${idx + 1}. [${item.completed ? 'x' : ' '}] ${item.text}  
   - **Priority**: ${item.priority}  
   - **Assignee**: ${item.assignee}  
   - **Due Date**: ${item.dueDate}`).join('\n\n')}

---

*Generated on: ${new Date().toLocaleString()}*
  `.trim();

  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transcript-${Date.now()}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Note: For PDF and DOCX exports, you would typically use libraries like:
// - jsPDF for PDF generation
// - docx for DOCX generation
// These are not included in the basic implementation but can be added as needed

// Made with Bob
