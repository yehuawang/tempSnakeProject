import React, {useState, useEffect} from 'react'
import '../styles/AskMe.css'
import ChatContainer from './Aichatbot/ChatContainer'
import 'bootstrap-icons/font/bootstrap-icons.css'

function AskMe() {
    const [expand, setExpand] = useState(false)
    const [showLongButton, setShowLongButton] = useState(false)

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setShowLongButton(window.innerWidth > 768)
        }

        window.addEventListener('resize', handleWindowSizeChange)

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    },[])


    return (
        <div className="ask-me-container">
            <div className="dialogue-box" hidden={ !expand && true }>
                <ChatContainer userEmail="alice157@google.com"/>
            </div>
            <div className="triangle" hidden={ !expand && true }></div>
            {
                showLongButton ? (
                    <button className="ask-me-button" onClick={()=>{setExpand(!expand)}}>Questions? Aks Alice Anything... </button>
                ) : (
                    <button className="round-ask-me-button" onClick={()=>{setExpand(!expand)}}>
                        <i className="bi bi-chat-right-dots-fill"></i>
                    </button>
                )
            }
        </div>
    )
}

export default AskMe