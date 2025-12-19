import React, { useState } from 'react';
import { BookOpen, GraduationCap, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export default function NotebookLMAssistant() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    nivel: '',
    curso: '',
    tema: '',
    recurso: ''
  });
  const [showConfig, setShowConfig] = useState(false);
  const [copied, setCopied] = useState(false);

  const niveis = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Técnico',
    'Graduação',
    'Especialização',
    'Mestrado ou Doutorado'
  ];

  const recursos = [
    'Resumo em Áudio - Gere um podcast com IA baseado nas suas fontes',
    'Resumo em Vídeo - Gere um vídeo explicativo, apresentado por IA',
    'Cartões didáticos - Gere cartões didáticos com IA baseados nas suas fontes',
    'Crie um teste interativo com IA baseado nas suas fontes',
    'Use a IA para criar um infográfico baseado nas suas fontes',
    'Apresentação de slides - Gere uma apresentação com IA baseada nas suas fontes',
    'Configuração das conversas'
  ];

  const handleSelect = (field, value) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowConfig(true);
    }
  };

  const canProceed = () => {
    switch(step) {
      case 0: return true;
      case 1: return responses.nivel !== '';
      case 2: return responses.curso.trim() !== '';
      case 3: return responses.tema.trim() !== '';
      case 4: return responses.recurso !== '';
      default: return false;
    }
  };

  const generateConfiguration = () => {
    const nivelConfig = {
      'Ensino Fundamental': {
        complexidade: 'elementar',
        linguagem: 'simples e objetiva',
        detalhamento: 'conceitos básicos com muitos exemplos visuais'
      },
      'Ensino Médio': {
        complexidade: 'básica',
        linguagem: 'acessível e clara',
        detalhamento: 'conceitos fundamentais com exemplos práticos'
      },
      'Técnico': {
        complexidade: 'intermediária',
        linguagem: 'técnica mas didática',
        detalhamento: 'aplicações práticas e procedimentos'
      },
      'Graduação': {
        complexidade: 'acadêmica',
        linguagem: 'formal e técnica',
        detalhamento: 'teoria fundamentada e análise crítica'
      },
      'Especialização': {
        complexidade: 'avançada',
        linguagem: 'especializada',
        detalhamento: 'aprofundamento em áreas específicas'
      },
      'Mestrado ou Doutorado': {
        complexidade: 'científica avançada',
        linguagem: 'acadêmica especializada',
        detalhamento: 'pesquisa de ponta e metodologia rigorosa'
      }
    };

    const config = nivelConfig[responses.nivel];
    
    return { config };
  };

  const generatePrompt = () => {
    const { config } = generateConfiguration();
    const recursoMap = {
      0: 'infográfico',
      1: 'vídeo explicativo',
      2: 'cartões didáticos',
      3: 'teste interativo',
      4: 'infográfico',
      5: 'apresentação de slides',
      6: 'conversa interativa'
    };

    const recursoSelecionado = recursoMap[parseInt(responses.recurso)];

    return `Você é um especialista em ${responses.curso} no contexto de Inteligência Artificial. Sua audiência é composta por estudantes de nível ${responses.nivel}.

CONTEXTO DO ESTUDANTE:
- Nível de instrução: ${responses.nivel}
- Curso: ${responses.curso}
- Tema/Disciplina: ${responses.tema}
- Recurso solicitado: ${recursoSelecionado}

DIRETRIZES DE LINGUAGEM E COMPLEXIDADE:
- Complexidade: ${config.complexidade}
- Linguagem: ${config.linguagem}
- Detalhamento: ${config.detalhamento}

INSTRUÇÕES PARA GERAÇÃO DE CONTEÚDO:

1. Analise profundamente todas as fontes fornecidas, identificando:
   - Conceitos-chave e terminologia específica
   - Relações entre diferentes tópicos
   - Exemplos práticos e casos de uso
   - Dados, estatísticas e evidências relevantes

2. Estruture o conteúdo considerando:
   - Progressão lógica do mais simples ao mais complexo
   - Conexões entre teoria e prática
   - Aplicabilidade ao contexto de ${responses.tema}

3. Para o formato de ${recursoSelecionado}, utilize:
   - Identifique dados e relações visuais nas fontes
   - Sugira gráficos, diagramas e ícones apropriados
   - Organize informações em hierarquia visual
   - Use cores e elementos gráficos para categorização

4. Adapte a profundidade do conteúdo para:
   - Foque em conhecimento especializado
   - Relacione com tendências atuais da área
   - Inclua debates e controvérsias do campo
   - Conecte teoria avançada com prática profissional

5. Incorpore elementos pedagógicos:
   - Explicações claras de termos técnicos
   - Exemplos contextualizados ao ${responses.tema}
   - Conexões com aplicações reais em ${responses.tema}
   - Perguntas reflexivas para consolidação do aprendizado

OBJETIVO FINAL:
Criar um ${recursoSelecionado} que maximize o aprendizado do estudante de ${responses.nivel} em ${responses.curso}, utilizando as fontes de forma abrangente e estruturada.`;
  };

  const getRecursoSpecificInstructions = (recursoIndex) => {
    const instructions = [
      '- Crie um diálogo natural e envolvente entre dois apresentadores\n   - Inclua pausas estratégicas para reflexão\n   - Use analogias e metáforas para conceitos complexos\n   - Mantenha um tom conversacional mas informativo',
      '- Estruture o conteúdo com introdução, desenvolvimento e conclusão claros\n   - Sugira elementos visuais para cada seção\n   - Inclua momentos de pausa para assimilação\n   - Use linguagem visual e descritiva',
      '- Crie cartões com frente (pergunta/conceito) e verso (resposta/explicação)\n   - Inclua dicas para memorização\n   - Varie entre definições, exemplos e aplicações\n   - Organize por nível de dificuldade crescente',
      '- Desenvolva questões de múltipla escolha, verdadeiro/falso e dissertativas\n   - Forneça explicações detalhadas para cada resposta\n   - Inclua questões que testem compreensão, aplicação e análise\n   - Gradua a dificuldade progressivamente',
      '- Identifique dados e relações visuais nas fontes\n   - Sugira gráficos, diagramas e ícones apropriados\n   - Organize informações em hierarquia visual\n   - Use cores e elementos gráficos para categorização',
      '- Estruture em slides com títulos claros e concisos\n   - Limite informações por slide para clareza\n   - Sugira transições lógicas entre tópicos\n   - Inclua notas do apresentador com detalhamentos',
      '- Prepare-se para responder perguntas de forma interativa\n   - Antecipe dúvidas comuns do estudante\n   - Ofereça explicações em diferentes níveis de profundidade\n   - Sugira recursos adicionais quando apropriado'
    ];
    return instructions[recursoIndex];
  };

  const getNivelSpecificInstructions = (nivel) => {
    const instructions = {
      'Ensino Fundamental': '- Priorize simplicidade e clareza extrema\n   - Use muitas ilustrações e exemplos do dia a dia\n   - Evite termos técnicos, usando linguagem infantil/jovem\n   - Torne o aprendizado lúdico e interessante\n   - Divida conceitos complexos em partes muito pequenas',
      'Ensino Médio': '- Priorize clareza e acessibilidade\n   - Use muitos exemplos do cotidiano\n   - Evite jargões excessivos, explicando termos técnicos\n   - Conecte com conhecimentos prévios básicos',
      'Técnico': '- Equilibre teoria e prática\n   - Foque em aplicações profissionais\n   - Use terminologia técnica com explicações\n   - Inclua procedimentos e metodologias práticas',
      'Graduação': '- Aprofunde conceitos teóricos\n   - Apresente diferentes perspectivas acadêmicas\n   - Inclua referências a autores e estudos relevantes\n   - Estimule pensamento crítico e análise',
      'Especialização': '- Foque em conhecimento especializado\n   - Relacione com tendências atuais da área\n   - Inclua debates e controvérsias do campo\n   - Conecte teoria avançada com prática profissional',
      'Mestrado ou Doutorado': '- Apresente o estado da arte do tema\n   - Discuta metodologias de pesquisa\n   - Identifique lacunas e oportunidades de pesquisa\n   - Inclua perspectivas críticas e interdisciplinares'
    };
    return instructions[nivel];
  };

  const ConfigurationStep = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <CheckCircle className="text-blue-600" size={24} />
          Configuração Personalizada
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Nível:</p>
            <p className="text-gray-600">{responses.nivel}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Curso:</p>
            <p className="text-gray-600">{responses.curso}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Tema/Disciplina:</p>
            <p className="text-gray-600">{responses.tema}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Recurso:</p>
            <p className="text-gray-600">{recursos[parseInt(responses.recurso)].split(' - ')[0]}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="text-indigo-600" size={20} />
          Instruções de Configuração
        </h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-indigo-700 mb-2">Passo 1: Prepare suas fontes</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Acesse o NotebookLM em notebooklm.google.com</li>
              <li>Crie um novo notebook ou abra um existente</li>
              <li>Adicione suas fontes (PDFs, documentos, URLs, vídeos do YouTube)</li>
              <li>Aguarde o processamento das fontes pela IA</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-indigo-700 mb-2">Passo 2: Configure o recurso</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {parseInt(responses.recurso) === 6 ? (
                <>
                  <li>Abra a área de "Chat" no NotebookLM</li>
                  <li>Cole o prompt personalizado gerado abaixo</li>
                  <li>Inicie a conversa com suas dúvidas específicas</li>
                </>
              ) : (
                <>
                  <li>Localize o botão "{recursos[parseInt(responses.recurso)].split(' - ')[0]}" no painel de recursos</li>
                  <li>Clique para gerar o conteúdo automaticamente</li>
                  <li>Aguarde o processamento (pode levar alguns minutos)</li>
                  <li>Revise e personalize o conteúdo gerado conforme necessário</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-indigo-700 mb-2">Passo 3: Otimize o resultado</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use o prompt personalizado abaixo para guiar a IA</li>
              <li>Refine as fontes adicionando materiais mais específicos se necessário</li>
              <li>Experimente diferentes configurações para encontrar o melhor resultado</li>
              <li>Salve e organize seus recursos gerados para referência futura</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} />
          Prompt Otimizado para NotebookLM
        </h3>
        <div className="bg-white p-4 rounded border border-purple-200 mb-3">
          <pre className="text-xs whitespace-pre-wrap font-mono text-gray-800 overflow-x-auto">
{generatePrompt()}
          </pre>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(generatePrompt());
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          }}
          className={`w-full py-2 px-4 rounded transition-colors text-sm font-medium ${
            copied 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {copied ? '✓ Prompt Copiado!' : '📋 Copiar Prompt'}
        </button>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-2 text-sm">💡 Dicas Avançadas:</h4>
        <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
          <li>Adicione múltiplas fontes complementares para enriquecer o conteúdo gerado</li>
          <li>Use a função "Fazer pergunta" para esclarecer conceitos específicos</li>
          <li>Salve versões diferentes do conteúdo gerado para comparação</li>
          <li>Combine diferentes recursos (ex: áudio + slides) para estudo multimodal</li>
          <li>Revise e valide as informações geradas consultando suas fontes originais</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setStep(4);
            setShowConfig(false);
          }}
          className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          ← Alterar Recurso
        </button>
        <button
          onClick={() => {
            setStep(0);
            setResponses({ nivel: '', curso: '', tema: '', recurso: '' });
            setShowConfig(false);
          }}
          className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          🔄 Reiniciar Configuração
        </button>
      </div>
    </div>
  );

  if (showConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <ConfigurationStep />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <GraduationCap className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Assistente NotebookLM</h1>
              <p className="text-sm text-gray-600">Otimize seu estudo com IA</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[0, 1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 mx-1 rounded-full ${
                    s <= step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">
              Etapa {step + 1} de 5
            </p>
          </div>

          <div className="space-y-6">
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-lg">
                  <BookOpen className="text-indigo-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      Olá! Bem-vindo ao Assistente NotebookLM! 👋
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Sou seu orientador especialista e vou ajudá-lo a configurar o NotebookLM de forma personalizada para maximizar seu aprendizado. Através de algumas perguntas simples, vou criar um guia completo e um prompt otimizado para extrair o máximo das capacidades de IA do NotebookLM no seu tema de estudo.
                    </p>
                  </div>
                </div>
                <p className="text-center text-gray-600 font-medium">
                  Vamos começar! Clique em "Continuar" para iniciar.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Qual é o seu nível de instrução?
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {niveis.map((nivel, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect('nivel', nivel)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        responses.nivel === nivel
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{index + 1}. {nivel}</span>
                        {responses.nivel === nivel && (
                          <CheckCircle className="text-indigo-600" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Qual é o seu curso?
                </h2>
                <p className="text-sm text-gray-600">
                  Informe o nome completo do seu curso (ex: Engenharia da Computação, Administração, Medicina, etc.)
                </p>
                <input
                  type="text"
                  value={responses.curso}
                  onChange={(e) => handleSelect('curso', e.target.value)}
                  placeholder="Digite o nome do seu curso..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none text-gray-900"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Qual tema/disciplina você vai abordar?
                </h2>
                <p className="text-sm text-gray-600">
                  Seja específico (ex: Aprendizado de Máquina, Contabilidade Gerencial, Anatomia Humana, etc.)
                </p>
                <input
                  type="text"
                  value={responses.tema}
                  onChange={(e) => handleSelect('tema', e.target.value)}
                  placeholder="Digite o tema ou disciplina..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none text-gray-900"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Qual recurso do NotebookLM você vai utilizar?
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {recursos.map((recurso, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect('recurso', index.toString())}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        responses.recurso === index.toString()
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900 block">
                            {index + 1}. {recurso.split(' - ')[0]}
                          </span>
                          {recurso.includes(' - ') && (
                            <span className="text-sm text-gray-600">
                              {recurso.split(' - ')[1]}
                            </span>
                          )}
                        </div>
                        {responses.recurso === index.toString() && (
                          <CheckCircle className="text-indigo-600 flex-shrink-0" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                ← Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                canProceed()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 4 ? 'Gerar Configuração' : 'Continuar'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}