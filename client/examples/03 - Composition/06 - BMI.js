import R from "ramda";
import { heroes } from "heroes-db";


// getWeightInKg :: Hero → Number
const getWeightInKg = R.compose(
  R.identity
);

assert.equals(getWeightInKg(heroes[0]), 101);



// getHeightInM :: Hero → Number
// meters = inches * 0.0254
const getHeightInM = R.compose(
  R.identity
);

assert.equals(getHeightInM(heroes[0]), 1.905);


/**
 * calcBMI :: Hero → Number
 * bmi = kg / m^2
 * Underweight = <18.5
 * Normal weight = 18.5–24.9
 * Overweight = 25–29.9
 * Obesity = BMI of 30 or greater
 */
const calcBMI = hero => getWeightInKg(hero) / (getHeightInM(hero) ** 2);

assert.equals(calcBMI(heroes[0]), 27.83);



R.map(R.applySpec({
  name: R.prop("name"),
  weight: R.path(["appearance", "weight"]),
  height: R.path(["appearance", "height"]),
  bmi: calcBMI
}), heroes);
