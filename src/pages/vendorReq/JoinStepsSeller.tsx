import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserPlus,
  FaEnvelopeOpenText,
  FaIdCard,
  FaBoxOpen,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

type StepInfo = {
  title: string;
  description: string;
  icon: React.ReactElement<IconType>;
};

const steps: StepInfo[] = [
  {
    title: 'Sign Up',
    description: 'Signup with your mobile or email',
    icon: <FaUserPlus />,
  },
  {
    title: 'Fill in Details',
    description: 'Provide your email & address info',
    icon: <FaEnvelopeOpenText />,
  },
  {
    title: 'Upload Documents',
    description: 'Add ID & bank information securely',
    icon: <FaIdCard />,
  },
  {
    title: 'Start Selling',
    description: 'Upload your products and go live',
    icon: <FaBoxOpen />,
  },
];

const JoinStepsSeller: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#6c27ff] to-[#a722f3] text-white py-12 px-4 sm:px-8 rounded-3xl shadow-2xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        How to Join?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white/10 border border-white/30 backdrop-blur-md p-6 rounded-2xl text-center hover:scale-105 hover:bg-white/20 transition-all"
          >
            <div className="text-4xl mb-4 text-yellow-300 animate-pulse">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-white/80">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default JoinStepsSeller;
