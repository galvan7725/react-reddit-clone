import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner
} from 'reactstrap';
import Image from 'next/image';
import Security from '../../security/Security';
import Link from 'next/link';
import { logout } from '../services/authService';

const Header = (): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const security = new Security();
    const router = useRouter();

    const toggle = (): void => {
        setIsOpen(!isOpen);
    }

    const toggleD = (): void => {
        setDropdownOpen(!dropdownOpen);
    }

    const hasJwt = (): void => {
        if (!security.verifyToken()) {
            setIsLogin(false);
            setLoading(false);
        } else {
            setIsLogin(true);
            setLoading(false);
        }
    }

    const logoutCall = async() : Promise<void> => {
        try {
            const response = await logout();
            if (response == null){
                throw new Error('Error logout');
            }else{
                router.push('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        hasJwt();
    }, [])

    return (
        <header>
            <Navbar color="light" light expand="md">
                <Image src="/reddit.png" alt="RedditIcon" width={50} height={50} />
                <NavbarBrand href="/" style={{ color: '#2990C4' }}>Reddit Clone</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {loading ? <Spinner color="primary" /> :
                            (<>
                                {isLogin ? (<>
                                    <div className="dropdown-container">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggleD} style={{ alignSelf: 'center' }}>
                                            <DropdownToggle caret style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', color: 'blue', border: '1px solid blue' }}>
                                                <Image src="/reddit_user.png" alt="RedditIcon" width={50} height={50} />
                                                <span>{security.getUserName()}</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem><Link href={`/user_profile/${security.getUserName()}`}><span>Profile</span></Link></DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() =>{logoutCall()}}>Logout</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </>) : (<>
                                    <NavItem>
                                        <Button onClick={() => { router.push('/login') }} color="primary" style={{ marginRight: '5px' }}>LOGIN</Button>
                                    </NavItem>
                                    <NavItem>
                                        <Button onClick={() => { router.push('/signup') }} outline color="primary">SIGN UP</Button>
                                    </NavItem>
                                </>)}
                            </>)
                        }
                    </Nav>

                </Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
