"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, Save, Trash2, Send, RotateCcw } from 'lucide-react';

// Interface for a Key Result
interface KeyResult {
  id: string; // Stored as string on frontend, validated as number for API
  description: string;
  priority: 'High Priority' | 'Low Priority';
  targetDate: string;
  status: string;
  lastUpdated: string;
  progress: number;
}

// Interface for a Comment
interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

// NEW INTERFACE: For the raw comment data received from the API
interface RawCommentApiResponse {
  comment_id: string | number; // Can be string or number based on backend response
  content: string;
  created_at: string;
}

// Props for the EditKeyResultModal component
interface EditKeyResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyResult: KeyResult | null;
  onSave: (updatedKeyResult?: KeyResult) => Promise<void>;
}

const EditKeyResultModal: React.FC<EditKeyResultModalProps> = ({ isOpen, onClose, keyResult, onSave }) => {
  const [editedKeyResult, setEditedKeyResult] = useState<KeyResult | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Helper function to validate if a string ID can be converted to a number
  const isValidNumericId = useCallback((id: string | null | undefined): boolean => {
    return id != null && id.trim() !== '' && !isNaN(Number(id));
  }, []);

  // Function to fetch comments for the current key result
  const fetchComments = useCallback(async (keyResultId: string) => {
    if (!isValidNumericId(keyResultId)) {
      setErrorMessage("Cannot fetch comments: Invalid Key Result ID.");
      return;
    }
    try {
      setErrorMessage(null);
      console.log(`Fetching comments for Key Result ID: ${keyResultId}`);
      const res = await fetch(`/api/beta_key_results/${keyResultId}/comments`);
      if (!res.ok) {
        let errorData: { error?: string } = {};
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          const textError = await res.text();
          console.error("Non-JSON error response:", textError);
          errorData.error = textError;
        }
        throw new Error(errorData.error || `Failed to fetch comments: ${res.statusText}`);
      }
      const data: RawCommentApiResponse[] = await res.json();
      setComments(data.map((c: RawCommentApiResponse) => ({
        id: String(c.comment_id),
        content: c.content,
        createdAt: c.created_at,
      })));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching comments:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Error fetching comments: An unexpected error occurred", error);
        setErrorMessage("Failed to load comments due to an unexpected error.");
      }
    }
  }, [isValidNumericId]);

  // Effect hook to update the editedKeyResult and fetch comments when the prop changes
  useEffect(() => {
    if (isOpen && keyResult) {
      if (!isValidNumericId(keyResult.id)) {
        setErrorMessage("Error: The provided Key Result ID is invalid. Cannot open editor.");
        setEditedKeyResult(null);
      } else {
        setEditedKeyResult(keyResult);
        fetchComments(keyResult.id);
        setErrorMessage(null);
      }
      setShowDeleteConfirmation(false);
      setNewComment('');
    } else {
      setComments([]);
      setNewComment('');
      setShowDeleteConfirmation(false);
      setErrorMessage(null);
      setEditedKeyResult(null);
    }
  }, [isOpen, keyResult, fetchComments, isValidNumericId]);

  if (!isOpen) {
    return null;
  }

  if (errorMessage && !editedKeyResult) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative w-full max-w-xl bg-white h-full shadow-lg overflow-y-auto transform transition-transform ease-out duration-300 translate-x-0 rounded-l-lg p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Error</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{errorMessage}</span>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    );
  }

  if (!editedKeyResult) {
    return null; // Should ideally be handled by the error state above if isOpen is true
  }

  // Handler for input changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    setEditedKeyResult((prev) => {
      if (!prev) return null; // Defensive check

      // Assert 'name' to be a valid key of KeyResult
      const key = name as keyof KeyResult;

      // Special handling for 'progress' to ensure it's stored as a number
      if (key === 'progress') {
        const numValue = Number(value);
        return { ...prev, [key]: isNaN(numValue) ? 0 : Math.max(0, Math.min(100, numValue)) };
      }

      // For other string-based properties, assert 'value' to the type of that key
      // This is safe because we know the input elements correspond to string or number (handled above) properties.
      return { ...prev, [key]: value as KeyResult[typeof key] };
    });
  };

  // Handler for saving the edited key result
  const handleSave = async (): Promise<void> => {
    if (!editedKeyResult || !isValidNumericId(editedKeyResult.id)) {
      setErrorMessage("Cannot save: Invalid Key Result ID.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const payload = {
        description: editedKeyResult.description,
        priority: editedKeyResult.priority,
        status: editedKeyResult.status,
        progress: editedKeyResult.progress,
        target_date: new Date(editedKeyResult.targetDate).toISOString(),
      };

      const res = await fetch(`/api/beta_key_results/${editedKeyResult.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorData: { error?: string } = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          const textError = await res.text();
          console.error("Non-JSON error response during save:", textError);
          errorData.error = textError;
        }
        throw new Error(errorData.error || `Failed to update key result: ${res.statusText}`);
      }

      await onSave(editedKeyResult);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving key result:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Error saving key result: An unexpected error occurred", error);
        setErrorMessage("Failed to save changes. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for deleting the key result
  const handleDelete = async (): Promise<void> => {
    if (!editedKeyResult || !isValidNumericId(editedKeyResult.id)) {
      setErrorMessage("Cannot delete: Invalid Key Result ID.");
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/beta_key_results/${editedKeyResult.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        let errorData: { error?: string } = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          const textError = await res.text();
          console.error("Non-JSON error response during delete:", textError);
          errorData.error = textError;
        }
        throw new Error(errorData.error || `Failed to delete key result: ${res.statusText}`);
      }

      await onSave();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting key result:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Error deleting key result: An unexpected error occurred", error);
        setErrorMessage("Failed to delete key result. Please try again.");
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  // Handler for adding a new comment
  const handleAddComment = async (): Promise<void> => {
    if (!editedKeyResult || !isValidNumericId(editedKeyResult.id) || !newComment.trim()) {
      setErrorMessage("Cannot add comment: Invalid Key Result ID or empty comment content.");
      return;
    }

    setIsAddingComment(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/beta_key_results/${editedKeyResult.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (!res.ok) {
        let errorData: { error?: string } = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          const textError = await res.text();
          console.error("Non-JSON error response during add comment:", textError);
          errorData.error = textError;
        }
        throw new Error(errorData.error || `Failed to add comment: ${res.statusText}`);
      }

      setNewComment('');
      await fetchComments(editedKeyResult.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding comment:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Error adding comment: An unexpected error occurred", error);
        setErrorMessage("Failed to add comment. Please try again.");
      }
    } finally {
      setIsAddingComment(false);
    }
  };

  // Helper function to format date for HTML input type="date"
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Helper function to format date for display
  const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString("en-SG", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Blurred overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative w-full max-w-3xl bg-white h-full shadow-lg overflow-y-auto transform transition-transform ease-out duration-300 translate-x-0 rounded-l-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Editing - Key Result</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setErrorMessage(null)} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        {/* Form content */}
        <div className="p-6 space-y-5">
          {/* Description field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedKeyResult.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Priority dropdown */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              id="priority"
              name="priority"
              value={editedKeyResult.priority}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="High Priority">High Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
          </div>

          {/* Target Date input */}
          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
            <input
              type="date"
              id="targetDate"
              name="targetDate"
              value={formatDateForInput(editedKeyResult.targetDate)}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Status dropdown */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={editedKeyResult.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Not Started">Not Started</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Progress input */}
          <div>
            <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
            <input
              type="number"
              id="progress"
              name="progress"
              value={editedKeyResult.progress}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {!showDeleteConfirmation ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <RotateCcw className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </>
            ) : (
              // Confirmation buttons when showDeleteConfirmation is true
              <div className="flex items-center space-x-3">
                <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <RotateCcw className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6 border-t border-gray-200 mt-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Comments</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                  <p className="font-medium">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDateDisplay(comment.createdAt)}</p>
                </div>
              ))
            )}
          </div>

          {/* Add New Comment input */}
          <div className="mt-4 flex items-center gap-2">
            <textarea
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              placeholder="Add a new comment..."
              rows={2}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
            ></textarea>
            <button
              onClick={handleAddComment}
              className="p-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAddingComment || !newComment.trim()}
              title="Add Comment"
            >
              {isAddingComment ? <RotateCcw className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKeyResultModal;