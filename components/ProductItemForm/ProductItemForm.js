import React from 'react';
import classes from './ProductItemForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, InputNumber, Button, Select } from 'antd';
import {
    setActiveSection,
    selectActiveSection,
    setActiveTemplate,
} from '../../slices/templateSlice';
import axios from 'axios';

const ProductItemForm = ({ activeTemplate }) => {
    const dispatch = useDispatch();
    const section = useSelector(selectActiveSection);

    const { TextArea } = Input;

    const onFinish = async (values) => {
        if (section === "models") {
            values.models = Object.values(values);
            delete values['[object Object]'];
        }
        console.log(values);
        const res = await axios.put(`/api/productTemplates/${activeTemplate._id}`, values);
        const updatedTemplate = res.data.data;
        // update state
        dispatch(setActiveTemplate(updatedTemplate));
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }

    return (
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
                >
                    <Input placeholder='Enter product name...' />
                </Form.Item>
            }
            {section === 'product-description' &&
                <Form.Item
                    label="Product Description:"
                    name="description"
                >
                    <TextArea rows={8} />
                </Form.Item>
            }
            {section === 'models' &&
                activeTemplate.models.map((model, index) => (
                    <div key={index}>
                        <Form.Item
                            label={`Model ${index + 1} height`}
                            name={[model, 'height']}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Model ${index + 1} weight`}
                            name={[model, 'weight']}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Bust measurement`}
                            name={[model, 'bust']}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Waist measurement`}
                            name={[model, 'bust']}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Hips measurement`}
                            name={[model, 'bust']}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label={`Model size`}
                            name={[model, 'size']}
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
                    <Button className={classes.submitBtn} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            }
        </Form>
    )
}

export default ProductItemForm;