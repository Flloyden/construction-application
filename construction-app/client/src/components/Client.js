import React, { useEffect, useState } from 'react'
import ApiConnector from '../services/ApiConnector';
import {useLocation, useNavigate} from 'react-router-dom';
import { BsPersonFill, BsTelephoneFill, BsFillHouseFill } from 'react-icons/bs';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { AiOutlineNumber } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import '../styles/Client.css';

export default function Client() {
    const navigate = useNavigate();
    const location = useLocation();
    const [kund, setKund] = useState(null);
    const [loading, setLoading] = useState(true);
    var url = location.pathname;
    var res = url.split("/");
    var pos = res.indexOf('kunder');
    var result = res[pos+1];

    useEffect(() => {
        // Gets all the clients on page load
        const fetData = async () => {
            setLoading(true);
            try {
                const response = await ApiConnector.getKund(result);
                if (response.data === null) {
                    navigate("/error")
                } else {
                    setKund(response.data)
                    console.log(response.data)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetData();
    }, [result, navigate]);

  return (
    <div className='container'>
        <div className='content'>
            <h1>Kundinformation</h1>
            {!loading && (
                <div class="testingu">
                    <div class="one">
                    <div className='testing'>
                            <BsPersonFill className='icon1' />
                            <p className='infoText'>Kund</p>
                            <span className='text'>
                                {kund.name}
                            </span>
                        </div>
                        <div className='testing'>
                            <AiOutlineNumber className='icon1' />
                            <p className='infoText'>Personnummer</p>
                            <span className='text'>
                                {kund.socialSecurityNumber}
                            </span>
                        </div>
                            <div className='testing'>
                            <MdLocationOn className='icon1' />
                            <p className='infoText'>Adress</p>
                            <span className='text'>
                                {kund.address}
                            </span>
                        </div>
                        <div className='testing'>
                            <MdEmail className='icon1' />
                            <p className='infoText'>E-post</p>
                            <span className='text'>
                                {kund.name}
                            </span>
                        </div>
                        <div className='testing'>
                            <BsTelephoneFill className='icon1' />
                            <p className='infoText'>Telefonnummer</p>
                            <span className='text'>
                                {kund.phoneNumber}
                            </span>
                        </div>
                        <div className='testing'>
                            <BsFillHouseFill className='icon1' />
                            <p className='infoText'>Fastighetsbeteckning</p>
                            <span className='text'>
                                {kund.propertyDesignation}
                            </span>
                        </div>
                    </div>
                    <div class="two">
                        <h2>Anteckningar</h2>
                        <div className='notes'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate condimentum tellus, in euismod lectus blandit et. Etiam aliquam congue erat, et vulputate nisl ornare vitae. Sed ut mi sem. Nam fermentum arcu vel sapien vehicula efficitur. In vel dictum turpis. Quisque mollis, nunc eget feugiat ornare, odio turpis sodales sapien, at maximus purus quam tempus sapien. In consectetur tempus pellentesque.</p>
                        </div>
                    </div>
                    <div class="three">
                        <div className='title'>
                            <h2>Jobb</h2>
                            <GrAddCircle className='addWorkIcon' />
                        </div>
                        <div className='work'>
                            <div className='workTitle'>
                                <h2>Fönsterbyte</h2>
                            </div>
                            <div className='workTitle'>
                                <h2>Altan</h2>
                            </div>
                            <div className='workTitle'>
                                <h2>Dränering</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
