import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        try {
            await api.post('/inquiries', data);
            setSuccess(true);
            reset();
        } catch (err) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">Contact Us for Bulk Orders</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Head Office</h3>
                        <div className="flex items-start gap-4 mb-4">
                            <MapPin className="text-secondary shrink-0" />
                            <p>123 Industrial Area, Phase 2, Business District, India 400001</p>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Phone className="text-secondary shrink-0" />
                            <p>+91 98765 43210</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-secondary shrink-0" />
                            <p>sales@anubhavtraders.com</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-lg">
                        <h3 className="font-bold text-primary mb-2">WhatsApp Support</h3>
                        <p className="text-sm mb-4">Instant response for stock check and delivery status.</p>
                        <button className="bg-green-500 text-white px-6 py-2 rounded font-bold w-full hover:bg-green-600 transition">
                            Chat on WhatsApp
                        </button>
                    </div>
                </div>

                {/* Inquiry Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Send Quote Inquiry</h2>
                    {success ? (
                        <div className="bg-green-100 text-green-800 p-4 rounded text-center">
                            Thank you! We have received your inquiry and will contact you within 24 hours.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Contact Name *</label>
                                    <input {...register('customer_name', { required: true })} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Company Name</label>
                                    <input {...register('company_name')} className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Email *</label>
                                    <input type="email" {...register('email', { required: true })} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Phone *</label>
                                    <input {...register('phone', { required: true })} className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Requirements / Message</label>
                                <textarea {...register('message')} rows="4" className="w-full border p-2 rounded" placeholder="Please specify product names and approximate quantities..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-gray-800 transition">
                                Submit Inquiry
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
