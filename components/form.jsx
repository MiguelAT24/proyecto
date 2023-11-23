
import styles from '@/styles/Form.module.css'
import { useState } from 'react';

const Form = () => {

const [message, setMessage] = useState('')
const handleSubmit = async (event) => {
event.preventDefault()
const data = new FormData(event.target)
const response = await fetch(event.target.action, { 
method: 'POST',
body: data,
headers: {
Accept: 'application/json'
}
})
const result = await response.json()
if (!response.ok) {

setMessage(result.errors.map(error => error.message).
join(', '))
return false
    }
setMessage('Se ha enviado tu correo satisfactoriamente')
} 
return (
    
    <form action='https://formspree.io/f/xoqzlyek'
    method='POST'
    onSubmit={handleSubmit}>
    <input placeholder='Name' type='text' id='name' name='name' className={styles.input} />
    <input placeholder='Email' type='email' id='email' name='email' className={styles.input} />
    <textarea placeholder='Type your message here' name='message' id='message' className={´${styles.input} ${styles.textarea}´} />
    <button className={styles.button}>Submit</button> 
    <p className={styles. alert}>{message}</p> 
    </form>
)
}

export default Form