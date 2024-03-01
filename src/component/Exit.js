import React, { useState } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function Exit(props) {
    // console.log(props)
    const [isModalOpen, setIsModalOpen] = useState(props.open);

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.clear()
        window.location.reload()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        window.location.reload()
    };

    return (
        <>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Tasdiqlash"
                cancelText="Bekor qilish"
            >
                <div style={{display:"flex", textAlign:"center", alignItems:"center"}}>
                    <p style={{fontSize:"30px", color:"orangered"}}> <ExclamationCircleOutlined/> </p>
                    <h6 className='m-2'>Siz rostdanham tizimdan chiqmoqchimisiz?</h6>
                </div>
            </Modal>
        </>
    );
}

export default Exit;