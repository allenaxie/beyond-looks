import React from 'react';
import classes from './DetailLook.module.scss';
import { Row, Col, Image } from 'antd';
import { useSelector } from 'react-redux';
import { selectActiveTemplate } from '../../slices/templateSlice';

const DetailLook = ({ handleEditClick }) => {
    const activeTemplate = useSelector(selectActiveTemplate);

    return (
        <div className={classes.container} onClick={() => handleEditClick('detail-look')}>
            <div className={classes.title}>
                <span>Detail Look</span>
            </div>

            {activeTemplate?.detailLook?.map((item, index) =>
                index % 2 === 0 ? (
                    <Row className={classes.body} gutter={[24, 24]} key={index}>
                        <Col xs={{ span: 12 }}>
                            {<Image src={activeTemplate?.detailLook[index]?.imageUrl || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                        </Col>
                        <Col xs={{ span: 12 }} className={classes.detailDescription}>
                            <p>
                                {activeTemplate?.detailLook[index]?.description}
                            </p>
                        </Col>
                    </Row>
                ) : (
                    <Row className={classes.body} gutter={[24, 24]} key={index}>
                        <Col xs={{ span: 12 }} className={classes.detailDescription}>
                            <p>
                                {activeTemplate?.detailLook[index]?.description}
                            </p>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            {<Image src={activeTemplate?.detailLook[index]?.imageUrl || 'https://beyond-looks-s3.s3.us-west-1.amazonaws.com/photos/pyper-transparent.png'} width={'100%'} height={'100%'} />}
                        </Col>
                    </Row>
                )
            )}
        </div>
    )
}

export default DetailLook;