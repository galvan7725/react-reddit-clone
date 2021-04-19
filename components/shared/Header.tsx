import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import Image from 'next/image';
import { getJWT } from '../services/authService';

const Header = (): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(null);

    const toggle = (): void => {
        setIsOpen(!isOpen);
    }

    const hasJwt = (): void =>{
        if(getJWT() == null){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }
    }

    useEffect(() => {
        hasJwt();
    }, [])

    const router = useRouter();

    return (
        <header>
            <Navbar color="light" light expand="md">
                <Image src="/reddit.png" alt="RedditIcon" width={50} height={50}/>
                <NavbarBrand href="/" style={{color: '#2990C4'}}>Reddit Clone</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {isLogin ? (<>
                            
                        </>) : (<>
                            <NavItem>
                                <Button onClick={()=>{router.push('/login')}} color="primary" style={{marginRight:'5px'}}>LOGIN</Button>
                            </NavItem>
                            <NavItem>
                                <Button onClick={()=>{router.push('/signup')}} outline color="primary">SIGN UP</Button>
                            </NavItem>
                        </>)}
                    </Nav>
                    
                </Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
