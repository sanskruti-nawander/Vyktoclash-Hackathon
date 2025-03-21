import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const MockInterview = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    // Handle text input for the user question
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInput) {
            alert('Please enter a question!');
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/start-interview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
            });

            const data = await res.json();

            if (res.ok) {
                setResponse(data.interviewResponse);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong, please try again later.');
        }
    };

    return (
        <div className="container">
            <Sidebar userName="Aryan Sikariya" />
            <div className="content">
                <h1>Mock Interview Chatbot</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="userInput">Your Question:</label>
                        <textarea
                            id="userInput"
                            value={userInput}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Ask me anything about your career..."
                        ></textarea>
                    </div>

                    <button type="submit">Ask</button>
                </form>

                {/* Display the Interview Response */}
                {response && (
                    <div className="response">
                        <h3>Chatbot Response:</h3>
                        <p>{response}</p>
                    </div>
                )}
            </div>

            <style>{`
                .container {
                    display: flex;
                    font-family: 'Arial', sans-serif;
                    min-height: 100vh;
                    background-color: #f0f2f5;
                }

                .content {
                    flex-grow: 1;
                    max-width: 700px;
                    margin: 2rem auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    text-align: center;
                    color: #6a0dad;
                    font-size: 28px;
                    margin-bottom: 20px;
                }

                .input-container {
                    margin-bottom: 20px;
                }

                label {
                    font-size: 16px;
                    color: #6a0dad;
                    margin-bottom: 10px;
                    display: block;
                }

                textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #6a0dad;
                    border-radius: 8px;
                    font-size: 16px;
                    resize: vertical;
                    background-color: #f7f2ff;
                    color: #333;
                }

                textarea:focus {
                    outline: none;
                    border-color: #9a31e6;
                    box-shadow: 0 0 6px rgba(106, 13, 173, 0.5);
                }

                button {
                    width: 100%;
                    padding: 14px;
                    background-color: #6a0dad;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                button:hover {
                    background-color: #9a31e6;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(106, 13, 173, 0.2);
                }

                .response {
                    margin-top: 30px;
                    padding: 20px;
                    background-color: #f3e5ff;
                    border: 2px solid #9a31e6;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(154, 49, 230, 0.2);
                }

                .response h3 {
                    color: #6a0dad;
                    font-size: 20px;
                    margin-bottom: 10px;
                }

                .response p {
                    color: #333;
                    font-size: 16px;
                    line-height: 1.5;
                }
            `}</style>
        </div>
    );
};

export default MockInterview;