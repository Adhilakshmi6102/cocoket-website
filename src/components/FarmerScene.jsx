import React from 'react';

const aW = '#c98b5f';
const aU = '#b07650';
const a_ = '#2a1c15';
const az = '#fdfbf6';
const aH = '#173b54';
const aY = '#48a9df';
const aX = '#10273a';
const aZ = '#8a5532';
const aq = '#6b3f22';
const aQ = '#fffdf7';
const aG = '#c9925b';
const aK = '#a26f3c';
const aJ = '#dfe8ee';
const a0 = '#9fb3c1';
const a1 = '#3fa37a';
const a2 = '#2f8a64';
const a5 = 'rgb(255 255 255 / 70%)';

const a8 = [378, 282];
const a7 = [306, 286];

function Nut({ cx, cy, r = 14 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={aZ} />
      <path
        d={`M${cx - 0.6 * r} ${cy - 0.2 * r} q${0.6 * r} ${-(0.5 * r)} ${1.2 * r} 0`}
        stroke={aq}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={cx - 0.25 * r} cy={cy + 0.2 * r} r={0.12 * r} fill={aq} />
      <circle cx={cx + 0.2 * r} cy={cy + 0.25 * r} r={0.12 * r} fill={aq} />
    </g>
  );
}

function HalfNut({ side }) {
  const e = +(side !== 'l');
  return (
    <g>
      <path d={`M0 -20 A20 20 0 0 ${e} 0 20 Z`} fill={aZ} />
      <path d={`M0 -15 A15 15 0 0 ${e} 0 15 Z`} fill={aQ} />
    </g>
  );
}

function Arm({ shoulder, shade = false, hand }) {
  const s = shade ? aU : aW;
  return (
    <g className={shade ? 'arm-back' : 'arm-front'} transform={`translate(${shoulder[0]} ${shoulder[1]})`}>
      <g className="upper">
        <rect x={-11} y={-6} width={22} height={76} rx={11} fill={s} />
        <rect x={-14} y={-12} width={28} height={36} rx={13} fill={az} />
        <g transform="translate(0 66)">
          <g className="fore">
            <rect x={-10} y={-4} width={20} height={70} rx={10} fill={s} />
            {hand}
            <circle cx={0} cy={66} r={12} fill={s} />
            <circle cx={9} cy={60} r={5} fill={s} />
          </g>
        </g>
      </g>
    </g>
  );
}

function FarmerBody() {
  return (
    <g className="farmer-body">
      <rect x={318} y={400} width={26} height={112} rx={12} fill="#245a80" />
      <rect x={342} y={400} width={26} height={112} rx={12} fill="#2c6a96" />
      <rect x={310} y={500} width={42} height={18} rx={9} fill={aX} />
      <rect x={338} y={502} width={48} height={18} rx={9} fill={aX} />
      <g className="farmer-upper">
        <path d="M300 290 Q300 266 322 264 L358 264 Q382 266 384 290 L388 410 Q388 420 378 420 L304 420 Q294 420 295 410 Z" fill={az} />
        <path d="M308 312 L380 312 L384 418 Q384 426 376 426 L308 426 Q300 426 300 418 Z" fill={aH} />
        <path d="M313 314 L326 268 M375 314 L360 268" stroke={aH} strokeWidth={6} strokeLinecap="round" />
        <rect x={322} y={364} width={40} height={26} rx={7} fill="rgb(255 255 255 / 10%)" />
        <circle cx={342} cy={338} r={10} fill={az} />
        <circle cx={342} cy={338} r={6} fill={aZ} />
        <circle cx={340} cy={336} r={2} fill={aQ} />
        <rect x={331} y={244} width={20} height={28} rx={8} fill={aU} />
        <g className="farmer-head">
          <circle cx={342} cy={218} r={36} fill={aW} />
          <circle cx={309} cy={222} r={8} fill={aU} />
          <path d="M306 216 Q302 180 340 177 Q380 176 381 208 Q366 196 348 198 Q328 201 316 214 Q311 218 306 216 Z" fill={a_} />
          <path d="M305 214 Q306 228 313 232 L315 214 Z" fill={a_} />
          <path d="M306 205 Q342 186 380 201 L380 211 Q342 197 307 215 Z" fill={aY} />
          <path d="M310 206 l-14 -4 l4 10 Z" fill={aY} />
          <path d="M346 211 q6 -3 12 0 M365 210 q6 -3 11 1" stroke={a_} strokeWidth={2.6} strokeLinecap="round" fill="none" />
          <g className="farmer-eyes">
            <ellipse cx={352} cy={222} rx={3.2} ry={4} fill="#1b1b1b" />
            <ellipse cx={370} cy={221} rx={3.2} ry={4} fill="#1b1b1b" />
          </g>
          <path d="M376 226 q5 5 -1 8" stroke={aU} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <path d="M354 238 q9 7 18 -1" stroke="#5a2e1e" strokeWidth={2.6} fill="none" strokeLinecap="round" />
          <circle cx={362} cy={234} r={5} fill="#e9876d" opacity={0.35} />
        </g>
      </g>
    </g>
  );
}

const bottlePath = "M590 338 L610 338 L610 356 Q624 362 624 378 L624 440 Q624 448 616 448 L584 448 Q576 448 576 440 L576 378 Q576 362 590 356 Z";

export const STAGES = [
  { n: "01", key: "pick", title: "Picked", text: "We start with ripe, mature coconuts — the creamiest kind there is." },
  { n: "02", key: "crack", title: "Cracked", text: "Each coconut is opened and its fresh white flesh is gently scraped out." },
  { n: "03", key: "press", title: "Pressed", text: "The flesh is pressed to release its rich, silky, naturally sweet milk." },
  { n: "04", key: "pour", title: "Poured", text: "Bottled with nothing extra added. Just coconut, ready to pour." }
];

export function FarmerScene({ active = 0 }) {
  return (
    <svg className="farmer-svg" viewBox="250 110 500 440" role="img" aria-label={`Illustration: stage ${STAGES[active].title}`}>
      <circle cx={500} cy={330} r={210} fill="rgb(255 255 255 / 10%)" />
      <circle cx={500} cy={330} r={168} fill="rgb(255 255 255 / 8%)" />
      <ellipse cx={500} cy={522} rx={250} ry={18} fill="rgb(8 60 110 / 22%)" />

      {/* Stage: Pick Background */}
      <g className={`stage s-pick${active === 0 ? ' is-active' : ''}`}>
        <path d="M612 520 C624 430 580 300 500 200" stroke={aK} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d="M612 520 C624 430 580 300 500 200" stroke={aG} strokeWidth={18} strokeLinecap="round" fill="none" strokeDasharray="10 16" />
        <g className="palm-crown">
          <path d="M500 196 Q450 150 392 170 Q450 168 500 204 Z" fill={a1} />
          <path d="M500 196 Q470 132 410 118 Q466 150 502 202 Z" fill={a2} />
          <path d="M500 196 Q530 128 596 120 Q540 152 504 204 Z" fill={a1} />
          <path d="M500 196 Q566 160 626 190 Q562 178 504 206 Z" fill={a2} />
          <path d="M500 198 Q540 210 566 262 Q528 222 498 206 Z" fill={a1} />
        </g>
        <Nut cx={506} cy={214} />
        <Nut cx={526} cy={208} />
        <g className="pick-tree-nut"><Nut cx={474} cy={192} /></g>
        <Arm shoulder={a7} shade={true} />
      </g>

      {/* Stage: Press Background */}
      <g className={`stage s-press${active === 2 ? ' is-active' : ''}`}>
        <rect x={494} y={296} width={14} height={194} rx={4} fill={a0} />
        <rect x={620} y={296} width={14} height={194} rx={4} fill={a0} />
        <rect x={488} y={292} width={152} height={14} rx={5} fill={aJ} />
        <rect x={510} y={378} width={104} height={110} rx={10} fill={a5} stroke={a0} strokeWidth={2} />
        <path d="M516 482 Q530 452 548 466 Q562 446 580 464 Q596 450 608 470 L608 482 Z" fill={aQ} />
        <g className="press-plate">
          <rect x={557} y={300} width={10} height={70} fill={a0} />
          <rect x={514} y={366} width={96} height={12} rx={4} fill={aJ} stroke={a0} strokeWidth={2} />
        </g>
        <rect x={476} y={488} width={176} height={32} rx={8} fill={aJ} />
        <path d="M614 452 H692 V462" stroke={a0} strokeWidth={8} fill="none" strokeLinecap="round" />
        <g className="press-drops">
          <ellipse cx={692} cy={474} rx={3.5} ry={5} fill="#fff" />
          <ellipse cx={692} cy={490} rx={3} ry={4.5} fill="#fff" />
        </g>
        <path d="M670 478 L716 478 L712 516 Q711 520 706 520 L680 520 Q675 520 674 516 Z" fill={a5} stroke={a0} strokeWidth={2} />
        <clipPath id="jug-clip">
          <path d="M671 479 L715 479 L711 516 L675 516 Z" />
        </clipPath>
        <g clipPath="url(#jug-clip)">
          <rect className="press-fill" x={668} y={486} width={50} height={34} fill="#fff" />
        </g>
        <Arm shoulder={a7} shade={true} />
      </g>

      {/* Stage: Pour Background */}
      <g className={`stage s-pour${active === 3 ? ' is-active' : ''}`}>
        <rect x={530} y={448} width={150} height={12} rx={4} fill={aG} />
        <rect x={542} y={460} width={10} height={60} rx={3} fill={aK} />
        <rect x={658} y={460} width={10} height={60} rx={3} fill={aK} />
        <clipPath id="bottle-clip">
          <path d={bottlePath} />
        </clipPath>
        <g clipPath="url(#bottle-clip)">
          <rect x={570} y={330} width={60} height={120} fill="rgb(255 255 255 / 35%)" />
          <rect className="pour-fill" x={570} y={360} width={60} height={90} fill="#fff" />
        </g>
        <path d={bottlePath} fill="none" stroke="#cfe3ef" strokeWidth={2.5} />
        <rect x={582} y={398} width={36} height={18} rx={3} fill={aY} opacity={0.9} />
        <rect x={638} y={436} width={22} height={12} rx={3} fill={aY} />
        <g className="pour-sparkle" fill="#fff">
          <path d="M640 360 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" />
          <path d="M566 372 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" />
        </g>
        <Arm shoulder={a7} shade={true} />
      </g>

      {/* Central Farmer */}
      <FarmerBody />

      {/* Foreground stage elements */}
      {/* Pick Foreground */}
      <g className={`stage s-pick${active === 0 ? ' is-active' : ''}`}>
        <g className="pick-basket-nut"><Nut cx={440} cy={446} r={13} /></g>
        <Nut cx={418} cy={452} r={13} />
        <Nut cx={460} cy={454} r={13} />
        <path d="M396 452 L484 452 L474 508 Q472 516 464 516 L416 516 Q408 516 406 508 Z" fill={aG} />
        <path d="M400 470 L480 470 M404 490 L476 490" stroke={aK} strokeWidth={3} />
        <g className="pick-falling-nut"><Nut cx={432} cy={403} /></g>
        <Arm shoulder={a8} hand={<g className="pick-hand-nut"><Nut cx={0} cy={72} /></g>} />
      </g>

      {/* Crack Foreground */}
      <g className={`stage s-crack${active === 1 ? ' is-active' : ''}`}>
        <path d="M478 438 L574 438 L580 512 Q580 520 570 520 L482 520 Q472 520 472 512 Z" fill={aK} />
        <ellipse cx={526} cy={438} rx={48} ry={11} fill={aG} />
        <ellipse cx={526} cy={438} rx={30} ry={6} fill="none" stroke={aK} strokeWidth={2} />
        <g className="crack-whole"><Nut cx={526} cy={416} r={20} /></g>
        <g transform="translate(526 418)">
          <g className="crack-half-l"><HalfNut side="l" /></g>
          <g className="crack-half-r"><HalfNut side="r" /></g>
        </g>
        <g className="crack-splash">
          <circle cx={510} cy={398} r={4} fill={aQ} />
          <circle cx={542} cy={396} r={3.5} fill={aQ} />
          <circle cx={526} cy={390} r={3} fill={aQ} />
          <circle cx={500} cy={410} r={2.5} fill={aQ} />
          <circle cx={552} cy={408} r={2.5} fill={aQ} />
        </g>
        <g className="crack-pow" stroke="#fff" strokeWidth={3} strokeLinecap="round">
          <path d="M482 380 l-14 -10 M570 380 l14 -10 M526 366 v-16" />
        </g>
        <Arm
          shoulder={a8}
          hand={
            <g>
              <rect x={-4} y={66} width={8} height={58} rx={3} fill={aG} />
              <rect x={-24} y={116} width={48} height={28} rx={7} fill={aK} />
              <rect x={-24} y={116} width={10} height={28} rx={4} fill="#8a5a2f" />
            </g>
          }
        />
      </g>

      {/* Press Foreground */}
      <g className={`stage s-press${active === 2 ? ' is-active' : ''}`}>
        <g transform="translate(627.6 301.5)">
          <g className="press-lever">
            <path d="M0 0 L-122 -53.7" stroke={aJ} strokeWidth={10} strokeLinecap="round" />
            <circle cx={-122} cy={-53.7} r={9} fill={aY} />
            <circle cx={0} cy={0} r={8} fill={a0} />
          </g>
        </g>
        <Arm shoulder={a8} />
      </g>

      {/* Pour Foreground */}
      <g className={`stage s-pour${active === 3 ? ' is-active' : ''}`}>
        <path className="pour-stream" d="M574 309 C590 300 601 316 600 338" stroke="#fff" strokeWidth={6} strokeLinecap="round" fill="none" pathLength={1} />
        <g transform="translate(510 280)">
          <g className="pour-jug">
            <path d="M10 -18 C-8 -18 -8 18 10 18" stroke="#e6eef3" strokeWidth={7} fill="none" />
            <path d="M10 -32 L56 -32 L64 -40 L67 -34 L60 -26 L60 26 Q60 34 52 34 L18 34 Q10 34 10 26 Z" fill="#f4f8fb" stroke="#c4d9e6" strokeWidth={2} />
            <path d="M14 -12 H56" stroke="#dbe8f0" strokeWidth={2} />
          </g>
        </g>
        <Arm shoulder={a8} />
      </g>
    </svg>
  );
}
