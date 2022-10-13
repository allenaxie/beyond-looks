import React, { useState } from 'react';
import classes from './ProductItemForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Button, Select, Spin } from 'antd';
import {
    selectActiveSection,
    setActiveTemplate,
} from '../../slices/templateSlice';
import axios from 'axios';
import S3 from 'react-aws-s3';

const ProductItemForm = ({ activeTemplate }) => {
    const dispatch = useDispatch();
    const section = useSelector(selectActiveSection);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const config = {
        bucketName: 'beyond-looks-s3',
        dirName: 'photos', /* optional */
        region: 'us-west-1',
        accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
        s3Url: 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com', /* optional */

    }

    const { TextArea } = Input;

    const onFinish = async (values) => {
        // if model form
        if (section === "models") {
            // manipulate models data into object
            values.models = Object.values(values);
            delete values['[object Object]'];
            // if there's an uploaded image
            if (selectedFile) {
                try {
                    setIsLoading(true);
                    const ReactS3Client = new S3(config);
                    // the name of the file uploaded is used to upload it to S3
                    ReactS3Client
                        .uploadFile(selectedFile, selectedFile.name)
                        .then(async (data) => {
                            values.models[0].imageURL = data.location;
                            // update model info in db
                            const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                            const updatedTemplate = res.data.data;
                            setIsLoading(false);
                            // update state
                            dispatch(setActiveTemplate(updatedTemplate));
                        })
                        .catch(err => console.error(err))
                } catch (err) {
                    console.log(err);
                }
            }
            // if no image to upload
            else {
                setIsLoading(true);
                // if there's already an existing image, add to values
                if (activeTemplate?.models[0]?.imageURL) {
                    values.models[0].imageURL = activeTemplate?.models[0]?.imageURL;
                }
                // update model info in db
                const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                const updatedTemplate = res.data.data;
                // update state
                dispatch(setActiveTemplate(updatedTemplate));
                setIsLoading(false);
            }
        } else {
            setIsLoading(true);
            const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
            const updatedTemplate = res.data.data;
            // update state
            dispatch(setActiveTemplate(updatedTemplate));
            setIsLoading(false);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <Spin spinning={isLoading}>
            <Form
                className={classes.container}
                name='productItem-form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 14,
                }}
                autoComplete='off'
                initialValues={{
                    name: activeTemplate?.name,
                    description: activeTemplate?.description,
                    model: [{
                        name: activeTemplate?.name,
                        weight: activeTemplate?.weight,
                        height: activeTemplate?.height,
                        bust: activeTemplate?.bust,
                        waist: activeTemplate?.waist,
                        hips: activeTemplate?.hips,
                    }]
                }}
            >
                {section === 'product-name' &&
                    <Form.Item
                        label="Product Name:"
                        name='name'
                        required
                    >
                        <Input placeholder='Enter product name...' />
                    </Form.Item>
                }
                {section === 'product-description' &&
                    <Form.Item
                        label="Product Description:"
                        name="description"
                        required
                    >
                        <TextArea rows={8} />
                    </Form.Item>
                }
                {section === 'models' &&
                    activeTemplate.models.map((model, index) => (
                        <div key={index}>
                            <Form.Item
                                label={<span className={classes.formLabel}>Model profile picture</span>}
                                name={[model, "imageURL"]}
                            >
                                <div>
                                    <input type="file" onChange={handleFileInput} />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={`Model ${index + 1} name`}
                                name={[model, 'name']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input name of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.name}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={`Model ${index + 1} height`}
                                name={[model, 'height']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input height of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.height}

                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label={`Model ${index + 1} weight`}
                                name={[model, 'weight']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input weight of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.weight}

                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label={`Bust measurement`}
                                name={[model, 'bust']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input bust measurement of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.bust}

                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label={`Waist measurement`}
                                name={[model, 'waist']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input waist measurement of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.waist}

                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label={`Hips measurement`}
                                name={[model, 'hips']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input hip measurement of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[index]?.hips}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label={`Model size`}
                                name={[model, 'size']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select product size of model.',
                                    },
                                ]}
                                initialValue={activeTemplate?.models[0]?.size}
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
                        </div>
                    ))
                }
                {section !== '' &&
                    <Form.Item
                        className={classes.submitBtnContainer}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            className={classes.submitBtn}
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                    </Form.Item>
                }
            </Form>
        </Spin>
    )
}

export default ProductItemForm;