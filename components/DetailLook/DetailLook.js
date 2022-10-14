import React from 'react';
import classes from './DetailLook.module.scss';
import { Row, Col, Image } from 'antd';
import { useSelector } from 'react-redux';
import { selectActiveTemplate } from '../../slices/templateSlice';

const DetailLook = () => {
    const activeTemplate = useSelector(selectActiveTemplate);

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <span>Detail Look</span>
            </div>
            <Row className={classes.body} gutter={[24,24]}>
                <Col xs={{ span: 12 }}>
                    {<Image src={activeTemplate?.backViewImageURL || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                </Col>
                <Col xs={{ span: 12 }} className={classes.detailDescription}>
                    <p>
                        Details of the product will go here
                    </p>
                </Col>
            </Row>
            <Row className={classes.body} gutter={[24,24]}>
                <Col xs={{ span: 12 }} className={classes.detailDescription}>
                    <p>
                        Details of the product will go here
                    </p>
                </Col>
                <Col xs={{ span: 12 }}>
                    {<Image src={activeTemplate?.backViewImageURL || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                </Col>
            </Row>
            <Row className={classes.body} gutter={[24,24]}>
                <Col xs={{ span: 12 }}>
                    {<Image src={activeTemplate?.backViewImageURL || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                </Col>
                <Col xs={{ span: 12 }} className={classes.detailDescription}>
                    <p>
                        Details of the product will go here
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default DetailLook;