import { useState } from 'react'
import axios from 'axios'

function SMSForm() {
    const [to, setTo] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const response = await axios.post('http://localhost:8282/api/send-sms', { to, body });
            if (response.data.success) {
                setStatus('SMS sent successfully!');
                setTo('');
                setBody('');
            } else {
                setStatus('Failed to send SMS.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending SMS.');
        }
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '8px',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
        resize: 'vertical',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const statusStyle = {
        marginTop: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Send SMS</h2>
            <input
                type="tel"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Phone number"
                required
                style={inputStyle}
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Message body"
                required
                style={textareaStyle}
            />
            <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Send SMS
            </button>
            {status && <p style={statusStyle}>{status}</p>}
        </form>
    )
}

export default SMSForm