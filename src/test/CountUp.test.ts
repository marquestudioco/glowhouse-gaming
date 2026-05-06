import { describe, it, expect } from 'vitest';

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

describe('CountUp logic', () => {
  it('starts at 0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });
  it('ends at target', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });
  it('interpolates midpoint', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });
});
