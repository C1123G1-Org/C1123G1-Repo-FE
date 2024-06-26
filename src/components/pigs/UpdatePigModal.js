import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDatePicker from "react-datepicker";
import {toast} from "react-toastify";
import PigService from "../../services/PigService";

export default function UpdatePigModal({
                                            open,
                                            handleClose,
                                            id,
                                            form,
                                            dateOutUpdate,
                                            dateInUpdate,
                                            setIn,
                                            setOut,
                                            makeReload,
                                            coteAvaiable
                                        }) {

    
    const handleSubmitUpdate = async (value) => {
        if (value.coteIndex !== undefined) {
            value.cote = coteAvaiable[value.coteIndex];
        }
        value.dateIn = value.dateIn;
        value.dateOut = value.dateOut;

        PigService.updatePig(value, id)
            .then((res) => {
                toast.success("Chỉnh sửa thành công");
                makeReload();
            })
            .catch((err) => {
                toast.error("Chỉnh sửa thất bại");
            });
    };

    const handleCloseModalUpdate = () => {
        handleClose();
    }
    return (
        <>
            <Modal show={open} centered>
                <Modal.Header>
                    <Modal.Title>Chỉnh sửa thông tin cá thể</Modal.Title>
                </Modal.Header>

                <Formik initialValues={form} onSubmit={handleSubmitUpdate}>
                    <Form className={"form-pig"}>
                        <Modal.Body>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Mã cá thể</td>
                                                <td><Field name="code" readOnly></Field></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Mã chuồng nuôi</td>
                                                <td>
                                                    <Field as="select" name="coteIndex" style={{ height: "32px", margin: "0px"}}>
                                                        <option value="">Chọn mã chuồng</option>
                                                        {coteAvaiable.map((code, index) => (
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
                                                    <Field name="dateIn" type="date"></Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><ErrorMessage name="dateIn" component={"span"}></ErrorMessage></td>
                                            </tr>
                                            <tr>
                                                <td>Ngày xuất chuồng</td>
                                                <td>
                                                    <Field name="dateOut" type="date"></Field>
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
                                Cập nhật
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModalUpdate}>
                                Hủy bỏ
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}