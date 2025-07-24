import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterDropdown from '../components/ui/FilterDropdown'; // Keeping this in case you reintroduce a filterable field
import { Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Define the problem statements as provided in the HackathonForm for reference if needed
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

interface TeamMember {
  name: string;
  role: string;
  email: string;
}

// Updated Project interface to reflect the new form data structure
interface Project {
  id: string;
  teamName: string;
  chosenProblemId: string; // The ID of the chosen problem (e.g., 'A', 'B', 'C')
  problemStatementDetails: { // The full details of the chosen problem
    id: string;
    title: string;
    input: string;
    workflow: string;
    goal: string;
  } | null;
  dataSource: 'standard' | 'own' | ''; // New field for data source
  teamMembers: TeamMember[];
  submittedAt: Date; // Assuming this is saved as a Firestore Timestamp and can be converted
  submittedByUserId: string; // The user ID who submitted the form
}

// Declare global variables for TypeScript
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;


const ProjectsSubmittedPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Removed selectedDivision state as 'division' is no longer in the submitted form data directly.
  // If you have another way to categorize projects (e.g., by problem ID, or if 'division' is implicit
  // from team name or other means), you'd need to re-implement filtering logic.

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Correct collection path based on the HackathonForm's submission logic
        // Assuming __app_id is accessible or you use a default for display purposes
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        // Note: The HackathonForm stores submissions under artifacts/{appId}/users/{userId}/hackathonSubmissions
        // To fetch all submissions, we need to query across all user IDs. This requires a collection group query
        // or a different collection structure if you want to easily list all of them centrally.
        // For simplicity and to match the 'hackathonSubmissions' part, I'll assume `db.collection('hackathonSubmissions')`
        // is the main collection you're trying to fetch from, or that your 'db' object from '../firebase'
        // is set up to point to the correct subcollection if you're only viewing your own submissions.
        // For a public facing page showing ALL submissions, you'd ideally have a top-level collection like 'allHackathonSubmissions'
        // or perform a collection group query which requires an index in Firestore.

        // Assuming a simpler structure or that `db` is already scoped correctly for demonstration:
        const collectionRef = collection(db, 'hackathonSubmissions'); // This path needs to be correct for where documents are actually stored.
        // If documents are stored under 'artifacts/{appId}/users/{userId}/hackathonSubmissions',
        // you would need to adjust this to query for collection groups if you want all users' submissions:
        // const querySnapshot = await getDocs(query(collectionGroup(db, 'hackathonSubmissions')));

        const querySnapshot = await getDocs(collectionRef);
        const submissions: Project[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            teamName: data.teamName,
            chosenProblemId: data.chosenProblemId,
            problemStatementDetails: data.problemStatementDetails || null,
            dataSource: data.dataSource || '',
            teamMembers: data.teamMembers || [],
            submittedAt: data.submittedAt ? data.submittedAt.toDate() : new Date(), // Convert Firestore Timestamp to Date
            submittedByUserId: data.submittedByUserId || 'unknown',
          } as Project;
        });
        setProjects(submissions);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchProjects();
  }, []);

  // Divisions is no longer directly from project.division, so we can remove this or make it static
  // If you want to filter by problem statement ID, you can generate options from problemStatements array
  const problemStatementOptions = useMemo(
    () => ['all', ...problemStatements.map(p => p.title)],
    []
  );

  const [selectedProblemTitle, setSelectedProblemTitle] = useState('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const teamNameMatch = project.teamName.toLowerCase().includes(searchTerm.toLowerCase());
      const problemTitleMatch = selectedProblemTitle === 'all' || 
                                project.problemStatementDetails?.title.toLowerCase() === selectedProblemTitle.toLowerCase();
      
      // You can also search by individual team member names or emails if desired
      const teamMemberMatch = project.teamMembers.some(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (teamNameMatch || teamMemberMatch) && problemTitleMatch;
    });
  }, [projects, searchTerm, selectedProblemTitle]);


  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Submitted Projects
          </h1>
          <p className="text-lg text-purple-200 mb-12 text-center">
            Browse and filter through the innovative ideas from our colleagues.
          </p>

          <div className="p-6 bg-purple-950/60 backdrop-blur-md rounded-2xl mb-12 shadow-lg">
            <div className="relative mb-4">
              <input
                type="search"
                placeholder="Search by team name or member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-purple-800/50 border border-purple-700 text-white rounded-md p-2 pl-10 placeholder-purple-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
            </div>

            <FilterDropdown
              title="Problem Type"
              options={problemStatementOptions}
              selectedValue={selectedProblemTitle}
              onSelect={setSelectedProblemTitle}
            />
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-purple-900/50 rounded-2xl p-6 shadow-lg backdrop-blur-md transition-transform transform hover:-translate-y-1 hover:shadow-cyan-400/30 border border-purple-800"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{project.teamName}</h3>
                  
                  {project.problemStatementDetails && (
                    <div className="mb-4">
                      <p className="text-lg text-purple-200 font-semibold mb-1">
                        Problem: {project.problemStatementDetails.title}
                      </p>
                      <p className="text-sm text-purple-400 italic">Goal: {project.problemStatementDetails.goal}</p>
                      <p className="text-sm text-gray-400 mt-2">Input: {project.problemStatementDetails.input}</p>
                      <p className="text-sm text-gray-400">Workflow: {project.problemStatementDetails.workflow}</p>
                    </div>
                  )}

                  <p className="text-sm text-orange-400 mb-4">Data Source: {project.dataSource === 'standard' ? 'Standard Input Data' : 'Own Dataset'}</p>
                  
                  <p className="text-sm text-white font-medium">Team Members:</p>
                  <ul className="text-sm text-purple-200 list-disc ml-6">
                    {project.teamMembers?.map((member, i) => (
                      <li key={i}>
                        {member.name} ({member.role})
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">Submitted: {new Date(project.submittedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-purple-400">No projects match your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsSubmittedPage;