# Diário de sintomas

App (PWA) para registrar sintomas, remédios, medições e exames, **guardado só no seu aparelho**.
Nada é enviado para a internet: os dados ficam no IndexedDB do navegador do celular ou computador.

**Abrir o app:** https://jonesviegas.github.io/diario-sintomas-app/

## O que faz

- **Feito para tocar, não escrever**: todas as respostas (sintomas, remédios, exames, humor, sono, ocorrências, perfil) são listas suspensas; nas listas longas, basta começar a digitar para buscar a palavra. Escrever é sempre opcional.
- **Hoje**: no topo do diário, as consultas próximas, os remédios do dia (manhã, tarde e noite) com o botão “Tomei” e as dores já marcadas no dia, com um atalho para marcar a intensidade de novo.
- **Receitas e remédios**: cada receita guarda os remédios, a dose, como tomar, até quando e os horários de manhã, tarde ou noite, além da foto ou PDF da receita.
- **Consultas**: data, horário, profissional, especialidade e local; avisa todos os dias, no horário escolhido, a partir de alguns dias antes (5 por padrão).
- **Google Agenda (opcional)**: as consultas ficam sincronizadas com uma agenda “Consultas médicas” na conta Google da pessoa. O que é cadastrado no app vai para lá com os lembretes dos dias antes (que tocam no celular mesmo com o app fechado), e o que for criado, mudado ou apagado nessa agenda volta para o app. Só as consultas são enviadas; o app só tem acesso às agendas que ele mesmo criou.
- **Lembretes e avisos**: avisos na hora dos remédios, dos dias antes da consulta e para remarcar a intensidade das dores durante o dia. Aparecem enquanto o app está aberto ou minimizado; para tocar com o app fechado, os horários podem ser exportados para o calendário do celular (arquivo .ics com alarmes).
- **Meu perfil**: sexo/gênero, condições de saúde (incluindo doença rara), remédios de uso contínuo, mobilidade, tipo sanguíneo, vários médicos e profissionais (com especialidade e telefone) e contato de emergência.
- **Diário**: sintomas com intensidade de 0 a 10, remédios (dose e horário), como a pessoa está (humor, sono, disposição, apetite, intestino), ocorrências (queda, desmaio, pronto-socorro…), observações, fotos e documentos.
- **Menstruação** (quando ativada no perfil): fluxo, início, término e sinais; períodos e duração do ciclo calculados, com previsão da próxima.
- **Medições**: pressão arterial, pulso, peso, glicemia (jejum / após refeição), temperatura e saturação de O₂, com cartões dos últimos valores, gráficos de evolução e tabela.
- **Exames**: nome, data, laboratório, quem pediu, resultado, observações e arquivos (PDF ou fotos do laudo).
- **Relatório para o médico ou para o(a) psicólogo(a)**: a versão para o(a) psicólogo(a) destaca humor, sono e disposição ao longo do tempo, sintomas emocionais, ocorrências e observações. Traz resumo do período, gráficos, medições (com IMC se a altura for informada), exames, bem-estar, ocorrências, ciclo menstrual, registro dia a dia; imprime ou salva em PDF.
- **Análise por IA (opcional)**: no relatório, a pessoa marca o que quer (padrões, sinais de alerta, perguntas para o médico…) e o Claude (Anthropic) escreve um resumo, que pode entrar no PDF. Só é enviado quando ela toca em "Gerar análise", com consentimento e chave de API própria; nome, data de nascimento, fotos e arquivos nunca são enviados. Também é possível só copiar os dados para colar em outra IA.
- **Aparência**: tema automático, claro ou escuro, 6 cores principais e 3 tamanhos de texto. A escolha fica salva só neste aparelho.
- **Backup**: arquivo `.dsx` criptografado com senha (AES-256-GCM, PBKDF2), para levar os dados a outro aparelho.
- **Funciona sem internet** e pode ser instalado na tela inicial (Android, iPhone, Windows, Mac).

## Privacidade

Todos os dados (registros, medições, exames, anexos, perfil, tema) ficam no armazenamento local do navegador.
As exceções são a análise por IA, que só acontece quando a pessoa pede e envia apenas os dados do período escolhido, e a sincronização com o Google Agenda, que só envia as consultas e só depois que a pessoa conecta a conta.
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

## Configurar o Google Agenda (uma vez, por quem publica o app)

1. Em https://console.cloud.google.com crie um projeto e ative a **Google Calendar API**.
2. Em **Google Auth Platform** (tela de consentimento OAuth), escolha público **Externo**, preencha nome e e-mail e adicione o escopo `https://www.googleapis.com/auth/calendar.app.created`.
   Enquanto o app estiver em modo de teste, adicione em **Público-alvo** os e-mails de quem vai usar; para liberar para todos, publique o app (o Google pode pedir verificação).
3. Em **Clientes**, crie um **ID do cliente OAuth** do tipo **Aplicativo da Web** com a origem JavaScript autorizada `https://jonesviegas.github.io` (e `http://localhost:8000` para testes).
4. Copie o ID (termina em `.apps.googleusercontent.com`) para a constante `GOOGLE_CLIENT_ID` no `index.html`. Sem isso, o app pede o ID na tela “Google Agenda”.
