import { Text, Image, RichText, Field, withDatasourceCheck, ImageField, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    copy: Field<string>;
    image: ImageField;
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
const _ContentBlock = (props: ContentBlockProps): JSX.Element => (
  <section>
    <Text tag="h1" className="content-block_heading" field={props.fields.heading} />
    <RichText className="content-block_copy" field={props.fields.copy} />
    {props.viewBag.withImage && <Image field={props.fields.image} />}
    <p>{props.extraData}</p>
  </section>
);

const _Default = (props: ContentBlockProps) : JSX.Element => (
  <_ContentBlock {...props} viewBag={{ withImage: false }} />
);

const _WithImage = (props: ContentBlockProps) : JSX.Element => (
  <_ContentBlock {...props} viewBag={{ withImage: true }} />
);

export const getStaticProps: GetStaticComponentProps = async() => {
  return { extraData: 'Hello world!'}
}

export const Default = withDatasourceCheck()<ContentBlockProps>(_Default);
export const WithImage = withDatasourceCheck()<ContentBlockProps>(_WithImage);
