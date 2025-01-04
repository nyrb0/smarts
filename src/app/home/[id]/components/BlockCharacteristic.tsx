import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface IBlockCharacteristic {
    alt?: string;
    img: StaticImageData;
    title: string;
    desc: string;
}

const Characteristic = styled.div`
    padding: 0 8px;
    width: 168px;
    height: 64px;
    background-color: #f4f4f4;
    border-radius: 7px;
    p {
        font-size: 14px;
    }
    p:last-child {
        font-size: 10px;
    }
`;

const BlockCharacteristic: React.FC<IBlockCharacteristic> = ({ alt, img, title, desc }) => {
    return (
        <Characteristic className='dfca'>
            <div>
                <Image src={img} alt='GPU icon' />
            </div>
            <div>
                <p>{title}</p>
                <p>{desc}</p>
            </div>
        </Characteristic>
    );
};

export default BlockCharacteristic;
