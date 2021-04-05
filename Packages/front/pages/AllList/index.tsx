import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {Space, Table, Typography} from "antd";

const {Text} = Typography;
const {Column} = Table;


const index = () => {
    const [dogs, setDogs] = useState<any>();
    const [subRace, setSubRace] = useState<any>();
    const array = [];

    const apiDog = () => {
        axios.get('https://dog.ceo/api/breeds/list/all')
            .then((res) => {
                setDogs(Object.keys(res.data.message).map((data) => {
                    return ({
                        name: data,
                    })
                }))
                setSubRace(res.data.message);
            }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        if (!dogs) {
            apiDog()
        }
    }, [dogs, subRace])


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <Layout>
            <Table dataSource={dogs} columns={columns} style={{display: "flex"}}/>
        </Layout>
    )
}

export default index;