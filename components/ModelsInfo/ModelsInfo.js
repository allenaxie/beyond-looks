import React from 'react';
import classes from './ModelsInfo.module.scss';
import { Row, Col, Avatar } from 'antd';
import Image from 'next/image';

const ModelsInfo = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={{ span: 8 }} className={classes.modelContainer}>
                <div>
                    <Avatar className={classes.modelAvatar} size={80} src="/images/profile.jpg" />
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
                    <span>试穿尺码</span><span className={classes.bold}>S</span>
                </div>
            </Col>
            <Col xs={{ span: 8 }} className={classes.modelContainer}>
                <div>
                    <Avatar className={classes.modelAvatar} size={80} src="/images/profile.jpg" />
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
                    <span>试穿尺码</span><span className={classes.bold}>S</span>
                </div>
            </Col>
            <Col xs={{ span: 8 }} className={classes.modelContainer}>
                <div>
                    <Avatar className={classes.modelAvatar} size={80} src="/images/profile.jpg" />
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
                    <span>试穿尺码</span><span className={classes.bold}>S</span>
                </div>
            </Col>
        </Row>
    )
}

export default ModelsInfo;