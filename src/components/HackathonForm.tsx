import React, { useState } from 'react';
import { Send, CheckCircle, Plus, Trash2 } from 'lucide-react';

const problemStatements = [
  {
    id: 'A',
    title: 'The Formal Meeting Cycle',
    input: '🎙️ Audio recording of official (closed) project meetings',
    workflow: '➡️ Transcript → Formal Minutes → Matters Arising',
    goal: '⚡ Drastically reduce time on admin, boost clarity & quality.'
  },
  {
    id: 'B',
    title: 'The Informal Meeting Cycle',
    input: '🎙️ Audio recording of informal team syncs or brainstorming sessions',
    workflow: '➡️ Transcript → Summary → Action Items → Draft Follow-up Email',
    goal: '🚀 Streamline meeting follow-ups, ensuring quick execution.'
  },
  {
    id: 'C',
    title: 'The Reporting Cycle',
    input: '📊 Anonymized G2E survey results (CSV)',
    workflow: '➡️ Analysis & Insights → Key Charts → Draft Summary Slides',
    goal: '💡 Rapidly transform raw data into decision-ready insights.'
  },
];

const HackathonForm = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    teamMembers: [{ name: '', role: 'Team Leader', email: '' }],
    chosenProblemId: '',
    dataSource: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const members = [...formData.teamMembers];
    members[index][field] = value;
    setFormData(prev => ({ ...prev, teamMembers: members }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 3) {
      setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, { name: '', role: '', email: '' }] }));
    }
  };

  const removeTeamMember = (index) => {
    const updated = formData.teamMembers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('success');
  };

  const selectedProblem = problemStatements.find(p => p.id === formData.chosenProblemId);

  return (
    <section id="hackathon" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">🚀 Join the AI Sprint 1!</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Form your team, select a challenge, and get ready to innovate with AI at SCG.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-300">Successfully submitted! We'll be in touch soon.</span>
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 p-8 rounded-xl border border-gray-700">
          <div>
            <label className="block mb-2">Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
              placeholder="Enter your team name"
            />
          </div>

          <div>
            <label className="block mb-2">Team Members</label>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="mb-4 space-y-2 border border-gray-700 p-4 rounded-md">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                {index !== 0 && (
                  <button type="button" onClick={() => removeTeamMember(index)} className="text-red-400 text-sm">Remove</button>
                )}
              </div>
            ))}
            {formData.teamMembers.length < 3 && (
              <button type="button" onClick={addTeamMember} className="text-blue-400 mt-2 flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Member
              </button>
            )}
          </div>

          <div>
            <label className="block mb-2">Choose a Problem Statement</label>
            {problemStatements.map((p) => (
              <div key={p.id} className="mb-2">
                <input
                  type="radio"
                  id={`problem-${p.id}`}
                  name="chosenProblemId"
                  value={p.id}
                  checked={formData.chosenProblemId === p.id}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={`problem-${p.id}`} className="text-white cursor-pointer">
                  <strong>Problem {p.id}:</strong> {p.title}
                </label>
              </div>
            ))}

            {selectedProblem && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg space-y-2 border border-gray-700">
                <p><strong>Input:</strong> {selectedProblem.input}</p>
                <p><strong>Workflow:</strong> {selectedProblem.workflow}</p>
                <p><strong>Goal:</strong> {selectedProblem.goal}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2">Data Source</label>
            <div className="space-y-2">
              <label>
                <input
                  type="radio"
                  name="dataSource"
                  value="standard"
                  checked={formData.dataSource === 'standard'}
                  onChange={handleChange}
                  className="mr-2"
                /> Standard Input Data
              </label>
              <label>
                <input
                  type="radio"
                  name="dataSource"
                  value="own"
                  checked={formData.dataSource === 'own'}
                  onChange={handleChange}
                  className="mr-2"
                /> Your Own Dataset
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" /> Join the Sprint
          </button>
        </form>
      </div>
      </div>
    </section>
  );
};

export default HackathonForm;
