import React, {useEffect, useState} from 'react';
import {Pagination, Table, Button} from 'antd';
import axios from "axios";
import {toast} from "react-toastify";
import "../styles/map.css"


function AllIncidents() {
    const [data, setData] = useState([])
    // const [selectedId, setSelectedId] = useState(null);
    const [total, setTotal] = useState(null);
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
            title: 'Insitent raqami',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Maxsus ID',
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
        },
        {
            title: 'Bog`lanish vaqti',
            dataIndex: 'isCommitted',
            key: 'isCommitted',
            render: (text, record) => (
                <>
                    {
                        record.isCommitted == false ?
                            <Button style={{margin:"0", padding:"0"}} type="link" onClick={() => handleButtonClick(record)}>
                                Tasdiqlash
                            </Button> : <span> Tasdiqlangan </span>
                    }
                </>
            ),
        }

    ];


    useEffect(() => {
        // axios.get('http://192.168.202.41:8081/api/observatory/log/logs', {
        axios.get('https://www.observator.uz:8443/api/observatory/log/logs', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
                params:{
                    size: 10,
                    page: 0
                }
            }).then(res => {
                console.log(res.data)
                setData(res.data.content)
                setTotal(res.data.totalElements)
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
    }, [])
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        // axios.get('http://192.168.202.41:8081/api/observatory/log/logs', {
        axios.get('https://www.observator.uz:8443/api/observatory/log/logs', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params:{
                size: pageSize,
                page: current - 1
            }
        })
            .then(res => {
                // console.log(res.data.object)
                setData(res.data.content)
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
        // console.log(current, pageSize);
    };

    const handleButtonClick = (record) => {
        console.log(record)
        // axios.get('http://192.168.202.41:8081/api/observatory/log/noted/'+record.id, {
        axios.get('https://www.observator.uz:8443/api/observatory/log/noted/'+record.id, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                // console.log(res.data.object)
                setData(res.data.content)
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
    };

    return(
        <div className="back">
            <Table  className="custom-font-table" columns={columns} dataSource={data} pagination={false} size="small"/>
            <br/>
            <Pagination
                onChange={onShowSizeChange}
                total={total}
            />

        </div>
    )
}
export default AllIncidents

