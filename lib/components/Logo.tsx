import Image from 'next/image';
import FarsiLogo from '@/public/digiexpress-farsi.svg';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => <Image className={className} src={FarsiLogo} alt="DigiExpress Logo" priority />;

export default Logo;
