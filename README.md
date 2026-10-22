# Diário de sintomas

App (PWA) para registrar sintomas, remédios, medições e exames, **guardado só no seu aparelho**.
Nada é enviado para a internet: os dados ficam no IndexedDB do navegador do celular ou computador.

**Abrir o app:** https://jonesviegas.github.io/diario-sintomas-app/

## O que faz

- **Diário**: sintomas com intensidade de 0 a 10, remédios (dose e horário), observações, fotos e documentos.
- **Medições**: pressão arterial, pulso, peso, glicemia (jejum / após refeição), temperatura e saturação de O₂, com cartões dos últimos valores, gráficos de evolução e tabela.
- **Exames**: nome, data, laboratório, quem pediu, resultado, observações e arquivos (PDF ou fotos do laudo).
- **Relatório para o médico**: resumo do período, gráficos, medições (com IMC se a altura for informada), exames, registro dia a dia; imprime ou salva em PDF.
- **Aparência**: tema automático, claro ou escuro e 6 cores principais. A escolha fica salva só neste aparelho.
- **Backup**: arquivo `.dsx` criptografado com senha (AES-256-GCM, PBKDF2), para levar os dados a outro aparelho.
- **Funciona sem internet** e pode ser instalado na tela inicial (Android, iPhone, Windows, Mac).

## Privacidade

Todos os dados (registros, medições, exames, anexos, perfil, tema) ficam no armazenamento local do navegador.
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
