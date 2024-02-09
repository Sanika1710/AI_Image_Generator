import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assests/pxfuel.jpg';

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState(default_image); // Use imageUrl state to store the generated image URL
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        try {
            const url = 'https://ai-image-generator3.p.rapidapi.com/generate';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDKEY,
                    'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
                },
                body: JSON.stringify({  // Convert the body to JSON string
                    prompt: inputRef.current.value,  // Use the input value as the prompt
                    page: 1,
                    size: 'medium', // Set the size to medium
                })
            };

            const response = await fetch(url, options);
            const data = await response.json(); // Parse the response as JSON

            if (data.results && data.results.images && data.results.images.length > 0) {
                const generatedImageUrl = data.results.images[0]; // Assuming the first image in the array is the generated image
                setImageUrl(generatedImageUrl); // Set the generated image URL in the state
            } else {
                // Handle the case where no images are returned
                console.error('No images found in the response');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image generator</div>
            <div className='img-loading'>
                <div className='image'><img src={imageUrl} alt="Generated" id="imgg" /></div>
                {/* let x=document.querySelector("#imgg");
                x.innerHTML= "" */}
            </div>
            <div className='search-box'>
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe the Image in your mind.' />
                <button className="generate-btn" onClick={imageGenerator}>Generate</button> {/* Use imageGenerator directly without arrow function */}
            </div>
        </div>
    );
}

export default ImageGenerator;