// "use client";

// import { useState } from "react";
// import StepBasic from "./StepBasic";
// import StepPricing from "./StepPricing";
// import StepMedia from "./StepMedia";
// import StepAddons from "./StepAddons";
// import StepReview from "./StepReview";

// const steps = ["Basic", "Pricing", "Media", "Add-ons", "Review"];

// export default function NewServicePage() {
//   const [step, setStep] = useState(0);

//   return (
//     <main className="min-h-screen bg-[#F7F7FB] pt-24 pb-32">
//       <div className="max-w-4xl mx-auto px-6">

//         {/* Progress */}
//         <div className="mb-10">
//           <div className="flex justify-between text-sm mb-2">
//             {steps.map((s, i) => (
//               <span
//                 key={s}
//                 className={i <= step ? "text-black" : "text-gray-400"}
//               >
//                 {s}
//               </span>
//             ))}
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-black rounded-full transition-all"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Step Content */}
//         {step === 0 && <StepBasic />}
//         {step === 1 && <StepPricing />}
//         {step === 2 && <StepMedia />}
//         {step === 3 && <StepAddons />}
//         {step === 4 && <StepReview />}

//         {/* Controls */}
//         <div className="mt-10 flex justify-between">
//           <button
//             disabled={step === 0}
//             onClick={() => setStep(step - 1)}
//             className="px-6 py-3 rounded-full border"
//           >
//             Back
//           </button>

//           <button
//             onClick={() => setStep(step + 1)}
//             className="px-6 py-3 rounded-full bg-black text-white"
//           >
//             {step === steps.length - 1 ? "Publish Service" : "Continue"}
//           </button>
//         </div>

//       </div>
//     </main>
//   );
// }
