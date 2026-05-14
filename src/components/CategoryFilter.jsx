import React from 'react';

import { CATEGORIES } from '../data/mockData';

const CategoryFilter = ({selected,onSelect }) => {
  
  return (

    <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-hide">

      {CATEGORIES.map((category) => (

        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`
            relative overflow-hidden px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap border transition-all duration-300

            ${
              selected === category

                ? "bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 text-white border-transparent shadow-lg shadow-pink-500/30 scale-105"

                : "bg-[#0f172a]/80 text-gray-400 border-white/5 hover:border-cyan-500/20 hover:text-white hover:bg-white/5 hover:scale-105"
            }
          `}
        >

          {/* ACTIVE GLOW */}

          {selected === category && (

            <div className="absolute inset-0 bg-white/10 blur-2xl"></div>

          )}

          {/* TEXT */}

          <span className="relative z-10">

            {category}

          </span>

        </button>

      ))}

    </div>

  );

};

export default CategoryFilter;