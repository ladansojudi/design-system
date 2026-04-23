export function ContinuousScan({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <g clipPath="url(#s4e-continuous-scan-clip)">
        <path d="M12.137 17.1913C14.9287 17.1913 17.1919 14.9281 17.1919 12.1364C17.1919 10.456 16.372 8.96721 15.1104 8.04808M12.7317 18.3212L11.5423 17.1318L12.7317 15.9424M12.137 7.08146C9.3452 7.08146 7.08203 9.34463 7.08203 12.1364C7.08203 13.8167 7.90192 15.3056 9.16347 16.2247M11.5423 8.33033L12.7317 7.14093L11.5423 5.95154" stroke="currentColor" strokeWidth="1.40179" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="s4e-continuous-scan-clip">
          <rect width="14.2727" height="14.2727" fill="white" transform="translate(5 5)"/>
        </clipPath>
      </defs>
    </svg>
  );
}
