import React from 'react';

const WinFormula = () => {
  return (
    <section className="bg-gray-950 text-white px-6 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Win Formula
          </h2>
          <p className="text-lg text-gray-300">
            Here’s how we’ll identify the most impactful AI-First workflows.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 border border-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Criteria</th>
                <th className="px-4 py-3 font-semibold">Weight</th>
                <th className="px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-medium text-white">Quality & Accuracy of Output</td>
                <td className="px-4 py-3">30%</td>
                <td className="px-4 py-3">How insightful, relevant, and correct is the final product?</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-medium text-white">Productivity Gain (Time Saved)</td>
                <td className="px-4 py-3">30%</td>
                <td className="px-4 py-3">How much faster is this workflow compared to the manual baseline?</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-medium text-white">Officers’ Choice</td>
                <td className="px-4 py-3">30%</td>
                <td className="px-4 py-3">Would you use this workflow?</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-medium text-white">Cross-Divisional Collaboration</td>
                <td className="px-4 py-3">10%</td>
                <td className="px-4 py-3">Was this idea co-developed across different teams?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-left space-y-4 text-gray-300">
          <p>
            <strong className="text-white">Live “competition” at Closers every month</strong> — participants will showcase their solution in 3 minutes. 
            (A preliminary round may be required if participation is overwhelming — but that’s a good problem!)
          </p>
          <p className="pt-4">
            <strong className="text-white text-lg">🏆 Prizes:</strong><br />
            • $200 GovWallet credit<br />
            • 2 Days Off
          </p>
        </div>
      </div>
    </section>
  );
};

export default WinFormula;
