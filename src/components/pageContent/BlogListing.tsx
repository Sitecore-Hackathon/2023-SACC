// disable prettier for this file to avoid formatting issues with the JSX
// prettier-ignore
import { Text, RichText, ImageField, Field, withDatasourceCheck, ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import BlogPostContent from 'src/components/pageContent/BlogPostContent';
import { ComponentProps } from 'lib/component-props';

type BlogListingProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
  };
  posts: ComponentProps &
    {
      fields: {
        title: Field<string>;
        author: Field<string>;
        date: Field<string>;
        content: Field<string>;
        image: ImageField;
        prompt: Field<string>;
        apiKey: Field<string>;
      };
      rendering: ComponentRendering;
      params: ComponentParams;
    }[];
};

const _BlogListing = (props: BlogListingProps): JSX.Element => (
  <section>
    <Text tag="h2" className="content-block_heading" field={props.fields.title} />
    {props.fields.description && (
      <RichText tag="p" className="content-block_copy" field={props.fields.description} />
    )}
    <ul className="blog-post-list">
      {props.posts.map((post, index) => {
        return (
          <li className="blog-post" key={index}>
            <BlogPostContent fields={post.fields} rendering={post.rendering} params={post.params} />
            ;
          </li>
        );
      })}
    </ul>
  </section>
);

const _Default = (props: BlogListingProps): JSX.Element => <_BlogListing {...props} />;

export const Default = withDatasourceCheck()<BlogListingProps>(_Default);
