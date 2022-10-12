import React, {useEffect} from 'react';
import axios from 'axios';
import classes from './products.module.scss';
import { List, Avatar, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { 
    setActiveTemplate, 
    selectTemplatesList, 
    setTemplatesList 
} from '../../../slices/templateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductsList = ({ templates }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        // get templates
        dispatch(setTemplatesList(templates));
    }, [])
    
    const templatesList = useSelector(selectTemplatesList);


    const handleItemClick = async (item) => {
        dispatch(setActiveTemplate(item));
        router.push(`/templates/products/${item._id}`);
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div>
            <List
                itemLayout='vertical'
                size='large'
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={templatesList}
                renderItem={(item) => (
                    <List.Item
                        key={item.name}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                        className={classes.productItem}
                        onClick={() => handleItemClick(item)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.name}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ProductsList;

export async function getStaticProps(context) {
    let templates = [];

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productTemplates`);
        templates = res.data.data;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            templates
        }
    }
}