import {} from 'react';
import './index.scss';

export function Header() {
    return <header>
        <nav className='flex align-center px-4 primary-bg-400'>
            <div className='flex left-nav-items accent-400'>
                <h2 className='brand'>
                    Path Finder
                </h2>
                <button className='btn ml-8'>Algorithms</button>
            </div>
        </nav>
    </header>
}