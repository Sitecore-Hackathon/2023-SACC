import { Text, Field, withDatasourceCheck  } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Default as ContentBlock, WithImage as ImageContentBlock } from 'src/components/pageContent/ContentBlock';

type ContentBlockUnion = typeof ContentBlock | typeof ImageContentBlock;

type ContentBlockWrapperProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    contentBlocks: Field<ContentBlockUnion[]>;
  };
};

/**
 * A wrapper for blog posts, which renders a heading and a list of Content Blocks.
 */
const _ContentBlockWrapper = (props: ContentBlockWrapperProps): JSX.Element => (
  <section>
    <Text tag="h2" className="section-heading" field={props.fields.heading} />
    {props.fields.contentBlocks.value.map((block, index) => {
      // Check the type of the block and render the appropriate component
      if (block.props.viewBag?.withImage) {
        return <ImageContentBlock key={index} {...block} />;
      } else {
        return <ContentBlock key={index} {...block} />;
      }
    })}
  </section>
);

const _Default = (props: ContentBlockWrapperProps) : JSX.Element => (
  <_ContentBlockWrapper {...props} />
);

export const Default = withDatasourceCheck()<ContentBlockWrapperProps>(_Default);
