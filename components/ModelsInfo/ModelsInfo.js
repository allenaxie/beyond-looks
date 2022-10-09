import React from 'react';
import classes from './ModelsInfo.module.scss';
import {Row, Col} from 'antd';

const ModelsInfo = () => {
  return (
    <Row>
        <Col>
            <div className={classes.modelImage}>

            </div>
        </Col>
        <Col></Col>
        <Col></Col>
    </Row>
  )
}

export default ModelsInfo;