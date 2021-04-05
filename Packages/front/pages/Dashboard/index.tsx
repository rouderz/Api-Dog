import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {Card, Image, Row, Typography} from "antd";
import CreateFavoriteDog from "../../components/CreateFavoriteDog/CreateFavoriteDog";
import UpdateFavoriteDog from '../../components/UpdateFavoriteDog/UpdateFavoriteDog';
import {parseJwt} from "../../components/_helpers/decryptToken";

const {Text} = Typography;


export interface FavoriteValues {
    id_user: string;
    favorite: string;
}

export interface userValue {
    id: number;
    first_name: string;
    email: string;
}

const index: FunctionComponent = () => {
    const [data, setData] = useState<any>();
    const [user, setUser] = useState<userValue>();
    const [image, setImage] = useState<any>();


    useEffect(() => {
        if (window !== undefined) {
            setUser(parseJwt(localStorage?.getItem('token')))
        }
    }, [setUser])

    const axiosConfig = () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/Favorite/' + user?.id).then((res) => {
            setData(res.data)
            console.log(res.data)
            axios.get(!res?.data?.favorite ? 'https://dog.ceo/api/breeds/image/random' : 'https://dog.ceo/api/breed/' + res.data.favorite + '/images/random')
                .then((res) => {
                    setImage(res.data.message)
                }).catch((err) => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        if (!data && user !== undefined) {
            axiosConfig()
        }
    }, [data, user])


    return (
        <Layout>
            {
                !data ? <CreateFavoriteDog/> : <UpdateFavoriteDog/>
            }
            <Card style={{marginTop: 15}}>
                {
                    <div style={{flex: 1, textAlign: "center"}}>
                        <Row>
                            <Text style={{color: "black", fontSize: 18}}>{data?.favorite}</Text>
                        </Row>
                        <Row>
                            <Image width={200} src={image}/>
                        </Row>
                    </div>
                }
            </Card>
        </Layout>
    )

}
export default index;