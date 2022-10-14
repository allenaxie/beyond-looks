import React, { useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { toJpeg } from 'html-to-image';
import classes from './productDetails.module.scss';
import { Divider, Button, Row, Col, Spin } from 'antd';
import {
    ModelsInfo,
    ProductItemForm,
    SizeInfo,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
    setActiveSection,
    setActiveTemplate,
    selectActiveTemplate,
} from '../../../../slices/templateSlice';
import axios from 'axios';

const ProductDetails = ({ template }) => {
    const dispatch = useDispatch();
    const activeTemplate = useSelector(selectActiveTemplate);

    useEffect(() => {
        // get active template
        dispatch(setActiveTemplate(template));
    }, [])

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
        dispatch(setActiveSection(section));
    }

    return (
        <Row className={classes.container}>
            <Col xs={{ span: 11 }}>
                {/* DOM nodes you want to convert to JPEG */}
                <div ref={ref} className={classes.contentContainer}>
                    <div>
                        <div className={`${classes.productName} ${classes.sectionEdit}`} onClick={() => handleEditClick('product-name')}>
                            <span>{activeTemplate?.name}</span>
                        </div>
                        <div className={`${classes.productDescription} ${classes.sectionEdit}`} onClick={() => handleEditClick('product-description')}>
                            <p>{activeTemplate?.description}</p>
                        </div>
                    </div>
                    <Divider />
                    {activeTemplate?.models?.length > 0 && (
                        <>
                            <ModelsInfo activeTemplate={activeTemplate} handleEditClick={handleEditClick} />
                            <Divider />
                        </>
                    )}
                    <SizeInfo />
                    <Divider />
                    <div>
                        <Row className={classes.sectionEdit} gutter={[16, 16]} onClick={() => handleEditClick('images-frontBack')} >
                            <Col xs={{ span: 12 }} className={classes.frontBackImages}>
                                {<Image src={activeTemplate?.frontViewImageURL || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={150} height={200} /> }
                                <span>正面</span>
                            </Col>
                            <Col xs={{ span: 12 }} className={classes.frontBackImages}>
                                {<Image src={activeTemplate?.backViewImageURL || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={150} height={200} /> }
                                <span>背面</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button onClick={exportJPEG}>Export as JPEG</Button>
                </div>
            </Col>
            <Col xs={{ span: 11 }} className={classes.formContainer}>
                <div className={classes.formContaine} >
                    <ProductItemForm activeTemplate={activeTemplate} />
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetails;

export async function getStaticPaths() {
    let paths = [];

    try {
        // get list of templates
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productTemplates`);
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
    } catch (err) {
    }

    return {
        props: {
            template
        },
    }
}