const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv')
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const { removeBackgroundFromImageFile } = require('remove.bg');

const app = express();
dotenv.config();
const port = 5000;

const dirname = path.resolve();


console.log('working');
app.use(express.static(path.join(dirname,'/frontend/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirname,"frontend","dist","index.html"));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for background removal
app.post('/remove-bg', upload.single('image'), async (req, res) => {
    const localFile = req.file.path;
    const outputFile = `uploads/processed-${Date.now()}.png`;

    try {
        const result = await removeBackgroundFromImageFile({
            path: localFile,
            apiKey: 'zR8svbq4FGrLyPSUGnWCWC17',
            size: 'regular',
            type: 'auto',
            outputFile
        });
        console.log('removed');
        fs.unlinkSync(localFile); // Clean up the original file
        res.download(outputFile, () => fs.unlinkSync(outputFile)); // Send the processed file and delete it after download
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Background removal failed.' });
    }
});

app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
