// Script to list available Gemini models
const GEMINI_API_KEY = 'AIzaSyDHtsAPVz9IVkpPs6-N3rkHhJ9RMxMBj34';

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', error);
      return;
    }

    const data = await response.json();
    console.log('\n=== Available Gemini Models ===\n');
    
    if (data.models) {
      data.models.forEach(model => {
        console.log(`Model: ${model.name}`);
        console.log(`Display Name: ${model.displayName}`);
        console.log(`Description: ${model.description}`);
        console.log(`Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
}

listModels();

// Made with Bob
