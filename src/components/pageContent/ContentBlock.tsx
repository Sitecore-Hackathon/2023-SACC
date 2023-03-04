import { Text, Image, RichText, Field, withDatasourceCheck, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentBlockProps = ComponentProps & {
  fields: {
    title: Field<string>;
    content: Field<string>;
    author: Field<string>;
    date: Field<string>;
    image: ImageField;
  };
  viewBag: {
    withImage: boolean;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const _ContentBlock = (props: ContentBlockProps): JSX.Element => (
  <article>
    <Text tag="h3" className="content-block_heading" field={props.fields.title} />
    {props.viewBag.withImage && <Image field={props.fields.image} />}
    <RichText tag="p" className="content-block_copy" field={props.fields.content} />
    <p className="content-block-meta">
      Posted on <Text tag="span" field={props.fields.date} /> by <Text tag="span" field={props.fields.author} />
    </p>
  </article>
);

const _Default = (props: ContentBlockProps) : JSX.Element => (
  <_ContentBlock {...props} viewBag={{ withImage: false }} />
);

const _WithImage = (props: ContentBlockProps) : JSX.Element => (
  <_ContentBlock {...props} viewBag={{ withImage: true }} />
);

export const Default = withDatasourceCheck()<ContentBlockProps>(_Default);
export const WithImage = withDatasourceCheck()<ContentBlockProps>(_WithImage);
