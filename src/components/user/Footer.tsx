const Footer = () => {
  return (
    <footer className='bg-base-200 text-base-content'>
      <div
        className='<div className="footer p-10 max-w-7xl mx-auto flex flex-wrap justify-between gap-6">
'
      >
        <div>
          <h2 className='footer-title text-lg font-semibold'>Thông tin</h2>
          <p className='link link-hover'>Về chúng tôi</p>
          <p className='link link-hover'>Liên hệ</p>
          <p className='link link-hover'>Tuyển dụng</p>
        </div>
        <div>
          <h2 className='footer-title text-lg font-semibold'>Hỗ trợ</h2>
          <p className='link link-hover'>Trung tâm trợ giúp</p>
          <p className='link link-hover'>Chính sách bảo mật</p>
          <p className='link link-hover'>Điều khoản sử dụng</p>
        </div>
        <div>
          <h2 className='footer-title text-lg font-semibold'>Kết nối</h2>
          <div className='grid grid-flow-col gap-4'>
            <a
              href='#'
              aria-label='LinkedIn'
              className='hover:text-primary transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='fill-current'
                viewBox='0 0 24 24'
              >
                <path d='M24 4.56v14.91c0 1.53-1.24 2.76-2.76 2.76H2.76A2.76 2.76 0 010 19.47V4.56C0 3.02 1.24 1.8 2.76 1.8h18.48C22.76 1.8 24 3.02 24 4.56zM9.37 19.5h3V9h-3v10.5zM10.87 7.56a1.74 1.74 0 100-3.48 1.74 1.74 0 000 3.48zM21 19.5h-3v-5.55c0-3.3-4-3.04-4 0V19.5h-3V9h3v1.38c1.4-2.6 7-2.8 7 2.47V19.5z' />
              </svg>
            </a>
            <a
              href='#'
              aria-label='Twitter'
              className='hover:text-primary transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='fill-current'
                viewBox='0 0 24 24'
              >
                <path d='M23.498 6.186c-.87.387-1.804.648-2.782.766a4.82 4.82 0 002.116-2.66 9.605 9.605 0 01-3.044 1.163 4.803 4.803 0 00-8.195 4.376A13.63 13.63 0 013.179 4.868a4.803 4.803 0 001.487 6.407 4.766 4.766 0 01-2.177-.602v.06a4.803 4.803 0 003.855 4.706 4.798 4.798 0 01-2.17.083 4.806 4.806 0 004.482 3.331A9.616 9.616 0 012 20.125a13.57 13.57 0 007.29 2.137c8.748 0 13.533-7.25 13.533-13.533 0-.206-.005-.412-.014-.617A9.646 9.646 0 0024 4.557a9.547 9.547 0 01-2.502.684z' />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className='border-t border-base-300 py-4 text-center text-sm'>
        © {new Date().getFullYear()} Bản quyền thuộc về{' '}
        <span className='font-semibold text-primary'>CineApp</span>
      </div>
    </footer>
  );
};

export default Footer;
