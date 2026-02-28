import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Zap, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'b2b') navigate('/b2b');
            else navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Access Denied: Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-navy-800/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent-yellow/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-lg relative z-10">
                <div className="text-center mb-16 space-y-6 animate-slide-up">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                        <Lock className="w-3 h-3 text-accent-yellow" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Secure Auth Terminal</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                        ENTRY <br />
                        <span className="text-accent-yellow">PORTAL.</span>
                    </h2>
                </div>

                <div className="bg-navy-950/20 backdrop-blur-3xl border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Secure Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter Official Email"
                                    className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center ml-6">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] italic">Access Key</label>
                                <a href="#" className="text-[10px] font-black text-accent-yellow uppercase tracking-widest hover:text-white transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••••••"
                                    className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent-yellow text-accent-black h-20 rounded-[30px] font-black uppercase text-[10px] tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-white hover:scale-105 transition-all shadow-[0_40px_80px_-20px_rgba(250,204,21,0.4)] active:scale-95 group"
                        >
                            Authorize Entry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-10 border-t border-white/5">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            New Personnel?{' '}
                            <Link to="/register" className="text-accent-yellow hover:text-white transition-colors italic">
                                Register Strategic Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
