import React from 'react';
import classes from './ModelsInfo.module.scss';
import { Row, Col, Avatar } from 'antd';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectActiveTemplate } from '../../slices/templateSlice';

const ModelsInfo = ({template}) => {

    return (
        <Row gutter={[16, 16]}>
            {template?.models?.map((model,index) => (
                <Col className={classes.modelContainer}>
                    <div>
                        <Avatar className={classes.modelAvatar} size={80} src={model.imageURL} />
                    </div>
                    <span className={classes.modelName}>Pyper</span>
                    <p className={classes.modelDescription}>
                        <span className={classes.modelDescription_labels}>身高</span>
                        <span className={classes.bold}>160cm</span>
                        <span className={classes.modelDescription_labels}> 体重</span>
                        <span className={classes.bold}>48KG </span>
                        <span className={classes.bold}> 78CM / 66CM / 91CM </span>
                    </p>
                    <div className={classes.modelSize}>
                        <span>试穿尺码</span><span className={classes.bold}>{model.size}</span>
                    </div>
                </Col>
            ) )}
        </Row>
    )
}

export default ModelsInfo;