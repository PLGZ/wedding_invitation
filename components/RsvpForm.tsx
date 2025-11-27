import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { RsvpFormData, RELATIONSHIP_OPTIONS } from '../types';
import { submitRsvpToGoogleSheet } from '../services/googleSheetService';

// Minimalist Input Component
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
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-[#7C98B3] text-xs font-bold tracking-widest uppercase">{label}</label>
    {children ? children : (
      <input
        id={id}
        name={id}
        className="w-full py-2 bg-transparent border-b border-[#D3E0EF] focus:border-[#A9B9D0] outline-none text-[#5F6F8C] placeholder-[#C6C8CC] font-serif transition-colors"
        {...props}
      />
    )}
  </div>
);

export const RsvpForm: React.FC = () => {
  const initialFormState: RsvpFormData = {
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
  };

  const [formData, setFormData] = useState<RsvpFormData>(initialFormState);
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
    const success = await submitRsvpToGoogleSheet(formData);
    if (success) {
        setIsSuccess(true);
    } else {
        alert("Submission failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-[#D7C7A0] flex items-center justify-center text-[#D7C7A0]">
          <Check size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-script text-[#7C98B3] mb-2">Thank You</h2>
          <p className="text-sm font-serif text-[#5F6F8C]">我們已收到您的回覆</p>
        </div>
        <button 
          onClick={handleReset}
          className="text-xs text-[#A9B9D0] border-b border-[#A9B9D0] pb-0.5 hover:text-[#7C98B3]"
        >
          填寫另一份回函
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 h-full overflow-y-auto px-1">
      <h2 className="text-3xl font-script text-[#7C98B3] mb-2">RSVP</h2>
      <p className="text-xs text-[#A9B9D0] tracking-[0.2em] uppercase mb-8 font-serif">Please Join Us</p>

      <form onSubmit={handleSubmit} className="w-full space-y-8 pb-8">
        
        <InputField 
          label="Name 姓名" 
          id="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="請輸入全名"
        />

        <InputField 
          label="Phone 電話" 
          id="phone" 
          type="tel"
          value={formData.phone} 
          onChange={handleChange} 
          required 
          placeholder="09xx-xxx-xxx"
        />

        <InputField label="Relationship 關係" id="relationship" value={formData.relationship} onChange={handleChange}>
          <select
             name="relationship"
             id="relationship"
             value={formData.relationship}
             onChange={handleChange}
             className="w-full py-2 bg-transparent border-b border-[#D3E0EF] focus:border-[#A9B9D0] outline-none text-[#5F6F8C] font-serif"
          >
            {RELATIONSHIP_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </InputField>

        {/* Attendance - Custom Radio */}
        <div className="space-y-2 pt-2">
           <label className="text-[#7C98B3] text-xs font-bold tracking-widest uppercase block">Attendance 出席意願</label>
           <div className="flex gap-8 pt-1">
             {['yes', 'no'].map((val) => (
               <label key={val} className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-4 h-4 rounded-full border border-[#A9B9D0] flex items-center justify-center transition-colors ${formData.isAttending === val ? 'border-[#7C98B3]' : ''}`}>
                    {formData.isAttending === val && <div className="w-2 h-2 rounded-full bg-[#7C98B3]" />}
                 </div>
                 <input type="radio" name="isAttending" value={val} checked={formData.isAttending === val} onChange={handleChange} className="hidden" />
                 <span className={`text-sm font-serif ${formData.isAttending === val ? 'text-[#5F6F8C]' : 'text-[#9CA3AF]'}`}>
                   {val === 'yes' ? '準時出席' : '無法參加'}
                 </span>
               </label>
             ))}
           </div>
        </div>

        {formData.isAttending === 'yes' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6 pt-2 border-l border-[#D3E0EF] pl-4"
          >
             <div className="flex gap-4">
                <div className="flex-1">
                  <InputField label="Adults 大人" id="adultCount" value={formData.adultCount} onChange={handleChange}>
                     <input type="number" name="adultCount" min="1" className="w-full py-2 bg-transparent border-b border-[#D3E0EF] outline-none text-[#5F6F8C]" value={formData.adultCount} onChange={handleChange} />
                  </InputField>
                </div>
                <div className="flex-1">
                  <InputField label="Kids 兒童" id="childCount" value={formData.childCount} onChange={handleChange}>
                     <input type="number" name="childCount" min="0" className="w-full py-2 bg-transparent border-b border-[#D3E0EF] outline-none text-[#5F6F8C]" value={formData.childCount} onChange={handleChange} />
                  </InputField>
                </div>
             </div>

             <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="needsHighChair" checked={formData.needsHighChair} onChange={handleChange} className="accent-[#7C98B3]" />
                  <span className="text-sm font-serif text-[#7C8DA6]">需要兒童椅</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isVegetarian" checked={formData.isVegetarian} onChange={handleChange} className="accent-[#7C98B3]" />
                  <span className="text-sm font-serif text-[#7C8DA6]">需要素食</span>
                </label>
             </div>
          </motion.div>
        )}

        <div className="space-y-2">
           <label className="text-[#7C98B3] text-xs font-bold tracking-widest uppercase block">E-Invite 電子喜帖</label>
           <div className="flex gap-8 pt-1">
             {['yes', 'no'].map((val) => (
               <label key={val} className="flex items-center gap-2 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border border-[#A9B9D0] flex items-center justify-center ${formData.needsElectronicInvite === val ? 'border-[#7C98B3]' : ''}`}>
                    {formData.needsElectronicInvite === val && <div className="w-2 h-2 rounded-full bg-[#7C98B3]" />}
                 </div>
                 <input type="radio" name="needsElectronicInvite" value={val} checked={formData.needsElectronicInvite === val} onChange={handleChange} className="hidden" />
                 <span className={`text-sm font-serif ${formData.needsElectronicInvite === val ? 'text-[#5F6F8C]' : 'text-[#9CA3AF]'}`}>
                   {val === 'yes' ? '需要' : '不需要'}
                 </span>
               </label>
             ))}
           </div>
        </div>

        <InputField label="Note 備註" id="notes" value={formData.notes} onChange={handleChange}>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="..."
            className="w-full py-2 bg-transparent border-b border-[#D3E0EF] focus:border-[#A9B9D0] outline-none text-[#5F6F8C] font-serif resize-none"
          />
        </InputField>

        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[200px] py-3 bg-[#A9B9D0] text-white font-rounded tracking-widest text-sm hover:bg-[#98A8BF] transition-colors disabled:opacity-70 rounded-[1px]"
          >
             {isSubmitting ? (
               <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={16} /> SENDING</span>
             ) : (
               "送出回覆"
             )}
          </button>
        </div>

      </form>
    </div>
  );
};