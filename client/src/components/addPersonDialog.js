import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { InputText } from 'primereact/inputtext';
import { set, useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useCreatePersonMutation } from "../slices/personSlice";
import { useFormik } from "formik/dist/formik.cjs.production.min";
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast'

export default function AddPersonDialog() {
    const toast = React.useRef(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [{ personType: "אורח" }, { personType: "חבר" }, { personType: "שותף" }];
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [createCustomer, { data: res, isLoading, isError, error }] = useCreatePersonMutation()
    
    const formik = useFormik({
        initialValues: {
            personname: '',
            personType: '',
            email: '',
            phone: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.personname) {
                errors.personname = 'זהו שדה חובה';
            }
            return errors;
        },
        onSubmit: (data) => {
            const data2={personname:data.personname,phone:data.phone,email:data.email,personType:data.personType.personType}
            createCustomer(data2)
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <>
            <Button icon="pi pi-user-plus" size="large" rounded outlined severity="Filter" onClick={() => setVisible(true)} />
            <Dialog header="יצירת לקוח" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                <div className="card flex justify-content-center">
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <Toast ref={toast} />
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                id="personname"
                                name="personname"
                                value={formik.values.personname}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('personname') })}
                                onChange={(e) => {
                                    formik.setFieldValue('personname', e.target.value);
                                }}
                            />
                            <label htmlFor="value">שם</label>
                            <i className="pi pi-user" style={{ marginRight: "7px" }} />
                        </span>
                        {getFormErrorMessage('personname')}
                        <br/>
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                                onChange={(e) => {
                                    formik.setFieldValue('phone', e.target.value);
                                }}
                            />
                            <label htmlFor="value">טלפון</label>
                            <i className="pi pi-phone" style={{ marginRight: "7px" }} />
                        </span>
                        <br />
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                id="phone2"
                                name="phone2"
                                value={formik.values.phone}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('phone2') })}
                                onChange={(e) => {
                                    formik.setFieldValue('phone2', e.target.value);
                                }}
                            />
                            <label htmlFor="value">טלפון נוסף</label>
                            <i className="pi pi-phone" style={{ marginRight: "7px" }} />
                        </span>
                        <br />
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                id="email"
                                name="email"
                                value={formik.values.email}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                onChange={(e) => {
                                    formik.setFieldValue('email', e.target.value);
                                }}
                            />
                            <label htmlFor="value">מייל</label>
                            <i className="pi pi-at" style={{ marginRight: "7px" }} />
                        </span>
                        {getFormErrorMessage('email')}
                        <br/>
                        <span className="p-float-label p-input-icon-right">
                            <Dropdown
                            className="w-full md:w-17rm"
                                value={formik.values.personType}
                                options={cities}
                                name="personType"
                                optionLabel="personType"
                                placeholder="הרשאה"
                                onChange={(e) => {
                                    formik.setFieldValue('personType', e.value);
                                }}
                            />
                             <i className="pi pi-check" style={{ marginRight: "7px" }} />
                        </span>
                        <br />

                        <Button type='submit' label="הוסף" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                    </form>
                </div>
            </Dialog>
        </>
    )

}

