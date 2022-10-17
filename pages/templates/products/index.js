import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './products.module.scss';
import { List, Avatar, Space, Spin, Form, Input, InputNumber, Modal, Radio, Button, TextArea, Select } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
    setActiveTemplate,
    selectTemplatesList,
    setTemplatesList
} from '../../../slices/templateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import S3 from 'react-aws-s3';
import { loadTemplates } from '../../../lib/templates';

const ProductsList = ({ templates }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { TextArea } = Input;
    let selectedImages = {};

    const [isLoading, setIsLoading] = useState(false);
    const [openTemplateModal, setOpenTemplateModal] = useState(false);

    const config = {
        bucketName: 'beyond-looks-s3',
        dirName: 'photos', /* optional */
        region: 'us-west-1',
        accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
        s3Url: 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com', /* optional */

    }

    useEffect(() => {
        // get templates
        dispatch(setTemplatesList(templates));
    }, [])

    const templatesList = useSelector(selectTemplatesList);

    const handleItemClick = async (item) => {
        setIsLoading(true);
        dispatch(setActiveTemplate(item));
        setIsLoading(false);
        router.push(`/templates/products/${item._id}`);
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }

    const handleFilesInput = (e, source) => {
        // console.log(e.target.files);
        // console.log('source:', source);
        if (source === 'model-image') {
            selectedImages.modelImage = e.target.files[0];
        } else if (source === 'frontView') {
            selectedImages.frontViewImageUrl = e.target.files[0];
        } else if (source === 'backView') {
            selectedImages.backViewImageUrl = e.target.files[0];
        }
        else if (source === 'detail-image-1') {
            selectedImages.detailImage1 = e.target.files[0];
        } else if (source === 'detail-image-2') {
            selectedImages.detailImage2 = e.target.files[0];
        }
        // console.log(selectedImages);
    }

    const TemplateCreateForm = ({ open, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={open}
                title="Create a new Template"
                okText="Save"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Spin spinning={isLoading}>
                    <Form
                        form={form}
                        className={classes.container}
                        name='productItem-form'
                        // onFinish={handleSubmitForm}
                        onFinishFailed={onFinishFailed}
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        autoComplete='off'
                    >
                        <Form.Item
                            label="Product Name:"
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a product name.',
                                },
                            ]}
                        >
                            <Input placeholder='Enter product name...' />
                        </Form.Item>
                        <Form.Item
                            label="Product Description:"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a description of the product',
                                },
                            ]}
                        >
                            <TextArea rows={8} />
                        </Form.Item>
                        <h3>Model</h3>
                        <Form.Item
                            label={<span className={classes.formLabel}>Model profile picture</span>}
                            name={["models", "imageUrl"]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.',
                                },
                            ]}
                        >
                            <div>
                                <input type="file" onChange={(evt) => handleFilesInput(evt, 'model-image')} />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label={`Model name`}
                            name={["models", 'name']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name of model.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={`Model height`}
                            name={["models", 'height']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input height of model.',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Model weight`}
                            name={["models", 'weight']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input weight of model.',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Bust measurement`}
                            name={["models", 'bust']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input bust measurement of model.',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Waist measurement`}
                            name={["models", 'waist']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input waist measurement of model.',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Hips measurement`}
                            name={["models", 'hips']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input hip measurement of model.',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Model size`}
                            name={["models", 'size']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select product size of model.',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 120,
                                }}
                            >
                                <Select.Option value="S">S</Select.Option>
                                <Select.Option value="M">M</Select.Option>
                                <Select.Option value="L">L</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<span className={classes.formLabel}>Front view </span>}
                            name="frontViewImageUrl"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.',
                                },
                            ]}
                        >
                            <div>
                                <input type="file" onChange={(evt) => handleFilesInput(evt, 'frontView')} />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label={<span className={classes.formLabel}>Back view </span>}
                            name="backViewImageUrl"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.',
                                },
                            ]}
                        >
                            <div>
                                <input type="file" onChange={(evt) => handleFilesInput(evt, 'backView')} />
                            </div>
                        </Form.Item>
                        {/* <h3>Detail Look</h3>
                        <Form.Item
                            label={<span className={classes.formLabel}>Image 1</span>}
                            name={[`detailLook1`, [`imageUrl`]]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.',
                                },
                            ]}
                        >
                            <div>
                                <input type="file" onChange={(evt) => handleFilesInput(evt, 'detail-image-1')} />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label={<span className={classes.formLabel}>Description 1</span>}
                            name={[`detailLook1`, [`description`]]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter image description..." />
                        </Form.Item> */}
                        {/* <Form.Item
                            label={<span className={classes.formLabel}>Image 2</span>}
                            name={[`detailLook2`, [`imageUrl`]]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image.'
                                }
                            ]}
                        >
                            <div>
                                <input type="file" onChange={(evt) => handleFilesInput(evt, 'detail-image-2')} />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label={<span className={classes.formLabel}>Description 2</span>}
                            name={[`detailLook2`, [`description`]]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter description of image.',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter image description" />
                        </Form.Item> */}
                    </Form>
                </Spin >
            </Modal >
        );
    };

    // open modal
    const handleCreateTemplate = () => {
        setOpenTemplateModal(true);
    }

    // create template
    const onCreate = async (values) => {

        console.log('selected images:', selectedImages);
        console.log('initial values:', values);

        const ReactS3Client = new S3(config);

        // upload files to S3
        setIsLoading(true);
        const [
            modelImage, frontViewImageUrl, backViewImageUrl, 
            // imageUrl1, 
            // imageUrl2
        ] = await Promise.all([
                ReactS3Client.uploadFile(selectedImages.modelImage, selectedImages.modelImage.name),
                ReactS3Client.uploadFile(selectedImages.frontViewImageUrl, selectedImages.frontViewImageUrl.name),
                ReactS3Client.uploadFile(selectedImages.backViewImageUrl, selectedImages.backViewImageUrl.name),
                // ReactS3Client.uploadFile(selectedImages.detailImage1, selectedImages.detailImage1.name),
                // ReactS3Client.uploadFile(selectedImages.detailImage2, selectedImages.detailImage2.name),
            ])

        values.models.imageUrl = modelImage.location;
        values.frontViewImageUrl = frontViewImageUrl.location;
        values.backViewImageUrl = backViewImageUrl.location;
        // values.detailLook1.imageUrl = imageUrl1.location;
        // values.detailLook2.imageUrl = imageUrl2.location;
        values.detailLook = [
            values.detailLook1,
            // values.detailLook2
        ];

        console.log('selected images:', selectedImages);
        console.log('values:', values);
        // add to MongoDB
        const res = await axios.post(`/api/productTemplates`, values);
        const newTemplate = res.data.data;

        console.log('templatesList:', templatesList)
        // update list
        dispatch(setTemplatesList([...templatesList, newTemplate]));
        setIsLoading(false);
        setOpenTemplateModal(false);
    }
    console.log('updated templates list:', templatesList);

    const { confirm } = Modal;

    const showDeleteConfirm = (e,id) => {
        e.stopPropagation();

        confirm({
          title: 'Are you sure delete this template?',
          icon: <ExclamationCircleOutlined />,
        //   content: 'Are you sure you want to delete',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteItem(id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

    const handleDeleteItem = async (id) => {
        setIsLoading(true);
        console.log(id)
        const res = axios.delete(`/api/productTemplates/${id}`);
        const updatedTemplatesList = await loadTemplates();
        dispatch(setTemplatesList(updatedTemplatesList))
        setIsLoading(false);
    }

    return (
        <div>
            <div className={classes.createTemplateBtn}>
                <Button onClick={handleCreateTemplate}>
                    Create Template
                </Button>
                <TemplateCreateForm
                    open={openTemplateModal}
                    onCreate={onCreate}
                    onCancel={() => {
                        setOpenTemplateModal(false);
                    }}
                />
            </div>
            <Spin spinning={isLoading}>
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
                                <Button onClick={(e) => showDeleteConfirm(e, item._id)} danger>Delete</Button>
                            ]}
                            extra={
                                <>
                                    <img
                                        width={272}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                </>
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
            </Spin>
        </div>
    )
}

export default ProductsList;

export async function getStaticProps(context) {
    // let templates = [];

    // const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productTemplates`);
    // templates = res.data.data;
    const templates = await loadTemplates();


    return {
        props: {
            templates
        }
    }
}