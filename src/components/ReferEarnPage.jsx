import React, { useState } from 'react';
import ReferralModal from './ReferralModal';

const ReferEarnPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Refer & Earn Amazing Rewards
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Invite your friends to join our courses and earn exclusive rewards when they sign up!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-50 transition duration-300"
          >
            Refer Now
          </button>
        </div>
      </section>
      <ReferralModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ReferEarnPage;