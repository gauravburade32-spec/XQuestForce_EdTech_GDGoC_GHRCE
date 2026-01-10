// ============================================
// AI Powered Learning Assistant - JavaScript
// ============================================
// This script only runs on the learning assistant page (learning-assistant.html)

// Get references to DOM elements
const generateBtn = document.getElementById('generateBtn');
const subjectSelect = document.getElementById('subject');
const levelSelect = document.getElementById('level');
const topicInput = document.getElementById('topic');
const learningGoalSelect = document.getElementById('learningGoal');
const outputCard = document.getElementById('outputCard');
const loadingMessage = document.getElementById('loadingMessage');
const explanationSection = document.getElementById('explanationSection');
const recommendedTopicsDiv = document.getElementById('recommendedTopics');
const suggestedResourcesDiv = document.getElementById('suggestedResources');
const studyPlanDiv = document.getElementById('studyPlan');

// Safety check - only proceed if all required elements exist
if (!generateBtn || !subjectSelect || !levelSelect || !topicInput || !learningGoalSelect) {
    console.warn('Learning assistant elements not found. This script should only run on learning-assistant.html');
}

// Sample AI responses - Different content based on subject and level
// TODO: Replace this with actual Gemini API calls
const sampleResponses = {
    maths: {
        beginner: {
            explanation: "Quadratic equations are mathematical expressions where the highest power of the variable is 2. They follow the standard form: ax² + bx + c = 0, where 'a', 'b', and 'c' are numbers. For example, x² - 5x + 6 = 0 is a quadratic equation. These equations can have zero, one, or two solutions, which we can find using methods like factoring, completing the square, or the quadratic formula.",
            tips: [
                "Start by identifying if an equation is quadratic - look for the x² term.",
                "Practice factoring simple quadratics before moving to complex ones.",
                "Always check your answers by substituting them back into the original equation."
            ]
        },
        intermediate: {
            explanation: "Quadratic equations represent parabolas in coordinate geometry. The discriminant (b² - 4ac) determines the nature of roots: positive discriminant yields two real solutions, zero discriminant gives one repeated solution, and negative discriminant results in complex conjugate solutions. The vertex form y = a(x-h)² + k helps identify the parabola's vertex and axis of symmetry. Applications include projectile motion, optimization problems, and signal processing.",
            tips: [
                "Master the quadratic formula and understand how the discriminant affects solutions.",
                "Learn to convert between standard, factored, and vertex forms.",
                "Practice real-world applications to understand when quadratic equations are useful."
            ]
        }
    },
    physics: {
        beginner: {
            explanation: "Newton's Laws of Motion are three fundamental rules that describe how objects move. The First Law says that an object at rest stays at rest, and an object in motion stays in motion at constant speed, unless acted upon by a force. The Second Law states that force equals mass times acceleration (F = ma). The Third Law tells us that for every action, there is an equal and opposite reaction. These laws help us understand everything from a ball rolling on the ground to rockets launching into space!",
            tips: [
                "Visualize real-world examples - think about pushing a shopping cart or bouncing a ball.",
                "Start with simple scenarios before tackling complex problems.",
                "Remember that forces always come in pairs (action-reaction)."
            ]
        },
        intermediate: {
            explanation: "Newton's Laws of Motion form the foundation of classical mechanics. The First Law introduces the concept of inertia and establishes reference frames. The Second Law, F = ma, is a vector equation that relates net force to acceleration in specific coordinate systems. The Third Law reveals that forces are interactions between objects, not properties of single objects. In advanced applications, these laws integrate with conservation principles, leading to Lagrangian and Hamiltonian mechanics for more complex systems like planetary motion and quantum mechanics.",
            tips: [
                "Work with vector representations to handle multi-dimensional problems.",
                "Apply Newton's Laws systematically: identify forces, draw free-body diagrams, then solve.",
                "Connect these laws to conservation of energy and momentum for deeper understanding."
            ]
        }
    },
    programming: {
        beginner: {
            explanation: "Variables are like labeled boxes where we store information in programming. When you write 'let age = 25', you're creating a variable named 'age' and storing the number 25 in it. Variables can hold different types of data like numbers, text (strings), true/false values (booleans), and more. Think of variables as memory slots with names so you can easily find and use the information later. They're fundamental because they let programs remember and work with data!",
            tips: [
                "Choose clear, descriptive names for variables - 'userName' is better than 'x'.",
                "Remember that variables are case-sensitive - 'Age' and 'age' are different.",
                "Practice declaring variables and changing their values to understand how they work."
            ]
        },
        intermediate: {
            explanation: "Variables are memory locations with identifiers that hold values. In programming, variables have scope (global, local, block) and lifetime. Different languages handle variables differently: JavaScript uses 'let' and 'const' with block scoping, Python uses dynamic typing, while languages like C++ require explicit type declarations. Understanding variable scope prevents bugs, and proper naming conventions improve code readability. Advanced concepts include closures, where functions remember variables from their outer scope, and variable shadowing in nested scopes.",
            tips: [
                "Understand the difference between 'var', 'let', and 'const' in JavaScript.",
                "Learn about variable hoisting and temporal dead zones.",
                "Practice using variables in different scopes to prevent naming conflicts."
            ]
        }
    }
};

// Generate a random delay between 1-2 seconds (1000-2000ms)
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Between 1000 and 2000ms
}

// Validate user input
function validateInput() {
    const subject = subjectSelect.value;
    const level = levelSelect.value;
    const topic = topicInput.value.trim();

    if (!subject) {
        alert('Please select a subject.');
        return false;
    }

    if (!level) {
        alert('Please select a level.');
        return false;
    }

    if (!topic) {
        alert('Please enter a topic.');
        return false;
    }

    return true;
}

// Display the AI-generated learning plan with three sections
function displayResponse(subject, level, topic, learningGoal) {
    // Get the sample response based on subject and level
    const response = sampleResponses[subject][level];
    
    // Get learning goal label
    const goalLabel = learningGoal ? learningGoalSelect.options[learningGoalSelect.selectedIndex].text : 'General Learning';
    
    // Recommended Topics Section
    const topicsContent = `
        <p><strong>Based on: ${topic} (${level} level)</strong></p>
        <p>Here are the key topics you should focus on:</p>
        <ul style="margin-top: 10px; padding-left: 20px;">
            <li>${topic} - Core concepts and fundamentals</li>
            <li>Related foundational topics from ${subject}</li>
            <li>Advanced applications and real-world examples</li>
        </ul>
        <p style="margin-top: 15px;">${response.explanation}</p>
    `;
    recommendedTopicsDiv.innerHTML = topicsContent;

    // Suggested Resources Section
    const resourcesContent = `
        <p>Recommended learning resources for your <strong>${goalLabel}</strong> goal:</p>
        <ul style="margin-top: 10px; padding-left: 20px;">
            <li>Textbook chapters covering ${topic} fundamentals</li>
            <li>Online video tutorials for ${subject} at ${level} level</li>
            <li>Practice problems and exercises</li>
            <li>Interactive simulations and visualizations</li>
        </ul>
    `;
    suggestedResourcesDiv.innerHTML = resourcesContent;

    // Study Plan Section
    const studyPlanContent = `
        <p>Personalized study plan tailored for <strong>${goalLabel}</strong>:</p>
        <ul style="margin-top: 10px; padding-left: 20px;">
            ${response.tips.map(tip => `<li style="margin-bottom: 10px;">${tip}</li>`).join('')}
        </ul>
        <p style="margin-top: 15px;"><strong>Weekly Schedule Recommendation:</strong></p>
        <p>Spend 2-3 hours per week on ${topic}, with focused practice sessions and regular review.</p>
    `;
    studyPlanDiv.innerHTML = studyPlanContent;

    // Hide loading message and show explanation
    loadingMessage.style.display = 'none';
    explanationSection.style.display = 'block';
}

// ============================================
// DOWNLOAD FUNCTIONALITY
// ============================================

// Get formatted text content from all sections
function getLearningPlanContent() {
    const topic = topicInput.value.trim();
    const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
    const level = levelSelect.options[levelSelect.selectedIndex].text;
    const learningGoal = learningGoalSelect.value 
        ? learningGoalSelect.options[learningGoalSelect.selectedIndex].text 
        : 'General Learning';

    // Extract text content from each section (removing HTML tags)
    const recommendedTopics = recommendedTopicsDiv.innerText || recommendedTopicsDiv.textContent;
    const suggestedResources = suggestedResourcesDiv.innerText || suggestedResourcesDiv.textContent;
    const studyPlan = studyPlanDiv.innerText || studyPlanDiv.textContent;

    // Format the complete learning plan as text
    const content = `
AI POWERED LEARNING PLAN
========================

Subject: ${subject}
Level: ${level}
Topic: ${topic}
Learning Goal: ${learningGoal}

${'='.repeat(50)}

RECOMMENDED TOPICS
${'-'.repeat(50)}
${recommendedTopics}

${'='.repeat(50)}

SUGGESTED RESOURCES
${'-'.repeat(50)}
${suggestedResources}

${'='.repeat(50)}

STUDY PLAN
${'-'.repeat(50)}
${studyPlan}

${'='.repeat(50)}

Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Generated by: AI Powered Learning Assistant
`;

    return content;
}

// Download as Text File
function downloadAsText() {
    try {
        const content = getLearningPlanContent();
        const topic = topicInput.value.trim() || 'Learning-Plan';
        const filename = `${topic.replace(/\s+/g, '-')}-Learning-Plan.txt`;
        
        // Create a Blob with the content
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor element and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading text file:', error);
        alert('Error downloading learning plan. Please try again.');
    }
}

// Download as PDF File
async function downloadAsPDF() {
    try {
        const topic = topicInput.value.trim() || 'Learning-Plan';
        const filename = `${topic.replace(/\s+/g, '-')}-Learning-Plan.pdf`;
        
        // Check if html2pdf is available
        if (typeof html2pdf === 'undefined') {
            alert('PDF generation library is loading. Please wait a moment and try again.');
            return;
        }

        // Get the explanation section element (content to convert to PDF)
        const element = explanationSection;
        
        // Configure PDF options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate and download PDF
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Error generating PDF. Please try again or use the text download option.');
    }
}

// ============================================
// GEMINI API INTEGRATION POINT
// ============================================
// TODO: Replace the sample response logic with actual Gemini API calls
//
// Here's how you would integrate Gemini API:
//
// async function callGeminiAPI(subject, level, topic) {
//     const API_KEY = 'YOUR_GEMINI_API_KEY'; // Store this securely
//     const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY;
//     
//     const prompt = `Generate a ${level} level explanation about ${topic} in ${subject}. 
//                     Also provide 3 learning tips. Format the response as JSON with 'explanation' and 'tips' fields.`;
//     
//     try {
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{
//                         text: prompt
//                     }]
//                 }]
//             })
//         });
//         
//         const data = await response.json();
//         const generatedText = data.candidates[0].content.parts[0].text;
//         
//         // Parse the response and return explanation and tips
//         return parseGeminiResponse(generatedText);
//     } catch (error) {
//         console.error('Error calling Gemini API:', error);
//         throw error;
//     }
// }
//
// Then modify generateExplanation() to use:
// const response = await callGeminiAPI(subject, level, topic);
// displayResponse(response, topic);
// ============================================

// Main function to handle the generate button click
async function generateExplanation() {
    // Validate input before proceeding
    if (!validateInput()) {
        return;
    }

    // Get user selections
    const subject = subjectSelect.value;
    const level = levelSelect.value;
    const topic = topicInput.value.trim();
    const learningGoal = learningGoalSelect.value;

    // Show output card and loading message
    outputCard.style.display = 'block';
    loadingMessage.style.display = 'block';
    explanationSection.style.display = 'none';

    // Disable button during generation
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    // Simulate API call delay (1-2 seconds)
    // In production, replace this with actual Gemini API call
    const delay = getRandomDelay();
    
    setTimeout(() => {
        // TODO: Replace this with actual Gemini API call
        // For now, we're using sample responses
        // const response = await callGeminiAPI(subject, level, topic, learningGoal);
        // displayResponse(response, topic, learningGoal);
        
        // Using sample response for demonstration
        displayResponse(subject, level, topic, learningGoal);

        // Re-enable button
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate My Learning Plan';
    }, delay);
}

// Event Listener - Attach click handler to the generate button
// Only initialize if we're on the learning assistant page
if (generateBtn && subjectSelect && levelSelect && topicInput && learningGoalSelect) {
    generateBtn.addEventListener('click', generateExplanation);

    // Optional: Allow Enter key in topic input to trigger generation
    topicInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            generateExplanation();
        }
    });
}

// Download button event listeners
const downloadTextBtn = document.getElementById('downloadTextBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

if (downloadTextBtn) {
    downloadTextBtn.addEventListener('click', downloadAsText);
}

if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', downloadAsPDF);
}

