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
import { getJWT } from '../services/authService';
import Security from '../../security/Security';

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
                                                <Image src="/reddit.png" alt="RedditIcon" width={50} height={50} />
                                                <span>{security.getUserName()}</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Profile</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>Logout</DropdownItem>
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
