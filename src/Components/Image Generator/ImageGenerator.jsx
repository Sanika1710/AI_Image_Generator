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
        const url = 'https://chatgpt-42.p.rapidapi.com/texttoimage';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDKEY,
                'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
            },
            body: JSON.stringify({ 
                text: inputRef.current.value
            })
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json(); // Parse response as JSON
            console.log(result);
            // const imageUrl = (result); // Convert string URL to URL object
        //     const imageUrl = result.url; // Access the URL from the response
        // console.log(imageUrl); // Check if the URL is correct
        setImageUrl(result.generated_image);
        } catch (error) {
            console.error(error);
        }
    };

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
};

export default ImageGenerator;