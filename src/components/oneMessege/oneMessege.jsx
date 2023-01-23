import { Button } from "react-bootstrap";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormDisabledExample from "../replyMesege/replyMessege";

function OneMessege() {
    let { id } = useParams();
    const [data, setData] = useState()
    const [mes, setMes] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://backend6.onrender.com/oneMessege/${id}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [])


    fetch(`https://backend6.onrender.com/messege/${id}`)
        .then((res) => res.json())
        .then((data) => setMes(data));



    console.log(mes)

    return (
        <div>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Logo</MDBNavbarBrand>
                    <Button variant="secondary" size="lg">
                        Write Messege
                    </Button>
                </MDBContainer>
            </MDBNavbar>
            <div style={

                { margin: "20px" }
            }>
                <img onClick={() => navigate('/')} src={"https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/thin-arrow-left-icon.png"} alt="icon" width={20} />
                <h2>{data?.title}</h2>
                <h5>{data?.user?.name}</h5>
                <p style={{
                    "fontSize": "small",
                    "fontWeight": 400,
                    "opacity": .8,
                }}>To: {data?.recipient?.name}</p>
                <p>{data?.message}</p>
            </div>
            <hr />



            {
                mes && mes?.map(e => (

                    <div style={{ margin: "20px" }}>
                        <h5>{e?.user.name}</h5>
                        <p style={{
                            "fontSize": "small",
                            "fontWeight": 400,
                            "opacity": .8,
                        }}>To: {e?.recipient?.name}</p>
                        <p>{e?.message}</p>
                        <hr />
                    </div>

                ))
            }


            <FormDisabledExample data={data} />
        </div>
    )
}

export default OneMessege;