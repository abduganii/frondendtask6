import { MDBTable, MDBTableBody } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import useToken from "../../Hooks/useToken"
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
function Mesesage() {
    const [token, setToken] = useToken()
    const [data, setData] = useState()
    const navigate = useNavigate()
    const [view, setView] = useState(0)

    const fetchMes = () => {
        fetch(`https://backend6.onrender.com/messege`, {
            headers: { userid: token, "Content-Type": "application/json", },
        })
            .then(res => res.json())
            .then(data => {
                setView(data?.vaiw)
                setData(data?.rec)
                if (data?.status == 500) {
                    setToken(false)
                }
            })
    }

    const deleteMessege = (e) => {
        fetch(`https://backend6.onrender.com/messege/${e}`, {
            method: "DELETE",
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMes()
        }, 1000)
        return () => clearInterval(interval)
    }, []);

    return (
        <>
            {
                data?.map(e => (
                    <MDBTable key={e._id} align='middle'>

                        <MDBTableBody>
                            <tr className='tableList'>
                                <td onClick={() => {
                                    navigate(`/oneMessege/${e._id}`)
                                }} className='tablename'>
                                    <div className='d-flex align-items-center'>

                                        <div className='ms-3'>
                                            {
                                                e?.View === false ? <p className='fw-bold mb-1'>{e.user?.name}</p> : <p className='fw-normal mb-1'>{e.user?.name}</p>
                                            }

                                        </div>
                                    </div>
                                </td>
                                <td onClick={() => {
                                    navigate(`/oneMessege/${e._id}`)
                                }} className='tablename2'>
                                    {
                                        e?.View === false ? <p className='fw-bold mb-1'>{e?.title}</p> : <p className='fw-normal mb-1'>{e?.title}</p>
                                    }
                                </td>
                                <td><Button variant="link" onClick={() => deleteMessege(e?._id)}>delete</Button></td>
                                {
                                    e?.View === false ? <td>

                                        <div className='new'> </div>
                                    </td> : ""
                                }
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                ))
            }
        </>
    )
}

export default Mesesage;