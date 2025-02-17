const workouts = {
  push: [
    { name: 'Flat Bench Press', sets: 4 },
    { name: 'Fly Machine Press', sets: 3 },
    { name: 'Lateral Raise', sets: 4 },
    { name: 'Dips', sets: 3 },
    { name: 'Overhead Triceps Extension', sets: 3 }
  ],
  pull: [
    { name: 'Lat Pulldown', sets: 4 },
    { name: 'Back Row', sets: 3 },
    { name: 'Rear Delt Fly', sets: 3 },
    { name: 'Bicep Curl', sets: 4 }
  ],
  legs: [
    { name: 'Barbell Back Squat', sets: 3 },
    { name: 'Leg Press', sets: 4 },
    { name: 'Leg Extension', sets: 3 },
    { name: 'Leg Curl', sets: 3 },
    { name: 'Calf Raise', sets: 4 }
  ]
};

function showWorkout(type) {
  const container = document.getElementById('workout-container');
  container.innerHTML = '';

  const section = document.createElement('div');
  section.className = 'workout-section';

  workouts[type].forEach((exercise) => {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.innerHTML = `<h3>${exercise.name}</h3>`;

    for (let i = 1; i <= exercise.sets; i++) {
      const lastWeight = getLastWeight(exercise.name, i);
      const lastReps = getLastReps(exercise.name, i);

      exerciseDiv.innerHTML += `
        <label>Set ${i}:</label>
        <input type="number" id="${exercise.name}-weight${i}" placeholder="Weight (kg)" />
        <input type="number" id="${exercise.name}-reps${i}" placeholder="Reps" />
        <div class="last-weight">Last: ${lastWeight ? lastWeight + ' kg' : 'N/A'} | Reps: ${lastReps ? lastReps : 'N/A'}</div>
        <br />
      `;
    }

    exerciseDiv.innerHTML += `<button class="save-btn" onclick="saveWorkout('${exercise.name}', ${exercise.sets})">Save</button>`;
    section.appendChild(exerciseDiv);
  });

  container.appendChild(section);
}

function saveWorkout(exerciseName, sets) {
  for (let i = 1; i <= sets; i++) {
    const weight = document.getElementById(`${exerciseName}-weight${i}`).value;
    const reps = document.getElementById(`${exerciseName}-reps${i}`).value;

    if (weight && reps) {
      localStorage.setItem(`${exerciseName}-weight${i}`, weight);
      localStorage.setItem(`${exerciseName}-reps${i}`, reps);
    }
  }
  alert('Workout saved successfully!');
}

function getLastWeight(exerciseName, set) {
  return localStorage.getItem(`${exerciseName}-weight${set}`);
}

function getLastReps(exerciseName, set) {
  return localStorage.getItem(`${exerciseName}-reps${set}`);
}

window.onload = () => showWorkout('push');

  
