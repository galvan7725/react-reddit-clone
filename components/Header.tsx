import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import Image from 'next/image';

const Header = (): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = (): void => {
        setIsOpen(!isOpen);
    }

    const router = useRouter();

    return (
        <header>
            <Navbar color="light" light expand="md">
                <Image src="/reddit.png" alt="RedditIcon" width={50} height={50}/>
                <NavbarBrand href="/" style={{color: '#2990C4'}}>Reddit Clone</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={()=>{router.push('/login')}} color="primary" style={{marginRight:'5px'}}>LOGIN</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={()=>{router.push('/signup')}} outline color="primary">SIGN UP</Button>
                        </NavItem>
                    </Nav>
                    
                </Collapse>
            </Navbar>

        </header>
    )
}

export default Header;
