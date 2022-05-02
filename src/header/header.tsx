import './header.scss';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {

    return (
        <header className='d-flex justify-content-around align-items-center'>
            <h1>Pokédex</h1>
        </header>
    );
};

export default Header;