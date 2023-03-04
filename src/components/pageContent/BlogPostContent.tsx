import { Text, Image, RichText, Field, withDatasourceCheck, ImageField, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type BlogPostContentProps = ComponentProps & {
  fields: {
    title: Field<string>;
    author: Field<string>;
    date: Field<string>;
    content: Field<string>;
    image: ImageField;
    prompt: Field<string>;
  };
  viewBag: {
    withImage: boolean;
  };
  extraData: string
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const _BlogPostContent = (props: BlogPostContentProps): JSX.Element => (
  <section>
    <Text tag="h1" className="content-block_heading" field={props.fields.title} />
    <RichText className="content-block_copy" field={props.fields.content} />
    {props.viewBag.withImage && <Image field={props.fields.image} />}
    <p>{props.extraData}</p>
  </section>
);

const _Default = (props: BlogPostContentProps) : JSX.Element => (
  <_BlogPostContent {...props} viewBag={{ withImage: false }} />
);

const _WithImage = (props: BlogPostContentProps) : JSX.Element => (
  <_BlogPostContent {...props} viewBag={{ withImage: true }} />
);

export const getStaticProps: GetStaticComponentProps = async() => {
  return { extraData: 'Hello world!'}
}

export const Default = withDatasourceCheck()<BlogPostContentProps>(_Default);
export const WithImage = withDatasourceCheck()<BlogPostContentProps>(_WithImage);
