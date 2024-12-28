// Game state
let state = {
  allTimeClicks: 0,
  bucks: 1000,
  mult: 1,
  cps: 0,
  level: 1,
  nextLevelReward: 200,
  xp: 0,
  neededXP: 100,
  showAllUpgrades: false,
  darkMode: false,
  achievements: {},
  upgrades: {},
};

// Constants
const REWARD_RATE = 1.1;
const XP_RATE = 1.7;

// Upgrades data
const upgrades = [
  {
    id: "autoClicker",
    name: "Auto Clicker",
    baseCost: 100,
    mult: 0,
    cps: 1,
    description: "Clicks for you automatically",
  },
  {
    id: "fingers",
    name: "Extra Fingers",
    baseCost: 100,
    mult: 1,
    cps: 0,
    description: "More fingers, more clicks",
  },
  {
    id: "feet",
    name: "Clicking Feet",
    baseCost: 150,
    mult: 3,
    cps: -1,
    description: "Use your feet for extra clicks",
  },
  {
    id: "programmer",
    name: "Junior Programmer",
    baseCost: 1000,
    mult: 5,
    cps: 5,
    description: "Writes simple scripts to click",
  },
  {
    id: "ai",
    name: "AI Assistant",
    baseCost: 5000,
    mult: 10,
    cps: 20,
    description: "Learns to click efficiently",
  },
  {
    id: "quantumClicker",
    name: "Quantum Clicker",
    baseCost: 50000,
    mult: 50,
    cps: 100,
    description: "Clicks in multiple universes",
  },
  {
    id: "timeWarp",
    name: "Time Warp Device",
    baseCost: 100000,
    mult: 100,
    cps: 500,
    description: "Bends time to click faster",
  },
  {
    id: "clickverse",
    name: "Clickverse",
    baseCost: 1000000,
    mult: 1000,
    cps: 10000,
    description: "An entire universe dedicated to clicking",
  },
  {
    id: "superAutoClicker",
    name: "Super Auto Clicker",
    baseCost: 500000,
    mult: 0,
    cps: 1000,
    description: "A more powerful version of the Auto Clicker",
  },
];

// Achievements data
const achievements = [
  {
    id: "firstClick",
    name: "First Click",
    description: "Make your first click",
    condition: (state) => state.allTimeClicks >= 1,
  },
  {
    id: "hundredClicks",
    name: "Click Enthusiast",
    description: "Reach 100 clicks",
    condition: (state) => state.allTimeClicks >= 100,
  },
  {
    id: "thousandClicks",
    name: "Click Master",
    description: "Reach 1,000 clicks",
    condition: (state) => state.allTimeClicks >= 1000,
  },
  {
    id: "millionClicks",
    name: "Click Millionaire",
    description: "Reach 1,000,000 clicks",
    condition: (state) => state.allTimeClicks >= 1000000,
  },
  {
    id: "billionClicks",
    name: "Click Billionaire",
    description: "Reach 1,000,000,000 clicks",
    condition: (state) => state.allTimeClicks >= 1000000000,
  },
  {
    id: "firstUpgrade",
    name: "Upgrade Novice",
    description: "Buy your first upgrade",
    condition: (state) =>
      Object.values(state.upgrades).some((count) => count > 0),
  },
  {
    id: "fiveUpgrades",
    name: "Upgrade Enthusiast",
    description: "Buy 5 different upgrades",
    condition: (state) =>
      Object.values(state.upgrades).filter((count) => count > 0).length >= 5,
  },
  {
    id: "allUpgrades",
    name: "Upgrade Master",
    description: "Buy all upgrades at least once",
    condition: (state) =>
      Object.values(state.upgrades).every((count) => count > 0),
  },
  {
    id: "level10",
    name: "Level Up",
    description: "Reach level 10",
    condition: (state) => state.level >= 10,
  },
  {
    id: "level50",
    name: "High Achiever",
    description: "Reach level 50",
    condition: (state) => state.level >= 50,
  },
  {
    id: "level100",
    name: "Clicking Legend",
    description: "Reach level 100",
    condition: (state) => state.level >= 100,
  },
  {
    id: "level500",
    name: "Clicking God",
    description: "Reach level 500",
    condition: (state) => state.level >= 500,
  },
  {
    id: "cps100",
    name: "Efficiency Expert",
    description: "Reach 100 clicks per second",
    condition: (state) => state.cps >= 100,
  },
  {
    id: "cps1000",
    name: "Click Factory",
    description: "Reach 1,000 clicks per second",
    condition: (state) => state.cps >= 1000,
  },
  {
    id: "cps10000",
    name: "Click Singularity",
    description: "Reach 10,000 clicks per second",
    condition: (state) => state.cps >= 10000,
  },
  {
    id: "mult100",
    name: "Multiplier Maestro",
    description: "Reach a multiplier of 100x",
    condition: (state) => state.mult >= 100,
  },
  {
    id: "mult1000",
    name: "Multiplier Magnate",
    description: "Reach a multiplier of 1,000x",
    condition: (state) => state.mult >= 1000,
  },
];

// DOM Elements
const elements = {
  userClicks: document.getElementById("user-clicks"),
  userBucks: document.getElementById("user-bucks"),
  userMult: document.getElementById("user-mult"),
  userCps: document.getElementById("user-cps"),
  userLevel: document.getElementById("user-level"),
  nextLevelReward: document.getElementById("next-level-reward"),
  xp: document.getElementById("xp"),
  neededXp: document.getElementById("needed-xp"),
  xpBar: document.getElementById("xp-bar"),
  xpPercentage: document.getElementById("xp-percentage"),
  clickButton: document.getElementById("click-button"),
  upgradesList: document.getElementById("upgrades-list"),
  achievementsList: document.getElementById("achievements-list"),
  settingsModal: document.getElementById("settings-modal"),
  settingsContent: document.querySelector("#settings-modal > div"),
  openSettings: document.getElementById("open-settings"),
  closeSettings: document.getElementById("close-settings"),
  saveGame: document.getElementById("save-game"),
  resetGame: document.getElementById("reset-game"),
  toggleUpgrades: document.getElementById("toggle-upgrades"),
  darkModeToggle: document.getElementById("dark-mode-toggle"),
};

// Initialize game
function initGame() {
  loadGame();
  initDarkMode();
  updateDisplay();
  createUpgrades();
  createAchievements();
  setInterval(autoClick, 1000);
  setInterval(saveGame, 5000);
  setInterval(checkAchievements, 1000);
}

// Click actions
function clickActions() {
  state.xp += state.mult;
  state.allTimeClicks += state.mult;
  state.bucks += state.mult;
  if (state.xp >= state.neededXP) {
    levelUp();
  }
  updateDisplay();
  animateClickButton();
}

// Level up
function levelUp() {
  state.level++;
  state.xp = 0;
  state.bucks += state.nextLevelReward;
  state.nextLevelReward = Math.round(
    state.nextLevelReward + 100 * state.level * REWARD_RATE
  );
  state.neededXP = Math.round(state.neededXP + 100 * state.level * XP_RATE);
  updateDisplay();
  showLevelUpAnimation();
}

// Auto click (CPS)
function autoClick() {
  state.bucks += state.cps;
  state.xp += state.cps;
  state.allTimeClicks += state.cps;
  if (state.xp >= state.neededXP) {
    levelUp();
  }
  updateDisplay();
}

// Update display
function updateDisplay() {
  elements.userClicks.textContent = formatNumber(state.allTimeClicks);
  elements.userBucks.textContent = formatNumber(state.bucks);
  elements.userMult.textContent = formatNumber(state.mult) + "x";
  elements.userCps.textContent = formatNumber(state.cps);
  elements.userLevel.textContent = state.level;
  elements.nextLevelReward.textContent = formatNumber(state.nextLevelReward);
  elements.xp.textContent = formatNumber(state.xp);
  elements.neededXp.textContent = formatNumber(state.neededXP);

  const xpPercentage = (state.xp / state.neededXP) * 100;
  elements.xpBar.style.width = `${xpPercentage}%`;
  elements.xpPercentage.textContent = `${Math.round(xpPercentage)}%`;

  updateUpgradeAvailability();
}

// Format large numbers
function formatNumber(num) {
  if (num >= 1e15) return (num / 1e15).toFixed(1) + "Q";
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toLocaleString("en-US");
}

// Create upgrades
function createUpgrades() {
  upgrades.forEach((upgrade) => {
    const upgradeElement = document.createElement("div");
    upgradeElement.className =
      "bg-gray-100 rounded p-4 transition-all duration-300 ease-in-out transform hover:scale-105";
    upgradeElement.innerHTML = `
            <h3 class="text-lg font-semibold text-blue-600">${upgrade.name}</h3>
            <p class="text-sm text-gray-600 mb-2">Cost: <span class="text-yellow-500">${formatNumber(
              upgrade.baseCost
            )}</span> bucks</p>
            <p class="text-sm">Mult: <span class="text-green-500">+${
              upgrade.mult
            }</span> | CPS: <span class="text-purple-500">+${
      upgrade.cps
    }</span></p>
            <p class="text-xs text-gray-500 mt-1">${upgrade.description}</p>
            <button class="upgrade-button mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-300 ease-in-out" data-id="${
              upgrade.id
            }">
                Purchase
            </button>
        `;
    elements.upgradesList.appendChild(upgradeElement);
  });

  document.querySelectorAll(".upgrade-button").forEach((button) => {
    button.addEventListener("click", () => purchaseUpgrade(button.dataset.id));
  });
}

// Update upgrade availability
function updateUpgradeAvailability() {
  upgrades.forEach((upgrade) => {
    const button = document.querySelector(
      `.upgrade-button[data-id="${upgrade.id}"]`
    );
    if (button) {
      const upgradeElement = button.closest("div");
      if (state.bucks >= upgrade.baseCost) {
        button.disabled = false;
        upgradeElement.classList.remove("opacity-50");
      } else {
        button.disabled = true;
        upgradeElement.classList.add("opacity-50");
      }
    }
  });
}

// Purchase upgrade
function purchaseUpgrade(id) {
  const upgrade = upgrades.find((u) => u.id === id);
  if (state.bucks >= upgrade.baseCost) {
    state.bucks -= upgrade.baseCost;
    state.mult += upgrade.mult;
    state.cps += upgrade.cps;
    upgrade.baseCost = Math.round(upgrade.baseCost * 1.15);
    state.upgrades[id] = (state.upgrades[id] || 0) + 1;
    updateDisplay();
    updateUpgradeElement(upgrade);
    showUpgradeAnimation(upgrade.name);
  }
}

// Update upgrade element after purchase
function updateUpgradeElement(upgrade) {
  const upgradeElement = document
    .querySelector(`.upgrade-button[data-id="${upgrade.id}"]`)
    .closest("div");
  upgradeElement.querySelector(
    "p"
  ).innerHTML = `Cost: <span class="text-yellow-500">${formatNumber(
    upgrade.baseCost
  )}</span> bucks`;
}

// Create achievements
function createAchievements() {
  achievements.forEach((achievement) => {
    const achievementElement = document.createElement("div");
    achievementElement.className =
      "achievement bg-gray-100 rounded p-2 flex items-center";
    achievementElement.innerHTML = `
            <div class="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                <span class="text-xl">🔒</span>
            </div>
            <div>
                <h4 class="text-sm font-semibold text-blue-600">${achievement.name}</h4>
                <p class="text-xs text-gray-500">${achievement.description}</p>
            </div>
        `;
    elements.achievementsList.appendChild(achievementElement);
  });
}

// Check achievements
function checkAchievements() {
  achievements.forEach((achievement) => {
    if (!state.achievements[achievement.id] && achievement.condition(state)) {
      unlockAchievement(achievement);
    }
  });
}

// Unlock achievement
function unlockAchievement(achievement) {
  state.achievements[achievement.id] = true;
  const achievementElement = document.querySelector(
    `.achievement:nth-child(${achievements.indexOf(achievement) + 1})`
  );
  achievementElement.classList.add("unlocked");
  achievementElement.querySelector(".bg-gray-300").innerHTML =
    '<span class="text-xl">🏆</span>';
  showAchievementAnimation(achievement.name);
}

// Save game
function saveGame() {
  localStorage.setItem("clickerGameState", JSON.stringify(state));
}

// Load game
function loadGame() {
  const savedState = localStorage.getItem("clickerGameState");
  if (savedState) {
    state = JSON.parse(savedState);
  }
}

// Reset game
function resetGame() {
  if (
    confirm(
      "Are you sure you want to reset the game? All progress will be lost."
    )
  ) {
    localStorage.removeItem("clickerGameState");
    location.reload();
  }
}

// Toggle show all upgrades
function toggleAllUpgrades() {
  state.showAllUpgrades = !state.showAllUpgrades;
  elements.upgradesList.classList.toggle("show-all");
  elements.toggleUpgrades.textContent = state.showAllUpgrades
    ? "Hide Unavailable Upgrades"
    : "Show All Upgrades";
}

// Animate click button
function animateClickButton() {
  elements.clickButton.classList.add("animate-click");
  setTimeout(() => {
    elements.clickButton.classList.remove("animate-click");
  }, 100);
}

// Show level up animation
function showLevelUpAnimation() {
  const levelUpMessage = document.createElement("div");
  levelUpMessage.className =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none text-4xl font-bold transition duration-300 text-yellow-500 animate-level-up";
  levelUpMessage.textContent = "Level Up!";
  document.body.appendChild(levelUpMessage);
  setTimeout(() => {
    document.body.removeChild(levelUpMessage);
  }, 2000);
}

// Show upgrade animation
function showUpgradeAnimation(upgradeName) {
  const upgradeMessage = document.createElement("div");
  upgradeMessage.className =
    "fixed bottom-4 left-4 bg-blue-500 text-white select-none px-4 py-2 rounded";
  upgradeMessage.textContent = `Upgraded: ${upgradeName}`;
  document.body.appendChild(upgradeMessage);

  gsap.fromTo(
    upgradeMessage,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
  );

  gsap.to(upgradeMessage, {
    y: -50,
    opacity: 0,
    delay: 2.5,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => document.body.removeChild(upgradeMessage),
  });
}

// Show achievement animation
function showAchievementAnimation(achievementName) {
  const achievementMessage = document.createElement("div");
  achievementMessage.className =
    "fixed top-4 right-4 bg-yellow-500 text-white select-none px-4 py-2 rounded";
  achievementMessage.textContent = `Achievement Unlocked: ${achievementName}`;
  document.body.appendChild(achievementMessage);

  gsap.fromTo(
    achievementMessage,
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
  );

  gsap.to(achievementMessage, {
    x: 50,
    opacity: 0,
    delay: 2.5,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => document.body.removeChild(achievementMessage),
  });
}

// Apply dark mode
function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// Add dark mode initialization
function initDarkMode() {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  state.darkMode = savedDarkMode;
  elements.darkModeToggle.checked = savedDarkMode;
  if (savedDarkMode) {
    document.body.classList.add("dark");
  }
}

// Event listeners
elements.clickButton.addEventListener("click", clickActions);
elements.openSettings.addEventListener("click", () => {
  elements.settingsModal.classList.remove("hidden");
  elements.settingsModal.classList.add("flex");
  setTimeout(() => {
    elements.settingsContent.classList.remove("scale-0");
    elements.settingsContent.classList.add("scale-100");
  }, 50);
});
elements.closeSettings.addEventListener("click", () => {
  elements.settingsContent.classList.remove("scale-100");
  elements.settingsContent.classList.add("scale-0");
  setTimeout(() => {
    elements.settingsModal.classList.remove("flex");
    elements.settingsModal.classList.add("hidden");
  }, 300);
});
elements.saveGame.addEventListener("click", () => {
  saveGame();
  alert("Game progress saved!");
});
elements.resetGame.addEventListener("click", resetGame);
elements.toggleUpgrades.addEventListener("click", toggleAllUpgrades);
elements.darkModeToggle.addEventListener("change", (e) => {
  state.darkMode = e.target.checked;
  if (state.darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  localStorage.setItem("darkMode", state.darkMode.toString());
});

// Initialize the game
initGame();
