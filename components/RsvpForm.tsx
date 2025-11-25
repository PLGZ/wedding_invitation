import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Baby, Check, Loader2 } from 'lucide-react';
import { RsvpFormData, RELATIONSHIP_OPTIONS } from '../types';
import { submitRsvpToGoogleSheet } from '../services/googleSheetService';

const InputField: React.FC<{
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  children?: React.ReactNode;
}> = ({ label, id, children, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={id} className="text-purple-800 font-bold text-lg">{label}</label>
    {children ? children : (
      <input
        id={id}
        name={id}
        className="px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-purple-300 focus:ring focus:ring-purple-100 outline-none transition-all bg-white/80 backdrop-blur-sm text-slate-700"
        {...props}
      />
    )}
  </div>
);

export const RsvpForm: React.FC = () => {
  const [formData, setFormData] = useState<RsvpFormData>({
    name: '',
    phone: '',
    email: '',
    relationship: RELATIONSHIP_OPTIONS[0],
    isAttending: 'yes',
    needsElectronicInvite: 'yes',
    adultCount: 1,
    childCount: 0,
    needsHighChair: false,
    isVegetarian: false,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate slight delay for better UX if API is too fast/slow
    const success = await submitRsvpToGoogleSheet(formData);
    
    if (success) {
        setIsSuccess(true);
    } else {
        alert("傳送失敗，請稍後再試 (Submission failed, please try again)");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center border-4 border-double border-purple-100 max-w-lg mx-auto mt-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-handwriting text-purple-800 mb-4">感謝您的回覆！</h2>
        <p className="text-slate-600 mb-6">我們已收到您的資訊，期待與您相見。</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          填寫另一份 (Fill another)
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-white mt-8 relative overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-300 rounded-tl-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-300 rounded-br-3xl opacity-50"></div>

      <h2 className="text-3xl font-handwriting text-center text-purple-800 mb-8 flex items-center justify-center gap-2">
         <span className="text-amber-400">✨</span> 出席回函 RSVP <span className="text-amber-400">✨</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <InputField 
          label="您的姓名 (Name)" 
          id="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="請輸入全名"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="電話 (Phone)" 
            id="phone" 
            type="tel"
            value={formData.phone} 
            onChange={handleChange} 
            required 
            placeholder="09xx-xxx-xxx"
          />
          <InputField 
            label="電子信箱 (Email)" 
            id="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="example@mail.com"
          />
        </div>

        <InputField label="與新人的關係 (Relationship)" id="relationship" value={formData.relationship} onChange={handleChange}>
          <select
             name="relationship"
             id="relationship"
             value={formData.relationship}
             onChange={handleChange}
             className="px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-purple-300 outline-none w-full bg-white/80 text-slate-700"
          >
            {RELATIONSHIP_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </InputField>

        {/* Attendance Radios */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
           <label className="text-purple-800 font-bold text-lg block mb-3">是否參加喜宴？ (Attending?)</label>
           <div className="flex gap-6">
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="radio" name="isAttending" value="yes" checked={formData.isAttending === 'yes'} onChange={handleChange} className="w-5 h-5 text-purple-600 accent-purple-500" />
               <span className="text-slate-700">是，準時出席</span>
             </label>
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="radio" name="isAttending" value="no" checked={formData.isAttending === 'no'} onChange={handleChange} className="w-5 h-5 text-purple-600 accent-purple-500" />
               <span className="text-slate-700">否，遺憾無法參加</span>
             </label>
           </div>
        </div>

        {formData.isAttending === 'yes' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6"
          >
             <div className="grid grid-cols-2 gap-6">
                <InputField 
                  label="出席大人人數" 
                  id="adultCount" 
                  type="number" 
                  value={formData.adultCount} 
                  onChange={handleChange}
                  children={
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        name="adultCount" 
                        min="1" 
                        className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-blue-100 focus:border-purple-300 outline-none bg-white/80"
                        value={formData.adultCount}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <InputField 
                  label="出席兒童人數" 
                  id="childCount" 
                  type="number" 
                  value={formData.childCount} 
                  onChange={handleChange}
                  children={
                    <div className="relative">
                      <Baby className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        name="childCount" 
                        min="0" 
                        className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-blue-100 focus:border-purple-300 outline-none bg-white/80"
                        value={formData.childCount}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
             </div>

             <div className="flex flex-col sm:flex-row gap-6">
                <label className="flex items-center gap-3 cursor-pointer bg-white/50 p-3 rounded-xl border border-blue-50 flex-1 hover:bg-white transition">
                  <input 
                    type="checkbox" 
                    name="needsHighChair" 
                    checked={formData.needsHighChair} 
                    onChange={handleChange} 
                    className="w-5 h-5 rounded text-purple-600 accent-purple-500"
                  />
                  <span className="text-slate-700 font-medium">需要兒童座椅 (High Chair)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer bg-white/50 p-3 rounded-xl border border-blue-50 flex-1 hover:bg-white transition">
                  <input 
                    type="checkbox" 
                    name="isVegetarian" 
                    checked={formData.isVegetarian} 
                    onChange={handleChange} 
                    className="w-5 h-5 rounded text-purple-600 accent-purple-500"
                  />
                  <span className="text-slate-700 font-medium">需要素食 (Vegetarian)</span>
                </label>
             </div>
          </motion.div>
        )}

        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
           <label className="text-purple-800 font-bold text-lg block mb-3">是否需要電子喜帖？ (E-Invite?)</label>
           <div className="flex gap-6">
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="radio" name="needsElectronicInvite" value="yes" checked={formData.needsElectronicInvite === 'yes'} onChange={handleChange} className="w-5 h-5 text-purple-600 accent-purple-500" />
               <span className="text-slate-700">是 (Yes)</span>
             </label>
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="radio" name="needsElectronicInvite" value="no" checked={formData.needsElectronicInvite === 'no'} onChange={handleChange} className="w-5 h-5 text-purple-600 accent-purple-500" />
               <span className="text-slate-700">否 (No)</span>
             </label>
           </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="notes" className="text-purple-800 font-bold text-lg">備註 (Notes)</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            placeholder="有什麼想對我們說的話嗎？"
            className="px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-purple-300 outline-none transition-all bg-white/80 backdrop-blur-sm text-slate-700 resize-none"
          />
        </div>

        <div className="pt-4 pb-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
             {isSubmitting ? (
               <><Loader2 className="animate-spin mr-2" /> 傳送中...</>
             ) : (
               <><span className="mr-2">送出回覆</span> <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
             )}
          </button>
        </div>

      </form>
    </motion.div>
  );
};