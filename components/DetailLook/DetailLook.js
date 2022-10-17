import React from 'react';
import classes from './DetailLook.module.scss';
import { Row, Col, Image } from 'antd';
import { useSelector } from 'react-redux';
import { selectActiveTemplate } from '../../slices/templateSlice';

const DetailLook = ({ handleEditClick }) => {
    const activeTemplate = useSelector(selectActiveTemplate);
    console.log(activeTemplate)

    return (
        <div className={classes.container} onClick={() => handleEditClick('detail-look')}>
            <div className={classes.title}>
                <span>Detail Look</span>
            </div>

            <Row className={classes.body} gutter={[24, 24]} >
                <Col xs={{ span: 12 }}>
                    {<Image src={activeTemplate?.detailLook?.length > 1 ? activeTemplate?.detailLook[0]?.imageUrl : 'https://i.imgur.com/BAGCcoQ.jpg'} width={'100%'} height={'100%'} />}
                </Col>
                <Col xs={{ span: 12 }} className={classes.detailDescription}>
                    <p>
                        {activeTemplate?.detailLook?.length > 1 ? activeTemplate?.detailLook[0]?.description : 'description'}
                    </p>
                </Col>
            </Row>
            <Row className={classes.body} gutter={[24, 24]} >
                <Col xs={{ span: 12 }} className={classes.detailDescription}>
                    <p>
                    {activeTemplate?.detailLook?.length > 1  ? activeTemplate?.detailLook[1]?.description : 'description'}
                    </p>
                </Col>
                <Col xs={{ span: 12 }}>
                    {<Image src={activeTemplate?.detailLook?.length > 1 ? activeTemplate?.detailLook[1]?.imageUrl : 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                </Col>
            </Row>

        </div>
    )
}

export default DetailLook;