import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Zap, Lock, Mail, User, Building, Landmark, ArrowRight } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'b2c',
        companyName: '',
        gst: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Strategic Registration Error. Verify credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-40 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-navy-800/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-accent-yellow/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-16 space-y-6 animate-slide-up">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                        <User className="w-3 h-3 text-accent-yellow" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Resource Enrollment</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                        STRATEGIC <br />
                        <span className="text-accent-yellow">ONBOARD.</span>
                    </h2>
                </div>

                <div className="bg-navy-950/20 backdrop-blur-3xl border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Full Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow" />
                                    <input name="name" type="text" required placeholder="Legal Name" className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Secure Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow" />
                                    <input name="email" type="email" required placeholder="name@company.com" className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Security Protocol (Password)</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow" />
                                <input name="password" type="password" required placeholder="••••••••••••" className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Operational Status</span>
                            <div className="flex flex-wrap gap-6 ml-6">
                                <label className="inline-flex items-center cursor-pointer group">
                                    <input type="radio" className="hidden" name="role" value="b2c" checked={formData.role === 'b2c'} onChange={handleChange} />
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.role === 'b2c' ? 'border-accent-yellow bg-accent-yellow' : 'border-white/10'}`}>
                                        {formData.role === 'b2c' && <div className="w-2 h-2 bg-accent-black rounded-full" />}
                                    </div>
                                    <span className={`ml-4 text-[10px] font-black uppercase tracking-widest ${formData.role === 'b2c' ? 'text-white' : 'text-gray-600'}`}>Retail Personnel</span>
                                </label>
                                <label className="inline-flex items-center cursor-pointer group">
                                    <input type="radio" className="hidden" name="role" value="b2b" checked={formData.role === 'b2b'} onChange={handleChange} />
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.role === 'b2b' ? 'border-accent-yellow bg-accent-yellow' : 'border-white/10'}`}>
                                        {formData.role === 'b2b' && <div className="w-2 h-2 bg-accent-black rounded-full" />}
                                    </div>
                                    <span className={`ml-4 text-[10px] font-black uppercase tracking-widest ${formData.role === 'b2b' ? 'text-white' : 'text-gray-600'}`}>Strategic Enterprise</span>
                                </label>
                            </div>
                        </div>

                        {formData.role === 'b2b' && (
                            <div className="grid md:grid-cols-2 gap-10 animate-slide-up">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Corporate Identity</label>
                                    <div className="relative group">
                                        <Building className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow" />
                                        <input name="companyName" type="text" required placeholder="Entity Name" className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-6 italic">Taxation (GST)</label>
                                    <div className="relative group">
                                        <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-accent-yellow" />
                                        <input name="gst" type="text" required placeholder="05XXXXX..." className="block w-full bg-white/5 border border-white/5 group-hover:border-white/10 rounded-[28px] py-6 pl-16 pr-8 text-white focus:ring-4 focus:ring-accent-yellow/10 focus:border-accent-yellow/50 outline-none text-xs font-bold transition-all placeholder:text-gray-700" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-accent-yellow text-accent-black h-24 rounded-[32px] font-black uppercase text-[10px] tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_40px_80px_-20px_rgba(250,204,21,0.4)] active:scale-95 group"
                        >
                            Finalize Enrollment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-14 text-center pt-10 border-t border-white/5">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            Already Enrolled?{' '}
                            <Link to="/login" className="text-accent-yellow hover:text-white transition-colors italic ml-2">
                                Terminate Registration / Secure Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
