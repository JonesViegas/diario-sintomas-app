# Diário de sintomas

App (PWA) para registrar sintomas, remédios, medições e exames, **guardado só no seu aparelho**.
Nada é enviado para a internet: os dados ficam no IndexedDB do navegador do celular ou computador.

**Abrir o app:** https://jonesviegas.github.io/diario-sintomas-app/

## O que faz

- **Feito para tocar, não escrever**: sintomas, remédios, exames, humor, sono e ocorrências são botões de marcar; escrever é sempre opcional.
- **Meu perfil**: sexo/gênero, condições de saúde (incluindo doença rara), remédios de uso contínuo, mobilidade, tipo sanguíneo e contato de emergência.
- **Diário**: sintomas com intensidade de 0 a 10, remédios (dose e horário), como a pessoa está (humor, sono, disposição, apetite, intestino), ocorrências (queda, desmaio, pronto-socorro…), observações, fotos e documentos.
- **Menstruação** (quando ativada no perfil): fluxo, início, término e sinais; períodos e duração do ciclo calculados, com previsão da próxima.
- **Medições**: pressão arterial, pulso, peso, glicemia (jejum / após refeição), temperatura e saturação de O₂, com cartões dos últimos valores, gráficos de evolução e tabela.
- **Exames**: nome, data, laboratório, quem pediu, resultado, observações e arquivos (PDF ou fotos do laudo).
- **Relatório para o médico**: resumo do período, gráficos, medições (com IMC se a altura for informada), exames, bem-estar, ocorrências, ciclo menstrual, registro dia a dia; imprime ou salva em PDF.
- **Análise por IA (opcional)**: no relatório, a pessoa marca o que quer (padrões, sinais de alerta, perguntas para o médico…) e o Claude (Anthropic) escreve um resumo, que pode entrar no PDF. Só é enviado quando ela toca em "Gerar análise", com consentimento e chave de API própria; nome, data de nascimento, fotos e arquivos nunca são enviados. Também é possível só copiar os dados para colar em outra IA.
- **Aparência**: tema automático, claro ou escuro, 6 cores principais e 3 tamanhos de texto. A escolha fica salva só neste aparelho.
- **Backup**: arquivo `.dsx` criptografado com senha (AES-256-GCM, PBKDF2), para levar os dados a outro aparelho.
- **Funciona sem internet** e pode ser instalado na tela inicial (Android, iPhone, Windows, Mac).

## Privacidade

Todos os dados (registros, medições, exames, anexos, perfil, tema) ficam no armazenamento local do navegador.
A única exceção é a análise por IA, que só acontece quando a pessoa pede e envia apenas os dados do período escolhido.
Limpar os dados do navegador apaga o diário, então exporte backups com frequência.

## Estrutura

Não há etapa de build: é um site estático.

```
index.html             app completo (HTML, CSS e JS)
sw.js                  service worker (cache para uso offline)
manifest.webmanifest   dados para instalar como app
icons/                 ícones do app
```

Para testar localmente: `python -m http.server` na pasta e abra http://localhost:8000.
