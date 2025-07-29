"use client";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold mb-12 text-center">
        About Us — Proud Students at WeThinkCode
      </h1>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {/* Sticker 1 */}
        <div className="bg-indigo-800/90 backdrop-blur-md rounded-xl p-8 shadow-lg border-4 border-indigo-600 
          hover:bg-purple-600 hover:border-pink-400 transition-colors duration-300 cursor-default">
          <h2 className="text-2xl font-semibold mb-4">Bootcamps for AI & Beginner Programming</h2>
          <p className="text-indigo-200">
            We offer immersive bootcamps that empower students to master Artificial Intelligence and beginner programming skills with real projects and hands-on learning.
          </p>
        </div>

        {/* Sticker 2 */}
        <div className="bg-indigo-800/90 backdrop-blur-md rounded-xl p-8 shadow-lg border-4 border-indigo-600 
          hover:bg-purple-600 hover:border-pink-400 transition-colors duration-300 cursor-default">
          <h2 className="text-2xl font-semibold mb-4">Industry Onboarding & Interview Readiness</h2>
          <p className="text-indigo-200">
            Our programs prepare you for the tech industry with onboarding support, interview readiness workshops, and career mentorship to help you succeed.
          </p>
        </div>

        {/* Sticker 3 */}
        <div className="bg-indigo-800/90 backdrop-blur-md rounded-xl p-8 shadow-lg border-4 border-indigo-600 
          hover:bg-purple-600 hover:border-pink-400 transition-colors duration-300 cursor-default">
          <h2 className="text-2xl font-semibold mb-4">Proud Advocates of Women Empowerment</h2>
          <p className="text-indigo-200">
            We stand proud in supporting women empowerment initiatives, creating an inclusive environment where everyone can thrive in tech.
          </p>
        </div>
      </div>
    </main>
  );
}
