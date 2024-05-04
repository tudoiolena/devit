import { FC, useState } from "react";

interface IProps {
  badWords: string[];
  children: string;
}

interface CensoredWord {
  censoredWord: string;
  originalWord: string;
}

const CensoredText: FC<IProps> = ({ badWords, children }) => {
  const [censoredWords, setCensoredWords] = useState<Set<string>>(new Set());

  const censorText = (text: string): CensoredWord[] => {
    return text.split(/\s+/).map((word) => ({
      censoredWord: badWords.includes(word) ? "*".repeat(word.length) : word,
      originalWord: word,
    }));
  };

  const handleWordClick = (originalWord: string) => {
    if (badWords.includes(originalWord)) {
      setCensoredWords((prevCensoredWords) => {
        const newCensoredWords = new Set(prevCensoredWords);
        newCensoredWords.has(originalWord)
          ? newCensoredWords.delete(originalWord)
          : newCensoredWords.add(originalWord);
        return newCensoredWords;
      });
    }
  };

  const words = censorText(children);

  const renderWord = (word: CensoredWord, index: number) => {
    const isCensored =
      censoredWords.has(word.originalWord) &&
      badWords.includes(word.originalWord);
    const textToDisplay = isCensored ? word.originalWord : word.censoredWord;
    const cursorStyle = censoredWords.has(word.originalWord)
      ? "pointer"
      : "default";

    return (
      <span
        key={index}
        onClick={() => handleWordClick(word.originalWord)}
        style={{ cursor: cursorStyle }}
      >
        {textToDisplay}{" "}
      </span>
    );
  };

  const renderedText = words.map(renderWord);

  return <>{renderedText}</>;
};

export default CensoredText;
