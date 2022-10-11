import React from 'react';
import classes from './ProductItemForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import {
    setActiveSection,
    selectActiveSection,
} from '../../slices/templateSlice';


const ProductItemForm = () => {
    const dispatch = useDispatch();
    const section = useSelector(selectActiveSection);

    const onFinish = (values) => {
        if (values.productName) {
            console.log('name');
        } else if (values.productDescription) {
            console.log('description');
        }
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
            autoComplete='off'
            initialValues={{
                productName: 'name of product',
                productDescription: 'description'
            }}
        >
            {section === 'product-name' &&
                <Form.Item
                    label="Product Name:"
                    name="productName"
                >
                    <Input placeholder='Enter product name...' />
                </Form.Item>
            }
            {section === 'product-description' &&
                <Form.Item
                    label="Product Description:"
                    name="productDescription"
                >
                    <Input />
                </Form.Item>
            }
            {section !== '' &&
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            }
        </Form>
    )
}

export default ProductItemForm;