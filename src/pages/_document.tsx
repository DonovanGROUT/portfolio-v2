import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { v4 as uuidv4 } from 'uuid';
import type { DocumentProps } from 'next/document';

interface CustomDocumentProps extends DocumentProps {
  nonce?: string;
}

export default function Document(props: CustomDocumentProps) {
  // Récupère le nonce généré côté serveur (voir getInitialProps)
  const nonce = props.nonce || '';
  return (
    <Html lang="fr">
      <Head />
      <body nonce={nonce}>
        <Main />
        {/* Next.js injecte ses scripts ici, ils recevront automatiquement le nonce */}
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}

// Génère un nonce unique côté serveur et le passe aux props du Document
Document.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps & { nonce: string }> => {
  const initialProps = await ctx.renderPage();
  // Génère un nonce unique par requête
  const nonce = uuidv4();
  // Remplace le placeholder dans la CSP par la vraie valeur du nonce
  if (ctx.res && ctx.res.setHeader) {
    const csp = ctx.res.getHeader('Content-Security-Policy');
    if (typeof csp === 'string') {
      ctx.res.setHeader(
        'Content-Security-Policy',
        csp.replace(/__REPLACE_WITH_NONCE__/g, nonce)
      );
    }
  }
  return { ...initialProps, nonce };
};
