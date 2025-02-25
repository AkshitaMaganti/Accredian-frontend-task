import React, { useState } from 'react';

const ReferralModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    course: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.referrerName) tempErrors.referrerName = 'Name is required';
    if (!formData.referrerEmail || !/\S+@\S+\.\S+/.test(formData.referrerEmail))
      tempErrors.referrerEmail = 'Valid email is required';
    if (!formData.refereeName) tempErrors.refereeName = 'Name is required';
    if (!formData.refereeEmail || !/\S+@\S+\.\S+/.test(formData.refereeEmail))
      tempErrors.refereeEmail = 'Valid email is required';
    if (!formData.course) tempErrors.course = 'Course selection is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Referral submitted successfully!');
          onClose();
          setFormData({
            referrerName: '',
            referrerEmail: '',
            refereeName: '',
            refereeEmail: '',
            course: '',
          });
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.error });
        }
      } catch (error) {
        setErrors({ submit: 'Network error occurred' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Refer a Friend</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.referrerName}
              onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
            />
            {errors.referrerName && (
              <span className="text-red-500 text-sm mt-1">{errors.referrerName}</span>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.referrerEmail}
              onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
            />
            {errors.referrerEmail && (
              <span className="text-red-500 text-sm mt-1">{errors.referrerEmail}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Friend's Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.refereeName}
              onChange={(e) => setFormData({ ...formData, refereeName: e.target.value })}
            />
            {errors.refereeName && (
              <span className="text-red-500 text-sm mt-1">{errors.refereeName}</span>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Friend's Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.refereeEmail}
              onChange={(e) => setFormData({ ...formData, refereeEmail: e.target.value })}
            />
            {errors.refereeEmail && (
              <span className="text-red-500 text-sm mt-1">{errors.refereeEmail}</span>
            )}
          </div>
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="">Select a Course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
            {errors.course && (
              <span className="text-red-500 text-sm mt-1">{errors.course}</span>
            )}
          </div>
          {errors.submit && (
            <span className="text-red-500 text-sm block">{errors.submit}</span>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Submit Referral
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralModal;