import {
  Text,
  Image,
  RichText,
  Field,
  withDatasourceCheck,
  ImageField,
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
  viewBag: {
    withImage: boolean;
  };
  extraData: string;
};

const _BlogPostContent = (props: BlogPostContentProps): JSX.Element => {
  const [articleContent, setArticleContent] = useState<Field<string>>(props.fields.content);

  useEffect(() => {
    const fetchData = async () => {
      const content = props.fields.content.value;
      const prompt = props.fields.prompt.value;

      if (!content && prompt) {
        const gpt3 = new GPT3(props.fields.apiKey.value);
        const response = (await gpt3.query(prompt).toString()) || '';
        setArticleContent({ value: response });
      }
    };

    fetchData();
  }, [props.fields.content.value, props.fields.prompt.value, props.fields.apiKey.value]);

  return (
    <article>
      <Text tag="h3" className="content-block_heading" field={props.fields.title} />
      {props.fields.image && <Image field={props.fields.image} />}
      <RichText tag="p" className="content-block_copy" field={articleContent} />
    </article>
  );
};

const _Default = (props: BlogPostContentProps): JSX.Element => <_BlogPostContent {...props} />;

export const Default = withDatasourceCheck()<BlogPostContentProps>(_Default);
