export const contourRingCount = 15;

interface Options {
  /** Seconds of slow shape-shifting. */
  time?: number;
  /** 0 to 1: how far every ring has moved towards the position of the next one. */
  flow?: number;
  /** Decimals in the output. The animation needs them to avoid visible jitter. */
  precision?: number;
}

/** Builds the topographic lines behind the hero. The same input always gives the same lines. */
export function contourPaths(cx: number, cy: number, { time = 0, flow = 0, precision = 0 }: Options = {}) {
  const step = 40;
  const pointCount = 40;
  const factor = 10 ** precision;
  const round = (value: number) => Math.round(value * factor) / factor;
  const paths: string[] = [];

  for (let index = 0; index < contourRingCount; index++) {
    const ring = index + flow;
    const base = 70 + ring * step;
    const points: [number, number][] = [];

    for (let n = 0; n < pointCount; n++) {
      const a = (n / pointCount) * Math.PI * 2;
      const wobble =
        1 +
        0.17 * Math.sin(2 * a + 1.3 + ring * 0.06 + time * 0.09) +
        0.1 * Math.sin(3 * a + 4.1 - ring * 0.05 - time * 0.13) +
        0.05 * Math.sin(5 * a + 2.2 + ring * 0.09 + time * 0.17) +
        0.025 * Math.sin(7 * a + 0.6 - time * 0.21);
      points.push([cx + Math.cos(a) * base * wobble * 1.25, cy + Math.sin(a) * base * wobble]);
    }

    const mid = (i: number) => {
      const [x1, y1] = points[i % pointCount];
      const [x2, y2] = points[(i + 1) % pointCount];
      return `${round((x1 + x2) / 2)} ${round((y1 + y2) / 2)}`;
    };

    let d = `M${mid(0)}`;
    for (let i = 1; i <= pointCount; i++) {
      const [x, y] = points[i % pointCount];
      d += `Q${round(x)} ${round(y)} ${mid(i)}`;
    }
    paths.push(`${d}Z`);
  }

  return paths;
}
