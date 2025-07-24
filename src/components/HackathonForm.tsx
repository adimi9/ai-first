import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Plus, Trash2, Users } from 'lucide-react'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface TeamMember {
  name: string
  role: string
  email: string
}

interface FormData {
  teamName: string
  contactEmail: string
  teamMembers: TeamMember[]
  problemStatement: string
  problemStatementTitle: string
  painPoints: string
  whyItMatters: string
  proposedSolution: string
  expectedBenefits: string
  areasInvolved: string[]
  division: string
}

const HackathonForm = () => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    contactEmail: '',
    teamMembers: [{ name: '', role: '', email: '' }],
    problemStatementTitle: '',
    problemStatement: '',
    painPoints: '',
    whyItMatters: '',
    proposedSolution: '',
    expectedBenefits: '',
    areasInvolved: [],
    division: ''
  })

  const divisions = [
    'Digital Governance',
    'Finance',
    'People & Org',
    'Strat Plans & Transformation',
    'Comms & Marketing',
    'Org Excellence',
    'Partnerships & Engagement',
    'Legal',
    'Procurement'
  ]

  const areas = [
    'Automation',
    'Innovation',
    'Efficiency'
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<any>({})

  const validateForm = (): boolean => {
    const newErrors: any = {}

    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required'
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }

    // Validate team members
    const teamMemberErrors: any[] = []
    formData.teamMembers.forEach((member, index) => {
      const memberErrors: any = {}
      if (!member.name.trim()) memberErrors.name = 'Name is required'
      if (!member.role.trim()) memberErrors.role = 'Role is required'
      if (!member.email.trim()) {
        memberErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(member.email)) {
        memberErrors.email = 'Please enter a valid email address'
      }
      teamMemberErrors[index] = memberErrors
    })
    if (teamMemberErrors.some(errors => Object.keys(errors).length > 0)) {
      newErrors.teamMembers = teamMemberErrors
    }

    if (!formData.problemStatementTitle.trim()) newErrors.problemStatementTitle = 'Problem statement title is required'
    if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem statement is required'
    if (!formData.painPoints.trim()) newErrors.painPoints = 'Pain points are required'
    if (!formData.whyItMatters.trim()) newErrors.whyItMatters = 'This field is required'
    if (!formData.division.trim()) newErrors.division = 'Please select your division'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    // Normalize team name and build custom doc ID
    const baseDocId = formData.teamName.trim().toLowerCase().replace(/\s+/g, '_');
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12); // e.g. 202506251405
    const finalDocId = `${baseDocId}-${timestamp}`;

    // Save to Firestore
    await setDoc(doc(db, 'hackathonSubmissions', finalDocId), {
      ...formData,
      submittedAt: new Date()
    });

    setSubmitStatus('success');

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        teamName: '',
        contactEmail: '',
        teamMembers: [{ name: '', role: '', email: '' }],
        problemStatementTitle: '', 
        problemStatement: '',
        painPoints: '',
        whyItMatters: '',
        proposedSolution: '',
        expectedBenefits: '',
        areasInvolved: [],
        division: ''
      });
      setSubmitStatus('idle');
    }, 3000);

  } catch (error) {
    console.error("Error submitting form to Firestore:", error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...formData.teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }))

    // Clear team member errors when user starts typing
    if (errors.teamMembers && errors.teamMembers[index] && errors.teamMembers[index][field]) {
      const updatedErrors = { ...errors }
      updatedErrors.teamMembers[index] = { ...updatedErrors.teamMembers[index], [field]: undefined }
      setErrors(updatedErrors)
    }
  }

  const addTeamMember = () => {
    if (formData.teamMembers.length < 6) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', role: '', email: '' }]
      }))
    }
  }

  const removeTeamMember = (index: number) => {
    if (formData.teamMembers.length > 1) {
      const updatedMembers = formData.teamMembers.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, teamMembers: updatedMembers }))
      
      // Clear errors for removed member
      if (errors.teamMembers) {
        const updatedErrors = { ...errors }
        updatedErrors.teamMembers = updatedErrors.teamMembers.filter((_: any, i: number) => i !== index)
        setErrors(updatedErrors)
      }
    }
  }

  return (
    <section id="hackathon" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Submit Your Problem Statement
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Share your thoughts and join the hackathon. Help us accelerate the future of human-AI collaboration in SCG.
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
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-700">
                <Users className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Team Information</h3>
              </div>

              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which division are you from? *
                  {errors.division && (
                    <span className="text-red-400 text-sm ml-2">{errors.division}</span>
                  )}
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData(prev => ({ ...prev, division: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Name */}
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your team name"
                />
                {errors.teamName && <p className="mt-1 text-sm text-red-400">{errors.teamName}</p>}
              </div>

              {/* Contact Email */}
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Primary Contact Email *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="team@example.com"
                />
                {errors.contactEmail && <p className="mt-1 text-sm text-red-400">{errors.contactEmail}</p>}
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Team Members * (Up to 6 members)
                  </label>
                  {formData.teamMembers.length < 6 && (
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
                          Member {index + 1}
                        </h4>
                        {formData.teamMembers.length > 1 && (
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

            {/* Project Details Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">Project Details</h3>
              </div>

              {/* Problem Statement Title */}
              <div>
                <label htmlFor="problemStatementTitle" className="block text-sm font-medium text-gray-300 mb-2">
                  Problem Statement Title * (e.g., Automating Report Generation)
                </label>
                <input
                  type="text"
                  id="problemStatementTitle"
                  name="problemStatementTitle"
                  value={formData.problemStatementTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Give a short title for the problem you are proposing"
                />
                {errors.problemStatementTitle && <p className="mt-1 text-sm text-red-400">{errors.problemStatementTitle}</p>}
              </div>

              {/* Problem Statement */}
              <div>
                <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-300 mb-2">
                  Problem Statement *
                </label>
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Clearly define the problem you're solving..."
                />
                {errors.problemStatement && <p className="mt-1 text-sm text-red-400">{errors.problemStatement}</p>}
              </div> 

              {/* Pain Points */}
              <div>
                <label htmlFor="painPoints" className="block text-sm font-medium text-gray-300 mb-2">
                  Current Pain Points *
                </label>
                <textarea
                  id="painPoints"
                  name="painPoints"
                  value={formData.painPoints}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="What specific challenges are people facing today?"
                />
                {errors.painPoints && <p className="mt-1 text-sm text-red-400">{errors.painPoints}</p>}
              </div>

              {/* Why It Matters */}
              <div>
                <label htmlFor="whyItMatters" className="block text-sm font-medium text-gray-300 mb-2">
                  Why This Matters *
                </label>
                <textarea
                  id="whyItMatters"
                  name="whyItMatters"
                  value={formData.whyItMatters}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Explain the broader impact and importance..."
                />
                {errors.whyItMatters && <p className="mt-1 text-sm text-red-400">{errors.whyItMatters}</p>}
              </div>

              {/* Areas Involved - Now Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which areas might this involve? (Optional - We'll help you identify in our workshops!)
                </label>
                <div className="space-y-2">
                  {areas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`area-${area.toLowerCase()}`}
                        checked={formData.areasInvolved.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              areasInvolved: [...prev.areasInvolved, area]
                            }))
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              areasInvolved: prev.areasInvolved.filter(a => a !== area)
                            }))
                          }
                        }}
                        className="rounded border-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor={`area-${area.toLowerCase()}`} className="text-gray-300">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposed AI Solution */}
              <div>
                <label htmlFor="proposedSolution" className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Solution Ideas (Optional)
                </label>
                <textarea
                  id="proposedSolution"
                  name="proposedSolution"
                  value={formData.proposedSolution}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Share any early thoughts you have! Our upcoming workshops will help you develop a detailed approach."
                />
              </div>

              {/* Expected Benefits*/}
              <div>
                <label htmlFor="expectedBenefits" className="block text-sm font-medium text-gray-300 mb-2">
                  Potential Impact (Optional)
                </label>
                <textarea
                  id="expectedBenefits"
                  name="expectedBenefits"
                  value={formData.expectedBenefits}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="What positive changes or improvements do you hope to see?"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
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
  )
}

export default HackathonForm