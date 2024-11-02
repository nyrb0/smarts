import { My_channelsTypes } from '@/shared/types/User/User.types';
import { FC } from 'react';
import me from '@/shared/image/me.jpg';
import Image from 'next/image';
import { StyledChannel, StyledChannelName } from './MyChannel.styled';
import Link from 'next/link';

interface MyChannelProps {
    channel: My_channelsTypes;
}
const MyChannel: FC<MyChannelProps> = ({ channel }) => {
    return (
        <Link href={`/channel/${channel.id}`}>
            <StyledChannel>
                <Image src={me} alt={channel.name} width={20} height={20} />
                <StyledChannelName>{channel.name}</StyledChannelName>
            </StyledChannel>
        </Link>
    );
};

export default MyChannel;
