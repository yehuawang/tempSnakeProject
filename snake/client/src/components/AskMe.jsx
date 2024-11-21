import React, {useState, useRef} from 'react'
import '../styles/AskMe.css'
import ChatContainer from './Aichatbot/ChatContainer'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'





function AskMe({ loggedInUser }) {
    const [expand, setExpand] = useState(false)
    const [target, setTarget] = useState(null)
    const ref = useRef(null)

    const handleClick = (event) => {
        setTarget(event.target)
        setExpand(!expand)
    }


    return (
        <div ref={ref}>
            <button className="round-ask-me-button" onClick={handleClick}>
                <i className="bi bi-chat-left-text-fill"></i>
            </button>


            <Overlay
                show={expand}
                target={target}
                placement="top"
                container={ref}
                containerPadding={20}
                className="ask-me-overlay"
            >
                <Popover>
                    <Popover.Header className="ask-me-popover-header">Ask Alice Anything!</Popover.Header>
                    <Popover.Body>
                        <ChatContainer userEmail={loggedInUser.email} />
                    </Popover.Body>
                </Popover>
            </Overlay>

        </div>
    )
}

export default AskMe