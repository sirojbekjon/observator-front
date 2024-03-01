import "../styles/monitoring.css"
import {Col, Row, Table} from "antd"
import React, {useEffect, useState} from 'react';
import "../styles/map.css"
import Uzbekistan from '@svg-maps/uzbekistan'
import {SVGMap} from 'react-svg-map'
import axios from "axios";
import {toast} from "react-toastify";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client'
import markaz from "../images/markaz.png";
import hhm from "../images/hhm.png";
import markaziy from "../images/markaziy.png";
import maxsus from "../images/maxsus.png";
import sharqiy from "../images/sharqiy.png";
import shimoliy from "../images/shimoliy garbiy.png";
import toqqq from "../images/toqqq.png";
import toshkent from "../images/Toshkent.png";



function Monitoring() {

    const [dataList, setDataList] = useState();
    const [dataTypeArmy, setDataTypeArmy] = useState();
    const [dataRegionCode, setDataRegionCode] = useState();
    const [loading, setLoading] = useState(true);
    const [dataId, setDataId] = useState();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const formatTime = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString('uz-UZ', options);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'specialId',
            key: 'specialId',
        },
        {
            title: 'MAC addressi',
            dataIndex: 'macAddress',
            key: 'macAddress',
        },
        {
            title: 'Bog`lanish turi',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Bog`lanish vaqti',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => (
                <span style={{color:"darkred"}}><b>{formatTime(record.createdAt)}</b></span>
            ),
        }
    ];

    const updateTime = () =>{
        setCurrentTime(new Date().toLocaleTimeString());
    }


    const onLocationClick = (event) => {
        console.log(event.target.id)
    };


    const getDataList = () => {
        axios({
            url:'log/logbesh',
            method:"GET",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(
            res => {
                toast.success('Ma`lumotlar muvaffaqiyatli yuklandi');
                setDataList(res.data.object)
                console.log(res.data.object)
            },
            err => {
                toast.error('Bog`lanishda xatolik.')
            })

        axios({
            url:'log/count',
            method:"GET",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(
            res => {
                toast.success('Ma`lumotlar muvaffaqiyatli yuklandi');
                setDataTypeArmy(res.data.object)
                setLoading(false);
                console.log(res.data.object)
            },
            err => {
                toast.error('Bog`lanishda xatolik.')
            })


    }



    useEffect(() => {
        getDataList()
        const elementToChange = document.getElementById(dataRegionCode);
        if (elementToChange) {
            elementToChange.style.fill = 'darkred'; // Change color to blue, you can use any valid CSS color value
        }
    }, [dataId,dataRegionCode]);


    setInterval(updateTime, 1000)

    useEffect(() => {
        // Establish the WebSocket connection
        // const socket = new SockJS('http://192.168.202.41:8081/our-websocket');
        const socket = new SockJS('https://www.observator.uz:8443/our-websocket');
        const stompClient = Stomp.over(socket);

        // Set the reconnect options
        const reconnectOptions = {
            maxReconnectAttempts: 5, // Maximum number of reconnection attempts
            startingTimeout: 1000,    // Time to wait before the first reconnection attempt (in milliseconds)
            reconnectionDelay: 3000,  // Time to wait between reconnection attempts (in milliseconds)
        };

        stompClient.reconnect_delay = reconnectOptions.reconnectionDelay;

        stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/test', message => {
                const messageBodyObject = JSON.parse(message.body);
                console.log(messageBodyObject);
                setDataId(messageBodyObject)
                axios({
                    url:'log/logRegionCode',
                    method:"GET",
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }).then(
                    res => {
                        console.log(res.data.object)
                        toast.success('Ma`lumotlar muvaffaqiyatli yuklandi');
                        console.log(typeof res.data.object)
                        console.log(typeof parseInt(res.data.object))
                        switch (parseInt(res.data.object)) {
                            case 21:
                                return setDataRegionCode('surxondaryo');
                            case 96:
                                return setDataRegionCode('bukhara');
                            case 68:
                                return setDataRegionCode('andijan');
                            case 47:
                                return setDataRegionCode('fergana');
                            case 16:
                                return setDataRegionCode('namangan');
                            case 23:
                                return setDataRegionCode('toshkent');
                            case 62:
                                return setDataRegionCode('tashkent');
                            case 84:
                                return setDataRegionCode('sirdaryo');
                            case 92:
                                return setDataRegionCode('qashqadaryo');
                            case 49:
                                return setDataRegionCode('jizzakh');
                            case 18:
                                return setDataRegionCode('samarqand');
                            case 75:
                                return setDataRegionCode('navoiy');
                            case 20:
                                return setDataRegionCode('karakalpakstan');
                            case 32:
                                return setDataRegionCode('xorazm');
                            default:
                                return null;
                        }

                    },
                    err => {
                        toast.error('Bog`lanishda xatolik.')
                    })
            });
        }, error => {
            console.error('Error connecting to WebSocket:', error);
        });


        console.log(dataRegionCode)

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [dataRegionCode]);


    return (
        <div className="back">
            <Row gutter={[8, 8]}>
                <Col span={14} className="text-center">
                    <div>
                        <div>
                            <div className="mt-2 clock">
                                <h2> Mahalliy vaqt: &nbsp; {currentTime}</h2>
                                <div>
                                    <Row>
                                        <Col span={1}> </Col>
                                        <Col span={16}>
                                            <SVGMap
                                                onLocationClick={onLocationClick}
                                                map={Uzbekistan}
                                            />
                                        </Col>
                                        <Col span={1}> </Col>
                                        <Col span={6} className="text-start fs-4">
                                            {dataId && (
                                                <>
                                                    <p style={{fontFamily:"monospace"}}> <b>ID:</b> {dataId.specialId}</p>
                                                    <p style={{fontFamily:"monospace"}}> <b>MAC:</b> {dataId.macAddress}</p>
                                                    <p style={{fontFamily:"monospace"}}> <b>Tur:</b> {dataId.type}</p>
                                                    <p style={{fontFamily:"monospace"}}> <b>Hudud:</b> {dataId.region}</p>
                                                    <p style={{fontFamily:"monospace"}}> <b>Vaqti:</b> {formatTime(dataId.createdAt)}</p>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={10} style={{fontFamily:"monospace"}}>
                    <div>
                        <div>
                            <div className="mt-2 clock">
                                <h2> Insidentlar monitoringi</h2>
                                <div>
                                    <Row className="text-start mt-3">
                                        <Col span={24}>
                                            {loading ? (
                                                <p className="textt font-monospace fw-bold fs-1 ms-3 mt-3">Ma'lumot yuklanmoqda...</p>
                                            ) : (
                                                <div>
                                                    <div>
                                                        {dataTypeArmy && (
                                                            <div className="row mt-1">
                                                                {/* First column */}
                                                                <div className="col">
                                                                    {dataTypeArmy.slice(0, 4).map(item => (
                                                                        <div key={item.id} className="d-flex align-items-center mb-1">
                                                                            {/* Image */}
                                                                            {item.id === 1 && <img width="90px" src={markaz} alt="Image 1" />}
                                                                            {item.id === 2 && <img width="90px" src={toshkent} alt="Image 2" />}
                                                                            {item.id === 3 && <img width="90px" src={markaziy} alt="Image 2" />}
                                                                            {item.id === 4 && <img width="90px" src={maxsus} alt="Image 2" />}
                                                                            {/* Text */}
                                                                            <div className="ms-2 w-100">
                                                                                <p className="m-0 textt font-monospace fw-bold fs-4">{item.name}</p>
                                                                                <p className="m-0 textt font-monospace fw-bold fs-2">{item.count}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {/* Second column */}
                                                                <div className="col">
                                                                    {dataTypeArmy.slice(4, 8).map(item => (
                                                                        <div key={item.id} className="d-flex align-items-center mb-1">
                                                                            {/* Image */}
                                                                            {item.id === 5 && <img width="90px" src={shimoliy} alt="Image 1" />}
                                                                            {item.id === 6 && <img width="90px" src={sharqiy} alt="Image 2" />}
                                                                            {item.id === 7 && <img width="90px" src={hhm} alt="Image 2" />}
                                                                            {item.id === 8 && <img width="90px" src={toqqq} alt="Image 2" />}
                                                                            {/* Text */}
                                                                            <div className="ms-2 w-100">
                                                                                <p className="m-0 textt font-monospace fw-bold fs-4">{item.name}</p>
                                                                                <p className="m-0 textt font-monospace fw-bold fs-2">{item.count}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={24} className="p-2 clock">
                            <h2 style={{fontFamily:"monospace"}}> So'nggi sodir etilgan insidentlar </h2>
                            <Table  className="custom-font-table" columns={columns} dataSource={dataList} pagination={false} size="small"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default Monitoring
