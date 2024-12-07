import { useState } from 'react';
import { GoUpload } from "react-icons/go";
import axios from 'axios';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        document.getElementById('preview').setAttribute('src',URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preview = await document.getElementById('preview');

        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        preview.setAttribute('src','./src/assets/loading1.gif');

        try {
            const response = await axios.post('http://localhost:5000/remove-bg', formData, {
                responseType: 'blob', // Important to receive the file as binary data
            });

            // Create a blob URL for the response data
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            await preview.setAttribute('src',url);
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.png'); // Desired file name
            document.body.appendChild(link);
            link.click();

            // Clean up resources
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error:', err);
            alert('Error removing background.');
        }
    };

    return (
        <div className='flex flex-row flex-wrap w-full md:m-20'>
            <div className='w-full md:w-2/5 flex flex-row flex-wrap justify-center m-2 mt-5 md:p-5 border-2 border-blue-500 max-h-700px'>
                <img src="./src/assets/bg-remove-image.png" alt="" className='max-h-96' id='preview'/>
            </div>
            <form onSubmit={handleSubmit} className='w-full md:w-1/2 flex flex-col justify-center items-center m-2 mt-8'>
                <input type="file" onChange={handleFileChange} className='hidden' id='input-image'/>
                <label htmlFor="input-image" className='border-2 bg-orange-500 decoration-slice w-48 h-12 rounded-md flex items-center justify-around text-1xl text-white cursor-pointer'>Select Your File<GoUpload /></label>
                <button type="submit" className='w-72 h-20 border-4 mt-20 bg-gradient-to-r from-blue-500 to-gray-400 text-white text-1xl rounded-2xl'>Preview and Remove Background</button>
                {/* <img src="" alt="" id='preview'/> */}
            </form>
        </div>
    );
};

export default Upload;
