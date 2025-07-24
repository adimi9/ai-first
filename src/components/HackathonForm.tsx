import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Plus, Trash2, Users, Lightbulb } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface TeamMember {
  name: string;
  email: string;
}

interface TeamLeader {
  name: string;
  email: string;
}

interface FormData {
  teamName: string;
  teamLeader: TeamLeader;
  teamMembers: TeamMember[]; // These are the *additional* optional members
  chosenProblemId: string;
  dataSource: 'standard' | 'own' | '';
}

// Define the problem statements as provided in the previous turn
const problemStatements = [
  {
    id: 'A',
    title: 'The Formal Meeting Cycle',
    input: '🎙️ Audio recording of official (closed) project meetings',
    workflow: '➡️ Transcript → Formal Minutes → Matters Arising',
    goal: '⚡ Drastically reduce time on admin, boost clarity & quality.',
  },
  {
    id: 'B',
    title: 'The Informal Meeting Cycle',
    input: '🎙️ Audio recording of informal team syncs or brainstorming sessions',
    workflow: '➡️ Transcript → Summary → Action Items → Draft Follow-up Email',
    goal: '🚀 Streamline meeting follow-ups, ensuring quick execution.',
  },
  {
    id: 'C',
    title: 'The Reporting Cycle',
    input: '📊 Anonymized G2E survey results (CSV)',
    workflow: '➡️ Analysis & Insights → Key Charts → Draft Summary Slides',
    goal: '💡 Rapidly transform raw data into decision-ready insights.',
  },
];

const HackathonForm = () => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamLeader: { name: '', email: '' }, // Team Leader is now distinct
    teamMembers: [], // Optional team members, initialized as empty
    chosenProblemId: '',
    dataSource: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<any>({});

  const validateForm = (): boolean => {
    const newErrors: any = {};

    // Validate Team Name (Compulsory)
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    // Validate Team Leader (Compulsory)
    const leaderErrors: any = {};
    if (!formData.teamLeader.name.trim()) {
      leaderErrors.name = 'Team leader name is required.';
    }
    if (!formData.teamLeader.email.trim()) {
      leaderErrors.email = 'Team leader email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.teamLeader.email)) {
      leaderErrors.email = 'Please enter a valid email address for the team leader.';
    }
    if (Object.keys(leaderErrors).length > 0) {
      newErrors.teamLeader = leaderErrors;
    }

    // Team members are NOT compulsory, so no validation needed here for their presence.
    // If you wanted to validate *if they are entered*, ensuring they are valid:
    const teamMemberErrors: any[] = [];
    formData.teamMembers.forEach((member, index) => {
      const memberErrors: any = {};
      if (member.name.trim() || member.email.trim()) { // Only validate if either field is entered
        if (!member.name.trim()) memberErrors.name = 'Name is required';
        if (!member.email.trim()) {
          memberErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(member.email)) {
          memberErrors.email = 'Please enter a valid email address';
        }
      }
      teamMemberErrors[index] = memberErrors;
    });
    // Add member errors to newErrors only if there are actual errors, not just empty optional fields
    if (teamMemberErrors.some(errors => Object.keys(errors).length > 0)) {
      newErrors.teamMembers = teamMemberErrors;
    }


    // Validate Chosen Problem ID (Compulsory)
    if (!formData.chosenProblemId) {
      newErrors.chosenProblemId = 'Problem statement title is required';
    }

    // Validate Data Source (Compulsory)
    if (!formData.dataSource) {
      newErrors.dataSource = 'Please select a data source.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error if validation fails
      const firstErrorElement = document.querySelector('.text-red-400');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const baseDocId = formData.teamName.trim().toLowerCase().replace(/\s+/g, '_');
      const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12);
      const finalDocId = `${baseDocId}-${timestamp}`;

      await setDoc(doc(db, 'hackathonSubmissions', finalDocId), {
        ...formData,
        submittedAt: new Date(),
      });

      setSubmitStatus('success');

      setTimeout(() => {
        setFormData({
          teamName: '',
          teamLeader: { name: '', email: '' },
          teamMembers: [],
          chosenProblemId: '',
          dataSource: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form to Firestore:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle general input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  // handle team leader specific changes
  const handleTeamLeaderChange = (field: keyof TeamLeader, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamLeader: { ...prev.teamLeader, [field]: value },
    }));
    if (errors.teamLeader && errors.teamLeader[field]) {
      setErrors((prev: any) => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [field]: undefined },
      }));
    }
  };

  // handle team member specific changes (for optional members)
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));

    if (errors.teamMembers && errors.teamMembers[index] && errors.teamMembers[index][field]) {
      const updatedErrors = { ...errors };
      updatedErrors.teamMembers[index] = { ...updatedErrors.teamMembers[index], [field]: undefined };
      setErrors(updatedErrors);
    }
  };

  // add a new team member
  const addTeamMember = () => {
    if (formData.teamMembers.length < 2) { // Max 2 additional members
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', email: '' }],
      }));
    }
  };

  // Remove a team member
  const removeTeamMember = (index: number) => {
    const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));

    if (errors.teamMembers) {
      const updatedErrors = { ...errors };
      updatedErrors.teamMembers = updatedErrors.teamMembers.filter((_: any, i: number) => i !== index);
      setErrors(updatedErrors);
    }
  };

  // Handle problem statement selection
  const handleProblemStatementSelect = (problemId: string) => {
    const selectedProblem = problemStatements.find((p) => p.id === problemId);
    setFormData((prev) => ({
      ...prev,
      chosenProblemId: problemId,
      problemStatementDetails: selectedProblem || null,
    }));
    if (errors.chosenProblemId) {
      setErrors((prev: any) => ({ ...prev, chosenProblemId: undefined }));
    }
  };

  const selectedProblemForDisplay = formData.chosenProblemId
    ? problemStatements.find((p) => p.id === formData.chosenProblemId)
    : null;

  // Determine if all compulsory fields are filled for enabling the submit button
  const areAllCompulsoryFieldsFilled = () => {
    // Check Team Name
    if (!formData.teamName.trim()) return false;

    // Check Team Leader
    if (!formData.teamLeader.name.trim() || !formData.teamLeader.email.trim() || !/\S+@\S+\.\S+/.test(formData.teamLeader.email)) return false;

    // Check Chosen Problem ID
    if (!formData.chosenProblemId) return false;

    // Check Data Source
    if (!formData.dataSource) return false;

    // If all checks pass, return true
    return true;
  };

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

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-300">Something went wrong. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-gray-700">
                <Users className="h-6 w-6 text-blue-400" />
                <h3 className="text-2xl font-semibold text-white">Team Details</h3>
              </div>

              {/* Team Name */}
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your team name (e.g., AI Innovators)"
                />
                {errors.teamName && <p className="mt-1 text-sm text-red-400">{errors.teamName}</p>}
              </div>

              {/* Team Leader */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Team Leader <span className="text-red-400">*</span></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.teamLeader.name}
                      onChange={(e) => handleTeamLeaderChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.teamLeader?.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.teamLeader.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.teamLeader.email}
                      onChange={(e) => handleTeamLeaderChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {errors.teamLeader?.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.teamLeader.email}</p>
                    )}
                  </div>
                </div>
              </div>


              {/* Additional Team Members (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Additional Team Members (max 2, optional)
                  </label>
                  {formData.teamMembers.length < 2 && (
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm">Add Member</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-300">Member {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          {errors.teamMembers && errors.teamMembers[index]?.name && (
                            <p className="mt-1 text-xs text-red-400">{errors.teamMembers[index].name}</p>
                          )}
                        </div>

                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={member.email}
                            onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          {errors.teamMembers && errors.teamMembers[index]?.email && (
                            <p className="mt-1 text-xs text-red-400">{errors.teamMembers[index].email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Selection Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-gray-700">
                <Lightbulb className="h-6 w-6 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">Your Problem to Solve</h3>
              </div>

              {/* Choose Problem Statement */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which problem will you be solving? <span className="text-red-400">*</span>
                  {errors.chosenProblemId && (
                    <span className="text-red-400 text-sm ml-2">{errors.chosenProblemId}</span>
                  )}
                </label>
                <div className="mt-2 space-y-3">
                  {problemStatements.map((p) => (
                    <div key={p.id} className="flex items-start">
                      <input
                        type="radio"
                        id={`problem-${p.id}`}
                        name="chosenProblemId"
                        value={p.id}
                        checked={formData.chosenProblemId === p.id}
                        onChange={() => handleProblemStatementSelect(p.id)}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded-full mt-1 cursor-pointer"
                      />
                      <label htmlFor={`problem-${p.id}`} className="ml-3 block text-sm text-gray-300 cursor-pointer">
                        <span className="font-semibold text-white">
                          Problem {p.id}: {p.title}
                        </span>
                        <p className="text-gray-400 text-xs italic">{p.goal}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display selected problem details (read-only) */}
              {selectedProblemForDisplay && (
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
                  <h4 className="text-lg font-semibold text-white">Selected Problem Details:</h4>
                  <div>
                    <p className="text-sm font-medium text-blue-400">Input:</p>
                    <p className="text-sm text-gray-300">{selectedProblemForDisplay.input}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400">Workflow:</p>
                    <p className="text-sm text-gray-300">{selectedProblemForDisplay.workflow}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-400">Goal:</p>
                    <p className="text-sm text-gray-300">{selectedProblemForDisplay.goal}</p>
                  </div>
                </div>
              )}

              {/* Data Source */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which data will you be working with? <span className="text-red-400">*</span>
                  {errors.dataSource && (
                    <span className="text-red-400 text-sm ml-2">{errors.dataSource}</span>
                  )}
                </label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="data-standard"
                      name="dataSource"
                      value="standard"
                      checked={formData.dataSource === 'standard'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded-full cursor-pointer"
                    />
                    <label htmlFor="data-standard" className="ml-3 block text-sm text-gray-300 cursor-pointer">
                      Standard Input Data (provided by organizers)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="data-own"
                      name="dataSource"
                      value="own"
                      checked={formData.dataSource === 'own'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded-full cursor-pointer"
                    />
                    <label htmlFor="data-own" className="ml-3 block text-sm text-gray-300 cursor-pointer">
                      Your Own Dataset (relevant to the problem)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success' || !db || !areAllCompulsoryFieldsFilled()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Joining...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully Joined!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Join the Sprint!</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HackathonForm;