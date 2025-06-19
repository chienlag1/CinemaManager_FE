import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8'>
      {/* Main Container */}
      <div className='w-full max-w-md mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          {/* Logo/Brand Area */}
          <div className='mb-6'>
            <div className='w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6m-6 4h6'
                />
              </svg>
            </div>
          </div>

          <h1 className='text-3xl font-bold text-white mb-3 tracking-tight'>
            Chào mừng trở lại
          </h1>
          <p className='text-base text-slate-300 font-medium'>
            Đăng nhập vào Movie Ticket Management
          </p>
        </div>

        {/* Login Form Container */}
        <div className='bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20'>
          <div className='p-6'>
            <SignIn
              afterSignInUrl='/'
              appearance={{
                variables: {
                  colorPrimary: '#6366f1',
                  colorBackground: 'transparent',
                  colorInputBackground: '#f8fafc',
                  colorInputText: '#0f172a',
                  colorText: '#334155',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  borderRadius: '8px',
                  spacingUnit: '0.75rem',
                },
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent shadow-none border-none p-0 w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: `
                    w-full border-2 border-slate-200 hover:border-slate-300 
                    bg-white hover:bg-slate-50 
                    text-slate-700 font-medium 
                    transition-all duration-200 
                    shadow-sm hover:shadow-md
                    py-3 px-4 rounded-lg
                    flex items-center justify-center gap-3
                  `,
                  socialButtonsBlockButtonText: 'font-medium text-sm',
                  dividerLine: 'bg-slate-300',
                  dividerText: 'text-slate-500 font-medium text-sm',
                  formFieldInput: `
                    w-full border-2 border-slate-200 
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                    bg-slate-50 focus:bg-white
                    text-slate-900 placeholder:text-slate-500
                    transition-all duration-200
                    py-3 px-4 rounded-lg
                  `,
                  formFieldLabel:
                    'text-slate-700 font-semibold text-sm mb-2 block',
                  formButtonPrimary: `
                    w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700
                    active:from-indigo-800 active:to-purple-800
                    shadow-lg hover:shadow-xl
                    transform hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-200
                    text-white font-semibold
                    py-3 px-6 rounded-lg
                  `,
                  footerActionText: 'text-slate-600 text-sm',
                  footerActionLink: `
                    text-indigo-600 hover:text-indigo-700 
                    font-semibold hover:underline
                    transition-colors duration-200 text-sm
                  `,
                  identityPreviewText: 'text-slate-600 text-sm',
                  identityPreviewEditButton:
                    'text-indigo-600 hover:text-indigo-700 text-sm',
                  formResendCodeLink:
                    'text-indigo-600 hover:text-indigo-700 font-medium text-sm',
                  otpCodeFieldInput: `
                    border-2 border-slate-200 
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                    bg-slate-50 focus:bg-white text-center
                    font-mono text-lg font-bold rounded-lg
                  `,
                  footer: 'mt-6',
                },
                layout: {
                  socialButtonsPlacement: 'top',
                  showOptionalFields: false,
                },
              }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className='text-center mt-6'>
          <p className='text-slate-400 text-xs'>
            © 2024 Movie Ticket Management. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
