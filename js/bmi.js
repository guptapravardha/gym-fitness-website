/* =========================================================
   BMI.JS — Interactive BMI + calorie + water calculator
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmi-form');
  if(!form) return;

  const resultCard = document.getElementById('bmi-result');
  const bmiValueEl = document.getElementById('bmi-value');
  const bmiCatEl = document.getElementById('bmi-category');
  const bmiRangeEl = document.getElementById('bmi-range');
  const calorieEl = document.getElementById('bmi-calories');
  const waterEl = document.getElementById('bmi-water');
  const needleEl = document.getElementById('bmi-needle');
  const healthyRangeEl = document.getElementById('healthy-weight-range');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value); // cm
    const weight = parseFloat(document.getElementById('weight').value); // kg
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
    const activity = document.getElementById('activity').value;

    if(!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0){
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      return;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    let category, catColor;
    if(bmi < 18.5){ category = 'Underweight'; catColor = '#5ec8ff'; }
    else if(bmi < 25){ category = 'Healthy Weight'; catColor = '#7CFF3B'; }
    else if(bmi < 30){ category = 'Overweight'; catColor = '#ffcf4d'; }
    else { category = 'Obese'; catColor = '#ff5f5f'; }

    /* healthy weight range for this height */
    const minHealthy = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthy = (24.9 * heightM * heightM).toFixed(1);

    /* BMR — Mifflin-St Jeor */
    let bmr;
    if(gender === 'male'){
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityMultipliers = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, athlete:1.9 };
    const calories = Math.round(bmr * (activityMultipliers[activity] || 1.2));

    /* water intake: 35ml per kg roughly, adjusted for activity */
    const waterBase = weight * 0.035;
    const waterAdjust = { sedentary:1, light:1.05, moderate:1.15, active:1.3, athlete:1.45 };
    const water = (waterBase * (waterAdjust[activity] || 1)).toFixed(1);

    /* update UI */
    resultCard.classList.add('show');
    bmiValueEl.textContent = bmi.toFixed(1);
    bmiValueEl.style.color = catColor;
    bmiCatEl.textContent = category;
    bmiCatEl.style.background = catColor + '22';
    bmiCatEl.style.color = catColor;
    bmiCatEl.style.borderColor = catColor;
    bmiRangeEl.textContent = `Healthy BMI range: 18.5 – 24.9`;
    healthyRangeEl.textContent = `${minHealthy}kg – ${maxHealthy}kg`;
    calorieEl.textContent = calories.toLocaleString();
    waterEl.textContent = water + ' L';

    /* needle position on gauge (BMI 15 to 40 mapped to 0-180deg) */
    const clampedBmi = Math.max(15, Math.min(40, bmi));
    const pct = (clampedBmi - 15) / (40 - 15);
    const deg = pct * 180 - 90;
    if(needleEl) needleEl.style.transform = `rotate(${deg}deg)`;

    resultCard.scrollIntoView({ behavior:'smooth', block:'center' });
  });
});
