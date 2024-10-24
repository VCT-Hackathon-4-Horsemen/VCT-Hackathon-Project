import React, { useEffect } from "react"
import './Navbar.css'
import logo from './images/logo-black.png'

export default function Navbar() {
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('nav'); // Select your navbar
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled'); // Add the class if scrolled
            } else {
                navbar.classList.remove('scrolled'); // Remove the class if at the top
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav>
            <img src={logo} className="nav--logo" alt="valpal logo" />
            <h4 className="credit">Powered By: AWS Bedrock</h4>
            <a href="#" className="try-button">
                Try Me
            </a>

        </nav>
    )
}