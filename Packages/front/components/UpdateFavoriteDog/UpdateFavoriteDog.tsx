import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {FavoriteValues, userValue} from "../../pages/Dashboard";
import {Button, Card, Form, Select, Spin, Typography} from "antd";
import {parseJwt} from "../_helpers/decryptToken";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const {Text} = Typography;
const MyAlerts = withReactContent(Swal)


const UpdateFavoriteDog = () => {
    const [dogs, setDogs] = useState<any>();
    const [user, setUser] = useState<userValue>();

    const apiDog = () => {
        axios.get('https://dog.ceo/api/breeds/list/all')
            .then((res) => {
                setDogs(res.data.message);
            }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        if (window !== undefined) {
            setUser(parseJwt(localStorage?.getItem('token')))
        }
    }, [setUser])

    useEffect(() => {
        if (!dogs && user !== undefined) {
            apiDog()
        }
    }, [dogs, user])


    const validationSchema = yup.object().shape({
        favorite: yup.string().required(),
    });

    const {control, formState: {errors}, handleSubmit} = useForm<FavoriteValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            favorite: ""
        }
    });

    const onSubmit = (data: FavoriteValues) => {
        axios.put(process.env.NEXT_PUBLIC_URL + '/Favorite/' + user?.id, {
            ...data,
            id_user: user?.id
        }).then((res) => {
            MyAlerts.fire({
                title: 'Actualizacion Exitosa',
                footer: 'Copyright 2021',

            }).then(() => {
                window.location.reload();
            })
        }).catch(err => {
            MyAlerts.fire({
                title: 'Hubo un error intente mas tarde!',
                footer: 'Copyright 2021',

            }).then(() => {
                return;
            })
            console.error(err)
        })
    }

    return (
        <Card>
            <Form onFinish={handleSubmit(onSubmit)} layout={"vertical"}>
                <Form.Item label="Selecciona tu perro favorito">
                    {
                        !dogs ? <Spin/> :
                            <Controller render={({field: {onChange, value}}) => (
                                <Select
                                    placeholder={"Selecciona"}
                                    options={Object.keys(dogs)?.map((s, key) => ({
                                        label: s,
                                        value: s,
                                        key: key,
                                    }))}
                                    onSelect={onChange}
                                    onChange={onChange}
                                />
                            )} control={control} name={'favorite'}/>
                    }
                    {errors?.favorite && <Text type={"danger"}>{errors.favorite.message}</Text>}
                </Form.Item>
                <Form.Item style={{textAlign: "center", marginTop: 10}}>
                    <Button type="primary" htmlType="submit">Actualizar</Button>
                </Form.Item>
            </Form>
        </Card>
    )

}

export default UpdateFavoriteDog;
