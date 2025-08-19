import { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import "./styles/App.css";

type CardProps = {
  text: string;
  indicatorValue?: number;
};

const TextCard = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isSingleLine, setIsSingleLine] = useState(false);
  useEffect(() => {
    const checkLines = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        setIsSingleLine(height <= lineHeight * 1.5);
      }
    };

    checkLines();
    const observer = new ResizeObserver(checkLines);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);
  
  return (
    <div className={`text-card ${isSingleLine ? 'single-line' : 'multi-line'}`}>
      <div className="menu-dots-container">
        <button className="menu-dots">
          <BsThreeDots className='bs'/>
        </button>
        {indicatorValue !== 0 && (
          <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
            {indicatorValue > 0 ? `+${indicatorValue}` : Math.abs(indicatorValue)}
          </button>
        )}
      </div>
      <p ref={textRef}>{text}</p>
    </div>
  );
};

const TextWithImageBlock = ({ text, indicatorValue = 1 }: CardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [linesCount, setLinesCount] = useState(1);
  useEffect(() => {
    const checkLines = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        const lines = Math.round(height / lineHeight);
        setLinesCount(lines);
      }
    };

    checkLines();
    const observer = new ResizeObserver(checkLines);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);

  return (
    <div className="image-text-card">
      <div className="menu-dots-container">
        <button className="menu-dots">
          <BsThreeDots className='bs'/>
        </button>
        {indicatorValue !== 0 && (
          <button className={`indicator ${indicatorValue > 0 ? 'active' : ''}`}>
            {indicatorValue > 0 ? `+${indicatorValue}` : Math.abs(indicatorValue)}
          </button>
        )}
      </div>
      <div className="image-text-wrapper">
        <img src="a4989700c519ce886523f0185b0c77105648b279.jpg" alt="Иллюстрация" />
        <p 
          ref={textRef} 
          className={`image-text ${linesCount <= 3 ? 'centered' : 'top-aligned'}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const PictureCard = ({ text, indicatorValue = 1, reverse = false }: CardProps & { reverse?: boolean }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isSingleLine, setIsSingleLine] = useState(false);
  useEffect(() => {
    const checkLines = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight, 10) || 24;
        const height = textRef.current.clientHeight;
        setIsSingleLine(height <= lineHeight * 1.5);
      }
    };

    checkLines();
    const observer = new ResizeObserver(checkLines);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => observer.disconnect();
  }, [text]);
  
  return (
    <div className={`picture-card ${isSingleLine ? 'single-line' : 'multi-line'}`}>
      {!reverse && (
        <img
          src="278a6ae038bb6ade654115eda25da9a94265964f.jpg"
          alt="Picture"
        />
      )}
      <div className="text-content">
        <p ref={textRef}>{text}</p>
      </div>
      {reverse && (
        <img
          src="98e3884d016edc047e8384431ccd3799dd68570b.jpg"
          alt="Picture"
        />
      )}
      <div className="menu-dots-container">
        <button className="menu-dots">
          <BsThreeDots className='bs'/>
        </button>
        {indicatorValue !== 0 && (
          <button className={`indicator ${indicatorValue > 0 ? 'active' : 'negative'}`}>
            {indicatorValue > 0 ? `+${indicatorValue}` : Math.abs(indicatorValue)}
          </button>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [testText, setTestText] = useState("Drinking water isn't just about quenching your thirst. It plays a crucial role in  in maintaining the a bbbbbbbbb");
  const [indicatorValue, setIndicatorValue] = useState(10);

  const handleIndicatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10) || 0;
    setIndicatorValue(Math.max(-9999, Math.min(9999, num)));
  };






  return (
    <>
      <div className="wrapper-app">
        <div className="text-section">
          {Array(4).fill(0).map((_, idx) => (
            <TextCard 
              key={`text-${idx}`} 
              text={testText} 
              indicatorValue={indicatorValue}
            />
          ))}
        </div>

        <div className="image-text-section">
          {Array(4).fill(0).map((_, idx) => (
            <TextWithImageBlock 
              key={`img-text-${idx}`} 
              text={testText} 
              indicatorValue={indicatorValue}
            />
          ))}
        </div>

        <div className="picture-block">
          <PictureCard text={testText} indicatorValue={indicatorValue} />
          <PictureCard text={testText} indicatorValue={indicatorValue} reverse/>
        </div>
      </div>
      <div className="settings">
        <div className="settings-panel">
          <label>
            Text:
            <textarea 
              value={testText} 
              onChange={(e) => setTestText(e.target.value)} 
              className="settings-textarea"
            />
          </label>
          <label>
            Indicator:
            <input
              type="number"
              value={indicatorValue}
              onChange={handleIndicatorChange}
              style={{ width: "100%", padding: "8px", marginTop: "8px", boxSizing: "border-box" }}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default App;