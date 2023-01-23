
import { useRef, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import useToken from "../../Hooks/useToken";

function MessegeFrom() {
    const [token, setToken] = useToken()
    const [userS, setUserS] = useState()
    const [username, setUsername] = useState()
    const [recipientId, setRecipientId] = useState()
    const title = useRef()
    const message = useRef()
    const [open, setOpen] = useState(true)
    const MesegeSubmit = (e) => {
        e.preventDefault();
        (async () => {
            try {
                const res = await fetch("https://backend6.onrender.com/messege", {
                    method: "POST",
                    headers: {
                        userid: token, "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        recipientId: recipientId,
                        title: title.current?.value,
                        message: message.current?.value,
                    }),
                });
                const data = await res.json();

                setOpen(false)
            } catch (error) {
                console.log(error);
            }
        })();
    };

    const searchInput = async (e) => {
        if (e.target.value.length > 0) {
            await fetch(`https://backend6.onrender.com/getuser`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ payload: e.target.value })
            })
                .then(res => res.json())
                .then(data => {
                    setUserS(data.payload)
                })
        }
    }


    return (
        <>
            {open ? <Form className='wrap' onSubmit={MesegeSubmit}  >
                <Modal.Header closeButton style={{ marginBottom: "20px" }} onClick={() => setOpen(false)}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control type="text" placeholder="Recipientl" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={searchInput} />

                    {userS?.map(e => (
                        <div key={e?.id} className='dropListdaws'>
                            <p onClick={() => {

                                setRecipientId(e?._id)
                                setUsername(e?.name)
                            }}>{e?.name}</p>
                        </div>
                    ))}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={title} type="text" placeholder="Topic" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Control ref={message} as="textarea" rows={13} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form> : ""}
        </>
    )
}

export default MessegeFrom;