import React, { useState, useEffect } from 'react';
import s from './ContactMePage.module.css'; 

export default function ContactMePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled ] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(()=>{
    if(formStatus && (formData.name || formData.email || formData.message)){
        setFormStatus('')
    }
    if (formData.name && formData.email && formData.message){
        setIsSubmitDisabled(false);
    }else{
        setIsSubmitDisabled(true);
    }
  },[formData])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
        setIsSubmitDisabled(true);
        setFormStatus('Sending...');
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: 'c66d26f4-057f-4f16-8c4c-cb5c2b375180',
            ...formData
          })
        });

        const result = await response.json();

        if (result.success) {
            setFormData({
              name: '',
              email: '',
              message: ''
            });
          setFormStatus('Message Successfully sent!');
        } else {
          setFormStatus('Failed to send message. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        setFormStatus('Failed to send message. Please try again later.');
      }
    } else {
      setFormStatus('Please fill out all fields.');
    }
  };
  let [inputFocused, setInputFocused] = useState(false);
  const handleInputFocus = () => {
    setInputFocused(true);
    console.log('focused')
  }
  const handleInputBlur = () => {
    setInputFocused(false);
    console.log('blurred')
  }
  useEffect(() => {
    const handleResize = () => {
      if (inputFocused) {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }
    };
    handleResize()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [inputFocused]);
  // useEffect(()=>{
  //   const mainSectionParent = document.getElementById('all-main-section-parent');
  //   if (mainSectionParent) {
  //     mainSectionParent.style.opacity = inputFocused ? '0' : '1';
  //     mainSectionParent.style.transition = 'opacity 0.5s ease'; // Optional: for smooth transition
  //   }
  // },[inputFocused])
  return (
    <div className={s.contactForm}>
      <h2>Contact Me</h2>
      <form className={s.contactActualForm} onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='Name:'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email:'
            value={formData.email}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div>
          <textarea
            placeholder='Message:'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <button {...isSubmitDisabled && {disabled: true}} className={s.submitForm} type="submit">Submit</button>
      </form>
      <p className={s.formSubmissionMessage}>{formStatus}</p>
    </div>
  );
};