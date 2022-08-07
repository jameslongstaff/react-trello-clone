type TagType = "a" | "button";

const Button = (props: any) => {
  const Tag = `${props.tag}` as TagType;

  return (
    <Tag className={props.className} onClick={props.onClick}>
      {props.title}
    </Tag>
  );
};

export default Button;
