// De Casteljau's algorithm

const combination = (n, r) => {
  if (r == 0 || n == r) return 1;

  return combination(n - 1, r - 1) + combination(n - 1, r);
};

const bernsteinPolynomial = (n, i, point) => {
  const pow = n - i;
  const coeff = combination(n, i);

  return (t) => point * (coeff * ((1 - t) ** pow * t ** i)); // comb(n,r) * (1-t)^n-i * t^i
};

const createBezierFunc = (controlPoints) => {
  let i = 0;
  const n = controlPoints.length - 1; // degree of the curve
  const bx = []; // bx is an array of Bernstein polynomials for x value of point
  const by = []; // by is an array of Bernstein polynomials for y value of point

  for (i; i <= n; i++) {
    const b_x = bernsteinPolynomial(n, i, controlPoints[i].x);
    const b_y = bernsteinPolynomial(n, i, controlPoints[i].y);

    bx.push(b_x);
    by.push(b_y);
  }

  const x = (t) => bx.map((v) => v(t)).reduce((a, c) => a + c, 0);
  const y = (t) => by.map((v) => v(t)).reduce((a, c) => a + c, 0);

  return (t) => ({ x: x(t), y: y(t) });
};

const time = 1; // period
const interval = 0.25; // if the interval value is higher, it will be softer curve
const controlPoints = [
  { x: 0, y: 0 },
  { x: 0.5, y: 1 },
  { x: 1, y: 0 },
];

const bezierCurve = createBezierFunc(controlPoints);

const curvePoints = [];

for (let t = 0; t <= time; t += interval) {
  curvePoints.push(bezierCurve(t));
}

console.log(...curvePoints);
