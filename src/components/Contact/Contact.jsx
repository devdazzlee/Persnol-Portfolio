import React,{useState, useRef} from 'react'
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Contact.css'

const Contact = () => {
    const form = useRef();
    const [showPopup, setShowPopup] = useState(false);
    const [done, setDone] = useState(false)
    const [notDone, setNotDone] = useState(false)
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        setDone(false)
        setNotDone(false)
    }

    const sendEmail = async(e) => {
    e.preventDefault();
    console.log(formData.subject)
    console.log(formData.from_name)
    if(!formData.name || !formData.email ||!formData.message || !formData.subject){
      setNotDone(true)
    } else {

      try {
        // Make API request using Axios
        // 
        const response = await axios.post('https://amused-culottes-bear.cyclic.app/api/v1/contact', formData);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
  
        // Show pop-up message
     alert('Form has been submitted')
      } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        alert('An error occurred while sending the message. Please try again.');
      }
    }
    };
    

    return(
        <Container style={{paddingTop: '50px'}} >
            <Row >
            <Col md={6} className="c-left" >
            <h1 >Get in Touch</h1>
            <h1 className="yellow">Contact me</h1>
            </Col>
            <Col md={6} className="c-right">
                <form ref={form} onSubmit={sendEmail}>
                <input type="text" name="name" className="user"  placeholder="Name" onChange={handleChange}/>
                <input type="email" name="email" className="user" placeholder="Email" onChange={handleChange} />
                <input type="text"  name="subject"  className="user" placeholder="Subject" onChange={handleChange} />
                <textarea name="message" className="user" placeholder="Message" onChange={handleChange} />
                <span className='not-done' >{notDone && "Please, fill all the input field"}</span>
                <Button type="submit" className="button" disabled={done}>Send</Button>
                <span className='done'>{done && "Thanks for Contacting me"}</span>
                </form>
            </Col>
            </Row>
        </Container>
    )
}

export default Contact