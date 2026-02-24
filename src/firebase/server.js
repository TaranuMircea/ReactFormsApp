import { db, auth } from "./config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// =========================

/**
 * active
 */
export const fetchActiveSurvey = async () => {
  try {
    const surveyDoc = await getDoc(doc(db, "surveys", "activeSurvey"));
    if (surveyDoc.exists()) {
      return { success: true, data: surveyDoc.data() };
    }
    return { success: false, error: "No active survey found" };
  } catch (error) {
    console.error("Error fetching survey:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update survey title and description
 */
export const updateSurveyInfo = async (title, description) => {
  try {
    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      title,
      description,
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating survey info:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Toggle survey active status
 */
export const toggleSurveyStatus = async (isActive) => {
  try {
    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      isActive: isActive,
    });
    return { success: true };
  } catch (error) {
    console.error("Error toggling survey status:", error);
    return { success: false, error: error.message };
  }
};

// ============= QUESTION OPERATIONS =============

/**
 * Add new question to survey
 */
export const addQuestion = async (currentQuestions, newQuestion) => {
  try {
    const questionToAdd = {
      id: `q${Date.now()}`,
      question: newQuestion.question,
      type: newQuestion.type,
      required: newQuestion.required,
    };

    if (newQuestion.type === "multiple") {
      questionToAdd.options = newQuestion.options.filter((o) => o.trim());
    }

    if (newQuestion.type === "scale") {
      questionToAdd.scaleMin = newQuestion.scaleMin;
      questionToAdd.scaleMax = newQuestion.scaleMax;
    }

    const updatedQuestions = [...currentQuestions, questionToAdd];

    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      questions: updatedQuestions,
    });

    return { success: true, data: updatedQuestions };
  } catch (error) {
    console.error("Error adding question:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Edit existing question
 */
export const editQuestion = async (
  currentQuestions,
  questionId,
  updatedQuestion,
) => {
  try {
    const questionToUpdate = {
      id: questionId,
      question: updatedQuestion.question,
      type: updatedQuestion.type,
      required: updatedQuestion.required,
    };

    if (updatedQuestion.type === "multiple") {
      questionToUpdate.options = updatedQuestion.options.filter((o) =>
        o.trim(),
      );
    }

    if (updatedQuestion.type === "scale") {
      questionToUpdate.scaleMin = updatedQuestion.scaleMin;
      questionToUpdate.scaleMax = updatedQuestion.scaleMax;
    }

    const updatedQuestions = currentQuestions.map((q) =>
      q.id === questionId ? questionToUpdate : q,
    );

    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      questions: updatedQuestions,
    });

    return { success: true, data: updatedQuestions };
  } catch (error) {
    console.error("Error editing question:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete question from survey
 */
export const deleteQuestion = async (currentQuestions, questionId) => {
  try {
    const updatedQuestions = currentQuestions.filter(
      (q) => q.id !== questionId,
    );

    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      questions: updatedQuestions,
    });

    return { success: true, data: updatedQuestions };
  } catch (error) {
    console.error("Error deleting question:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Reorder questions (move up or down)
 */
export const reorderQuestions = async (questions, fromIndex, toIndex) => {
  try {
    const reorderedQuestions = [...questions];
    const [movedQuestion] = reorderedQuestions.splice(fromIndex, 1);
    reorderedQuestions.splice(toIndex, 0, movedQuestion);

    await updateDoc(doc(db, "surveys", "activeSurvey"), {
      questions: reorderedQuestions,
    });

    return { success: true, data: reorderedQuestions };
  } catch (error) {
    console.error("Error reordering questions:", error);
    return { success: false, error: error.message };
  }
};

// ============= RESPONSE OPERATIONS =============

/**
 * Submit survey response
 */
export const submitSurveyResponse = async (answers) => {
  try {
    await addDoc(collection(db, "responses"), {
      surveyId: "activeSurvey",
      answers: answers,
      submittedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting response:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch all survey responses
 */
export const fetchAllResponses = async () => {
  try {
    const responsesSnapshot = await getDocs(collection(db, "responses"));
    const responsesData = responsesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: responsesData };
  } catch (error) {
    console.error("Error fetching responses:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete all survey responses
 */
export const deleteAllResponses = async () => {
  try {
    const responsesSnapshot = await getDocs(collection(db, "responses"));

    const deletePromises = responsesSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref),
    );

    await Promise.all(deletePromises);

    return { success: true, deletedCount: responsesSnapshot.docs.length };
  } catch (error) {
    console.error("Error deleting responses:", error);
    return { success: false, error: error.message };
  }
};

// ============= STATISTICS =============

/**
 * Calculate statistics for survey responses
 */
export const calculateStatistics = (responses, questions) => {
  const stats = {};

  questions.forEach((question) => {
    if (question.type === "multiple") {
      // Count occurrences for each option
      const counts = {};
      question.options.forEach((option) => {
        counts[option] = 0;
      });

      responses.forEach((response) => {
        const answer = response.answers?.[question.id];
        if (answer && counts.hasOwnProperty(answer)) {
          counts[answer]++;
        }
      });

      stats[question.id] = {
        type: "multiple",
        question: question.question,
        data: counts,
        total: responses.length,
      };
    }

    if (question.type === "scale") {
      // Calculate average and distribution
      const values = responses
        .map((r) => r.answers?.[question.id])
        .filter((v) => v !== undefined && v !== null);

      const sum = values.reduce((acc, val) => acc + Number(val), 0);
      const average = values.length > 0 ? (sum / values.length).toFixed(2) : 0;

      // Count distribution
      const distribution = {};
      for (let i = question.scaleMin; i <= question.scaleMax; i++) {
        distribution[i] = 0;
      }

      values.forEach((value) => {
        if (distribution.hasOwnProperty(value)) {
          distribution[value]++;
        }
      });

      stats[question.id] = {
        type: "scale",
        question: question.question,
        average: average,
        distribution: distribution,
        total: values.length,
        scaleMin: question.scaleMin,
        scaleMax: question.scaleMax,
      };
    }

    if (question.type === "text") {
      // Just count how many answered
      const answersCount = responses.filter(
        (r) => r.answers?.[question.id] && r.answers[question.id].trim() !== "",
      ).length;

      stats[question.id] = {
        type: "text",
        question: question.question,
        answersCount: answersCount,
        total: responses.length,
      };
    }
  });

  return stats;
};

// ============= AUTH OPERATIONS =============

/**
 * Get current authenticated user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// ============= CONTACT FORM OPERATIONS =============

/**
 * Submit contact form
 */
export const submitContactForm = async (name, email, message) => {
  try {
    // Basic validation
    if (!name || !email || !message) {
      return { success: false, error: "All fields are required" };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    await addDoc(collection(db, "contacts"), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      submittedAt: serverTimestamp(),
      read: false,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch all contact submissions (for admin)
 */
export const fetchAllContacts = async () => {
  try {
    const contactsSnapshot = await getDocs(collection(db, "contacts"));
    const contactsData = contactsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort by most recent first
    contactsData.sort((a, b) => {
      if (!a.submittedAt || !b.submittedAt) return 0;
      return b.submittedAt.toMillis() - a.submittedAt.toMillis();
    });

    return { success: true, data: contactsData };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Mark contact as read
 */
export const markContactAsRead = async (contactId) => {
  try {
    await updateDoc(doc(db, "contacts", contactId), {
      read: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking contact as read:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete contact submission
 */
export const deleteContact = async (contactId) => {
  try {
    await deleteDoc(doc(db, "contacts", contactId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { success: false, error: error.message };
  }
};
