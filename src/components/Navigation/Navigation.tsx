import navStyle from '@/styles/componentsModules/Navigation.module.scss';
import Button from '@/UI/Button/Button';
import Logo from '@/icons/mobilelo 2.png';
import Image from 'next/image';
import Link from 'next/link';

const Navigation = () => {
    const navList: string[] = [
        'Home',
        'About Us',
        'Customer Support',
        'Explore More',
    ];
    const navLink: string[] = [
        '/page',
        '/page/about',
        '/page/custumer',
        'page//more',
    ];
    return (
        <nav className={navStyle.nav}>
            <div className={navStyle.icon}>
                <Image src={Logo} alt='Логотип телефон' />
            </div>
            <ul>
                <span>
                    {navList.map((l, i) => (
                        <Link href={navLink[i]} key={l}>
                            {l}
                        </Link>
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
