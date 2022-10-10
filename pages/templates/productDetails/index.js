import React, { useRef, useCallback } from 'react';
import { toJpeg } from 'html-to-image';
import classes from './productDetails.module.scss';
import { Divider, Button, Row, Col } from 'antd';
import { ModelsInfo } from '../../../components';

const productDetails = () => {

  const ref = useRef(null)

  const onButtonClick = useCallback(() => {
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

  return (
    <Row className={classes.container}>
      <Col xs={{ span: 11 }}>
        {/* DOM nodes you want to convert to JPEG */}
        <div ref={ref} className={classes.contentContainer}>
          <div>
            <div className={classes.productName_title}>
              <span>twist top</span>
            </div>
            <div className={classes.productName_description}>
              <p>哈喽， 大家好。我是霸王。是王中之霸，不是王八蛋。如果有兴趣做朋友，请联系我的助手。</p>
            </div>
          </div>
          <Divider />
          <ModelsInfo />
        </div>
        <div className={classes.buttonContainer}>
          <Button onClick={onButtonClick}>Click me</Button>
        </div>
      </Col>
      <Col xs={{ span: 11 }} className={classes.formContainer}>
        <div style={{ position: 'fixed' }}>
          <span>Edit form</span>
        </div>
      </Col>
    </Row>

  )
}

export default productDetails;