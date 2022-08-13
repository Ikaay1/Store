import './style.css';

const Footer = () => {
    const date = new Date();
    const fullYear = date.getFullYear();
    return (
        <footer className='footer'>
            <p>All &copy; CopyRights reserved Classic Store {fullYear}</p>
        </footer>
    );
};

export default Footer;
