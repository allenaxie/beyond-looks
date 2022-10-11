import React, { useRef, useCallback } from 'react';
import { toJpeg } from 'html-to-image';
import classes from './productDetails.module.scss';
import { Divider, Button, Row, Col } from 'antd';
import { ModelsInfo, ProductItemForm } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
    setActiveSection,
    setActiveTemplate,
} from '../../../../slices/templateSlice';
import axios from 'axios';

const productDetails = ({ template }) => {

    const dispatch = useDispatch();

    const ref = useRef(null);

    const exportJPEG = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, { width: 400, canvasWidth: 400 })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.jpeg'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    const handleEditClick = (section) => {
        console.log(section);
        dispatch(setActiveSection(section));
    }

    console.log(template);
    return (
        <Row className={classes.container}>
            <Col xs={{ span: 11 }}>
                {/* DOM nodes you want to convert to JPEG */}
                <div ref={ref} className={classes.contentContainer}>
                    <div>
                        <div className={`${classes.productName} ${classes.sectionEdit}`} onClick={section => handleEditClick('product-name')}>
                            <span>{template?.name}</span>
                        </div>
                        <div className={`${classes.productDescription} ${classes.sectionEdit}`} onClick={section => handleEditClick('product-description')}>
                            <p>{template?.description}</p>
                        </div>
                    </div>
                    <Divider />
                    <ModelsInfo template={template}/>
                    <Divider />

                </div>
                <div className={classes.buttonContainer}>
                    <Button onClick={exportJPEG}>Export as JPEG</Button>
                </div>
            </Col>
            <Col xs={{ span: 11 }} className={classes.formContainer}>
                <div style={{ position: 'fixed' }}>
                    <ProductItemForm template={template}/>
                </div>
            </Col>
        </Row>
    )
}

export default productDetails;

export async function getStaticPaths() {
    let paths = [];

    try {
        // get list of templates
        const res = await axios.get(`http://localhost:3000/api/productTemplates`);
        const data = res.data.data;

        // create path for each template
        paths = data.map((template) => ({
            params: { id: `${template._id}` },
        }))

    } catch (err) {
        console.log(err);
    }

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps(context) {
    let id = context.params.id;

    let template = {};

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productTemplates/${id}`)
        template = res.data.data;
        dispatch(setActiveSection(template));
    } catch (err) {
    }

    return {
        props: {
            template
        },
    }
}