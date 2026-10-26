export interface TerminalOutputLine {
  id: string;
  type: 'input' | 'output' | 'success' | 'error' | 'system';
  content: string;
}

export function executeTerminalCommand(
  rawInput: string,
  history: TerminalOutputLine[]
): {
  newLines: TerminalOutputLine[];
  shouldClear?: boolean;
} {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { newLines: [] };
  }

  const promptLine: TerminalOutputLine = {
    id: `cmd-${Date.now()}-${Math.random()}`,
    type: 'input',
    content: `$ ${trimmed}`
  };

  const lower = trimmed.toLowerCase();

  if (lower === 'clear' || lower === 'cls') {
    return { newLines: [], shouldClear: true };
  }

  const resultLines: TerminalOutputLine[] = [promptLine];

  const add = (content: string, type: TerminalOutputLine['type'] = 'output') => {
    resultLines.push({
      id: `res-${Date.now()}-${Math.random()}`,
      type,
      content
    });
  };

  if (lower === 'help') {
    add('Available commands:', 'system');
    add('  help           - Display list of supported commands');
    add('  npm run dev    - Simulate application dev server boot sequence');
    add('  git status     - Inspect current working tree and branch');
    add('  git log        - View recent engineering commit log');
    add('  cat profile    - Display developer identity overview');
    add('  projects       - List featured engineering repositories');
    add('  stack          - Inspect current active technology stack');
    add('  clear          - Clear terminal display buffer');
    return { newLines: resultLines };
  }

  if (lower === 'npm run dev') {
    add('> portfolio@2026 dev /workstation/shubham', 'system');
    add('> vite --port 3000 --host 0.0.0.0', 'system');
    add('');
    add('  VITE v8.3.0  ready in 184 ms', 'success');
    add('  ➜  Local:   http://localhost:3000/', 'success');
    add('  ➜  Network: use --host to expose', 'output');
    add('  ➜  3D CRT Monitor Engine: WebGL [Mounted & Online]', 'success');
    return { newLines: resultLines };
  }

  if (lower === 'git status') {
    add('On branch main', 'system');
    add('Your branch is up to date with \'origin/main\'.', 'output');
    add('');
    add('Changes tracked for deployment:', 'output');
    add('  modified:   src/components/3d/VintageCrtScene.tsx', 'success');
    add('  modified:   src/data/projects.ts (ResQ 2.0 & Day Night GymOS)', 'success');
    add('  modified:   src/data/profile.ts', 'success');
    add('no changes added to commit (use "git add" to update)', 'output');
    return { newLines: resultLines };
  }

  if (lower === 'git log' || lower === 'git log --oneline') {
    add('* b4f8e91 (HEAD -> main) feat(resq): implement SOS dispatch routing and triage', 'success');
    add('* 78a2d10 feat(gymos): design member schema & QR attendance validation logic', 'output');
    add('* 9c14ef2 feat(3d): render vintage CRT computer monitor with green code on curved screen', 'output');
    add('* 3a00d81 chore: initialize project architecture, styling tokens, and routes', 'output');
    return { newLines: resultLines };
  }

  if (lower === 'cat profile' || lower === 'whoami') {
    add('Name:        Shubham Vaishnav', 'output');
    add('Role:        Full-Stack Developer', 'output');
    add('Education:   BTech CSE @ JECRC University (Expected 2028)', 'output');
    add('Core Stack:  React.js, Node.js, Express, MongoDB, REST APIs, TypeScript', 'output');
    add('Focus:       Emergency Assistance Apps & Cloud/SaaS Software', 'output');
    add('GitHub:      https://github.com/shubham734013', 'success');
    return { newLines: resultLines };
  }

  if (lower === 'projects') {
    add('FEATURED REPOSITORIES:', 'system');
    add('  1. ResQ 2.0          [Status: Working Prototype] - Emergency healthcare coordination platform', 'output');
    add('  2. Day Night GymOS   [Status: In Development]    - SaaS gym administration & QR check-in', 'output');
    add('Type "cat profile" or scroll down to explore detailed case studies.', 'output');
    return { newLines: resultLines };
  }

  if (lower === 'stack') {
    add('DEVELOPMENT STACK:', 'system');
    add('  Frontend:  React, TypeScript, Tailwind CSS, Three.js (WebGL)', 'output');
    add('  Backend:   Node.js, Express REST API, JWT', 'output');
    add('  Database:  MongoDB, Mongoose ODM', 'output');
    add('  Languages: JavaScript, TypeScript, Python, C++, C', 'output');
    return { newLines: resultLines };
  }

  // Harmless unknown command explanation
  add(`sh: command not found: ${trimmed}`, 'error');
  add('Note: This is a safe sandboxed developer terminal visual. Type "help" for supported commands.', 'output');

  return { newLines: resultLines };
}
