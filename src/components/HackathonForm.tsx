import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Plus, Trash2, Users, Lightbulb, Database } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Declare global variables for TypeScript
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

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

// Interface for a single team member
interface TeamMember {
  name: string;
  role: string; // Role for all members
  email: string;
}

// Interface for the entire form data
interface FormData {
  teamName: string;
  teamMembers: TeamMember[]; // First member is the leader
  chosenProblemId: string; // ID of the selected problem (A, B, or C)
  problemStatementDetails: { // Store full details of chosen problem for submission
    id: string;
    title: string;
    input: string;
    workflow: string;
    goal: string;
  } | null;
  dataSource: 'standard' | 'own' | ''; // New field for data source
}

const HackathonForm = () => {
  // State for Firebase and Auth
  const [db, setDb] = useState<any>(null);
  const [auth, setAuth] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null); // User ID for Firestore path

  // Firebase Initialization and Auth
  useEffect(() => {
    try {
      // Access global variables provided by the environment
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      if (Object.keys(firebaseConfig).length === 0) {
        console.error("Firebase config is not provided. Cannot initialize Firebase.");
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      // Sign in with custom token or anonymously
      const signIn = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
        }
      };

      signIn();

      // Listen for auth state changes to get the user ID
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          // If for some reason the user logs out or token expires, generate a random ID
          setUserId(crypto.randomUUID());
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();

    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
    }
  }, []); // Run only once on component mount

  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamMembers: [{ name: '', role: 'Team Leader', email: '' }], // First member is leader
    chosenProblemId: '',
    problemStatementDetails: null,
    dataSource: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<any>({});

  // Function to validate the form
  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required.';
    if (!formData.chosenProblemId) newErrors.chosenProblemId = 'Please select a problem statement.';
    if (!formData.dataSource) newErrors.dataSource = 'Please select your data source.';

    // Validate team members (Leader + up to 2 members)
    const teamMemberErrors: any[] = [];
    formData.teamMembers.forEach((member, index) => {
      const memberErrors: any = {};
      if (!member.name.trim()) memberErrors.name = 'Name is required.';
      if (!member.role.trim()) memberErrors.role = 'Role is required.';
      if (!member.email.trim()) {
        memberErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(member.email)) {
        memberErrors.email = 'Please enter a valid email address.';
      }
      teamMemberErrors[index] = memberErrors;
    });

    if (teamMemberErrors.some(errors => Object.keys(errors).length > 0)) {
      newErrors.teamMembers = teamMemberErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!db || !userId) {
      console.error("Firestore not initialized or user not authenticated.");
      setSubmitStatus('error');
      return;
    }

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Normalize team name and build custom doc ID
      const baseDocId = formData.teamName.trim().toLowerCase().replace(/\s+/g, '_');
      const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12); // e.g. 202506251405
      const finalDocId = `${baseDocId}-${timestamp}`;

      // Determine the Firestore collection path
      // For private data, use /artifacts/{appId}/users/{userId}/{your_collection_name}
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const collectionPath = `artifacts/${appId}/users/${userId}/hackathonSubmissions`;

      // Save to Firestore
      await setDoc(doc(db, collectionPath, finalDocId), {
        ...formData,
        submittedAt: new Date(),
        // Ensure problemStatementDetails is correctly set at submission
        problemStatementDetails: problemStatements.find(p => p.id === formData.chosenProblemId) || null,
        // Store the actual userId for reference
        submittedByUserId: userId
      });

      setSubmitStatus('success');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          teamName: '',
          teamMembers: [{ name: '', role: 'Team Leader', email: '' }],
          chosenProblemId: '',
          problemStatementDetails: null,
          dataSource: '',
        });
        setSubmitStatus('idle');
        setErrors({}); // Clear errors on successful reset
      }, 3000);

    } catch (error) {
      console.error("Error submitting form to Firestore:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle general input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle team member specific changes
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));

    // Clear team member errors when user starts typing
    if (errors.teamMembers && errors.teamMembers[index] && errors.teamMembers[index][field]) {
      const updatedErrors = { ...errors };
      updatedErrors.teamMembers[index] = { ...updatedErrors.teamMembers[index], [field]: undefined };
      setErrors(updatedErrors);
    }
  };

  // Add a new team member
  const addTeamMember = () => {
    // Max 3 members total (1 leader + 2 members)
    if (formData.teamMembers.length < 3) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', role: '', email: '' }]
      }));
    }
  };

  // Remove a team member
  const removeTeamMember = (index: number) => {
    // Cannot remove the leader (first member)
    if (formData.teamMembers.length > 1 && index !== 0) {
      const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));

      // Clear errors for removed member
      if (errors.teamMembers) {
        const updatedErrors = { ...errors };
        updatedErrors.teamMembers = updatedErrors.teamMembers.filter((_: any, i: number) => i !== index);
        setErrors(updatedErrors);
      }
    }
  };

  // Handle problem statement selection
  const handleProblemStatementSelect = (problemId: string) => {
    const selectedProblem = problemStatements.find(p => p.id === problemId);
    setFormData(prev => ({
      ...prev,
      chosenProblemId: problemId,
      problemStatementDetails: selectedProblem || null // Store the full object
    }));
    // Clear error if selection is made
    if (errors.chosenProblemId) {
      setErrors((prev: any) => ({ ...prev, chosenProblemId: undefined }));
    }
  };

  // Get the currently selected problem statement details for display
  const selectedProblemForDisplay = formData.chosenProblemId
    ? problemStatements.find(p => p.id === formData.chosenProblemId)
    : null;

  return (
    <section id="hackathon" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            🚀 Submit Your Problem Statement
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Ready to innovate? Share the challenge you want to tackle and help shape the future of human-AI collaboration at SCG.
          </p>
          {userId && (
            <p className="text-sm text-gray-500 text-center mt-4">
              Your User ID: <span className="font-mono text-gray-400">{userId}</span>
            </p>
          )}
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

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Team Members <span className="text-red-400">*</span> (1 Leader, max 2 additional members)
                  </label>
                  {formData.teamMembers.length < 3 && (
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
                        <h4 className="text-sm font-medium text-gray-300">
                          {index === 0 ? 'Team Leader' : `Member ${index}`}
                        </h4>
                        {index !== 0 && ( // Only allow removing non-leader members
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                            type="text"
                            placeholder="Role/Title"
                            value={member.role}
                            onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          {errors.teamMembers && errors.teamMembers[index]?.role && (
                            <p className="mt-1 text-xs text-red-400">{errors.teamMembers[index].role}</p>
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
                        <span className="font-semibold text-white">Problem {p.id}: {p.title}</span>
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
                disabled={isSubmitting || submitStatus === 'success' || !db || !userId}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Submitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Problem Statement</span>
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
