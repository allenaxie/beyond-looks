import React, { useState } from 'react';
import classes from './ProductItemForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Button, Select, Spin, Space } from 'antd';
import {
    selectActiveSection,
    setActiveTemplate,
} from '../../slices/templateSlice';
import axios from 'axios';
import S3 from 'react-aws-s3';

const ProductItemForm = ({ activeTemplate }) => {
    const dispatch = useDispatch();
    const section = useSelector(selectActiveSection);
    const [selectedModelImage, setSelectedModelImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
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
        // if update model info
        if (section === "models") {
            // manipulate models data into object
            values.models = Object.values(values);
            delete values['[object Object]'];
            // if there's an uploaded image
            if (selectedModelImage) {
                try {
                    setIsLoading(true);
                    const ReactS3Client = new S3(config);
                    // the name of the file uploaded is used to upload it to S3
                    ReactS3Client
                        .uploadFile(selectedModelImage, selectedModelImage.name)
                        .then(async (data) => {
                            values.models[0].imageUrl = data.location;
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
                // if there's already an existing image, add to values object
                if (activeTemplate?.models[0]?.imageUrl) {
                    values.models[0].imageUrl = activeTemplate?.models[0]?.imageUrl;
                }
                // update model info in db
                const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                const updatedTemplate = res.data.data;
                // update state
                dispatch(setActiveTemplate(updatedTemplate));
                setIsLoading(false);
            }
        }
        // front/back view section
        else if (section === 'images-frontBack') {
            if (selectedImages.length > 0) {
                try {
                    setIsLoading(true);
                    const ReactS3Client = new S3(config);

                    // upload files to S3
                    const [frontImage, backImage] = await Promise.all([
                        ReactS3Client.uploadFile(selectedImages[0], selectedImages[0].name),
                        ReactS3Client.uploadFile(selectedImages[1], selectedImages[1].name),
                    ])

                    // set image Urls to values object
                    values.frontViewImageUrl = frontImage.location;
                    values.backViewImageUrl = backImage.location;

                    // add to MongoDB
                    const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                    const updatedTemplate = res.data.data;
                    setIsLoading(false);
                    // update state
                    dispatch(setActiveTemplate(updatedTemplate));
                } catch (err) {
                    console.log(err);
                }
            }
        }
        // detail look
        else if (section === 'detail-look') {
            try {
                setIsLoading(true);

                if (selectedImages.length > 0) {

                    const ReactS3Client = new S3(config);
    
                    console.log('selected images:', selectedImages)
                    // upload files to S3
                    const [imageUrl1, imageUrl2] = await Promise.all([
                        ReactS3Client.uploadFile(selectedImages[0], selectedImages[0].name),
                        ReactS3Client.uploadFile(selectedImages[1], selectedImages[1].name),
                    ])
    
                    console.log(imageUrl1, imageUrl2)
                    console.log('values:', values)
                    // manipulate models data into object
                    values.detailLook = Object.values(values);
                    delete values.detail0;
                    delete values.detail1;
    
                    // // set image Urls to values object
                    values.detailLook[0].imageUrl = imageUrl1.location;
                    values.detailLook[1].imageUrl = imageUrl2.location;
    
                    console.log('values sent:', values);
                    // add to MongoDB
                    const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                    const updatedTemplate = res.data.data;
                    setIsLoading(false);
                    // update state
                    dispatch(setActiveTemplate(updatedTemplate));
                    // reset uploaded images
                    setSelectedImages([]);
                } else {
                    values.detailLook = Object.values(values);
                    console.log(values)
                    const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
                    const updatedTemplate = res.data.data;
                    setIsLoading(false);
                    // update state
                    dispatch(setActiveTemplate(updatedTemplate));

                }

            } catch (err) {
                console.log(err);
            }
        }
        // sections with no images
        else {
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
        setSelectedModelImage(e.target.files[0]);
    }

    const handleFilesInput = (e) => {
        setSelectedImages([...selectedImages, e.target.files[0]]);
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
                    // model: [{
                    //     name: activeTemplate?.models?.name,
                    //     weight: activeTemplate?.weight,
                    //     height: activeTemplate?.height,
                    //     bust: activeTemplate?.bust,
                    //     waist: activeTemplate?.waist,
                    //     hips: activeTemplate?.hips,
                    // }],
                    // detailLook: [{
                    //     description: 'test'
                    // }]
                }}
            >
                {/* Product name */}
                {section === 'product-name' &&
                    <Form.Item
                        label="Product Name:"
                        name='name'
                        required
                    >
                        <Input placeholder='Enter product name...' />
                    </Form.Item>
                }
                {/* Product description */}
                {section === 'product-description' &&
                    <Form.Item
                        label="Product Description:"
                        name="description"
                        required
                    >
                        <TextArea rows={8} />
                    </Form.Item>
                }
                {/* Models info */}
                {section === 'models' &&
                    activeTemplate?.models?.map((model, index) => (
                        <div key={index}>
                            <Form.Item
                                label={<span className={classes.formLabel}>Model profile picture</span>}
                                name={[model, "imageUrl"]}
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
                {/* Front/Back view images */}
                {section === 'images-frontBack' &&
                    (
                        <>
                            <Form.Item
                                label={<span className={classes.formLabel}>Front view </span>}
                                name="frontViewImageUrl"
                            >
                                <div>
                                    <input type="file" onChange={handleFilesInput} />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={<span className={classes.formLabel}>Back view </span>}
                                name="backViewImageUrl"
                            >
                                <div>
                                    <input type="file" onChange={handleFilesInput} />
                                </div>
                            </Form.Item>
                        </>
                    )
                }
                {/* Detail Look */}
                {section === 'detail-look' &&
                    activeTemplate?.detailLook?.map((detail, index) => (
                        <div key={index}>
                            <Form.Item
                                label={<span className={classes.formLabel}>Image {index + 1} </span>}
                                name={[`detail${index}`, `imageUrl`]}
                            >
                                <div>
                                    <input type="file" onChange={handleFilesInput} />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={<span className={classes.formLabel}>Description {index + 1} </span>}
                                name={[`detail${index}`, `description`]}
                                initialValue={activeTemplate?.detailLook[index]?.description}
                            >
                                <Input 
                                // defaultValue={detail?.description}
                                    placeholder="Enter product description..." />
                            </Form.Item>
                        </div>
                    ))
                }
                {/* Save button */}
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