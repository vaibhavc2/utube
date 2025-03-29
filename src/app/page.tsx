import { ThemeToggle } from '#/components/ui/theme-toggle';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image src={'/logo.svg'} alt='logo' width={100} height={100} />
      <ThemeToggle />
      <h1 className='text-xl font-semibold tracking-tight'>uTube</h1>
    </div>
  );
}
