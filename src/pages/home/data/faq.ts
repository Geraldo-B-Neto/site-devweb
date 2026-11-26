/** Perguntas frequentes: usadas na seção de FAQ e nos dados estruturados (FAQPage). */
export interface QAItem {
  q: string;
  a: string;
}

export const QA: QAItem[] = [
  {
    q: 'Quanto tempo leva para ficar pronto?',
    a: 'Uma <b>landing page</b> costuma ficar pronta em poucos dias. Sites institucionais e sistemas levam mais, conforme o tamanho do projeto. O prazo exato é combinado na conversa, antes de começar.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. Você conta o que o seu negócio precisa e a gente cuida do resto, do desenho ao código e à publicação. <b>Você só aprova o visual</b> antes de qualquer linha de código.',
  },
  {
    q: 'Posso pedir mudanças depois que o site estiver no ar?',
    a: 'Pode. Depois da entrega a gente fica por perto para <b>ajustes e evolução</b>, com suporte e planos para crescer. Se preferir, você também pode ter autonomia para atualizar textos e fotos sem depender de ninguém.',
  },
  {
    q: 'Qual a diferença entre landing page e site institucional?',
    a: '<b>Landing page</b> é uma página única, focada em uma oferta e feita para o visitante entrar em contato. <b>Site institucional</b> tem várias páginas e apresenta a empresa, os serviços e a história, passando mais credibilidade.',
  },
  {
    q: 'Quanto custa?',
    a: 'Os projetos começam <b>a partir de R$ 790</b>. O orçamento final é combinado na conversa, antes de começar, sem surpresa depois.',
  },
];
