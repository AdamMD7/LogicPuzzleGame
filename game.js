// Initialize streak and game logic
console.log("JavaScript is running!");
let streak = localStorage.getItem('streak') || 0;
document.getElementById('streak-counter').textContent = `Streak: ${streak} days`;

let currentPuzzle = generateRandomPuzzle();
let hintsUsed = 0;

// Badge achievements
const badges = {
    "7-Day Streak": false,
    "30-Day Streak": false,
    "Speed Solver": false,
};

// Generate a random puzzle from the pool
function generateRandomPuzzle() {
    const puzzles = [
        { type: 'multiple-choice', question: 'Which statement is true?', options: ['A', 'B', 'C'], answer: 'A' },
        { type: 'drag-drop', task: 'Order the numbers from 1 to 4', answer: [1, 2, 3, 4] }
        // Add more puzzle types
    ];
    return puzzles[Math.floor(Math.random() * puzzles.length)];
}

// Display the puzzle based on type
function displayPuzzle(puzzle) {
    const puzzleArea = document.getElementById('puzzle-area');
    puzzleArea.innerHTML = ''; // Clear previous puzzle

    if (puzzle.type === 'multiple-choice') {
        const question = document.createElement('p');
        question.textContent = puzzle.question;
        puzzleArea.appendChild(question);

        puzzle.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, puzzle.answer);
            puzzleArea.appendChild(button);
        });
    }

    // Add similar logic for drag-drop puzzles
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById('feedback').textContent = 'Correct!';
        updateStreak();
        checkAchievements();
    } else {
        document.getElementById('feedback').textContent = 'Try Again!';
    }
}

// Update streak and save to local storage
function updateStreak() {
    streak++;
    localStorage.setItem('streak', streak);
    document.getElementById('streak-counter').textContent = `Streak: ${streak} days`;
}

// Use a hint for the current puzzle
function useHint() {
    if (hintsUsed < 1) {
        hintsUsed++;
        // Provide a hint (depends on puzzle type)
        document.getElementById('feedback').textContent = 'Here’s a hint!';
    } else {
        document.getElementById('feedback').textContent = 'No more hints available!';
    }
}

// Share results with a unique URL
document.getElementById('share-btn').onclick = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
};

function generateShareableLink() {
    return window.location.href + `?results=streak_${streak}`;
}

// Check and update achievements
function checkAchievements() {
    if (streak >= 7 && !badges["7-Day Streak"]) {
        badges["7-Day Streak"] = true;
        addBadge("7-Day Streak");
    }
    if (streak >= 30 && !badges["30-Day Streak"]) {
        badges["30-Day Streak"] = true;
        addBadge("30-Day Streak");
    }
}

function addBadge(name) {
    const badgeList = document.getElementById('badge-list');
    const badgeItem = document.createElement('li');
    badgeItem.textContent = `🏅 ${name}`;
    badgeList.appendChild(badgeItem);
}

// Initialize the game
displayPuzzle(currentPuzzle);

document.getElementById('hint-btn').onclick = useHint;
