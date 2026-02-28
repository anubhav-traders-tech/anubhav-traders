import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        try {
            await api.post('/inquiries', data);
            setSuccess(true);
            reset();
        } catch (err) {
            console.error(err);
            alert("There was an error sending your inquiry. Please try again.");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact & Inquiry</h1>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Looking for bulk orders, dealership opportunities, or have a general query? Get in touch with our team today.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mr-4 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Company Address</h3>
                                    <p className="text-slate-600">Main Market, Vikasnagar, Uttarakhand, 248198</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mr-4 shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Phone / WhatsApp</h3>
                                    <p className="text-slate-600">+91-XXXXXXXXXX</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mr-4 shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Email Address</h3>
                                    <p className="text-slate-600">sales@anubhavtraders.com</p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center group transition-colors hover:bg-green-100">
                            <MessageSquare className="w-10 h-10 text-green-600 mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Instant WhatsApp Support</h3>
                            <p className="text-slate-600 text-sm mb-6">Retailers: check real-time availability for rapid dispatch.</p>
                            <a href="#" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow-sm transition-colors">
                                Chat Now
                            </a>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>

                            {success ? (
                                <div className="text-center py-16 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                        <Send className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Sent Successfully!</h3>
                                    <p className="text-slate-600 mb-8">Our sales team will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                    >
                                        Send another inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                            <input
                                                {...register('customer_name', { required: true })}
                                                className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company / Shop Name</label>
                                            <input
                                                {...register('company_name')}
                                                className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Your Business Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                {...register('email', { required: true })}
                                                className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                                            <input
                                                {...register('phone', { required: true })}
                                                className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="+91 XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Inquiry</label>
                                        <textarea
                                            {...register('message')}
                                            rows="5"
                                            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Please specify products, quantities, or dealership inquiries here..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                                    >
                                        Send Inquiry <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
