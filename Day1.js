const fs = require('fs').promises;

async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log('File Content: \n' + content);
  } catch (error) {
      console.error('Error reading file:', error.message);
    }
  }

  readFileContent('test-files/file1.txt');
  readFileContent('test-files/empty-file.txt');
  readFileContent('test-files/nonexistent-file.txt');
