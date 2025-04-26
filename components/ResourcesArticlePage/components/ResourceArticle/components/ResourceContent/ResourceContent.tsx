import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXContentRenderer } from './components/ContentRenderer';

interface Props {
  slug: string;
}

export default async function ResourceContent({ slug }: Props) {
  try {
    const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return <div>No se encontró el contenido para este recurso.</div>;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const { content } = matter(fileContents);
    
    const mdxSource = await serialize(content);
    
    return <MDXContentRenderer source={mdxSource} />;
  } catch (error) {
    console.error("Error al cargar el contenido MDX:", error);
    return <div>Ocurrió un error al cargar el contenido.</div>;
  }
}
