'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../store/authService';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import TelegramLogin from '../../components/TelegramLogin';

export default function RegisterPage() {
  const { lang } = useLanguage();
  const t = (en, kh) => (lang === 'kh' ? kh : en);

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: '', color: 'bg-gray-200' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmation: '' });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        if (!name) setErrors(prev => ({ ...prev, name: t('Name is required', 'ត្រូវការឈ្មោះ') }));
        break;
      case 'email':
        if (email && !validateEmail(email)) {
          setErrors(prev => ({ ...prev, email: t('Invalid email format', 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ') }));
        }
        break;
      case 'password':
        if (password && password.length < 8) {
          setErrors(prev => ({ ...prev, password: t('Password must be at least 8 characters', 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៨ ខ្ទង់') }));
        }
        break;
      case 'confirmation':
        if (passwordConfirmation && password !== passwordConfirmation) {
          setErrors(prev => ({ ...prev, confirmation: t('Passwords do not match', 'ពាក្យសម្ងាត់មិនទូទាត់គ្នា') }));
        }
        break;
    }
  };

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const levels = [
      { label: t('Very Weak', 'ខ្សោយបំផុត'), color: 'bg-red-500', width: '25%' },
      { label: t('Weak', 'ខ្សោយ'), color: 'bg-orange-500', width: '50%' },
      { label: t('Fair', 'ធម្យម'), color: 'bg-yellow-500', width: '75%' },
      { label: t('Strong', 'ខ្លាំង'), color: 'bg-green-500', width: '100%' }
    ];

    if (pass.length === 0) {
      setStrength({ score: 0, label: '', color: 'bg-gray-200', width: '0%' });
    } else {
      const result = levels[Math.min(score, 3)];
      setStrength({ ...result, score });
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkPasswordStrength(val);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Final validation
    const newErrors = {
      name: !name ? t('Name is required', 'ត្រូវការឈ្មោះ') : '',
      email: !validateEmail(email) ? t('Invalid email address', 'អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ') : '',
      password: password.length < 8 ? t('Too short', 'ខ្លីពេក') : '',
      confirmation: password !== passwordConfirmation ? t('Mismatched', 'មិនដូចគ្នា') : ''
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err !== '')) return;

    setLoading(true);
    setError('');
    
    try {
      await authService.register(name, email, password, passwordConfirmation);
      // Success - Redirect to login instead of auto-logging in
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex justify-center items-center px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[color:var(--bg-secondary)] p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[color:var(--border-main)] relative overflow-hidden transition-colors duration-500"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-[color:var(--color-secondary)]/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[color:var(--color-primary)]/10 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none" />

        <div className="relative">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-[color:var(--text-main)] mb-1 tracking-tight transition-colors duration-300">
              {t('Create Account', 'បង្កើតគណនី')}
            </h1>
            <p className="text-[color:var(--text-muted)] text-sm font-medium transition-colors duration-300">
              {t('Join us today to get started.', 'ចូលរួមជាមួយពួកយើងថ្ងៃនេះដើម្បីចាប់ផ្តើម។')}
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-bold text-[color:var(--text-main)] ml-1 transition-colors duration-300">
                {t('Full Name', 'ឈ្មោះពេញ')}
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }}
                onBlur={() => handleBlur('name')}
                required
                placeholder={t('John Doe', 'ចន ដូ')}
                className={`w-full px-5 py-3 bg-[color:var(--bg-main)]/50 border ${errors.name ? 'border-red-400 focus:ring-red-400/10' : 'border-[color:var(--border-main)] focus:ring-[color:var(--color-primary)]/10 focus:border-[color:var(--color-primary)]'} rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium text-[color:var(--text-main)] placeholder-[color:var(--text-muted)]/50`}
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-[color:var(--text-main)] ml-1 transition-colors duration-300">
                {t('Email Address', 'អាសយដ្ឋានអ៊ីមែល')}
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                onBlur={() => handleBlur('email')}
                required
                placeholder={t('hello@example.com', 'hello@example.com')}
                className={`w-full px-5 py-3 bg-[color:var(--bg-main)]/50 border ${errors.email ? 'border-red-400 focus:ring-red-400/10' : 'border-[color:var(--border-main)] focus:ring-[color:var(--color-primary)]/10 focus:border-[color:var(--color-primary)]'} rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium text-[color:var(--text-main)] placeholder-[color:var(--text-muted)]/50`}
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.email}</p>}
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-[color:var(--text-main)] ml-1 transition-colors duration-300">
                {t('Password', 'ពាក្យសម្ងាត់')}
              </label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  required
                  placeholder="••••••••"
                  className={`w-full px-5 py-3 bg-[color:var(--bg-main)]/50 border ${errors.password ? 'border-red-400 focus:ring-red-400/10' : 'border-[color:var(--border-main)] focus:ring-[color:var(--color-primary)]/10 focus:border-[color:var(--color-primary)]'} rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium tracking-widest pr-12 text-[color:var(--text-main)] placeholder-[color:var(--text-muted)]/50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)] hover:text-[color:var(--color-primary)] transition-colors p-1"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.password}</p>}
              
              {/* Strength Indicator */}
              {password.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-1 pt-1"
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
                    <span className="text-[color:var(--text-muted)]">Strength:</span>
                    <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[color:var(--border-main)] rounded-full overflow-hidden transition-colors duration-300">
                    <motion.div 
                      animate={{ width: strength.width }}
                      className={`h-full ${strength.color} transition-all duration-500`}
                    />
                  </div>
                  {!errors.password && strength.score < 3 && (
                    <p className="text-[10px] text-[color:var(--text-muted)] mt-1 leading-tight transition-colors duration-300">
                      {t("Use 8+ chars with mix of letters, numbers & symbols", "ប្រើលេខសម្ងាត់ ៨ ខ្ទង់ឡើងទៅ មានអក្សរ លេខ និងនិមិត្តសញ្ញា")}
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-[color:var(--text-main)] ml-1 transition-colors duration-300">
                {t('Confirm Password', 'បញ្ជាក់ពាក្យសម្ងាត់')}
              </label>
              <div className="relative group">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setPasswordConfirmation(e.target.value);
                    if (errors.confirmation) setErrors(prev => ({ ...prev, confirmation: '' }));
                  }}
                  onBlur={() => handleBlur('confirmation')}
                  required
                  placeholder="••••••••"
                  className={`w-full px-5 py-3 bg-[color:var(--bg-main)]/50 border ${errors.confirmation ? 'border-red-400 focus:ring-red-400/10' : 'border-[color:var(--border-main)] focus:ring-[color:var(--color-primary)]/10 focus:border-[color:var(--color-primary)]'} rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium tracking-widest pr-12 text-[color:var(--text-main)] placeholder-[color:var(--text-muted)]/50`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)] hover:text-[color:var(--color-primary)] transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmation && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.confirmation}</p>}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[color:var(--color-secondary)] to-[color:var(--color-primary)] text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? t('Signing up...', 'កំពុងចុះឈ្មោះ...') : t('Sign Up', 'ចុះឈ្មោះ')}
            </button>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-[color:var(--border-main)]"></div>
              <span className="flex-shrink-0 mx-4 text-[color:var(--text-muted)] text-xs font-bold uppercase transition-colors duration-300">{t('Or', 'ឬ')}</span>
              <div className="flex-grow border-t border-[color:var(--border-main)]"></div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                type="button"
                onClick={() => window.location.href = '/api/auth/google'}
                className="flex-1 h-[40px] bg-[color:var(--bg-main)]/50 backdrop-blur-sm border border-[color:var(--border-main)] rounded-xl shadow-sm hover:bg-[color:var(--bg-secondary)] flex items-center justify-center transition-all group"
                title={t('Continue with Google', 'បន្តជាមួយ Google')}
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>

              <div className="flex-1 flex justify-center h-[40px]">
                <TelegramLogin 
                  botName="codebridgee_bot" 
                  authUrl="/api/auth/telegram/callback" 
                />
              </div>
            </div>
          </form>

          <p className="text-center mt-6 text-sm font-medium text-[color:var(--text-muted)] transition-colors duration-300">
            {t("Already have an account?", "មានគណនីរួចហើយមែនទេ?")}{' '}
            <Link href="/login" className="font-bold text-[color:var(--color-primary)] hover:text-[color:var(--color-secondary)] transition-colors">
              {t('Log in here', 'ចូលគណនីនៅទីនេះ')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
