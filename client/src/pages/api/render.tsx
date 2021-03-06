import { NextApiRequest, NextApiResponse } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import mdxPrism from 'mdx-prism';
import remarkCodeTitles from 'remark-code-titles';
import { components } from '../../components/md';

const RenderMDX = async (req: NextApiRequest, res: NextApiResponse) => {
  const source = req.body.source;

  if (!source) {
    return res.status(400).json({ ok: false, error: 'source missing' });
  }

  const mdxSource = await renderToString(source, {
    // @ts-ignore
    components: Object.fromEntries(
      Object.entries(components).map(([key, Component]) => [
        key,
        // @ts-ignore
        (props) => {
          if (key === 'inlineCode') {
            return <code {...props} />;
          }

          return <Component {...props} />;
        },
      ])
    ),
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles],
      rehypePlugins: [mdxPrism],
    },
  });

  res.json({ mdxSource });
};

export default RenderMDX;
