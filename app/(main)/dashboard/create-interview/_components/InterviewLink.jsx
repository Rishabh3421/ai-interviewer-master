import React from 'react';
import Image from 'next/image';
import { CopyIcon, MailIcon, LinkedinIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

const InterviewLink = ({ interviewLink }) => {
  const [copied, setCopied] = React.useState(false);

  const fullURL = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success('Link copied successfully');
  };

  const shareOptions = [
    {
      label: 'Email',
      icon: <MailIcon size={18} />,
      href: `mailto:?subject=Interview Invitation&body=Hi,%0A%0AHere is your interview link: ${fullURL}`,
    },
    {
      label: 'WhatsApp',
      icon: <FaWhatsapp size={18} />,
      href: `https://wa.me/?text=Hi,%20here%20is%20your%20interview%20link:%20${encodeURIComponent(fullURL)}`,
    },
    {
      label: 'LinkedIn',
      icon: <LinkedinIcon size={18} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullURL)}`,
    },
  ];

  return (
    <div className='flex flex-col items-center justify-top m-[10vh] h-screen'>
      <Image src="/check.png" alt="Interview Link" width={100} height={100} />
      <h1 className='text-3xl font-bold mt-4 text-purple-700'>Interview Link Created Successfully</h1>
      <p className='text-lg text-gray-500 mt-2'>You can now share the interview link with the candidate</p>

      {/* Link and Copy Button */}
      <div className='flex items-center mt-4'>
        <input
          type="text"
          value={fullURL}
          readOnly
          className='border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-[300px] text-gray-800'
        />
        <button
          onClick={handleCopy}
          className='ml-2 text-sm bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-600 transition-all duration-300 flex items-center'
        >
          <CopyIcon className='mr-2' />
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>

      {/* Share via section */}
      <div className="mt-8 text-center">
        <h3 className="font-medium text-gray-700 mb-3 text-lg">Share via</h3>
        <div className="flex gap-4 justify-center">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200 transition-all duration-300"
            >
              {option.icon}
              {option.label}
            </a>
          ))}
        </div>
      </div>

      {/* Additional buttons */}
      <div className="mt-8 text-center">
        <button
          className='text-sm bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-600 transition-all duration-300'
        >
          Back to Dashboard
        </button>
        <button
          className='ml-4 text-sm bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-600 transition-all duration-300'
        >
          Generate Another Link
        </button>
      </div>
    </div>
  );
};

export default InterviewLink;
