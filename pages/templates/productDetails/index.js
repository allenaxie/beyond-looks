import React, { useRef, useCallback } from 'react';
import { toJpeg } from 'html-to-image';
import classes from './productDetails.module.scss';
import { Divider, Button, Row, Col } from 'antd';
import { ModelsInfo, ProductItemForm } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection, setProductName } from '../../../slices/formSlice';

const productDetails = () => {

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

  return (
    <Row className={classes.container}>
      <Col xs={{ span: 11 }}>
        {/* DOM nodes you want to convert to JPEG */}
        <div ref={ref} className={classes.contentContainer}>
          <div>
            <div className={`${classes.productName} ${classes.sectionEdit}`} onClick={section => handleEditClick('product-name')}>
              <span>twist top</span>
            </div>
            <div className={`${classes.productDescription} ${classes.sectionEdit}`} onClick={section => handleEditClick('product-description')}>
              <p>哈喽， 大家好。我是霸王。是王中之霸，不是王八蛋。如果有兴趣做朋友，请联系我的助手。</p>
            </div>
          </div>
          <Divider />
          <ModelsInfo />
          <Divider />

        </div>
        <div className={classes.buttonContainer}>
          <Button onClick={exportJPEG}>Export as JPEG</Button>
        </div>
      </Col>
      <Col xs={{ span: 11 }} className={classes.formContainer}>
        <div style={{ position: 'fixed' }}>
          <span>Edit form</span>
          <ProductItemForm />
        </div>
      </Col>
    </Row>
  )
}

export default productDetails;