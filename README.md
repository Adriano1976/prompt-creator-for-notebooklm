# Assistente de Criação de prompts para NotebookLM

Um assistente simples para ajudar a criar prompts personalizados para usar no NotebookLM. Com algumas perguntas básicas, o projeto gera um guia ou template de prompt que você pode copiar e colar no NotebookLM para obter respostas mais focadas e eficientes.

## Objetivo
- Ajudar usuários (estudantes, professores, profissionais) a estruturar prompts claros e úteis.
- Transformar informações sobre objetivos, público e formato desejado em prompts prontos para uso.
- Reduzir o tempo e tentativa/erro ao criar prompts para NotebookLM.

## Como funciona (visão geral)
1. O assistente faz perguntas sobre:
   - Objetivo do prompt (o que você quer que o NotebookLM faça).
   - Público-alvo (nível de conhecimento, interesses).
   - Formato de resposta desejado (resumo, lista, passo-a-passo, código, etc.).
   - Restrições ou pontos importantes a incluir.
2. Com base nas respostas, gera um prompt estruturado e claro.
3. Você copia o prompt gerado e o utiliza no NotebookLM.

## Exemplo de prompt gerado
- Objetivo: Resumir artigo científico
- Público: Estudantes de pós-graduação em Biologia
- Formato: Resumo em 5 pontos + referências principais

Prompt gerado (exemplo):
"Leia o seguinte artigo (insira texto/link). Resuma os 5 pontos principais, explique a relevância para pesquisadores de pós-graduação em Biologia e indique 3 referências complementares. Use linguagem técnica, mas acessível para estudantes."

## Estrutura do projeto
- LICENSE — arquivo de licença do projeto. Verifique `LICENSE` na raiz para o texto completo da licença adotada.
- README.md — documentação principal do projeto (este arquivo).
- remixed-87160895.tsx — arquivo TypeScript/TSX presente na raiz; parece ser um componente/protótipo de interface (Front-end). Revise este arquivo para entender como o projeto pretende interagir com usuários.

Observação: Não foram encontradas pastas `src/`, `templates/` ou `examples/` neste commit; caso deseje, posso criar essas pastas e arquivos iniciais (por exemplo `templates/` para modelos de prompts e `examples/` para demonstrações).

## Uso (instruções rápidas)
- Abra o código e siga as instruções do arquivo principal (por exemplo, `README` ou `docs`) para executar.
- Se houver uma interface web/CLI, execute o script correspondente (ex.: `python app.py` ou `npm start`) — verifique os arquivos do repositório para o comando correto.
- Responda às perguntas que o assistente fizer e copie o prompt final para o NotebookLM.

## Boas práticas para prompts
- Seja específico sobre objetivo e formato.
- Declare o público-alvo e nível de detalhe esperado.
- Indique restrições (tamanho, tom, palavras a evitar).
- Peça exemplos ou estrutura se precisar de formato padronizado.

## Contribuição
- Abra uma issue descrevendo a ideia ou correção.
- Faça um fork, crie uma branch com sua alteração e abra um pull request.
- Mantenha o estilo de código e adicione exemplos ou testes quando pertinente.

## Licença
- Inclua aqui a licença do projeto (ex.: MIT). Se ainda não tiver, adicione um arquivo `LICENSE` e informe qual será adotada.
