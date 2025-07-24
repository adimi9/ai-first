import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterDropdown from '../components/ui/FilterDropdown';
import { Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Project {
  id: string;
  teamName: string;
  problemStatement: string;
  problemStatementTitle?: string;
  division: string;
  teamMembers: {
    name: string;
    email: string;
    role: string;
  }[];
}

const ProjectsSubmittedPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'hackathonSubmissions'));
      const submissions: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(submissions);
    };

    fetchProjects();
  }, []);

  

  const divisions = useMemo(
    () => ['all', ...Array.from(new Set(projects.map(p => p.division)))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const titleMatch = (project.problemStatementTitle || project.problemStatement || '').toLowerCase().includes(searchTerm.toLowerCase());
      const divisionMatch = selectedDivision === 'all' || project.division === selectedDivision;
      return titleMatch && divisionMatch;
    });
  }, [projects, searchTerm, selectedDivision]);

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
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-purple-800/50 border border-purple-700 text-white rounded-md p-2 pl-10 placeholder-purple-300 focus:ring-cyan-500 focus:border-cyan-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
            </div>

            <FilterDropdown
              title="Division"
              options={divisions}
              selectedValue={selectedDivision}
              onSelect={setSelectedDivision}
            />
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-purple-900/50 rounded-2xl p-6 shadow-lg backdrop-blur-md transition-transform transform hover:-translate-y-1 hover:shadow-cyan-400/30"
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{project.teamName}</h3>
                  <p className="text-lg text-purple-200 font-semibold mb-1">
                    {project.problemStatementTitle || project.problemStatement.slice(0, 100) + '...'}
                  </p>
                  <p className="text-sm text-purple-400 mb-4">Division: {project.division}</p>
                  <p className="text-sm text-white font-medium">Team Members:</p>
                  <ul className="text-sm text-purple-200 list-disc ml-6">
                    {project.teamMembers?.map((member, i) => (
                      <li key={i}>{member.name}</li>
                    ))}
                  </ul>
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
