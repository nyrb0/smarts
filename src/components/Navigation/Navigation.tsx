import navStyle from '@/styles/componentsModules/Navigation.module.scss';
import Button from '@/UI/Button/Button';
import Logo from '@/icons/mobilelo 2.png';
import Image from 'next/image';
import Link from 'next/link';

const Navigation = () => {
    const navList: string[] = ['Home', 'About Us', 'Contact Us', 'Blog'];
    const navLink: string[] = ['/home', '/page/about', '/page/custumer', 'page/more'];
    return (
        <nav className={navStyle.nav}>
            <ul className='df'>
                {navList.map((n, i) => (
                    <li key={n}>
                        <Link href={navLink[i]}>{n}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
