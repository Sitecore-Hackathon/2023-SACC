// disable prettier for this file to avoid formatting issues with the JSX
// prettier-ignore
import {
  Text,
  Image,
  RichText,
  Field,
  ImageField,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';
import { GPT3 } from 'lib/GPT3';

type BlogPostContentProps = ComponentProps & {
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
};

export const BlogPostContent = (props: BlogPostContentProps): JSX.Element => {
  const { fields, rendering } = props;
  const [articleContent, setArticleContent] = useState<Field<string>>(props.fields.content);

  useEffect(() => {
    const fetchData = async () => {
      const content = props.fields.content.value;
      const prompt = props.fields.prompt.value;

      if (!content && prompt) {
        const gpt3 = new GPT3(props.fields.apiKey.value);
        let response = await gpt3.query(prompt);
        if (!response) response = '';

        setArticleContent({ value: response });
      }
    };

    fetchData();
  }, [props.fields.content.value, props.fields.prompt.value, props.fields.apiKey.value]);

  return (
    <article {...rendering}>
      <Text tag="h3" className="content-block_heading" field={fields.title} />
      {fields.image && <Image field={fields.image} />}
      <RichText tag="p" className="content-block_copy" field={articleContent} />
    </article>
  );
};

export default BlogPostContent;
