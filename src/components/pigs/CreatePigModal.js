import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import PigService from "../../services/PigService";
import ValidatePig from "./ValidatePig";
import { TextareaAutosize } from "@mui/material";

export default function CreatePigModal({newPigID ,open, handleClose, makeReload, cote}) {

    const [dateIn, setDateIn] = useState(new Date());
    const [dateOut, setDateOut] = useState(null);
    

    const handleSubmitCreate = async (value) => {
        value.code = newPigID;
        value.room = cote[value.roomIndex];
        value.dateIn = dateIn;
        value.dateOut = dateOut;
        PigService.createPig(value)
            .then((res) => {
                toast.success("Thêm mới thành công");
                setDateIn(new Date());
                setDateOut(null);
                makeReload();
                handleCloseModalCreate()
            })
            .catch((err) => {
                toast.error("Lỗi thêm mới");
            });
            
    };

    const handleCloseModalCreate = () => {
        setDateOut(null);
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header style={{backgroundColor: "#1976d2"}}>
                    <Modal.Title style={{color: "white"}}>Khởi tạo cá thể mới</Modal.Title>
                </Modal.Header>

                <Formik initialValues={{}} onSubmit={handleSubmitCreate}>
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Mã cá thể</td>
                                                <td>{newPigID}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Mã chuồng nuôi</td>
                                                <td>
                                                    <Field as="select" name="roomIndex">
                                                        <option value="">Chọn một tùy chọn</option>
                                                        {cote.map((code, index) => (
                                                            <option value={index} key={code.id}>C{code.id}</option>
                                                        ))} 
                                                    </Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="codeCote" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Ngày nhập chuồng</td>
                                                <td>
                                                    <ReactDatePicker selected={dateIn} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"
                                                        onChange={(date) => setDateIn(date)}></ReactDatePicker>
                                                    <Field name="dateIn" type="hidden"></Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="dateIn" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Ngày xuất chuồng</td>
                                                <td>
                                                    <ReactDatePicker selected={dateOut} dateFormat="dd-MM-YYYY" placeholderText="dd-mm-yyyy"
                                                        onChange={(date) => setDateOut(date)}></ReactDatePicker>
                                                    <Field name="dateOut" type="hidden"></Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="dateOut" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Tình trạng</td>
                                                <td><Field name="status"></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="status" component={"span"} className={"error"} ></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Cân nặng (Kg)</td>
                                                <td>
                                                    {/* <TextareaAutosize></TextareaAutosize> */}
                                                    <Field name="weight"></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="weight" component={"span"} className={"error"} ></ErrorMessage></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Khởi tạo
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModalCreate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}