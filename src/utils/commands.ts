
const programmingLanguages: Record<string, { command: string, extension: string }> = {
  python: { command: "python", extension: ".py" },
  javascript: { command: "node", extension: ".js" },
  java: { command: "java", extension: ".java" },
  c: { command: "gcc", extension: ".c" },
  cpp: { command: "g++", extension: ".cpp" },
  go: { command: "go run", extension: ".go" },
  ruby: { command: "ruby", extension: ".rb" },
  rust: { command: "rustc", extension: ".rs" },
  swift: { command: "swift", extension: ".swift" },
  php: { command: "php", extension: ".php" },
  perl: { command: "perl", extension: ".pl" },
  csharp: { command: "dotnet run", extension: ".cs" }
};

export default programmingLanguages;
