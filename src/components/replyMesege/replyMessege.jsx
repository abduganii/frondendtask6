import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useToken from '../../Hooks/useToken';
import "./reply.css"
function FormDisabledExample({ data }) {
    const [token, setToken] = useToken()

    const message = useRef()
    const MesegeSubmit = async (e) => {
        e.preventDefault();
        (async () => {
            try {
                const res = await fetch("https://backend6.onrender.com/replymessege", {
                    method: "POST",
                    headers: {
                        userid: token, "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        messegeId: data?._id,
                        recipientId: data?.recipient?._id !== token ? data?.recipient?._id : data?.user?._id,
                        message: message.current?.value,
                    }),
                });
                const datames = await res.json();
                console.log(datames)
            } catch (error) {
                console.log(error);
            }
        })();
    };

    console.log(data?.recipient?._id !== token ? data?.recipient?._id : data?.user?._id)




    return (
        <Form className='wrapreply' onSubmit={MesegeSubmit}>
            {data?.recipient?._id == token ? <p>{data?.recipient?.name}</p> : ""}
            {data?.user?._id == token ? <p>{data?.user?.name}</p> : ""}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Control ref={message} as="textarea" rows={4} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Send
            </Button>

        </Form>
    );
}

export default FormDisabledExample;