import React, {FunctionComponent, useState} from 'react';
import {Button, Card, Form, Image, Input, Spin, Typography} from "antd";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {setLocale} from "yup";
import {useRouter} from "next/router";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const {Text} = Typography;
const MyAlerts = withReactContent(Swal)

export interface RegisterValue {
    first_name: string;
    email: string;
    password: string;
}

const index: FunctionComponent = () => {
    setLocale({
        mixed: {
            required: "El campo es requerido"
        },
        string: {
            min: "Mínimo ${min} caracteres",
            max: "Máximo ${max} caracteres"
        }
    });
    const route = useRouter();
    const [error, setErrors] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        first_name: yup.string().required(),
        email: yup.string().required(),
        password: yup
            .string()
            .required()
    });

    const {control, formState: {errors}, setError, handleSubmit} = useForm<RegisterValue>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            first_name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: RegisterValue) => {
        if (window !== undefined) {
            setLoading(true);
            axios
                .post(process.env.NEXT_PUBLIC_URL + "auth/register", data)
                .then((response) => {
                    MyAlerts.fire({
                        title: 'Se ha registrado exitosamente',
                        footer: 'Copyright 2021',

                    }).then(() => {
                        route.push("/");
                    })
                })
                .catch((error) => {
                    MyAlerts.fire({
                        title: 'Hubo un error intente mas tarde!',
                        footer: 'Copyright 2021',

                    }).then(() => {
                        return;
                    })
                    setErrors(error?.response?.data?.message);
                }).finally(() => setLoading(false));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Card
                style={{
                    boxShadow:
                        "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image
                        width={100}
                        height={"auto"}
                        preview={false}
                        src={""}
                    />
                </div>
                <Form onFinish={handleSubmit(onSubmit)} layout={"vertical"}>
                    <Form.Item label="Nombre del usuario">
                        <Controller render={({
                                                 field: {onChange, value},
                                             }) => (
                            <Input onChange={onChange} value={value}/>
                        )} control={control} name={'first_name'}/>
                        {errors?.first_name && <Text type="danger">{errors.first_name.message}</Text>}
                    </Form.Item>
                    <Form.Item label="Correo electrónico">
                        <Controller render={({
                                                 field: {onChange, value},
                                             }) => (
                            <Input onChange={onChange} value={value}/>
                        )} control={control} name={'email'}/>
                        {errors?.email && <Text type="danger">{errors.email.message}</Text>}
                    </Form.Item>
                    <Form.Item label="Contraseña">
                        <Controller render={({
                                                 field: {onChange, value},
                                             }) => (
                            <Input.Password onChange={onChange} value={value}/>
                        )} control={control} name={'password'}/>
                        {errors?.password && <Text type={"danger"}>{errors.password.message}</Text>}
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        {
                            loading ?
                                <Spin/> :
                                <>
                                    <Button type="primary" disabled={loading} htmlType="submit">
                                        Registrarme
                                    </Button>
                                    <br/>
                                    <Text type={"danger"}>{error}</Text>
                                </>
                        }
                        <Button style={{marginTop: "10px"}} type="link" onClick={() => route.push('/')}>
                            Iniciar Sesion
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )

}

export default index;