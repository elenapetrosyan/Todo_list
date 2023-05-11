import {useRef, useState} from 'react';

function Contact() {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    
    const handleClick = ()=>{
        console.log(inputRef.current.value);
        inputRef.current.value = '';
    };
    
        return(
            <div>
            <h1 className="text-center">Contact us page</h1>
           E-mail <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
           <br/> <br/>
            Name <input type="text" ref={inputRef}/>
            <br/> <br/>
            Message <input type="text" ref={inputRef}/>
            <button onClick={handleClick}>Send</button>
            </div>
        )
    }

export default Contact;