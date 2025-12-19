import { PromptInput, PromptOutput } from './types';

export function generatePrompt(input: PromptInput): PromptOutput {
  const lines: string[] = [];

  lines.push(`Objetivo: ${input.objective}`);
  if (input.audience) lines.push(`Público: ${input.audience}`);
  if (input.format) lines.push(`Formato: ${input.format}`);
  if (input.constraints && input.constraints.length) {
    lines.push(`Restrições:\n- ${input.constraints.join('\n- ')}`);
  }
  if (input.examples && input.examples.length) {
    lines.push(`Exemplos:\n${input.examples.map((e, i) => `${i + 1}. ${e}`).join('\n')}`);
  }

  lines.push('\nPor favor, gere a resposta focada nesse objetivo, usando linguagem adequada ao público e respeitando as restrições.');

  const promptText = lines.join('\n');

  const notes = 'Copie e cole este texto no NotebookLM; adicione o conteúdo ou link do material quando solicitado.';

  return { promptText, notes };
}
