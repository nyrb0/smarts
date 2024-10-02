import styleFooter from '@/styles/componentsModules/footer.module.scss';

const Footer = () => {
    const service = [
        'Bonus program',
        'Gift cards',
        'Credit and payment',
        'Service contracts',
        'Non-cash account',
        'Payment',
    ];
    const assistance = [
        'Find an order',
        'Terms of delivery',
        'Exchange and return of goods',
        'Guarantee',
        'Frequently asked questions',
        'Terms of use of the site',
    ];
    return (
        <footer className={styleFooter.footer}>
            <div className={`${styleFooter.inner} container`}>
                <div className={`${styleFooter.content} df`}>
                    <div className={styleFooter.column1}>
                        <div className={styleFooter.name}>cyber</div>
                        <div className={styleFooter.desc}>
                            We are a residential interior design firm located in Portland. Our boutique-studio offers
                            more than
                        </div>
                    </div>
                    <div className={styleFooter.column}>
                        <div className={styleFooter.service}>Services</div>
                        <ul>
                            {assistance.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styleFooter.column}>
                        <div className={styleFooter.service}>Services</div>
                        <ul>
                            {assistance.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
