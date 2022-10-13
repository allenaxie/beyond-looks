import React from 'react';
import classes from './ModelsInfo.module.scss';
import { Row, Col, Avatar } from 'antd';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectActiveTemplate } from '../../slices/templateSlice';

const ModelsInfo = ({ activeTemplate, handleEditClick }) => {

    return (
        <Row gutter={[16, 16]}>
            {activeTemplate?.models?.map((model, index) => (
                <Col 
                className={`${classes.modelContainer} ${classes.sectionEdit}`}
                key={index}
                 onClick={() => handleEditClick('models')}
                 >
                    <div>
                        <Avatar className={classes.modelAvatar} size={80} src={model?.imageURL || '/images/profile.jpg'} />
                    </div>
                    <span className={classes.modelName}>{model?.name}</span>
                    <div >
                        <p className={classes.modelDescription}>
                            <span className={classes.modelDescription_labels}>身高</span>
                            <span className={classes.bold}>{model?.height} CM</span>
                            <span className={classes.modelDescription_labels}> 体重</span>
                            <span className={classes.bold}>{model?.weight} KG</span>
                            <span className={classes.bold}> {model?.bust} CM / 
                            {model?.waist }CM / 
                            {model?.hips} CM 
                            </span>
                        </p>
                    </div>
                    <div className={classes.modelSize}>
                        <span>试穿尺码</span><span className={classes.bold}>{model?.size}</span>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default ModelsInfo;