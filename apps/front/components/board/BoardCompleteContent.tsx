import { FunctionComponent } from "react";
import * as diff from "diff";

import styles from "../../styles/Board.module.scss";

const Diff = ({ string1 = "", string2 = "", mode = "characters" }) => {
  let groups: any[] = [];

  if (mode === "characters") groups = diff.diffChars(string1, string2);
  if (mode === "words") groups = diff.diffWords(string1, string2);

  const mappedNodes = groups.map((group, index) => {
    const { value, added, removed } = group;
    let styleName = undefined;
    if (added) styleName = "diff-added";
    if (removed) styleName = "diff-removed";

    return (
      <span key={`${value}${index}`} className={styleName && styles[styleName]}>
        {value}
      </span>
    );
  });

  return <span>{mappedNodes}</span>;
};

interface BoardCompleteContentProps {
  originText: string;
  editedText: string;
}

const BoardCompleteContent: FunctionComponent<BoardCompleteContentProps> = ({
  originText,
  editedText,
}) => {
  return (
    <div className={styles.textBox}>
      <Diff string1={originText} string2={editedText} />
    </div>
  );
};

export default BoardCompleteContent;
