import './translate.css'
import { useState } from "react";

function Translation() {

    const [translation,setTranslation] = useState('');

    // We made a variable called Text. It has a fake input that we should translate each letters into images. 
   //We use split to remove things within parantheses. For this example it's space.
    // let text = 'hello everyone'.split(' '); 
    let text = translation.split(' ')
    
    // We need this function because we need the paths of images. We do this by letter. it returns full paths of images. 
    function getPathOfImage(letter) {
        return require(`../signs/${letter.toLowerCase()}.png`);
    }
    // We create an empty array. We're gonna fill this with result of getPathOfImage, So path of images.
    let list = [] 
    // On the for l

    // l
    for (const word of text) {
        for (const char of word) {
            list.push(getPathOfImage(char));
        }
    }


    return (
        
        <div> 
            <img src="/" alt="" />

            
            <fieldset className="fieldTranslate">
                <label htmlFor="translation">
                    type here
                </label>
                <input id="translation" type="text" placeholder="What would you like to translate?" onChange={event => setTranslation(event.target.value)} />
            </fieldset>
                

            <ul className='signs'>
                {/* Map uses array. Inside map there will be looped, that iterates.  */}
                {list.map((path,index) => <li key={index}><img src={path} alt="" /></li>)}
            </ul>  
        </div>


    )
}

export default Translation