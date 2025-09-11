// script.js - works for index.html (quiz) and results.html (results)
// Put this single file on both pages.

console.log("Script loaded");

const CONFIG = {
    IMAGE_BASE: 'images/',
    DEFAULT_IMAGE: 'Mediator.png',
    DASH_SEPARATOR: /[-–]\s*/,
    ZERO_EPS: 1e-9
};

// the exact questions you originally gave (40 total)
const questions = [
    // Conservative – Liberal (10)
    { text: "Should the law protect human life from conception in all circumstances?", vector: "Conservative – Liberal", values: { "1": 1, "0.5": 0.5, "0": 0, "-0.5": -0.5, "-1": -1 } },
    { text: "Should the Church give blessings to same-sex couples?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0": 0, "-0.5": 0.5, "-1": 1 } },
    { text: "Should the Bible be understood mainly symbolically, not literally?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0": 0, "-0.5": 0.5, "-1": 1 } },
    { text: "Should priestly celibacy be mandatory?", vector: "Conservative – Liberal", values: { "1": 1, "0.5": 0.5, "0":0, "-0.5": -0.5, "-1": -1 } },
    { text: "Should women be allowed to receive priestly ordination?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5": 0.5, "-1": 1 } },
    { text: "Should the Church engage more in social and ecological matters?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5": 0.5, "-1": 1 } },
    { text: "Should traditional sexual morality still be taught?", vector: "Conservative – Liberal", values: { "1": 1, "0.5": 0.5, "0":0, "-0.5": -0.5, "-1": -1 } },
    { text: "Should Church teaching adapt to social changes?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5": 0.5, "-1": 1 } },
    { text: "Should moral decisions rely solely on Church teaching?", vector: "Conservative – Liberal", values: { "1": 1, "0.5": 0.5, "0":0, "-0.5": -0.5, "-1": -1 } },
    { text: "Can current Church teaching conflict with the Bible?", vector: "Conservative – Liberal", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5": 0.5, "-1": 1 } },

    // Individualism – Communitarianism (10)
    { text: "Is faith primarily a personal matter?", vector: "Individualism – Communitarianism", values: { "1": 1, "0.5":0.5, "0":0, "-0.5": -0.5, "-1": -1 } },
    { text: "Can you be a good Christian without community life?", vector: "Individualism – Communitarianism", values: { "1": 1, "0.5":0.5, "0":0, "-0.5": -0.5, "-1": -1 } },
    { text: "Is confession directly to God sufficient without a priest?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Should Church authority matter more than individual conscience?", vector: "Individualism – Communitarianism", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Can online Mass fully replace physical attendance?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Is personal relationship with God more important than community practices?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Is hermit-style spirituality as valuable as parish life?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Should religious upbringing happen mainly at home?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Does active parish participation deepen faith?", vector: "Individualism – Communitarianism", values: { "1": -1, "0.5": -0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Can distrust in community affect your engagement?", vector: "Individualism – Communitarianism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },

    // Emotionality – Intellectualism (10)
    { text: "Are feelings more important than reflection in prayer?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Is helping the needy a key part of your faith?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Are miracles and signs necessary to confirm faith?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Would you attend a worship concert over a theological debate?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Do emotional spiritual experiences matter to you?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Is studying Scripture and catechism more important than experiences?", vector: "Emotionality – Intellectualism", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Are testimonies from believers more convincing than theology?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Does theological reflection help understand God personally?", vector: "Emotionality – Intellectualism", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Can spiritual experiences strengthen faith more than knowledge?", vector: "Emotionality – Intellectualism", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Do you regularly read theological books?", vector: "Emotionality – Intellectualism", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },

    // Ritualism – Charismatic (10)
    { text: "Are traditional liturgical rituals fundamental to faith?", vector: "Ritualism – Charismatic", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Is spontaneous prayer more important than formal prayers?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Does body posture matter in prayer?", vector: "Ritualism – Charismatic", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Do you like instruments like guitar at Mass?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Does sacrament efficacy depend on personal experience?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Do you prefer music over silence during liturgy?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Do you attend weekday Mass regularly?", vector: "Ritualism – Charismatic", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Do gifts of the Holy Spirit like tongues still occur?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } },
    { text: "Is attending parish services important?", vector: "Ritualism – Charismatic", values: { "1":1, "0.5":0.5, "0":0, "-0.5":-0.5, "-1":-1 } },
    { text: "Do charismatic experiences enhance your spiritual life?", vector: "Ritualism – Charismatic", values: { "1":-1, "0.5":-0.5, "0":0, "-0.5":0.5, "-1":1 } }
];

// Personalities (as you originally supplied) + Mediator (neutral)
const personalities = [
    { name: "Pilgrim", vectors: { "Conservative – Liberal": -0.5, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": -1 } },
    { name: "Monastic", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": -1 } },
    { name: "Sage", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": -1 } },
    { name: "Revivalist", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": 1 } },
    { name: "Mystic", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": 1 } },
    { name: "Reformer", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": 1 } },
    { name: "Hermit", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": -1 } },
    { name: "Disciple", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": -1 } },
    { name: "Templar", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": -1 } },
    { name: "Scribe", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": -1 } },
    { name: "Preacher", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": 1 } },
    { name: "Crusader", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": -1 } },
    { name: "Theologian", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": -1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": -1 } },
    { name: "Prophet", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": 1 } },
    { name: "Contemplative", vectors: { "Conservative – Liberal": 1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": 1, "Ritualism – Charismatic": -1 } },
    { name: "Seeker", vectors: { "Conservative – Liberal": -1, "Individualism – Communitarianism": 1, "Emotionality – Intellectualism": -1, "Ritualism – Charismatic": 1 } },
    // Mediator (neutral)
    { name: "Mediator", vectors: { "Conservative – Liberal": 0, "Individualism – Communitarianism": 0, "Emotionality – Intellectualism": 0, "Ritualism – Charismatic": 0 } }
];

// Scale labels for UI
const scaleLabels = {
    "1": "Yes",
    "0.5": "Rather Yes",
    "0": "I don't know",
    "-0.5": "Rather No",
    "-1": "No"
};

// Utility to detect current page
function isResultsPage() {
    const p = window.location.pathname.split("/").pop();
    return p === "results.html" || p === "results";
}

// --- QUIZ PAGE LOGIC ---
if (!isResultsPage()) {
    const form = document.getElementById("quizForm");
    const progressBar = document.getElementById("progressBar");
    const submitBtn = document.getElementById("submitBtn");

    // Render questions
    questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${i + 1}. ${q.text}</p>`;
        // Render options in order (Yes ... No)
        ["1","0.5","0","-0.5","-1"].forEach(valKey => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="q${i}" value="${valKey}"> ${scaleLabels[valKey]}`;
            div.appendChild(label);
        });
        form.appendChild(div);
    });

    // Progress update
    form.addEventListener("change", () => {
        const total = questions.length;
        const answered = form.querySelectorAll("input[type='radio']:checked").length;
        progressBar.style.width = `${(answered / total) * 100}%`;
    });

    // Submit
    submitBtn.addEventListener("click", () => {
        const formData = new FormData(form);
        const scores = {
            "Conservative – Liberal": 0,
            "Individualism – Communitarianism": 0,
            "Emotionality – Intellectualism": 0,
            "Ritualism – Charismatic": 0
        };
        let allAnswered = true;

        questions.forEach((q, i) => {
            const valKey = formData.get(`q${i}`);
            if (valKey === null) {
                allAnswered = false;
            } else {
                const numeric = q.values[valKey];
                scores[q.vector] += numeric;
            }
        });

        if (!allAnswered) {
            alert("Please answer all questions.");
            return;
        }

        // Normalize by number of questions per vector
        const vectors = Object.keys(scores);
        vectors.forEach(v => {
            const count = questions.filter(q => q.vector === v).length;
            if (count > 0) scores[v] = +(scores[v] / count).toFixed(4); // keep 4 decimals
            else scores[v] = 0;
        });

        sessionStorage.setItem("scores", JSON.stringify(scores));
        // go to results page
        window.location.href = "results.html";
    });
}

// --- RESULTS PAGE LOGIC ---
if (isResultsPage()) {
    const resultDiv = document.getElementById("result");
    const graphContainer = document.getElementById("graphContainer");
    const otherPersonalitiesDiv = document.getElementById("otherPersonalities");

    const raw = sessionStorage.getItem("scores");
    const scores = raw ? JSON.parse(raw) : null;

    if (!scores) {
        resultDiv.innerHTML = "<p>Error loading results. Please retake the quiz.</p>";
        console.error("Missing scores in sessionStorage");
    } else {
        // Check if all vectors are exactly neutral (0) -> show Mediator
        const allNeutral = Object.values(scores).every(s => Math.abs(s) < CONFIG.ZERO_EPS);

        let personalityToShow = null;
        if (allNeutral) {
            personalityToShow = "Mediator";
        } else {
            // Find closest personality by Euclidean distance (exclude Mediator from candidates)
            let smallest = Infinity;
            let closest = null;
            personalities.forEach(p => {
                if (p.name === "Mediator") return; // don't pick mediator unless all neutral
                let dist = 0;
                for (let v in scores) {
                    const pv = (p.vectors[v] === undefined ? 0 : p.vectors[v]);
                    const diff = scores[v] - pv;
                    dist += diff * diff;
                }
                dist = Math.sqrt(dist);
                if (dist < smallest) {
                    smallest = dist;
                    closest = p.name;
                }
            });
            personalityToShow = closest || "Mediator";
        }

        loadResultImage(resultDiv, personalityToShow);
        renderGraphs(graphContainer, scores);
        renderOtherPersonalities(otherPersonalitiesDiv, personalityToShow);
    }
}

// --- helper functions used on results page ---
function loadResultImage(resultDiv, personality) {
    const imagePath = `${CONFIG.IMAGE_BASE}${personality}.png`;
    const img = new Image();
    img.onload = () => {
        resultDiv.innerHTML = `
            <h2>Your Result</h2>
            <p>You are a <strong>${personality}</strong>!</p>
            <img src="${imagePath}" alt="${personality} spiritual personality image" class="result-image">
        `;
    };
    img.onerror = () => {
        const fallback = `${CONFIG.IMAGE_BASE}${CONFIG.DEFAULT_IMAGE}`;
        resultDiv.innerHTML = `
            <h2>Your Result</h2>
            <p>You are a <strong>${personality}</strong>!</p>
            <img src="${fallback}" alt="Default image" class="result-image">
        `;
        console.warn(`Image not found for ${personality}. Using fallback ${fallback}`);
    };
    img.src = imagePath;
}

function renderGraphs(graphContainer, scores) {
    graphContainer.innerHTML = "<h3 id='vector-title'>Your Vector Scores</h3>";
    const fragment = document.createDocumentFragment();

    for (let vector in scores) {
        const parts = vector.split(CONFIG.DASH_SEPARATOR);
        if (parts.length !== 2) continue;
        const [negSide, posSide] = parts.map(s => s.trim());
        const rawScore = Math.max(-1, Math.min(1, scores[vector]));
        const val = (rawScore + 1) / 2; // 0..1 proportion for positive side

        const container = document.createElement("div");
        container.className = "vector-bar";

        const negSegment = document.createElement("div");
        const posSegment = document.createElement("div");

        // CSS classes (lowercased, no spaces)
        negSegment.className = `vector-segment ${negSide.toLowerCase().replace(/\s/g, "")}`;
        posSegment.className = `vector-segment ${posSide.toLowerCase().replace(/\s/g, "")}`;

        // Use flex-grow so the two segments fill proportionally
        negSegment.style.flexGrow = `${1 - val}`;
        posSegment.style.flexGrow = `${val}`;

        container.appendChild(negSegment);
        container.appendChild(posSegment);

        const label = document.createElement("div");
        label.className = "vector-label";
        // NO numeric display - just the vector name
        label.textContent = `${negSide} – ${posSide}`;

        fragment.appendChild(container);
        fragment.appendChild(label);
    }

    graphContainer.appendChild(fragment);
}

function renderOtherPersonalities(container, currentPersonality) {
    container.innerHTML = "<h3>Other Personalities</h3>";
    const grid = document.createElement("div");
    grid.className = "personality-grid";

    const others = personalities.filter(p => p.name !== currentPersonality);
    others.forEach(p => {
        const item = document.createElement("div");
        item.className = "personality-item";
        const imgPath = `${CONFIG.IMAGE_BASE}${p.name}.png`;
        item.innerHTML = `
            <img src="${imgPath}" alt="${p.name}" class="small-icon"
                 onerror="this.onerror=null; this.src='${CONFIG.IMAGE_BASE}${CONFIG.DEFAULT_IMAGE}'; this.alt='Default image';">
            <p>${p.name}</p>
        `;
        grid.appendChild(item);
    });

    container.appendChild(grid);
}
