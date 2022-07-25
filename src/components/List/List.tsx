import React, { useEffect, useState } from "react";
import ListType from "../../types/ListType";

const List = (props: any) => {
  const [list, setList] = useState<ListType | undefined>(undefined);

  useEffect(() => {
    setList(props.list);
  }, []);

  return <>{!!list ? <div>{list.title}</div> : <></>}</>;
};

export default List;
