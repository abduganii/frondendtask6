import { Button, Nav, Navbar } from 'react-bootstrap';
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from 'mdb-react-ui-kit';
import "./home.css"
import { useEffect, useState } from 'react';
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';
import Mesesage from '../mesesage/Mesesage';
import MessegeFrom from '../messegeForm/messegeFrom';
import MesesageSended from '../sendedMesege/sendedMesege';

function Home() {
    const [token, setToken] = useToken()
    const [view, setView] = useState(0)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [boolen, setBoolen] = useState(true)



    const fetchMes = () => {
        fetch(`https://backend6.onrender.com/messege`, {
            headers: { userid: token, "Content-Type": "application/json", },
        })
            .then(res => res.json())
            .then(data => {
                setView(data?.vaiw)
                if (data?.status == 500) {
                    setToken(false)
                }
            })
    }


    useEffect(() => {
        const interval = setInterval(() => {
            fetchMes()
        }, 3000)
        return () => clearInterval(interval)
    }, []);

    const logout = () => setToken(false)

    return (

        <div div className='homeBody'>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Logo</MDBNavbarBrand>
                    <div>
                        <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>
                            Write Messege
                        </Button>
                        <Button variant="link" onClick={logout} >logout</Button>
                    </div>
                </MDBContainer>
            </MDBNavbar>
            <Navbar bg="light" variant="light">

                <Nav className="me-auto">
                    <Nav.Link onClick={() => setBoolen(true)} style={view > 0 ? { color: "red", marginRight: "120px", marginLeft: "15px" } : { marginRight: "120px", marginLeft: "15px" }}  > Home{view > 0 ? <span>({view})</span> : ""}</Nav.Link>
                    <Nav.Link onClick={() => setBoolen(false)}>Sent</Nav.Link>
                </Nav>

            </Navbar>

            {
                boolen ? <Mesesage /> : <MesesageSended />
            }

            {open ? <MessegeFrom /> : ""}



        </div >

    )
}

export default Home;
