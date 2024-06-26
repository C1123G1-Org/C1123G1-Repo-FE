import * as Yup from "yup";
class Validate{
    static validateCote(){
        return({
            // code: Yup.string()
            //     .required("Vui lòng không để trống")
            //     .min(3, "Nhập ít nhất 3 ký tự")
            // .matches(/^C[0-9]*$/,"Nhập theo định dạng: C**"),
            // dateOpen: Yup.string()
            //     .required("Ngày đặt không để trống"),
            quantity: Yup.number().typeError('Vui lòng nhập số')
                .required("Vui lòng không để trống")
                .min(0, "Số lượng không nhỏ hơn 0")
                .max(30,"Số lượng nhỏ hơn 100"),

        })
    }

    static validateExportCote(){
        return({
            partner: Yup.string()
                .required("Vui lòng không để trống")
                .min(3, "Nhập ít nhất 3 ký tự"),
            // .matches(/^C[0-9]*$/,"Nhập theo định dạng: C**"),
            // dateOpen: Yup.string()
            //     .required("Ngày đặt không để trống"),
            weight: Yup.number().typeError('Vui lòng nhập số')
                .required("Vui lòng không để trống")
                .min(0.1, "Cân nặng phải lớn hơn 0")
                .max(10000,"Cân nặng nhỏ hơn 10000"),
            price: Yup.number().typeError('Vui lòng nhập số')
                .required("Vui lòng không để trống")
                .min(0.1, "Giá phải lớn hơn 0")
                .max(200000,"Giá nhỏ hơn 200000"),
        })
    }
}
export default Validate;
