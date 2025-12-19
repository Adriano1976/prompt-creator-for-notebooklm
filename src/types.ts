export interface PromptInput {
  objective: string; // O que se espera que o NotebookLM faça
  audience?: string; // Público-alvo / nível de conhecimento
  format?: string; // Formato desejado (resumo, passo-a-passo, lista, código, etc.)
  constraints?: string[]; // Restrições: tamanho, tom, palavras a evitar
  examples?: string[]; // Exemplos de entrada/saída desejados
}

export interface PromptOutput {
  promptText: string; // Prompt pronto para colar no NotebookLM
  notes?: string; // Observações adicionais (tom, estilo)
}
