import React from 'react';
import classes from './ProductItemForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setActiveSection,
    selectActiveSection, 
} from '../../slices/formSlice';

const ProductItemForm = () => {
    const dispatch = useDispatch();
    const section = useSelector(selectActiveSection);

  return (
    <div className={classes.container}>
        {section === 'product-name' && 
            <span>product name</span>
        }
        {section === 'product-description' && 
        <span>product description</span>
        }
    </div>
  )
}

export default ProductItemForm;