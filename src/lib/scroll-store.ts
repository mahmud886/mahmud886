// Shared, mutable scroll state read every frame by the WebGL scene.
// Deliberately not React state — writing it must never trigger a render.
export const scrollState = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
};
