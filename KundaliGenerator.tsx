/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PlanetaryPosition } from '../types';

interface KundaliChartProps {
  placements: PlanetaryPosition[];
  ascendant: string;
}

export default function KundaliChart({ placements, ascendant }: KundaliChartProps) {
  const [chartStyle, setChartStyle] = useState<'North' | 'South'>('North');

  // Group planets by house for easy rendering
  const planetsByHouse: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) {
    planetsByHouse[i] = [];
  }

  // Map planetary symbols
  const planetSymbols: Record<string, string> = {
    'Sun (Surya)': 'Su',
    'Moon (Chandra)': 'Mo',
    'Mars (Mangal)': 'Ma',
    'Mercury (Budha)': 'Me',
    'Jupiter (Guru)': 'Ju',
    'Venus (Shukra)': 'Ve',
    'Saturn (Shani)': 'Sa',
    'Rahu (North Node)': 'Ra',
    'Ketu (South Node)': 'Ke',
  };

  placements.forEach((p) => {
    const symbol = planetSymbols[p.planet] || p.planet.substring(0, 2);
    if (p.house >= 1 && p.house <= 12) {
      planetsByHouse[p.house].push(symbol);
    }
  });

  // Always put the Ascendant (Lagna) in House 1
  planetsByHouse[1].unshift('Lg');

  // North Indian Diamond Chart House Centers (for 400x400 SVG)
  const northHouseCoords: Record<number, { x: number; y: number; numX: number; numY: number }> = {
    1: { x: 200, y: 135, numX: 200, numY: 170 },  // Center Top
    2: { x: 110, y: 70, numX: 145, numY: 95 },   // Top Left
    3: { x: 70, y: 110, numX: 95, numY: 145 },   // Left Top
    4: { x: 135, y: 200, numX: 170, numY: 200 },  // Center Left
    5: { x: 70, y: 290, numX: 95, numY: 255 },   // Left Bottom
    6: { x: 110, y: 330, numX: 145, numY: 305 },  // Bottom Left
    7: { x: 200, y: 265, numX: 200, numY: 230 },  // Center Bottom
    8: { x: 290, y: 330, numX: 255, numY: 305 },  // Bottom Right
    9: { x: 330, y: 290, numX: 305, numY: 255 },  // Right Bottom
    10: { x: 265, y: 200, numX: 230, numY: 200 }, // Center Right
    11: { x: 330, y: 110, numX: 305, numY: 145 }, // Right Top
    12: { x: 290, y: 70, numX: 255, numY: 95 },   // Top Right
  };

  // South Indian Grid Layout mapping (12 boxes around a central square)
  const southBoxCoords = [
    { r: 0, c: 1, name: 'Aries' },      // 1: Top, col 1
    { r: 0, c: 2, name: 'Taurus' },     // 2: Top, col 2
    { r: 0, c: 3, name: 'Gemini' },     // 3: Top, col 3
    { r: 1, c: 3, name: 'Cancer' },     // 4: Right, row 1
    { r: 2, c: 3, name: 'Leo' },        // 5: Right, row 2
    { r: 3, c: 3, name: 'Virgo' },      // 6: Bottom, col 3
    { r: 3, c: 2, name: 'Libra' },      // 7: Bottom, col 2
    { r: 3, c: 1, name: 'Scorpio' },    // 8: Bottom, col 1
    { r: 3, c: 0, name: 'Sagittarius' },// 9: Bottom, col 0
    { r: 2, c: 0, name: 'Capricorn' },  // 10: Left, row 2
    { r: 1, c: 0, name: 'Aquarius' },   // 11: Left, row 1
    { r: 0, c: 0, name: 'Pisces' },     // 12: Top, col 0
  ];

  const getSouthPlanetsInSign = (signName: string) => {
    const list: string[] = [];
    if (ascendant.includes(signName.split(' ')[0])) {
      list.push('Asc/Lg');
    }
    placements.forEach((p) => {
      if (p.sign.includes(signName.split(' ')[0])) {
        const sym = planetSymbols[p.planet] || p.planet.substring(0, 2);
        list.push(sym);
      }
    });
    return list;
  };

  return (
    <div id="kundali-chart" className="bg-white border border-orange-200 p-6 rounded-3xl shadow-md flex flex-col items-center w-full max-w-sm">
      <div className="flex gap-2 mb-6">
        <button
          id="btn-north"
          onClick={() => setChartStyle('North')}
          className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
            chartStyle === 'North'
              ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
              : 'bg-white text-stone-600 border-orange-200 hover:border-orange-400 hover:bg-orange-50/10'
          }`}
        >
          North Indian Style (Diamond)
        </button>
        <button
          id="btn-south"
          onClick={() => setChartStyle('South')}
          className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
            chartStyle === 'South'
              ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
              : 'bg-white text-stone-600 border-orange-200 hover:border-orange-400 hover:bg-orange-50/10'
          }`}
        >
          South Indian Style (Grid)
        </button>
      </div>

      <div className="relative w-full aspect-square rounded-2xl bg-orange-50/20 p-2 border border-orange-200 shadow-inner flex items-center justify-center">
        {chartStyle === 'North' ? (
          // North Indian Diamond Chart SVG
          <svg viewBox="0 0 400 400" className="w-full h-full text-stone-850 font-sans" stroke="#ea580c" strokeWidth="2.2" fill="none">
            {/* Outer Boundary */}
            <rect x="10" y="10" width="380" height="380" rx="6" stroke="#f97316" strokeWidth="3" />

            {/* Inner Diagonals */}
            <line x1="10" y1="10" x2="390" y2="390" />
            <line x1="390" y1="10" x2="10" y2="390" />

            {/* Inner Diamond */}
            <line x1="200" y1="10" x2="390" y2="200" />
            <line x1="390" y1="200" x2="200" y2="390" />
            <line x1="200" y1="390" x2="10" y2="200" />
            <line x1="10" y1="200" x2="200" y2="10" />

            {/* Render Houses Labels & Planets */}
            {Object.entries(northHouseCoords).map(([houseStr, coords]) => {
              const houseNum = parseInt(houseStr);
              const pList = planetsByHouse[houseNum] || [];

              return (
                <g key={houseNum}>
                  {/* House Number (subtle background label) */}
                  <text
                    x={coords.numX}
                    y={coords.numY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#c2410c"
                    fontSize="11"
                    fontWeight="bold"
                    opacity="0.8"
                    stroke="none"
                  >
                    {houseNum}
                  </text>

                  {/* Planet Text List */}
                  {pList.length > 0 && (
                    <text
                      x={coords.x}
                      y={coords.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1c1917"
                      fontSize="13"
                      fontWeight="700"
                      stroke="none"
                    >
                      {/* Distribute planets in lines if there are multiple */}
                      {pList.length <= 2 ? (
                        pList.join(' ')
                      ) : (
                        <>
                          <tspan x={coords.x} dy="-6">{pList.slice(0, 2).join(' ')}</tspan>
                          <tspan x={coords.x} dy="14">{pList.slice(2).join(' ')}</tspan>
                        </>
                      )}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        ) : (
          // South Indian Grid Layout SVG
          <svg viewBox="0 0 400 400" className="w-full h-full text-stone-850 font-sans" stroke="#ea580c" strokeWidth="2.5" fill="none">
            {/* Outer Boundary */}
            <rect x="10" y="10" width="380" height="380" rx="6" stroke="#f97316" strokeWidth="3" />

            {/* Grid Lines */}
            {/* Horizontal lines */}
            <line x1="10" y1="105" x2="390" y2="105" />
            <line x1="10" y1="200" x2="390" y2="200" />
            <line x1="10" y1="295" x2="390" y2="295" />

            {/* Vertical lines */}
            <line x1="105" y1="10" x2="105" y2="390" />
            <line x1="200" y1="10" x2="200" y2="390" />
            <line x1="295" y1="10" x2="295" y2="390" />

            {/* Mask central 2x2 grid lines since it should be an empty center */}
            <rect x="106" y="106" width="188" height="188" fill="#ffffff" stroke="none" />
            <rect x="105" y="105" width="190" height="190" stroke="#f97316" strokeWidth="2" />

            {/* Central Text */}
            <text
              x="200"
              y="185"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ea580c"
              fontSize="14"
              fontWeight="bold"
              stroke="none"
            >
              LAGNA
            </text>
            <text
              x="200"
              y="215"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#7c2d12"
              fontSize="12"
              fontWeight="700"
              stroke="none"
            >
              {ascendant.split(' ')[0]}
            </text>

            {/* Render 12 Zodiac Box Cells */}
            {southBoxCoords.map((box, idx) => {
              const x = 10 + box.c * 95;
              const y = 10 + box.r * 95;
              const pList = getSouthPlanetsInSign(box.name);

              return (
                <g key={idx}>
                  {/* Subtle Sign Code in the corner */}
                  <text
                    x={x + 8}
                    y={y + 18}
                    fill="#c2410c"
                    fontSize="9"
                    fontWeight="bold"
                    opacity="0.9"
                    stroke="none"
                  >
                    {box.name.substring(0, 3).toUpperCase()}
                  </text>

                  {/* Planet listings */}
                  {pList.length > 0 && (
                    <text
                      x={x + 47.5}
                      y={y + 55}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1c1917"
                      fontSize="12"
                      fontWeight="700"
                      stroke="none"
                    >
                      {pList.length <= 2 ? (
                        pList.join(' ')
                      ) : (
                        <>
                          <tspan x={x + 47.5} dy="-6">{pList.slice(0, 2).join(' ')}</tspan>
                          <tspan x={x + 47.5} dy="13">{pList.slice(2).join(' ')}</tspan>
                        </>
                      )}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-stone-600 text-center font-medium">
        <span><strong className="text-orange-600">Lg:</strong> Ascendant</span>
        <span><strong className="text-orange-600">Su:</strong> Sun</span>
        <span><strong className="text-orange-600">Mo:</strong> Moon</span>
        <span><strong className="text-orange-600">Ma:</strong> Mars</span>
        <span><strong className="text-orange-600">Me:</strong> Mercury</span>
        <span><strong className="text-orange-600">Ju:</strong> Jupiter</span>
        <span><strong className="text-orange-600">Ve:</strong> Venus</span>
        <span><strong className="text-orange-600">Sa:</strong> Saturn</span>
        <span><strong className="text-orange-600">Ra:</strong> Rahu</span>
        <span><strong className="text-orange-600">Ke:</strong> Ketu</span>
      </div>
    </div>
  );
}
