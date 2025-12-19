#!/usr/bin/env node
import inquirer from 'inquirer';
import { generatePrompt } from './promptGenerator';

async function main() {
  const answers = await inquirer.prompt([
    { name: 'objective', message: 'Objetivo do prompt:', type: 'input' },
    { name: 'audience', message: 'Público-alvo (opcional):', type: 'input' },
    { name: 'format', message: 'Formato desejado (ex.: resumo, lista):', type: 'input' },
    { name: 'constraints', message: 'Restrições (separadas por ponto-e-vírgula):', type: 'input' },
    { name: 'examples', message: 'Exemplos de entrada/saída (opcional, separados por ponto-e-vírgula):', type: 'input' }
  ]);

  const input = {
    objective: answers.objective as string,
    audience: answers.audience || undefined,
    format: answers.format || undefined,
    constraints: answers.constraints ? (answers.constraints as string).split(';').map(s => s.trim()).filter(Boolean) : undefined,
    examples: answers.examples ? (answers.examples as string).split(';').map(s => s.trim()).filter(Boolean) : undefined
  };

  const output = generatePrompt(input);

  console.log('\n=== Prompt gerado ===\n');
  console.log(output.promptText);
  if (output.notes) console.log('\nObservações: ' + output.notes);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
