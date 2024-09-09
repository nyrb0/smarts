import navStyle from '@/styles/componentsModules/Navigation.module.scss';
import Button from '@/UI/Button/Button';
import Logo from '@/icons/mobilelo 2.png';
import Image from 'next/image';

const Navigation = () => {
    const navList: string[] = [
        'Home',
        'About Us',
        'Customer Support',
        'Explore More',
    ];
    return (
        <nav className={navStyle.nav}>
            <div className={navStyle.icon}>
                <Image src={Logo} alt='Логотип телефон' />
            </div>
            <ul>
                <span>
                    {navList.map(l => (
                        <li key={l}>{l}</li>
                    ))}
                </span>
            </ul>
            <div className={navStyle.btn}>
                <Button style={{ border: 39, background: '#219ebc' }}>
                    Contact Us
                </Button>
            </div>
        </nav>
    );
};

export default Navigation;
