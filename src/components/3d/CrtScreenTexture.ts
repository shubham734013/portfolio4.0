/**
 * Generates an ultra-sharp dynamic 2D canvas texture for the 3D CRT Monitor screen.
 * Features realistic green phosphor typography, syntax highlighting, scanlines, and blinking cursor.
 */

export interface CodeTheme {
  bg: string;
  keyword: string;
  string: string;
  function: string;
  variable: string;
  comment: string;
  lineNumber: string;
  cursor: string;
}

export const CRT_THEMES: Record<string, CodeTheme> = {
  matrixGreen: {
    bg: '#0a100a',
    keyword: '#48e060',
    string: '#a6f7b0',
    function: '#78F28B',
    variable: '#bdf2c4',
    comment: '#3b6e41',
    lineNumber: '#224a27',
    cursor: '#78F28B',
  },
  amberPhosphor: {
    bg: '#140f06',
    keyword: '#fca311',
    string: '#ffd166',
    function: '#f77f00',
    variable: '#ffe3a8',
    comment: '#8c591e',
    lineNumber: '#4a3010',
    cursor: '#ffb703',
  },
  cyberCyan: {
    bg: '#081216',
    keyword: '#00f5d4',
    string: '#70e000',
    function: '#38bdf8',
    variable: '#a5f3fc',
    comment: '#1e4d58',
    lineNumber: '#15333a',
    cursor: '#00f5d4',
  }
};

export class CrtScreenTextureGenerator {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  public theme: CodeTheme;
  private blinkState: boolean = true;
  private lastBlinkTime: number = 0;
  private activePresetIndex: number = 0;

  private presets = [
    {
      filename: 'shubham-workspace.ts',
      tab: 'developer.ts',
      lines: [
        { num: 1, type: 'comment', text: '// Shubham Vaishnav — Full-Stack Developer' },
        { num: 2, type: 'comment', text: '// BTech CSE @ JECRC University (Class of 2028)' },
        { num: 3, type: 'code', tokens: [
          { t: 'keyword', v: 'export const ' },
          { t: 'variable', v: 'shubham' },
          { t: 'keyword', v: ' = ' },
          { t: 'variable', v: '{' },
        ]},
        { num: 4, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: 'name: ' },
          { t: 'string', v: '"Shubham Vaishnav"' },
          { t: 'variable', v: ',' }
        ]},
        { num: 5, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: 'title: ' },
          { t: 'string', v: '"Full-Stack Developer"' },
          { t: 'variable', v: ',' }
        ]},
        { num: 6, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: 'building: ' },
          { t: 'variable', v: '[' },
          { t: 'string', v: '"ResQ 2.0"' },
          { t: 'variable', v: ', ' },
          { t: 'string', v: '"Day Night GymOS"' },
          { t: 'variable', v: '],' }
        ]},
        { num: 7, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: 'coreStack: ' },
          { t: 'variable', v: '[' },
          { t: 'string', v: '"React"' },
          { t: 'variable', v: ', ' },
          { t: 'string', v: '"Node.js"' },
          { t: 'variable', v: ', ' },
          { t: 'string', v: '"MongoDB"' },
          { t: 'variable', v: ', ' },
          { t: 'string', v: '"REST APIs"' },
          { t: 'variable', v: '],' }
        ]},
        { num: 8, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: 'currentStatus: ' },
          { t: 'string', v: '"Open for Engineering Internships"' }
        ]},
        { num: 9, type: 'code', tokens: [
          { t: 'variable', v: '};' }
        ]},
        { num: 10, type: 'comment', text: '' },
        { num: 11, type: 'code', tokens: [
          { t: 'keyword', v: 'async function ' },
          { t: 'function', v: 'dispatchAssistance' },
          { t: 'variable', v: '(request: ' },
          { t: 'keyword', v: 'EmergencyEvent' },
          { t: 'variable', v: ') {' }
        ]},
        { num: 12, type: 'code', indent: 2, tokens: [
          { t: 'keyword', v: 'await ' },
          { t: 'variable', v: 'resqService.' },
          { t: 'function', v: 'routeNearestHospital' },
          { t: 'variable', v: '(request);' }
        ]},
        { num: 13, type: 'code', tokens: [
          { t: 'variable', v: '}' }
        ]}
      ]
    },
    {
      filename: 'gymos-attendance.ts',
      tab: 'qr-engine.ts',
      lines: [
        { num: 1, type: 'comment', text: '// Day Night GymOS — QR Check-in Protocol' },
        { num: 2, type: 'code', tokens: [
          { t: 'keyword', v: 'export const ' },
          { t: 'function', v: 'verifyMemberQr' },
          { t: 'keyword', v: ' = async ' },
          { t: 'variable', v: '(qrSecret: ' },
          { t: 'keyword', v: 'string' },
          { t: 'variable', v: ') => {' }
        ]},
        { num: 3, type: 'code', indent: 2, tokens: [
          { t: 'keyword', v: 'const ' },
          { t: 'variable', v: 'member = ' },
          { t: 'keyword', v: 'await ' },
          { t: 'variable', v: 'Member.' },
          { t: 'function', v: 'findOne' },
          { t: 'variable', v: '({ qrSecret });' }
        ]},
        { num: 4, type: 'code', indent: 2, tokens: [
          { t: 'keyword', v: 'if ' },
          { t: 'variable', v: '(!member || !member.' },
          { t: 'function', v: 'isActive' },
          { t: 'variable', v: '()) {' }
        ]},
        { num: 5, type: 'code', indent: 4, tokens: [
          { t: 'keyword', v: 'return ' },
          { t: 'variable', v: '{ access: ' },
          { t: 'keyword', v: 'false' },
          { t: 'variable', v: ', reason: ' },
          { t: 'string', v: '"Membership expired"' },
          { t: 'variable', v: ' };' }
        ]},
        { num: 6, type: 'code', indent: 2, tokens: [
          { t: 'variable', v: '}' }
        ]},
        { num: 7, type: 'code', indent: 2, tokens: [
          { t: 'keyword', v: 'return ' },
          { t: 'variable', v: 'AttendanceLedger.' },
          { t: 'function', v: 'recordEntry' },
          { t: 'variable', v: '(member._id);' }
        ]},
        { num: 8, type: 'code', tokens: [
          { t: 'variable', v: '};' }
        ]}
      ]
    }
  ];

  constructor(width = 1024, height = 768, themeKey: keyof typeof CRT_THEMES = 'matrixGreen') {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not supported');
    this.ctx = ctx;
    this.theme = CRT_THEMES[themeKey] || CRT_THEMES.matrixGreen;
    this.render();
  }

  public setPreset(index: number) {
    this.activePresetIndex = index % this.presets.length;
    this.render();
  }

  public togglePreset() {
    this.activePresetIndex = (this.activePresetIndex + 1) % this.presets.length;
    this.render();
  }

  public setTheme(themeKey: keyof typeof CRT_THEMES) {
    this.theme = CRT_THEMES[themeKey] || CRT_THEMES.matrixGreen;
    this.render();
  }

  public update(time: number): boolean {
    // Blink cursor every 500ms
    if (time - this.lastBlinkTime > 500) {
      this.lastBlinkTime = time;
      this.blinkState = !this.blinkState;
      this.render();
      return true;
    }
    return false;
  }

  public render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = this.theme;
    const preset = this.presets[this.activePresetIndex];

    // CRT Screen Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle Radial Vignette inside CRT tube
    const radial = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, w * 0.7);
    radial.addColorStop(0, 'rgba(0, 0, 0, 0)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);

    // Scanline grid effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 2);
    }

    // Top CRT Header / Window Bar
    ctx.fillStyle = 'rgba(20, 32, 20, 0.85)';
    ctx.fillRect(0, 0, w, 44);
    ctx.fillStyle = '#223822';
    ctx.fillRect(0, 44, w, 2);

    // Window controls
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(24, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(44, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(64, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // Editor tab
    ctx.fillStyle = theme.bg;
    ctx.fillRect(100, 8, 220, 36);
    ctx.fillStyle = theme.function;
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText(`⚡ ${preset.tab}`, 115, 31);

    // System prompt badge right
    ctx.fillStyle = theme.comment;
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('CRT-OS v3.8 [READY]', w - 180, 28);

    // Code area layout
    const startY = 85;
    const lineHeight = 34;
    const gutterWidth = 65;

    ctx.font = '500 19px "JetBrains Mono", monospace';

    // Active line highlight for line 4
    ctx.fillStyle = 'rgba(120, 242, 139, 0.08)';
    ctx.fillRect(gutterWidth + 10, startY + (3 * lineHeight) - 24, w - gutterWidth - 30, lineHeight);

    preset.lines.forEach((line, idx) => {
      const y = startY + idx * lineHeight;

      // Line number
      ctx.fillStyle = theme.lineNumber;
      ctx.fillText(String(line.num).padStart(2, '0'), 25, y);

      // Gutter separator
      ctx.fillStyle = '#1c2e1c';
      ctx.fillRect(gutterWidth, y - 22, 1, lineHeight);

      let currentX = gutterWidth + 24;

      if (line.type === 'comment') {
        ctx.fillStyle = theme.comment;
        ctx.fillText(line.text || '', currentX, y);
      } else if (line.tokens) {
        if (line.indent) {
          currentX += line.indent * 14;
        }

        line.tokens.forEach((token) => {
          if (token.t === 'keyword') ctx.fillStyle = theme.keyword;
          else if (token.t === 'string') ctx.fillStyle = theme.string;
          else if (token.t === 'function') ctx.fillStyle = theme.function;
          else if (token.t === 'variable') ctx.fillStyle = theme.variable;
          else ctx.fillStyle = theme.variable;

          ctx.fillText(token.v, currentX, y);
          currentX += ctx.measureText(token.v).width;
        });

        // Blinking cursor on line 6 (projects line)
        if (idx === 5 && this.blinkState) {
          ctx.fillStyle = theme.cursor;
          ctx.fillRect(currentX + 6, y - 19, 11, 23);
        }
      }
    });

    // Bottom Terminal Status Bar
    const footerY = h - 38;
    ctx.fillStyle = 'rgba(16, 26, 16, 0.9)';
    ctx.fillRect(0, footerY, w, 38);
    ctx.fillStyle = '#223822';
    ctx.fillRect(0, footerY, w, 1);

    ctx.fillStyle = theme.keyword;
    ctx.font = '600 14px "JetBrains Mono", monospace';
    ctx.fillText('NORMAL', 20, footerY + 24);

    ctx.fillStyle = theme.comment;
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('UTF-8 | TypeScript | Git: main*', 105, footerY + 24);
    ctx.fillText('Shubham Vaishnav Workstation', w - 240, footerY + 24);
  }
}
