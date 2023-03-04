import { Text, RichText, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Default as BlogPost,
  WithImage as BlogPostImage,
} from 'src/components/pageContent/BlogPostContent';
import { ComponentProps } from 'lib/component-props';

type BlogPostListing = typeof BlogPost | typeof BlogPostImage;

type BlogListingProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
  };
  posts: BlogPostListing[];
};

const _BlogListing = (props: BlogListingProps): JSX.Element => (
  <section>
    <Text tag="h2" className="content-block_heading" field={props.fields.title} />
    {props.fields.description && (
      <RichText tag="p" className="content-block_copy" field={props.fields.description} />
    )}
    <ul className="blog-post-list">
      {props.posts.map((post, index) => {
        // Check the type of the block and render the appropriate component
        if (post.viewBag?.withImage) {
          return (
            <li className="blog-post" key={index}>
              <BlogPostImage {...post} />;
            </li>
          );
        } else {
          return (
            <li className="blog-post" key={index}>
              <BlogPost {...post} />;
            </li>
          );
        }
      })}
    </ul>
  </section>
);

const _Default = (props: BlogListingProps): JSX.Element => <_BlogListing {...props} />;

export const Default = withDatasourceCheck()<BlogListingProps>(_Default);
