import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Card, Form, Image, Input, Spin, Tooltip, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import * as yup from "yup";
import {setLocale} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";

const {Text} = Typography;

export interface LoginValues {
    email: string;
    password: string;
}

const Index: FunctionComponent = () => {
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
        email: yup.string().required(),
        password: yup
            .string()
            .required()
    });

    const {control, formState: {errors}, setError, handleSubmit} = useForm<LoginValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: LoginValues) => {
        if (window !== undefined) {
            setLoading(true);
            axios
                .post(process.env.NEXT_PUBLIC_URL + "auth/sign-in", data)
                .then((response) => {
                    localStorage.setItem("token", response.data.accessToken);
                    route.push("/dashboard");
                })
                .catch((error) => {
                    setErrors(error?.response?.data?.message);
                }).finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        document.title = "Iniciar Sesión"
        localStorage.getItem("token") && route.push("/dashboard");
    }, []);

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
                                        Iniciar sesión
                                    </Button>
                                    <br/>
                                    <Text type={"danger"}>{error}</Text>
                                </>
                        }
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Index;