import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Assuming '../firebase' correctly exports 'db'

// Updated interface to match the structure from 'ProjectsSubmittedPage'
interface ProjectDetails {
  id: string; // Add id as it's from doc.id
  teamName: string;
  problemStatement: string;
  problemStatementTitle?: string; // Optional, as in the first file
  division: string;
  teamMembers: {
    name: string;
    email: string;
    role: string;
  }[];
  // Add other fields you expect from your hackathonSubmissions documents
  contactEmail?: string; // Assuming you might have this field for contact
  painPoints?: string;
  whyItMatters?: string;
  solution?: string;
  benefits?: string;
  risks?: string;
  timeline?: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>(); // Specify type for useParams
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setLoading(false);
        setError("No project ID provided.");
        return;
      }

      try {
        // Corrected collection name to 'hackathonSubmissions'
        const docRef = doc(db, 'hackathonSubmissions', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as ProjectDetails);
        } else {
          setProject(null); // Project not found
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <p className="text-purple-300">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <Link to="/projects-submitted" className="text-blue-400 underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects-submitted" className="text-blue-400 underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>
      <div className="relative z-10 max-w-5xl mx-auto bg-purple-950 bg-opacity-60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
          <Link
            to="/projects-submitted"
            className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md hover:shadow-cyan-400/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            ← Back to Projects
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          {project.teamName}
        </h1>
        {project.contactEmail && <p className="text-gray-300 mb-6"><strong>Contact:</strong> {project.contactEmail}</p>}
        <p className="text-purple-400 mb-4">Division: {project.division}</p>


        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-2">Team Members</h2>
            <ul className="list-disc list-inside text-purple-100">
              {project.teamMembers && project.teamMembers.map((member, i) => (
                <li key={i}>{member.name} — {member.role} {member.email && `(${member.email})`}</li>
              ))}
            </ul>
          </div>

          <DetailBlock title="Problem Statement Title" content={project.problemStatementTitle || 'N/A'} />
          <DetailBlock title="Problem Statement Description" content={project.problemStatement} />
          {project.painPoints && <DetailBlock title="Current Pain Points" content={project.painPoints} />}
          {project.whyItMatters && <DetailBlock title="Why This Matters" content={project.whyItMatters} />}
          {project.solution && <DetailBlock title="Proposed AI Solution" content={project.solution} />}
          {project.benefits && <DetailBlock title="Expected Benefits" content={project.benefits} />}
          {project.risks && <DetailBlock title="Key Risks & Mitigation Strategies" content={project.risks} />}
          {project.timeline && <DetailBlock title="Implementation Timeline" content={project.timeline} />}

        </div>
      </div>
    </div>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-purple-800/30 rounded-lg px-6 py-4 hover:bg-purple-700/40 transition-all">
      <h3 className="text-lg font-semibold text-purple-200 mb-1">{title}</h3>
      <p className="text-sm text-purple-100">{content}</p>
    </div>
  );
}