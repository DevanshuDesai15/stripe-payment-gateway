import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navStyle = {
        borderBottom: '2px solid #ddd',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    };

    const ulStyle = {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
    };

    const liStyle = {
        display: 'inline-block',
        padding: '15px 20px',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    };

    const activeLinkStyle = {
        ...linkStyle,
        color: '#ffd700', // Gold color for active link
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <Link to="/" style={location.pathname === '/' ? activeLinkStyle : linkStyle}>
                        Payment
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link to="/sms" style={location.pathname === '/sms' ? activeLinkStyle : linkStyle}>
                        SMS
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link to="/email" style={location.pathname === '/email' ? activeLinkStyle : linkStyle}>
                        Email
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;