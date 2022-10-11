import classes from './Navbar.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { Menu, Dropdown, Avatar } from 'antd';

const Navbar = () => {
    const router = useRouter();

    const templateMenu = (
        <Menu
         items={[
            {
                key: 'product details',
                className: `${classes.productDetailsItem}`,
                label: (
                    <>
                        <AiOutlineUser /> &nbsp;
                        <Link href='/templates/products'>Product Details</Link>
                    </>
                )
            }
         ]}
        />
    )

    return (
        <div className={classes.container}>
            <div
                className={classes.logo}
            >
                <Link href="/">
                    Beyond Looks
                </Link>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.links}>
                    <Dropdown overlay={templateMenu} placement='bottomRight' arrow> 
                        <span>Templates</span>
                    </Dropdown>
                </div>
                <div className={classes.userAvatar}>

                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </div>
            </div>
        </div>
    )
}

export default Navbar;