import React, { useRef, useEffect } from 'react';

const LightRays: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vert = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0,1); }`;

    const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec2  iRes;
    uniform vec2  rayPos;
    uniform vec2  rayDir;
    uniform vec3  raysColor;
    uniform float raysSpeed;
    uniform float lightSpread;
    uniform float rayLength;
    uniform float pulsating;
    uniform float fadeDistance;
    uniform vec2  mousePos;
    uniform float mouseInfluence;
    uniform float noiseAmount;
    uniform float distortion;

    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float rayStr(vec2 src, vec2 refDir, vec2 coord, float sA, float sB, float spd) {
      vec2  toC  = coord - src;
      float cosA = dot(normalize(toC), refDir);
      float dA   = cosA + distortion * sin(iTime * 2.0 + length(toC) * 0.01) * 0.2;
      float sp   = pow(max(dA, 0.0), 1.0 / max(lightSpread, 0.001));
      float dist = length(toC);
      float maxD = iRes.x * rayLength;
      float lf   = clamp((maxD - dist) / maxD, 0.0, 1.0);
      float ff   = clamp((iRes.x * fadeDistance - dist) / (iRes.x * fadeDistance), 0.5, 1.0);
      float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * spd * 3.0)) : 1.0;
      float bs = clamp(
        (0.45 + 0.15 * sin(dA * sA + iTime * spd)) +
        (0.30 + 0.20 * cos(-dA * sB + iTime * spd)),
        0.0, 1.0);
      return bs * lf * ff * sp * pulse;
    }

    void main() {
      vec2 coord = vec2(gl_FragCoord.x, iRes.y - gl_FragCoord.y);
      vec2 fDir  = rayDir;
      if (mouseInfluence > 0.0) {
        vec2 msp = mousePos * iRes.xy;
        fDir = normalize(mix(rayDir, normalize(msp - rayPos), mouseInfluence));
      }
      vec4 r1 = vec4(1.0) * rayStr(rayPos, fDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
      vec4 r2 = vec4(1.0) * rayStr(rayPos, fDir, coord, 22.3991, 18.0234,  1.1 * raysSpeed);
      vec4 color = r1 * 0.25 + r2 * 0.18;   /* strength */
      if (noiseAmount > 0.0) {
        float n = noise(coord * 0.01 + iTime * 0.1);
        color.rgb *= (1.0 - noiseAmount + noiseAmount * n);
      }
      float bri = coord.y / iRes.y;         /* flipped: bright at bottom */
      color.x *= 0.6 + bri * 0.8;
      color.y *= 0.15 + bri * 0.35;
      color.z *= 0.0  + bri * 0.05;
      color.rgb *= raysColor;
      gl_FragColor = color;
    }`;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    if (!prog) return;
    
    const vShader = compile(gl.VERTEX_SHADER, vert);
    const fShader = compile(gl.FRAGMENT_SHADER, frag);
    if (!vShader || !fShader) return;
    
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      iTime:         gl.getUniformLocation(prog, 'iTime'),
      iRes:          gl.getUniformLocation(prog, 'iRes'),
      rayPos:        gl.getUniformLocation(prog, 'rayPos'),
      rayDir:        gl.getUniformLocation(prog, 'rayDir'),
      raysColor:     gl.getUniformLocation(prog, 'raysColor'),
      raysSpeed:     gl.getUniformLocation(prog, 'raysSpeed'),
      lightSpread:   gl.getUniformLocation(prog, 'lightSpread'),
      rayLength:     gl.getUniformLocation(prog, 'rayLength'),
      pulsating:     gl.getUniformLocation(prog, 'pulsating'),
      fadeDistance:  gl.getUniformLocation(prog, 'fadeDistance'),
      mousePos:      gl.getUniformLocation(prog, 'mousePos'),
      mouseInfluence:gl.getUniformLocation(prog, 'mouseInfluence'),
      noiseAmount:   gl.getUniformLocation(prog, 'noiseAmount'),
      distortion:    gl.getUniformLocation(prog, 'distortion'),
    };

    const CONFIG = {
      color:         [1.0, 0.55, 0.1],  /* warm amber-orange */
      speed:         1.2,
      lightSpread:   0.35,
      rayLength:     2.5,
      pulsating:     0,
      fadeDistance:  1.0,
      mouseInfluence:0.18,
      noiseAmount:   0.08,
      distortion:    0.15,
    };

    const mouse  = { x: 0.5, y: 0.5 };
    const smouse = { x: 0.5, y: 0.5 };
    
    const handleMouseMove = (e: MouseEvent) => {
      const r  = canvas.getBoundingClientRect();
      mouse.x  = (e.clientX - r.left) / r.width;
      mouse.y  = (e.clientY - r.top)  / r.height;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function resize() {
      const dpr   = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    let start: number | null = null;
    let rafId: number;
    
    function frame(ts: number) {
      if (!start) start = ts;
      const t = (ts - start) * 0.001;
      const w = canvas.width, h = canvas.height;

      smouse.x = smouse.x * 0.92 + mouse.x * 0.08;
      smouse.y = smouse.y * 0.92 + mouse.y * 0.08;

      gl!.uniform1f(U.iTime,          t);
      gl!.uniform2f(U.iRes,           w, h);
      gl!.uniform2f(U.rayPos,         0.5 * w, 1.2 * h);
      gl!.uniform2f(U.rayDir,         0, -1);
      gl!.uniform3f(U.raysColor,      CONFIG.color[0], CONFIG.color[1], CONFIG.color[2]);
      gl!.uniform1f(U.raysSpeed,      CONFIG.speed);
      gl!.uniform1f(U.lightSpread,    CONFIG.lightSpread);
      gl!.uniform1f(U.rayLength,      CONFIG.rayLength);
      gl!.uniform1f(U.pulsating,      CONFIG.pulsating);
      gl!.uniform1f(U.fadeDistance,   CONFIG.fadeDistance);
      gl!.uniform2f(U.mousePos,       smouse.x, smouse.y);
      gl!.uniform1f(U.mouseInfluence, CONFIG.mouseInfluence);
      gl!.uniform1f(U.noiseAmount,    CONFIG.noiseAmount);
      gl!.uniform1f(U.distortion,     CONFIG.distortion);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block w-full ${className}`} />;
};

export default LightRays;
