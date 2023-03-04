import { Text, RichText, Field, withDatasourceCheck, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type BlogListingProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
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
const _BlogListing = (props: BlogListingProps): JSX.Element => (
  <section>
    <Text tag="h1" className="content-block_heading" field={props.fields.title} />
    <RichText className="content-block_copy" field={props.fields.description} />
    <p>{props.extraData}</p>
  </section>
);

const _Default = (props: BlogListingProps) : JSX.Element => (
  <_BlogListing {...props} viewBag={{ withImage: false }} />
);


export const getStaticProps: GetStaticComponentProps = async() => {
  return { extraData: 'Hello world!'}
}

export const Default = withDatasourceCheck()<BlogListingProps>(_Default);