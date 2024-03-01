import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import "../styles/info.css"
import {Button} from "antd";

function Info(props) {

    const [fields, setFields] = useState([])
    const [field, setField] = useState({})
    const [fieldId, setFieldId] = useState(null)

    useEffect(() => {
        axios.get('https://api.mudofaa.uz:8080/api/v1/admin/postType/list',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                // console.log(res.data.object)
                setFields(res.data.object)
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
    }, [])

    function upload() {
        axios.get('https://api.mudofaa.uz:8080/api/v1/admin/postType/list',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                setFields(res.data.object)
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
    }

    function addNewField(e) {
        // console.log(e.target)
        axios.post('https://api.mudofaa.uz:8080/api/v1/admin/postType/add', {
            nameUZB: e.target.nameUZB.value,
            nameRUS: e.target.nameRUS.value,
            nameENG: e.target.nameENG.value
        },{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            upload()
            toast.success("Muvaffaqiyatli qo'shildi!")
            e.target.reset()
        }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
        e.preventDefault()
    }

    function getField(id) {
        // console.log(id)
        setFieldId(id)
        axios.get('https://api.mudofaa.uz:8080/api/v1/admin/postType/list/' + id,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                setField(res.data.object)
                // console.log(res.data.object)
                // console.log("res.data.object")
            }).catch(e => {
            // console.log(e)
            toast.error("Bog'lanishda xatolik!")
        })
    }

    function editField(e) {
        axios.put('https://api.mudofaa.uz:8080/api/v1/admin/postType/edit/' + fieldId, {
            nameUZB: e.target.nameUZB.value,
            nameRUS: e.target.nameRUS.value,
            nameENG: e.target.nameENG.value
        },{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            upload()
            toast.success("Muvaffaqiyatli o'zgartirildi!")
            e.target.reset()
        }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
        e.preventDefault()
    }

    function deleteField() {
        axios.delete('https://api.mudofaa.uz:8080/api/v1/admin/postType/delete/' + fieldId,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                toast.success("Muvaffaqiyatli o'chirildi")
                upload()
            }).catch(e => {
            toast.error("Bog'lanishda xatolik!")
        })
    }

    return (
        <div>
            {/* Yangilik turlari*/}

            <div className="row" id="rowCol">
                <h4 className="mb-3">Yangilik turlari</h4>
                <div className="col-xl-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="text-center">Yangilik turini qo'shish</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addNewField}>
                                <div className="mb-3 mt-1">
                                    <label htmlFor="name">UZB</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameUZB"
                                        name="nameUZB"/>
                                </div>
                                <div className="mb-3 mt-1">
                                    <label htmlFor="name">RUS</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameRUS"
                                        name="nameRUS"/>
                                </div>
                                <div className="mb-3 mt-1">
                                    <label htmlFor="name">ENG</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameENG"
                                        name="nameENG"/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Qo'shish</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr className="text-center">
                            <th> </th>
                            <th>Yangilik turi (UZ)</th>
                            <th>Yangilik turi (RU)</th>
                            <th>Yangilik turi (EN)</th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {fields.map((item, index) => (
                            <tr key={item.id}>
                                <td className="fw-bold">{index + 1}</td>
                                <td>{item.nameUZB}</td>
                                <td>{item.nameRUS}</td>
                                <td>{item.nameENG}</td>
                                <td>
                                    <div className="text-center">
                                        <Button
                                            type="primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            onClick={() => getField(item.id)}
                                        >
                                            O'zgartirish
                                        </Button>
                                        <Button danger
                                                type="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                onClick={() => setFieldId(item.id)}
                                                className="ms-3"
                                        >
                                            O'chirish
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <br/>


            {/*Edit modal yangilik turi*/}

            <div className="modal fade" id="editModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Yangilik turini o'zgartirish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"> </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editField}>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="name" style={{fontSize:"16px"}}>UZB</label>
                                    <input
                                        defaultValue={field.nameUZB}
                                        type="text"
                                        className="form-control"
                                        id="nameUZB"
                                        name="nameUZB"/>
                                    <label htmlFor="name" style={{fontSize:"16px"}}>RUS</label>
                                    <input
                                        defaultValue={field.nameRUS}
                                        type="text"
                                        className="form-control"
                                        id="nameRUS"
                                        name="nameRUS"/>
                                    <label htmlFor="name" style={{fontSize:"16px"}}>ENG</label>
                                    <input
                                        defaultValue={field.nameENG}
                                        type="text"
                                        className="form-control"
                                        id="nameENG"
                                        name="nameENG"/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100"
                                        data-bs-dismiss="modal">O'zgartirish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/*Delete modal yangilik turi*/}

            <div className="modal" id="deleteModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Siz rostdanham shu yangilik turini o'chirmoqchimisiz?</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"> </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={deleteField} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Info;