// Export helper functions for different file formats
import jsPDF from 'jspdf';

export const exportAsText = (transcript, summary, actionItems) => {
  let content = `AI TRANSCRIPTION EXPORT
========================

`;

  if (transcript) {
    content += `TRANSCRIPT
----------
${transcript.text}

`;
  }

  if (summary) {
    content += `SUMMARY
-------
Key Points:
${summary.keyPoints.map((point, idx) => `${idx + 1}. ${point.title}: ${point.description}`).join('\n')}

Topics: ${summary.topics.join(', ')}
Sentiment: ${summary.sentiment}

`;
  }

  if (actionItems && actionItems.length > 0) {
    content += `ACTION ITEMS
------------
${actionItems.map((item, idx) => `${idx + 1}. [${item.completed ? 'x' : ' '}] ${item.text} (Priority: ${item.priority}${item.dueDate ? `, Due: ${item.dueDate}` : ''})`).join('\n')}

`;
  }

  content += `---
Generated on: ${new Date().toLocaleString()}`;

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

export const exportAsPDF = (transcript, summary, actionItems) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 12, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach(line => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    
    yPosition += 5; // Add spacing after text block
  };

  // Title
  doc.setFillColor(0, 212, 255);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Transcription Export', margin, 20);
  
  yPosition = 40;
  doc.setTextColor(0, 0, 0);

  // Transcript Section
  if (transcript) {
    addText('TRANSCRIPT', 16, true);
    addText(transcript.text, 11);
    yPosition += 5;
  }

  // Summary Section
  if (summary) {
    addText('SUMMARY', 16, true);
    
    addText('Key Points:', 14, true);
    summary.keyPoints.forEach((point, idx) => {
      addText(`${idx + 1}. ${point.title}`, 12, true);
      addText(`   ${point.description}`, 11);
    });
    
    yPosition += 5;
    addText(`Topics: ${summary.topics.join(', ')}`, 11);
    addText(`Sentiment: ${summary.sentiment.charAt(0).toUpperCase() + summary.sentiment.slice(1)}`, 11);
    yPosition += 5;
  }

  // Action Items Section
  if (actionItems && actionItems.length > 0) {
    addText('ACTION ITEMS', 16, true);
    
    actionItems.forEach((item, idx) => {
      const status = item.completed ? '✓' : '○';
      const priority = item.priority.toUpperCase();
      const dueDate = item.dueDate ? ` | Due: ${item.dueDate}` : '';
      
      addText(`${idx + 1}. ${status} ${item.text}`, 11);
      addText(`   Priority: ${priority}${item.assignee ? ` | Assignee: ${item.assignee}` : ''}${dueDate}`, 10);
    });
  }

  // Footer
  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = margin;
  }
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, pageHeight - 15);
  doc.text('AI Meeting Intelligence Platform', pageWidth - margin - 60, pageHeight - 15);

  // Save the PDF
  doc.save(`transcript-${Date.now()}.pdf`);
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
  let content = `# AI Transcription Export

`;

  if (transcript) {
    content += `## Transcript

${transcript.text}

`;
  }

  if (summary) {
    content += `## Summary

### Key Points

${summary.keyPoints.map((point, idx) => `${idx + 1}. **${point.title}**: ${point.description}`).join('\n\n')}

**Topics**: ${summary.topics.join(', ')}  
**Sentiment**: ${summary.sentiment}

`;
  }

  if (actionItems && actionItems.length > 0) {
    content += `## Action Items

${actionItems.map((item, idx) => `${idx + 1}. [${item.completed ? 'x' : ' '}] ${item.text}  
   - **Priority**: ${item.priority}${item.assignee ? `  \n   - **Assignee**: ${item.assignee}` : ''}${item.dueDate ? `  \n   - **Due Date**: ${item.dueDate}` : ''}`).join('\n\n')}

`;
  }

  content += `---

*Generated on: ${new Date().toLocaleString()}*`;

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

// Made with Bob
