'use client'

import '@/app/styles/contact.css'
import contact from '@/app/assets/contact.png'
import arrow from '@/app/assets/arrow_icon.png'
import Image from 'next/image'

export default function Contact(){

  async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "78d2594b-ac8a-4fee-a670-9feb5892617e",
                name: e.target.name.value,
                email: e.target.email.value,
                message: e.target.message.value,
            }),
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            
        }
        e.target.name.value = "";
        e.target.email.value = "";
        e.target.message.value = "";
    }


    return(
        <div className="container">
            <form action="" className="form-container" onSubmit={handleSubmit}>
                <div className="form-title">
                    <h2>Get In Touch</h2>
                    <hr/>
                </div>

                <input type="text" name='name' placeholder='John Doe' className='input-fields' required/>
                <input type="email" name='email' placeholder='example123@gmail.com' className='input-fields' required/>
                <textarea name="message" placeholder='Your message' className='input-fields' required></textarea>
                <button type='submit'>Submit <Image src={arrow} alt='' height={15} /> </button>

            </form>
            <div className="image-container">
                <Image
                src={contact}
                width={500}
                alt=''
                />
            </div>
        </div>
    )

} 

