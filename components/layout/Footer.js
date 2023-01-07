function Footer() {
  return (
    <footer className="text-center h-14 md:h-16 lg:h-24 text-xs md:text-sm lg:text-base w-full bg-gray-light flex items-center justify-center">
      &#169;&nbsp;{new Date().getFullYear()}&nbsp;&nbsp;Yum Book, built
      by:&nbsp;&nbsp;
      <a href="https://www.ianpeng.dev" target="_blank" rel="noreferrer">
        <span className="text-primary-normal hover:underline">Ian Peng</span>
      </a>
    </footer>
  );
}

export default Footer;
