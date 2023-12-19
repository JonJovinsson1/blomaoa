import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the entered credentials are correct
    if (username === 'Bloma' && password === 'ToTheSky') {
      // Redirect to pdf.tsx page on successful login
      router.push('/pdf');
    } else {
      // Handle incorrect credentials (you can show an error message)
      console.log('Incorrect credentials');
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {/* Login Form */}
      <div className="mt-8 flex flex-col items-center">
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username"
          className="rounded-lg mb-4 px-2 py-1 text-black"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          className="rounded-lg mb-4 px-2 py-1 text-black"
        />
        <button 
          type="button" 
          onClick={handleLogin} 
          className="rounded-lg bg-blue-500 text-white px-4 py-2"
        >
          Login
        </button>
      </div>
    </main>
  );
}
