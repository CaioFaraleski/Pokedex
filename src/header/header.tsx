import React, { useEffect, useState } from 'react';
import './header.scss';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
    const [search, setSearch] = useState<string>('');
    
    useEffect(() => {
        if (search !== '') console.log('ta cheiao')
        else console.log('tem nada fio')
    }, [search]);

    return (
        <header className='d-flex justify-content-around align-items-center'>
            <h1>Pokédex</h1>
        </header>
    );
};

export default Header;