"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, ArrowLeftRight } from 'lucide-react';

// Interface for a simplified Key Result reference within an Objective
interface ObjectiveKeyResultReference {
  id: string;
  description: string; // Assuming objective might need description of its key results
}

interface Objective {
  id: string;
  title: string;
  description: string;
  overallProgress: number;
  // MODIFIED: Changed 'any[]' to a more specific type
  keyResults: ObjectiveKeyResultReference[];
}

interface EditObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  objective: Objective | null;
  onSave: (updatedObjective: Objective) => void; // This is the prop we'll implement
}

const EditObjectiveModal: React.FC<EditObjectiveModalProps> = ({ isOpen, onClose, objective, onSave }) => {
  const [editedObjective, setEditedObjective] = useState<Objective | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false); // State to track saving status

  useEffect(() => {
    setEditedObjective(objective);
  }, [objective]);

  if (!isOpen || !editedObjective) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedObjective((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleSave = async () => {
    if (!editedObjective) return;

    setIsSaving(true); // Set saving state to true
    try {
      const payload = {
        description: editedObjective.description,
      };

      // Make the PATCH request to update the objective
      const res = await fetch(`/api/beta_objectives/${editedObjective.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Handle non-OK responses (e.g., 400, 404, 500)
        let errorMessage = `Failed to update objective: Status ${res.status}`;
        const contentType = res.headers.get("content-type");

        // Attempt to parse JSON only if the content type is JSON
        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
          } catch (jsonError) {
            // If parsing JSON fails, fall back to generic message
            console.error("Error parsing JSON error response:", jsonError);
            errorMessage = "Failed to parse error response from server.";
          }
        } else {
          // If not JSON, try to read as text or use a generic message
          try {
            const textError = await res.text();
            errorMessage = textError || errorMessage;
          } catch (textReadError) {
            console.error("Error reading text error response:", textReadError);
            errorMessage = "Failed to read error response from server.";
          }
        }
        throw new Error(errorMessage);
      }

      // If successful, call the onSave prop with the updated objective
      // The parent component (OKRDetail) will then re-fetch the data.
      onSave(editedObjective);
      onClose(); // Close modal after successful save
    } catch (error: unknown) { // Changed 'any' to 'unknown'
      if (error instanceof Error) { // Type narrowing
        console.error("Error saving objective:", error.message);
      } else {
        console.error("Error saving objective: An unknown error occurred", error);
      }
      // In a real application, you might show a user-friendly error message here
      // For example: alert(`Failed to save objective: ${error.message}. Please try again.`);
    } finally {
      setIsSaving(false); // Reset saving state regardless of success or failure
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Blurred overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-lg overflow-y-auto transform transition-transform ease-out duration-300 translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Editing - {editedObjective.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form content */}
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedObjective.description}
              onChange={handleChange}
              rows={6} // Increased rows for objective description
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving} // Disable button while saving
            >
              {isSaving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2 transform rotate-90" /> {/* Rotate to resemble 'discard' */}
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditObjectiveModal;
